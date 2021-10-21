import { Test } from '@nestjs/testing'
import { DocumentUpdatesGateway } from './document-updates.gateway'

describe('DocumentUpdatesGateway', () => {
  let gateway: DocumentUpdatesGateway

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DocumentUpdatesGateway],
    }).compile()

    gateway = module.get(DocumentUpdatesGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})
