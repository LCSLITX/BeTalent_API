import { test } from '@japa/runner'

import { delay } from '../wait.js'

const username = '123testuser'
const email = '123testuser@email.com'
const password = '123456'

let token: string;

const clients = [
  {
    name: 'Qualquer Um',
    cpf: '000.000.000-01',
    street: 'Rua tal',
    number: 1,
    city: 'Ababwa',
    province: 'prov',
    country: 'bra',
    zipCode: '00000-001',
    phoneNumber: '0000-0001',
  },
  {
    name: 'Qualquer Dois',
    cpf: '000.000.000-02',
    street: 'Rua tal',
    number: 2,
    city: 'Ababwa',
    province: 'prov',
    country: 'bra',
    zipCode: '00000-002',
    phoneNumber: '0000-0002',
  },
  {
    name: 'Qualquer Três',
    cpf: '000.000.000-03',
    street: 'Rua tal',
    number: 3,
    city: 'Ababwa',
    province: 'prov',
    country: 'bra',
    zipCode: '00000-003',
    phoneNumber: '0000-0003',
  },
]

const sales = [
  { 
    clientId: 1,
    productId: 3,
    quantity: 100,
  },
  { 
    clientId: 1,
    productId: 3,
    quantity: 100,
  },
  { 
    clientId: 2,
    productId: 4,
    quantity: 100,
  },
]

const products = [
  { 
    name: 'Produto C',
    brand: 'Brand A',
    model: 'BAPC',
    price: 15.00,
  },
  { 
    name: 'Produto B',
    brand: 'Brand A',
    model: 'BAPB',
    price: 30.00,
  },
  { 
    name: 'Produto A',
    brand: 'Brand A',
    model: 'BAPA',
    price: 45.00,
  },
]

test.group('cadastro de usuário do sistema (signup);', () => {
  test('Cadastro de usuário funciona corretamente', async ({ client }) => {
    const response = await client.post('/signup').json({
      username,
      email,
      password,
    })

    response.assertStatus(201)
  })

})

test.group('login com JWT de usuário cadastrado (login);', () => {
  test('Login de usuário utilizando autenticação JWT funciona corretamente', async ({ client }) => {
    const respLogin = await client.post('/login').json({
      email,
      password,
    })

    respLogin.assertStatus(200)

    token = respLogin.body().token

    const respMe = await client.get('/me').header('Authorization', `Bearer ${token}`)

    respMe.assertStatus(200)
  })
})

