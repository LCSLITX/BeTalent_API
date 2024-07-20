import { test } from '@japa/runner'

test.group('Unit test', () => {
  test('Sample', async ({ assert }) => {
    assert.equal(1, 1)
  })
})
