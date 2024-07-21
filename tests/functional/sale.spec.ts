import { test } from '@japa/runner'
import { delay } from '../wait.js'
import './product.spec.js'

test.group('Sale', () => {
  let token: string

  test('FAILED attempt to CREATE a sale WITHOUT authentication', async ({ client }) => {
    const response = await client.post('/sale').json({
      clientId: 1,
      productId: 2,
      quantity: 100,
    })

    response.assertStatus(401)
  })

  test('FAILED attempt to GET a LIST of sales WITHOUT authentication', async ({ client }) => {
    const response = await client.get('/sales')

    response.assertStatus(401)
  })

  test('Logged in and saved token', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'user@email.com',
      password: '123456',
    })

    token = response.body().token
  })

  const sales = [
    {
      clientId: 1,
      productId: 2,
      quantity: 100,
    },
    {
      clientId: 1,
      productId: 1,
      quantity: 500,
    },
    {
      clientId: 1,
      productId: 1,
      quantity: 1000,
    },
  ]

  for (const i in sales) {
    test(`SUCCESSFUL attempt to CREATE sale ${Number.parseInt(i) + 1} WITH authentication`, async ({
      client,
    }) => {
      const response = await client.post('/sale').json(sales[i]).bearerToken(token)

      response.assertStatus(201)

      await delay(1)
    })
  }
})
