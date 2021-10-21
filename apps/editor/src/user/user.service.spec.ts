import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Model } from 'mongoose'
import { CryptoService } from '../crypto/crypto.service'
import { User, UserDocument } from './schemas/user.schema'
import { UserModule } from './user.module'
import { UserService } from './user.service'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const mockModel = () => {
  return {
    exists: noop,
    create: noop,
  }
}

const mockCryptoService = () => {
  return {
    hash: noop,
  }
}

describe('UserService', () => {
  let service: UserService
  let model: Model<UserDocument>
  let cryptoService: CryptoService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
      providers: [{ provide: CryptoService, useFactory: mockCryptoService }],
    })
      .overrideProvider(getModelToken(User.name))
      .useFactory({ factory: mockModel })
      .compile()

    service = module.get(UserService)
    model = module.get(getModelToken(User.name))
    cryptoService = module.get(CryptoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('creates users', async () => {
    jest.spyOn(model, 'exists').mockImplementation((_a) => false)
    jest.spyOn(model, 'create').mockImplementation((user) => user as any)
    jest
      .spyOn(cryptoService, 'hash')
      .mockImplementation((a) => Promise.resolve('hashed:' + a))

    const ret = await service.create({
      username: 'hello',
      password: 'some password',
    })

    expect(ret).toMatchObject({
      username: 'hello',
      hash: 'hashed:some password',
    })
  })

  it('does not allow same usernames', async () => {
    jest.spyOn(model, 'exists').mockImplementation((a) => ({ id: '123', a }))
    jest
      .spyOn(cryptoService, 'hash')
      .mockImplementation((a) => Promise.resolve('hashed:' + a))

    await expect(
      service.create({
        username: 'hello',
        password: 'some password',
      }),
    ).rejects.toThrowError(Error)
  })
})
