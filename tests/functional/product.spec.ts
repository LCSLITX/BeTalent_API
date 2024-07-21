import { test } from '@japa/runner'

import './client.spec.js'

test.group('Product', () => {
  let token: string

  test('FAILED attempt to CREATE a product WITHOUT authentication', async ({ client }) => {
    const response = await client.post('/product').json({
      name: 'Produto A',
      brand: 'Brand A',
      model: 'BAPA',
      price: 10.00,
    })

    response.assertStatus(401)
  })

  test('FAILED attempt to GET a LIST of products WITHOUT authentication', async ({ client }) => {
    const response = await client.get('/products')

    response.assertStatus(401)
  })

  test('FAILED attempt to GET a product WITHOUT authentication', async ({ client }) => {
    const response = await client.get('/product/1')

    response.assertStatus(401)
  })

  test('FAILED attempt to UPDATE a product WITHOUT authentication', async ({ client }) => {
    const response = await client.put('/product/1').json({
      name: 'Qualquer Um Não',
      cpf: '000.000.000-10',
    })

    response.assertStatus(401)
  })

  test('FAILED attempt to DELETE a product WITHOUT authentication', async ({ client }) => {
    const response = await client.delete('/product/1')

    response.assertStatus(401)
  })

  test('Logged in and saved token', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'user@email.com',
      password: '123456',
    })

    token = response.body().token
  })

  test('SUCCESSFUL attempt to CREATE a product WITH authentication', async ({ client }) => {
    const response = await client
      .post('/product')
      .json({
        name: 'Produto B',
        brand: 'Brand A',
        model: 'BAPB',
        price: 10.00,
      })
      .bearerToken(token)

    response.assertStatus(201)
  })

  test('SUCCESSFUL attempt to CREATE a second product WITH authentication', async ({ client }) => {
    const response = await client
      .post('/product')
      .json({
        name: 'Produto A',
        brand: 'Brand A',
        model: 'BAPA',
        price: 11.00,
      })
      .bearerToken(token)

    response.assertStatus(201)
  })

  test('SUCCESSFUL attempt to CREATE a third product WITH authentication', async ({ client }) => {
    const response = await client
      .post('/product')
      .json({
        name: 'Produto C',
        brand: 'Brand A',
        model: 'BAPC',
        price: 12.00,
      })
      .bearerToken(token)

    response.assertStatus(201)
  })

  test('SUCCESSFUL attempt to GET a LIST of products WITH authentication', async ({ client }) => {
    const response = await client.get('/products').bearerToken(token)

    response.assertBodyContains([
      {
        id: 2,
        name: 'Produto A',
        brand: 'Brand A',
        model: 'BAPA',
        price: 11.00,
      },{
        id: 1,
        name: 'Produto B',
        brand: 'Brand A',
        model: 'BAPB',
        price: 10.00,
      },
      {
        id: 3,
        name: 'Produto C',
        brand: 'Brand A',
        model: 'BAPC',
        price: 12.00,
      }
    ])

    response.assertStatus(200)
  })

  test('SUCCESSFUL attempt to GET a product WITH authentication', async ({ client }) => {
    const response = await client.get('/product/1').bearerToken(token)

    response.assertBodyContains({
      id: 1,
      name: 'Produto B',
      brand: 'Brand A',
      model: 'BAPB',
      price: 10.00,
    })

    response.assertStatus(200)
  })

  test('SUCCESSFUL attempt to UPDATE a product WITH authentication', async ({ client }) => {
    const response = await client
      .put('/product/1')
      .json({
        name: 'AProduto B',
        brand: 'Brand A',
        model: 'ABAPB',
        price: 15.00,
      })
      .bearerToken(token)

    response.assertStatus(200)
  })

  test('SUCCESSFUL attempt to DELETE a product WITH authentication', async ({ client }) => {
    const response = await client.delete('/product/3').bearerToken(token)

    response.assertStatus(204)
  })

  test('SUCCESSFUL attempt to GET an updated LIST of products WITH authentication', async ({
    client,
  }) => {
    const response = await client.get('/products').bearerToken(token)

    response.assertBodyContains([
      {
        id: 2,
        name: 'Produto A',
        brand: 'Brand A',
        model: 'BAPA',
        price: 11.00,
      },{
        id: 1,
        name: 'AProduto B',
        brand: 'Brand A',
        model: 'ABAPB',
        price: 15.00,
      },
    ])

    response.assertBodyNotContains([
      {
        id: 3,
        name: 'Produto C',
        brand: 'Brand A',
        model: 'BAPC',
        price: 12.00,
      },
    ])

    response.assertStatus(200)
  })

})