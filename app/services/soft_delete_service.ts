import { BaseModel } from '@adonisjs/lucid/orm'
import { LucidRow, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { DateTime } from 'luxon'

// Article about soft delete implementation on AdonisJS v5:
// https://medium.com/swlh/implementing-soft-delete-in-adonisjs-v5-21de89585f1f

// v5 to v6 Migration guide on how to update discontinued ioc imports:
// https://v6-migration.adonisjs.com/guides/migrate-ioc-imports

// v6 new import names
// https://github.com/adonisjs/upgrade-kit/blob/main/src/rewrite_maps.ts#L0-L1

export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull('deleted_at')
}

export const softDelete = async (row: LucidRow, column: string = 'deletedAt') => {
  if (row.$attributes.hasOwnProperty(column)) {
    row.$attributes[column] = DateTime.local()
    await row.save()
  }
}
