/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from './kernel.js'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'

router.post('/signup', async (ctx: HttpContext) => {
  return await UsersController.signup(ctx)
})

router.post('/login', async (ctx: HttpContext) => {
  return await UsersController.login(ctx)
})

router
  .get('/me', async (ctx: HttpContext) => {
    return await UsersController.me(ctx)
  })
  .use(middleware.auth())
