import vine from '@vinejs/vine'

/**
 * Validates the client creation action
 */
export const clientCreateValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50),
    cpf: vine.string().minLength(11).maxLength(14), // 000.000.000-00
  })
)

/**
 * Validates the address creation action
 */
export const addressCreateValidator = vine.compile(
  vine.object({
    street: vine.string().trim().minLength(2).maxLength(50),
    number: vine.number(),
    complement: vine.string().trim().minLength(2).maxLength(50).optional(),
    district: vine.string().trim().minLength(2).maxLength(50).optional(),
    city: vine.string().trim().minLength(2).maxLength(50),
    province: vine.string().trim().minLength(2).maxLength(50),
    country: vine.string().trim().minLength(2).maxLength(50),
    zipCode: vine.string().trim().minLength(2).maxLength(50),
  })
)

/**
 * Validates the telephone creation action
 */
export const telephoneCreateValidator = vine.compile(
  vine.object({
    phoneNumber: vine.string().trim().minLength(2).maxLength(50),
  })
)

/**
 * Validates the client show action
 */
export const clientShowValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

/**
 * Validates the client filter action
 */
export const clientFilterValidator = vine.compile(
  vine.object({
    filterByMonth: vine.number().min(1).max(12).optional(),
    filterByYear: vine.number().min(1900).max(3000).optional(),
  })
)

/**
 * Validates the client update action
 */
export const clientUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50).optional(),
    cpf: vine.string().minLength(11).maxLength(11).optional(), // 000.000.000-00 without dots and dash
  })
)
