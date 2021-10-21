import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { CryptoService } from '../crypto/crypto.service'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const mockCryptoService = () => {
  return {
    verifyHash: noop,
  }
}

const mockUserService = () => {
  return {
    find: noop,
  }
}

const mockJwtService = () => {
  return {
    sign: noop,
  }
}

describe('AuthService', () => {
  let service: AuthService
  let userService: UserService
  let cryptoService: CryptoService
  let jwtService: JwtService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: CryptoService, useFactory: mockCryptoService },
        { provide: UserService, useFactory: mockUserService },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile()

    service = module.get(AuthService)
    userService = module.get(UserService)
    cryptoService = module.get(CryptoService)
    jwtService = module.get(JwtService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('throws UnauthorizedException if no user found', async () => {
    try {
      jest.spyOn(userService, 'find').mockImplementation(() => null)
      await service.validateUser('noone', 'nothing')
      fail()
    } catch (e) {
      expect(e.message).toEqual('Unauthorized')
    }
  })

  it('throws UnauthorizedException if password does not match', async () => {
    try {
      jest.spyOn(userService, 'find').mockImplementation(() => 1 as any)
      jest
        .spyOn(cryptoService, 'verifyHash')
        .mockImplementation(() => Promise.resolve(false))

      await service.validateUser('noone', 'nothing')

      fail()
    } catch (e) {
      expect(e.message).toEqual('Unauthorized')
    }
  })

  it('returns user', async () => {
    jest
      .spyOn(userService, 'find')
      .mockImplementation(
        () => Promise.resolve({ id: '123', username: 'someone' }) as any,
      )
    jest
      .spyOn(cryptoService, 'verifyHash')
      .mockImplementation(() => Promise.resolve(true))

    const user = await service.validateUser('someone', 'nothing')
    expect(user).toEqual({ id: '123', username: 'someone' })
  })

  it('returns token', () => {
    jest.spyOn(jwtService, 'sign').mockImplementation((a) => a as any)
    const token = service.getToken({ username: 'someone', id: '123' })
    expect(token).toEqual({ token: { username: 'someone', sub: '123' } })
  })
})