test.group('clientes:', () => {

  // Using test() instead of group.setup() because the latter doesn't have access to ApiClient context
  test(`Setup`, async ({ client }) => {
    for (const i in clients) {
      const response = await client.post('/client').json(clients[i]).bearerToken(token)
      console.log(`[setup] Criando cliente ${parseInt(i)+1}`)
      response.assertStatus(201)
      await delay(1)
    }
  })

  test('listar todos os clientes cadastrados (index)', async ({ assert, client}) => {
    const response = await client.get('/clients').bearerToken(token)

    response.assertStatus(200)

    assert.isArray(response.body())
    assert.lengthOf(response.body(), 3)
  })

    test('apenas dados principais devem vir aqui;', async ({ assert, client }) => {
      const response = await client.get('/clients').bearerToken(token)

      const client1 = response.body()[0]
      const client2 = response.body()[1]
      const client3 = response.body()[2]
  
      response.assertStatus(200)

      assert.properties(client1, ['id', 'name', 'cpf'])
      assert.properties(client2, ['id', 'name', 'cpf'])
      assert.properties(client3, ['id', 'name', 'cpf'])
  
      assert.notAnyProperties(client1, ['street', 'number', 'city', 'province', 'country', 'zipCode', 'phoneNumber', 'createdAt', 'updatedAt'])
      assert.notAnyProperties(client2, ['street', 'number', 'city', 'province', 'country', 'zipCode', 'phoneNumber', 'createdAt', 'updatedAt'])
      assert.notAnyProperties(client3, ['street', 'number', 'city', 'province', 'country', 'zipCode', 'phoneNumber', 'createdAt', 'updatedAt'])
    })

    test('ordenar pelo id;', async ({ assert, client }) => {
      const response = await client.get('/clients').bearerToken(token)

      const body = response.body()
  
      response.assertStatus(200)

      // ordered by id desc;
      const descOrder = [3,2,1]

      for (let i = 0; i < body.length; i++) {
        assert.properties(body[i], ['id'])
        assert.equal(body[i].id, descOrder[i])
      }
    })

  test('detalhar um(a) cliente e vendas a ele(a) (show):', async ({ assert, client }) => {
    const id = 3;

    const productResponse = await client.post(`/product`).json(products[0]).bearerToken(token)
    productResponse.assertStatus(201)

    for (const s of sales) {
      const saleResponse = await client.post(`/sale`).json({ ...s, clientId: id, productId: 1 }).bearerToken(token)
      saleResponse.assertStatus(201)
      await delay(1)
    }

    const response = await client.get(`/client/${id}`).bearerToken(token)

    response.assertStatus(200)

    assert.lengthOf(response.body().sales, 3)
  })
  
    test('trazer as vendas mais recentes primeiro;', async ({ assert, client }) => {
      const id = 3;
 
      const response = await client.get(`/client/${id}`).bearerToken(token)
  
      response.assertStatus(200)
  
      assert.lengthOf(response.body().sales, 3)

      // ordered by most recent sales first
      // highest ID means most recent because its autoincremented
      // so if ID are in decreasing order, it's correct
      const descOrder = [3,2,1]

      for (let i = 0; i < response.body().sales.length; i++) {
        assert.properties(response.body().sales[i], ['id'])
        assert.equal(response.body().sales[i].id, descOrder[i])
      }
    })
    
    test('possibilidade de filtrar as vendas por mês + ano;', async ({ assert, client }) => {
      const id = 3;
 
      const response = await client.get(`/client/${id}`).qs({ filterByMonth: 1, filterByYear: 2023 }).bearerToken(token)
  
      response.assertStatus(200)
      assert.lengthOf(response.body().sales, 0)

      const d = Date.now()
      const m = new Date(d).getMonth() + 1
      const y = new Date(d).getFullYear()

      const response2 = await client.get(`/client/${id}`).qs({ filterByMonth: m, filterByYear: y }).bearerToken(token)

      assert.lengthOf(response2.body().sales, 3)

      // deleting remaining product
      await client.delete(`/product/${1}`).bearerToken(token)
    })
    

  test('adicionar um(a) cliente (store);', async ({ assert, client }) => {
    // Client already added on setup, just confirming it's there.
    const id = 1;
    
    const get = await client.get(`/client/${id}`).bearerToken(token)
    
    const client1 = get.body()

    assert.equal(client1.id, id)
    assert.equal(client1.name, clients[0].name)
    assert.equal(client1.cpf, clients[0].cpf)
  })
  
  test('editar um(a) cliente (update);', async ({ assert, client }) => {

    const id = 3;
    
    const editedClient = {
      name: 'Qualquer Três Editado',
      cpf: '000.000.000-03',
    }

    const get = await client.put(`/client/${id}`).json(editedClient).bearerToken(token)
    
    const client1 = get.body()

    assert.equal(client1.id, id)
    assert.equal(client1.name, editedClient.name)
    assert.equal(client1.cpf, editedClient.cpf)

  })

  test('excluir um(a) cliente e vendas a ele(a) (delete);', async ({ assert, client }) => {
    const id = 3;

    // check if client and sales are there
    const getClient = await client.get(`/client/${id}`).bearerToken(token)
    getClient.assertStatus(200)
    assert.lengthOf(getClient.body().sales, 3)

    const getSales = await client.get(`/sales`).bearerToken(token)
    assert.lengthOf(getSales.body(), 3)
    assert.equal(getSales.body()[0].clientId, id)
    assert.equal(getSales.body()[1].clientId, id)
    assert.equal(getSales.body()[2].clientId, id)

    // delete client
    const response = await client.delete(`/client/${id}`).bearerToken(token)
    response.assertStatus(204)

    // check if client and sales are gone
    const getClient2 = await client.get(`/client/${id}`).bearerToken(token)
    getClient2.assertStatus(404)

    const getSales2 = await client.get(`/sales`).bearerToken(token)
    assert.lengthOf(getSales2.body(), 0)
  })
  
})

