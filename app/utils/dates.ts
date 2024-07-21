import { ModelObject } from '@adonisjs/lucid/types/model'

function sortDates(b: ModelObject, a: ModelObject): number {
  const dA = new Date(a.createdAt)
  const dB = new Date(b.createdAt)

  if (dA > dB) {
    return 1
  } else if (dA < dB) {
    return -1
  } else {
    return 0
  }
}

export function sortByDates(mo: ModelObject[]): ModelObject[] {
  return mo.sort(sortDates)
}
