import { DateTime } from 'luxon'
import { BaseModel, column, beforeFind, beforeFetch } from '@adonisjs/lucid/orm'
import { softDelete, softDeleteQuery } from '#services/soft_delete_service'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare brand: string

  @column()
  declare model: string

  @column()
  declare price: number

  @column.dateTime({ serializeAs: null })
  deletedAt!: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeFind()
  static softDeletesFind = softDeleteQuery

  @beforeFetch()
  static softDeletesFetch = softDeleteQuery

  async softDelete(controlColumn?: string) {
    await softDelete(this, controlColumn)
  }
}