test.group('produtos:', () => {

  test('listar todos os produtos cadastrados (index):', async ({ assert, client }) => {

    const response = await client.get('/products').bearerToken(token)

    response.assertStatus(200)
    assert.isArray(response.body())
    assert.lengthOf(response.body(), 0)

    for (const i in products) {
      // Using test() instead of group.setup() because the latter doesn't have access to ApiClient context
      console.log(`[setup] Criando produto ${parseInt(i)+1}`)
      const response = await client.post('/product').json(products[i]).bearerToken(token)
      response.assertStatus(201)
      await delay(1)
    }

    const response2 = await client.get('/products').bearerToken(token)

    response2.assertStatus(200)
    assert.isArray(response2.body())
    assert.lengthOf(response2.body(), 3)
  })

    test('apenas dados principais devem vir aqui;', async ({ assert, client }) => {
      const response = await client.get('/products').bearerToken(token)

      response.assertStatus(200)

      const product1 = response.body()[0]
  
      response.assertStatus(200)

      assert.properties(product1, ['id', 'name', 'brand', 'model', 'price'])

      assert.notAnyProperties(product1, ['createdAt', 'updatedAt'])
    })

    test('ordenar alfabeticamente.', async ({ assert, client }) => {
      const response = await client.get('/products').bearerToken(token)

      response.assertStatus(200)

      // ordered alphabetically
      // the products were created in alphabetical descending order
      // E.g. C (id 1), B (id 2), A (id 3).
      // so if ID are in decreasing order, it's correct
      const descOrder = [4,3,2,1]

      for (let i = 0; i < response.body().length; i++) {
        assert.properties(response.body()[i], ['id'])
        assert.equal(response.body()[i].id, descOrder[i])
      }
    })


  test('detalhar um produto (show);', async ({ assert, client }) => {
    const id = 2;

    const response = await client.get(`/product/${id}`).bearerToken(token)

    response.assertStatus(200)

    assert.equal(response.body().id, id)
    assert.equal(response.body().name, products[0].name)
    assert.equal(response.body().brand, products[0].brand)
    assert.equal(response.body().model, products[0].model)
    assert.equal(response.body().price, products[0].price)
  })

  test('criar um produto (store);', async ({ assert, client }) => {
    // Product already added on setup, just confirming it's there.
    const id = 2;
    
    const get = await client.get(`/product/${id}`).bearerToken(token)
    
    const product1 = get.body()

    assert.equal(product1.id, id)
    assert.equal(product1.name, products[0].name)
    assert.equal(product1.brand, products[0].brand)
    assert.equal(product1.model, products[0].model)
    assert.equal(product1.price, products[0].price)
  })

  test('editar um produto (update);', async ({ assert, client }) => {
    const id = 2;

    const get = await client.put(`/product/${id}`).json({
      name: 'Produto C Editado',
      brand: 'Brand A',
      model: 'BAPC',
    }).bearerToken(token)
    
    const product1 = get.body()
    assert.equal(product1.id, id)
    assert.equal(product1.name, 'Produto C Editado')
    assert.equal(product1.brand, products[0].brand)
    assert.equal(product1.model, products[0].model)
    assert.equal(product1.price, products[0].price)
  })

  test('exclusão lógica ("soft delete") de um produto (delete);', async ({ assert, client }) => {
    const id = 2;

    // check if product is there
    const get = await client.get(`/product/${id}`).bearerToken(token)
    get.assertStatus(200)

    // delete product
    const response = await client.delete(`/product/${id}`).bearerToken(token)
    response.assertStatus(204)

    // check if product is gone
    const get2 = await client.get(`/product/${id}`).bearerToken(token)
    get2.assertStatus(404)
  })


})

test.group('vendas:', () => {

  test('registrar venda de 1 produto a 1 cliente (store).', async ({ assert, client }) => {
    for (const s in sales) {
      // Using test() instead of group.setup() because the latter doesn't have access to ApiClient context  
      console.log(`[setup] Criando venda ${parseInt(s)+1}`)
      const saleResponse = await client.post(`/sale`).json(sales[s]).bearerToken(token)
      saleResponse.assertStatus(201)
      await delay(1)
    }

    const response = await client.get('/sales').bearerToken(token)
    assert.lengthOf(response.body(), 3)
  })
})