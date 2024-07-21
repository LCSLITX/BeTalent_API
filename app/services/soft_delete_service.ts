import { BaseModel } from '@adonisjs/lucid/orm'
import { LucidRow, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { DateTime } from 'luxon'

export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull('deleted_at')
}

export const softDelete = async (row: LucidRow, column: string = 'deletedAt') => {
  if (row.$attributes.hasOwnProperty(column)) {
    row.$attributes[column] = DateTime.local()
    await row.save()
  }
}
