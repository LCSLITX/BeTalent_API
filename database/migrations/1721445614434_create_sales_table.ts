import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('client_id').unsigned().references('clients.id').onDelete('CASCADE') // delete profile when user is deleted
      table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE') // delete profile when user is deleted

      table.integer('quantity').notNullable()
      table.float('unit_price').unsigned().notNullable()
      table.float('total_price').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
