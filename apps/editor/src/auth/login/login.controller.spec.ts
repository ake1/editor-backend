import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { AuthService } from '../auth.service'
import { LoginController } from './login.controller'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const mockAuthService = () => {
  return {
    getToken: noop,
  }
}

const mockConfigService = () => {
  return {
    get: noop,
  }
}

describe('LoginController', () => {
  let controller: LoginController
  let authService: AuthService
  let configService: ConfigService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        { provide: AuthService, useFactory: mockAuthService },
        { provide: ConfigService, useFactory: mockConfigService },
      ],
    }).compile()

    controller = module.get(LoginController)
    authService = module.get(AuthService)
    configService = module.get(ConfigService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('logs in', async () => {
    jest.spyOn(authService, 'getToken').mockImplementation((_u) => ({
      token: 'min kaka',
    }))

    jest.spyOn(configService, 'get').mockImplementation((e: string) => {
      if (e === 'JWT_EXPIRATION_SECONDS') return 60
      return 'kaknamn'
    })

    const res = { cookie: jest.fn(), send: (r) => r } as any
    jest.spyOn(res, 'cookie')

    const ret = await controller.login(res, {} as any)

    expect(ret).toEqual({ status: 'ok' })

    expect(res.cookie).toHaveBeenCalledWith(
      'kaknamn',
      { token: 'min kaka' },
      {
        expires: expect.anything(),
        sameSite: 'strict',
        httpOnly: true,
      },
    )
  })

  it('logs out', () => {
    jest.spyOn(configService, 'get').mockImplementation(() => {
      return 'kaknamn'
    })

    const res = { clearCookie: jest.fn(), send: jest.fn() } as any
    jest.spyOn(res, 'clearCookie')

    controller.logout(res)

    expect(res.clearCookie).toHaveBeenCalledWith('kaknamn')
  })

  it('returns profile', () => {
    const req = { user: 'hi' } as any

    const ret = controller.getProfile(req)

    expect(ret).toEqual('hi')
  })
})
