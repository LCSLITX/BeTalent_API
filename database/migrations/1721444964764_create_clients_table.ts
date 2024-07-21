import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name', 60).notNullable()
      table.string('cpf', 60).notNullable().unique()

      table.integer('address_id').unsigned().references('addresses.id').onDelete('CASCADE') // delete profile when user is deleted
      table.integer('telephone_id').unsigned().references('telephones.id').onDelete('CASCADE') // delete profile when user is deleted

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
