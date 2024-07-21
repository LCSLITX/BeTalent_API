import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare street: string

  @column()
  declare number: number

  @column()
  declare complement: string

  @column()
  declare district: string

  @column()
  declare city: string

  @column()
  declare province: string

  @column()
  declare country: string

  @column({ columnName: 'zip_code' })
  declare zipCode: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
