import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { MailService } from './mail.service'

describe('MailService', () => {
  let service: MailService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: ConfigService,
          useFactory: () =>
            ({
              get: () =>
                'no thanks, i will not provide my credit card and phone number for bad services',
            } as any),
        },
      ],
    }).compile()

    service = module.get(MailService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
