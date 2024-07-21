import { DateTime } from 'luxon'
import Client from '#models/client'
import Product from '#models/product'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeSave, column, hasOne } from '@adonisjs/lucid/orm'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // TODO total_price should be calculated based on quantity and unit_price. Probably use beforeSave hook.

  @hasOne(() => Client)
  @column({ columnName: 'client_id' })
  declare clientId: HasOne<typeof Client>

  @hasOne(() => Product)
  @column({ columnName: 'product_id' })
  declare productId: HasOne<typeof Product>

  @column()
  declare quantity: number

  @column({ columnName: 'unit_price' })
  declare unitPrice: number

  @column({ columnName: 'total_price' })
  declare totalPrice: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async calculateTotalPrice(sale: Sale) {
    sale.totalPrice = sale.quantity * sale.unitPrice
  }
}