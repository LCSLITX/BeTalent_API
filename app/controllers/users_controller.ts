import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {

  public static async signup({ request, response }: HttpContext) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    response.status(201).send(user)
  }

  public static async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const token = await auth.use('jwt').generate(user)

    response.status(200).send(token)
  }

  public static async me({ response, auth }: HttpContext) {
    const me = auth.getUserOrFail();

    response.status(200).send(me);
  }
}