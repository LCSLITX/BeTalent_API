import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('street').notNullable()
      table.integer('number').notNullable()
      table.string('complement').nullable()
      table.string('district').nullable()
      table.string('city').notNullable()
      table.string('province').notNullable()
      table.string('country').notNullable()
      table.string('zip_code').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}