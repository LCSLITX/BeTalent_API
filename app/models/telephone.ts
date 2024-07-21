import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Telephone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'phone_number' })
  declare phoneNumber: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
