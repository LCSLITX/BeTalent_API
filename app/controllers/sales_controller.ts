import type { HttpContext } from '@adonisjs/core/http'
import { saleCreateValidator } from '#validators/sale'
import Sale from '#models/sale'
import Product from '#models/product'

export default class SalesController {
  /**
   * Display a list of resource
   * @param HttpContext
   * @returns response
   */
  static async index({ response }: HttpContext) {
    let list

    try {
      list = await Sale.all()
      list.map((p) => p.serializeAttributes({ omit: ['createdAt', 'updatedAt'] }))
    } catch (e) {
      return response.status(400).send({ error: e })
    }

    return response.status(200).send(list)
  }

  /**
   * Handle form submission for the create action
   * @param HttpContext
   * @returns response
   */
  static async store({ request, response }: HttpContext) {
    const data = request.only(['clientId', 'productId', 'quantity'])

    const payload = await saleCreateValidator.validate(data)

    let sale

    try {
      const product = await Product.findOrFail(data.productId)
      sale = await Sale.create({ ...payload, unitPrice: product?.price })
    } catch (e) {
      if (e.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).send({ message: `Product with id ${data.productId} not found` })
      }

      return response.status(400).send({ error: e })
    }

    return response.status(201).send(sale)
  }
}
