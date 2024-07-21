import vine from '@vinejs/vine'

/**
 * Validates the sale creation action
 */
export const saleCreateValidator = vine.compile(
  vine.object({
    clientId: vine.number(),
    productId: vine.number(),
    quantity: vine.number(),
  })
)