import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { signupValidator, loginValidator } from '#validators/user'

export default class UsersController {
  /**
   * Method to signup a user
   * @param HttpContext
   * @returns response
   */
  static async signup({ request, response }: HttpContext) {
    const data = request.only(['username', 'email', 'password'])

    const payload = await signupValidator.validate(data)

    let user
    try {
      user = await User.create(payload)
      
    } catch (e) {
      // e.sql exposes hashed password, even if user model
      // has password column set to `serializeAs: null`.
      delete e.sql
      return response.status(400).send({ error: e })
    }

    return response.status(201).send(user)
  }

  /**
   * Method to login a user
   * @param HttpContext
   * @returns response
   */
  static async login({ request, response, auth }: HttpContext) {
    const data = request.only(['email', 'password'])

    const { email, password } = await loginValidator.validate(data)

    const user = await User.verifyCredentials(email, password)

    // @ts-ignore generate function is mistakingly causing error.
    const token = await auth.use('jwt').generate(user)

    return response.status(200).send(token)
  }

  /**
   * Method to get the logged user information and confirm the token
   * @param HttpContext
   * @returns response
   */
  static async me({ response, auth }: HttpContext) {
    const me = auth.getUserOrFail()

    return response.status(200).send(me)
  }
}
