import factory from '@adonisjs/lucid/factories'
import Sale from '#models/sale'

export const SaleFactory = factory
  .define(Sale, async ({ faker }) => {
    return {}
  })
  .build()