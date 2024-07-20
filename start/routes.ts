/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import UsersController from '#controllers/users_controller'
import { HttpContext } from '@adonisjs/core/http'

router.post('/signup', async (ctx: HttpContext) => {
  return await UsersController.signup(ctx)
})

router.post('/login', async (ctx: HttpContext) => {
  return await UsersController.login(ctx)
})

router.get('/me', async (ctx: HttpContext) => {
  return await UsersController.me(ctx);
}).use(middleware.auth())
