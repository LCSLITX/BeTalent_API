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
  public deletedAt!: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeFind()
  public static softDeletesFind = softDeleteQuery;  

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery;
  
  public async softDelete(column?: string) {
    await softDelete(this, column);
  }
}