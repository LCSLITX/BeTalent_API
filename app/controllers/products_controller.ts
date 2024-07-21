import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import {
  productCreateValidator,
  productShowValidator,
  productUpdateValidator,
} from '#validators/product'

export default class ProductsController {
  /**
   * Display a list of resource
   * @param HttpContext
   * @returns response
   */
  static async index({ response }: HttpContext) {
    let list

    try {
      const l = await Product.all()
      list = l
        .map((p) => p.serializeAttributes({ pick: ['id', 'name', 'brand', 'model', 'price'] }))
        .sort((a, b) => a.name.localeCompare(b.name))
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
  static async show({ params, response }: HttpContext) {
    const { id } = await productShowValidator.validate(params)

    let product

    try {
      const p = await Product.findOrFail(id)
      product = p?.serializeAttributes({ pick: ['id', 'name', 'brand', 'model', 'price'] })
    } catch (e) {
      if (e.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).send({ message: `Product with id ${id} not found` })
      }

      return response.status(500).send({ error: e })
    }

    return response.status(200).send(product)
  }

  /**
   * Handle form submission for the create action
   * @param HttpContext
   * @returns response
   */
  static async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'brand', 'model', 'price'])

    const payload = await productCreateValidator.validate(data)

    let product

    try {
      product = await Product.create(payload)
    } catch (e) {
      return response.status(400).send({ error: e })
    }

    return response.status(201).send(product)
  }

  /**
   * Handle form submission for the edit action
   * @param HttpContext
   * @returns response
   */
  static async update({ params, request, response }: HttpContext) {
    const { id } = await productShowValidator.validate(params)
    const data = request.only(['name', 'brand', 'model', 'price'])

    const payload = await productUpdateValidator.validate(data)

    let product

    try {
      product = await Product.updateOrCreate({ id }, payload)
    } catch (e) {
      if (e.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).send({ message: `Product with id ${id} not found` })
      }

      return response.status(500).send({ error: e })
    }

    return response.status(200).send(product)
  }

  /**
   * Delete record
   * @param HttpContext
   * @returns response
   */
  static async destroy({ params, response }: HttpContext) {
    const { id } = await productShowValidator.validate(params)

    try {
      const product = await Product.findOrFail(id)
      await product.softDelete()
    } catch (e) {
      if (e.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).send({ message: `Client with id ${id} not found` })
      }
      console.log(e)
      return response.status(500).send({ error: e })
    }

    return response.status(204)
  }
}
