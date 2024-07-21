import vine from '@vinejs/vine'

/**
 * Validates the users signup action
 */
export const signupValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(2),
    email: vine.string().email(),
    password: vine.string().trim().minLength(6).maxLength(50),
  })
)

/**
 * Validates the users login action
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().trim().minLength(6).maxLength(50),
  })
)
