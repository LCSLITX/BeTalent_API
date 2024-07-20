import { test } from '@japa/runner'

test.group('Signup', () => {

  test('Signup fails due to invalid e-mail', async ({ client }) => {
    const response = await client.post('/signup').json({
      "username":"user",
      "email": "user",
      "password": "123456"
    })

    response.assertStatus(422);
  })

  test('Signup fails due to missing e-mail', async ({ client }) => {
    const response = await client.post('/signup').json({
      "username":"user",
      "password": "123456"
    })

    response.assertStatus(422);
  })

  test('Signup fails due to invalid password', async ({ client }) => {
    const response = await client.post('/signup').json({
      "username":"user",
      "email": "user",
      "password": "12345"
    })

    response.assertStatus(422);
  })

  test('Signup fails due to missing password', async ({ client }) => {
    const response = await client.post('/signup').json({
      "username":"user",
      "email": "user@email.com",
    })

    response.assertStatus(422);
  })


  test('User is created successfully', async ({ client }) => {
    const response = await client.post('/signup').json({
      "username":"user",
      "email": "user@email.com",
      "password": "123456"
    })

    response.assertStatus(201);
  })

  test('User is not created with the same email', async ({ client }) => {

    const response = await client.post('/signup').json({
      "username":"user",
      "email": "user@email.com",
      "password": "123456"
    })

    response.assertStatus(400);
  })
})