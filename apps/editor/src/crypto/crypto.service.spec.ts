import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { CryptoService } from './crypto.service'

const mockConfigService = () => {
  return {
    get: () => ':',
  }
}

describe('CryptoService', () => {
  let service: CryptoService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CryptoService,
        { provide: ConfigService, useFactory: mockConfigService },
      ],
    }).compile()

    service = module.get(CryptoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('hashes and verifies', async () => {
    for (const pass of ['123', 'Password1', 'Hello there!']) {
      const hash = await service.hash(pass)
      const verified = await service.verifyHash(pass, hash)
      expect(verified).toBeTruthy()
    }
  })
})
