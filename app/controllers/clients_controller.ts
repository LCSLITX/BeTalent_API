import Client from '#models/client'
import Telephone from '#models/telephone'
import Address from '#models/address'
import Sale from '#models/sale'
import type { HttpContext } from '@adonisjs/core/http'
import { clientCreateValidator, clientShowValidator, clientUpdateValidator, clientFilterValidator, telephoneCreateValidator, addressCreateValidator } from '#validators/client'
import * as utils from '../utils/dates.js'
import db from '@adonisjs/lucid/services/db'


export default class ClientsController {
  /**
   * Display a list of resource
   * @param HttpContext
   * @returns response
   */
  static async index({ response }: HttpContext) {
    let list;
    
    try {
      list = (await Client.all())
        .map((c) => c.serializeAttributes({ pick: ['id', 'name', 'cpf'] }))

    } catch (e) {
      return response.status(400).send({ error: e })
    }

    return response.status(200).send(list)
  }

  /**
   * Show individual record
   * @param HttpContext
   * @returns response
   */
  static async show({ request, response, params }: HttpContext) {
    const { id } = await clientShowValidator.validate(params)

    const data = request.only(['filterByMonth', 'filterByYear'])

    const { filterByMonth, filterByYear } = await clientFilterValidator.validate({ ...data })

    let fm = filterByMonth?.toString()
    let fy = filterByYear?.toString()

    if (filterByMonth && filterByMonth < 10) {
      fm = `0${filterByMonth}`
    }    

    let client;

    try {
      const c = await Client.findOrFail(id)
      client = c?.serializeAttributes({ pick: ['id', 'name', 'cpf'] })

      let sales = await Sale.findManyBy('clientId', id)

      if (filterByYear) {
        sales = sales.filter((s) => {
          const year = s.createdAt.toISO()?.split('-')[0]
          const is = year === fy
          return is
        })
      }

      if (filterByMonth) {
        sales = sales.filter((s) => {
          const month = s.createdAt.toISO()?.split('-')[1]
          const is = month === fm
          return is
        })
      }

      let serializedSales = sales.map((s) => s.serializeAttributes({ omit: ['updatedAt'] }))

      utils.sortByDates(serializedSales)

      client.sales = serializedSales

    } catch (e) {
      if (e.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).send({ message: `Client with id ${id} not found` })
      }

      return response.status(500).send({ error: e })
    }

    return response.status(200).send(client)
  }

  /**
   * Handle form submission for the create action
   * @param HttpContext
   * @returns response
   */
  static async store({ request, response }: HttpContext) {
    const dataTelephone = request.only(['phoneNumber'])
    const dataAddress = request.only(['street', 'number', 'complement', 'district', 'city', 'province', 'country', 'zipCode'])
    const dataClient = request.only(['name', 'cpf'])

    const payloadTelephone = await telephoneCreateValidator.validate(dataTelephone)
    const payloadAddress = await addressCreateValidator.validate(dataAddress)
    const payloadClient = await clientCreateValidator.validate(dataClient)

    let client;

    try {
      await db.transaction(async (trx) => {
        const telephone = await Telephone.create({ ...payloadTelephone }, { client: trx })
        const telephoneId = telephone.id
  
        const address = await Address.create({ ...payloadAddress }, { client: trx })
        const addressId = address.id
  
        // @ts-ignore telephoneId and addressId are not being recognized as properties
        client = await Client.create({ ...payloadClient, telephoneId, addressId }, { client: trx })
      })

    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: e })
    }

    return response.status(201).send(client)
  }

  /**
   * Handle form submission for the edit action
   * @param HttpContext
   * @returns response
   */
  static async update({ params, request, response }: HttpContext) {
    const { id } = await clientShowValidator.validate(params)

    const data = request.only(['name', 'cpf'])

    const payload = await clientUpdateValidator.validate(data)

    let client;

    try {
      client = await Client.updateOrCreate({ id }, payload)

    } catch (e) {
      if (e.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).send({ message: `Client with id ${id} not found` })
      }

      return response.status(500).send({ error: e })
    }

    return response.status(200).send(client)
  }

  /**
   * Delete record
   * @param HttpContext
   * @returns response
   */
  static async destroy({ params, response }: HttpContext) {
    const { id } = await clientShowValidator.validate(params)

    try {
      const client = await Client.findOrFail(id)
      await client.delete()

    } catch (e) {
      if (e.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).send({ message: `Client with id ${id} not found` })
      }

      return response.status(500).send({ error: e })
    }

    return response.status(204)
  }
}