import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Model } from 'mongoose'
import { DocumentModule } from './document.module'
import { DocumentService } from './document.service'
import { DocumentType } from './entities/document-type.enum'
import { Document, DocumentDocument } from './schemas/document.schema'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const mockModel = () => {
  return {
    create: noop,
  }
}

describe('DocumentService', () => {
  let service: DocumentService
  let model: Model<DocumentDocument>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DocumentModule],
    })
      .overrideProvider(getModelToken(Document.name))
      .useFactory({ factory: mockModel })
      .compile()

    service = module.get(DocumentService)
    model = module.get(getModelToken(Document.name))
  })

  it('creates document', async () => {
    jest.spyOn(model, 'create').mockImplementation((a) => ({ id: '123', a }))

    const ret = await service.create('123', {
      title: 'my title',
      content: 'my content',
      type: DocumentType.HTML,
    })

    expect(ret.id).toEqual('123')
  })

  it('creates document', async () => {
    jest.spyOn(model, 'create').mockImplementation((a) => ({ id: '123', a }))

    const ret = await service.create('123', {
      title: 'my title',
      content: 'my content',
      type: DocumentType.HTML,
    })

    expect(ret).toMatchObject({
      id: '123',
      title: 'my title',
      content: 'my content',
      type: DocumentType.HTML,
      hasPermission: ['123'],
      comments: [],
    })
  })

  it('creates document with comments', async () => {
    jest.spyOn(model, 'create').mockImplementation((a) => ({ id: '123', a }))

    const ret = await service.create('123', {
      title: 'my title',
      content: 'my content',
      comments: [null, 'hello'],
      type: DocumentType.HTML,
    })

    expect(ret).toMatchObject({
      id: '123',
      title: 'my title',
      content: 'my content',
      type: DocumentType.HTML,
      hasPermission: ['123'],
      comments: [null, 'hello'],
    })
  })
})
