import vine from '@vinejs/vine'

/**
 * Validates the product creation action
 */
export const productCreateValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50),
    brand: vine.string().trim().minLength(2).maxLength(50),
    model: vine.string().trim().minLength(2).maxLength(50),
    price: vine.number(),
  })
)

/**
 * Validates the product show action
 */
export const productShowValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

/**
 * Validates the product update action
 */
export const productUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50).optional(),
    brand: vine.string().trim().minLength(2).maxLength(50).optional(),
    model: vine.string().trim().minLength(2).maxLength(50).optional(),
    price: vine.number().optional(),
  })
)
