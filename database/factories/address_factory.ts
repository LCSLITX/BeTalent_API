import factory from '@adonisjs/lucid/factories'
import Address from '#models/address'

export const AddressFactory = factory
  .define(Address, async ({ faker }) => {
    return {}
  })
  .build()