import { test } from '@japa/runner'

test.group('Login', () => {

  test('Login fails due to invalid e-mail', async ({ client }) => {
    const response = await client.post('/login').json({
      "email": "user",
      "password": "123456"
    })

    response.assertStatus(422);
  })

  test('Login fails due to missing e-mail', async ({ client }) => {
    const response = await client.post('/login').json({
      "password": "123456"
    })

    response.assertStatus(422);
  })

  test('Login fails due to invalid password', async ({ client }) => {
    const response = await client.post('/login').json({
      "email": "user",
      "password": "12345"
    })

    response.assertStatus(422);
  })

  test('Login fails due to missing password', async ({ client }) => {
    const response = await client.post('/login').json({
      "email": "user@email.com",
    })

    response.assertStatus(422);
  })


  test('User logged in successfully', async ({ client }) => {
    const respSignup = await client.post('/signup').json({
      "username":"user-test-login",
      "email": "user-test-login@email.com",
      "password": "123456"
    })

    respSignup.assertStatus(201);

    const respLogin = await client.post('/login').json({
      "email": "user-test-login@email.com",
      "password": "123456"
    })

    respLogin.assertStatus(200)

    const token = respLogin.body().token

    const respMe = await client.get('/me').header('Authorization', `Bearer ${token}`)
    respMe.assertStatus(200)
  })
})