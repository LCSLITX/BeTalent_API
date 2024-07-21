import { test } from '@japa/runner'

import './users/login.spec.js'

test.group('Clients', () => {
  let token: string

  test('FAILED attempt to CREATE a client WITHOUT authentication', async ({ client }) => {
    const response = await client.post('/client').json({
      name: 'Qualquer Um',
      cpf: '000.000.000-01',
      street: 'Rua tal',
      number: 1,
      city: 'Ababwa',
      province: 'prov',
      country: 'bra',
      zipCode: '00000-001',
      phoneNumber: '0000-0001',
    })

    response.assertStatus(401)
  })

  test('FAILED attempt to GET a LIST of clients WITHOUT authentication', async ({ client }) => {
    const response = await client.get('/clients')

    response.assertStatus(401)
  })

  test('FAILED attempt to UPDATE a client WITHOUT authentication', async ({ client }) => {
    const response = await client.put('/client/1').json({
      name: 'Qualquer Um Não',
      cpf: '000.000.000-10',
    })

    response.assertStatus(401)
  })

  test('FAILED attempt to GET a client WITHOUT authentication', async ({ client }) => {
    const response = await client.get('/client/1')

    response.assertStatus(401)
  })

  test('FAILED attempt to DELETE a client WITHOUT authentication', async ({ client }) => {
    const response = await client.delete('/client/1')

    response.assertStatus(401)
  })

  test('Logged in and saved token', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'user@email.com',
      password: '123456',
    })

    token = response.body().token
  })

  test('SUCCESSFUL attempt to CREATE a client WITH authentication', async ({ client }) => {
    const response = await client
      .post('/client')
      .json({
        name: 'Qualquer Um',
        cpf: '000.000.000-01',
        street: 'Rua tal',
        number: 1,
        city: 'Ababwa',
        province: 'prov',
        country: 'bra',
        zipCode: '00000-001',
        phoneNumber: '0000-0001',
      })
      .bearerToken(token)

    response.assertStatus(201)
  })

  test('SUCCESSFUL attempt to CREATE a second client WITH authentication', async ({ client }) => {
    const response = await client
      .post('/client')
      .json({
        name: 'Qualquer Dois',
        cpf: '000.000.000-02',
        street: 'Rua tal',
        number: 2,
        city: 'Ababwa',
        province: 'prov',
        country: 'bra',
        zipCode: '00000-002',
        phoneNumber: '0000-0002',
      })
      .bearerToken(token)

    response.assertStatus(201)
  })

  test('SUCCESSFUL attempt to GET a LIST of clients WITH authentication', async ({ client }) => {
    const response = await client.get('/clients').bearerToken(token)

    response.assertBodyContains([
      {
        id: 2,
        name: 'Qualquer Dois',
        cpf: '000.000.000-02',
      },
      {
        id: 1,
        name: 'Qualquer Um',
        cpf: '000.000.000-01',
      },
    ])

    response.assertStatus(200)
  })

  test('SUCCESSFUL attempt to GET a client WITH authentication', async ({ client }) => {
    const response = await client.get('/client/1').bearerToken(token)

    response.assertBodyContains({
      id: 1,
      name: 'Qualquer Um',
      cpf: '000.000.000-01',
      sales: [],
    })

    response.assertStatus(200)
  })

  test('SUCCESSFUL attempt to UPDATE a client WITH authentication', async ({ client }) => {
    const response = await client
      .put('/client/1')
      .json({
        name: 'Qualquer Um Não',
        cpf: '000.000.000-10',
      })
      .bearerToken(token)

    response.assertStatus(200)
  })

  test('SUCCESSFUL attempt to DELETE a client WITH authentication', async ({ client }) => {
    const response = await client.delete('/client/2').bearerToken(token)

    response.assertStatus(204)
  })

  test('SUCCESSFUL attempt to GET an updated LIST of clients WITH authentication', async ({
    client,
  }) => {
    const response = await client.get('/clients').bearerToken(token)

    response.assertBodyContains([
      {
        id: 1,
        name: 'Qualquer Um Não',
        cpf: '000.000.000-10',
      },
    ])

    response.assertBodyNotContains([
      {
        id: 2,
        name: 'Qualquer Dois',
        cpf: '000.000.000-02',
      },
    ])

    response.assertStatus(200)
  })
})
