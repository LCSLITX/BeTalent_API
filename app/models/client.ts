import { DateTime } from 'luxon'
import Telephone from './telephone.js'
import Address from './address.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeSave, column, hasOne } from '@adonisjs/lucid/orm'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => Telephone)
  declare telephoneId: HasOne<typeof Telephone>
   
  @hasOne(() => Address)
  declare addressId: HasOne<typeof Address>
  
  @column()
  declare name: string

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async normalizeCpf(client: Client) {
    const parsedCPF = client.cpf.slice(0, 3) + '.' + client.cpf.slice(3, 6) + '.' + client.cpf.slice(6, 9) + '-' + client.cpf.slice(9);
    client.cpf = parsedCPF;
  }
}