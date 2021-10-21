import { Test } from '@nestjs/testing'
import { BrowserService } from './browser.service'

describe('BrowserService', () => {
  let service: BrowserService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BrowserService],
    }).compile()

    service = await module.resolve(BrowserService)
  })

  afterEach(async () => {
    await service.onModuleDestroy()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('generates pdf from url', async () => {
    await service.goto('https://news.ycombinator.com/')
    const pdf = await service.getAsPdf()
    expect(pdf).toBeDefined()
  })

  it('generates pdf from content', async () => {
    await service.setContent('<p>hi</p>')
    const pdf = await service.getAsPdf()
    expect(pdf).toBeDefined()
  })
})
