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
import ClientsController from '#controllers/clients_controller'
import ProductsController from '#controllers/products_controller'
import SalesController from '#controllers/sales_controller'

// USER ROUTES
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

// CLIENT ROUTES
router
  .get('/clients', async (ctx: HttpContext) => {
    return await ClientsController.index(ctx)
  })
  .use(middleware.auth())

router
  .post('/client', async (ctx: HttpContext) => {
    return await ClientsController.store(ctx)
  })
  .use(middleware.auth())
  .use(middleware.cpfParser())

router
  .get('/client/:id', async (ctx: HttpContext) => {
    return await ClientsController.show(ctx)
  })
  .use(middleware.auth())

router
  .put('/client/:id', async (ctx: HttpContext) => {
    return await ClientsController.update(ctx)
  })
  .use(middleware.auth())
  .use(middleware.cpfParser())

router
  .delete('/client/:id', async (ctx: HttpContext) => {
    return await ClientsController.destroy(ctx)
  })
  .use(middleware.auth())

// PRODUCT ROUTES
router
  .get('/products', async (ctx: HttpContext) => {
    return await ProductsController.index(ctx)
  })
  .use(middleware.auth())

router
  .post('/product', async (ctx: HttpContext) => {
    return await ProductsController.store(ctx)
  })
  .use(middleware.auth())

router
  .get('/product/:id', async (ctx: HttpContext) => {
    return await ProductsController.show(ctx)
  })
  .use(middleware.auth())

router
  .put('/product/:id', async (ctx: HttpContext) => {
    return await ProductsController.update(ctx)
  })
  .use(middleware.auth())

router
  .delete('/product/:id', async (ctx: HttpContext) => {
    return await ProductsController.destroy(ctx)
  })
  .use(middleware.auth())

// SALE ROUTES
router
  .post('/sale', async (ctx: HttpContext) => {
    return await SalesController.store(ctx)
  })
  .use(middleware.auth())

router
  .get('/sales', async (ctx: HttpContext) => {
    return await SalesController.index(ctx)
  })
  .use(middleware.auth())
