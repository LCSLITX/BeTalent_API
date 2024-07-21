// @ts-nocheck
import factory from '@adonisjs/lucid/factories'
import Telephone from '#models/telephone'

export const TelephoneFactory = factory
  .define(Telephone, async ({ faker }) => {
    return {}
  })
  .build()
