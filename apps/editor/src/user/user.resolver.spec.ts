import { Test } from '@nestjs/testing'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

const mockUserService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
})

describe('UserResolver', () => {
  let resolver: UserResolver
  let userService: UserService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useFactory: mockUserService },
      ],
    }).compile()

    resolver = module.get(UserResolver)
    userService = module.get(UserService)
  })

  it('creates user', async () => {
    jest
      .spyOn(userService, 'create')
      .mockImplementation((e) => Promise.resolve(e) as any)
    const ret = await resolver.createUser({
      username: 'someuser',
      password: 'hemligt',
    })

    expect(ret).toMatchObject({
      username: 'someuser',
      password: 'hemligt',
    })
  })

  it('finds all...', async () => {
    jest
      .spyOn(userService, 'findAll')
      .mockImplementation(() => Promise.resolve([1, 2, 3]) as any)

    const ret = await resolver.findAll()

    expect(ret).toMatchObject([1, 2, 3])
  })

  it('finds one', async () => {
    jest
      .spyOn(userService, 'find')
      .mockImplementation(() => Promise.resolve({ user: 1 }) as any)

    const ret = await resolver.findOne({ id: '1', username: '2' })

    expect(ret).toMatchObject({ user: 1 })
  })

  it('updates one', async () => {
    jest
      .spyOn(userService, 'update')
      .mockImplementation(() => Promise.resolve({ user: 1 }) as any)

    const ret = await resolver.updateUser({ id: '1', username: '2' })

    expect(ret).toMatchObject({ user: 1 })
  })

  it('removes user', async () => {
    jest.spyOn(userService, 'remove').mockImplementation((id) => {
      if (id === '123') return Promise.resolve(123) as any
      else throw Error()
    })

    const ret = await resolver.removeUser('123')

    expect(ret).toEqual(123)
  })
})
