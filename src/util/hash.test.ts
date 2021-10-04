import { hash, verify } from './hash'

test('hash', async () => {
  const r1 = await hash('password')
  const v1 = await verify('password', r1)
  expect(v1).toBeTruthy()

  const r2 = await hash('123')
  const v2 = await verify('123', r2)
  expect(v2).toBeTruthy()
})
