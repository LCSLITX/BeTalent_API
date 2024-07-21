import { test } from '@japa/runner'

import './sale.spec.js'

test.group('Client-Sale', () => {
  let token: string

  test('Logged in and saved token', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'user@email.com',
      password: '123456',
    })

    token = response.body().token
  })

  test('SUCCESSFUL attempt to GET a client and its sales ordered by most recent first WITH authentication', async ({ client }) => {
    const response = await client.get('/client/1').bearerToken(token)

    response.assertBodyContains({
      id: 1,
      name: 'Qualquer Um Não',
      cpf: '000.000.000-10',
      sales: [
        {
          id: 3,
        },
        {
          id: 2,
        },
        {
          id: 1,
        },
      ],
    })

    response.assertStatus(200)
  })

})