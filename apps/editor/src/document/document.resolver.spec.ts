import { UnauthorizedException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DocumentResolver } from './document.resolver'
import { DocumentService } from './document.service'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const mockDocumentService = () => {
  return {
    create: noop,
    findAll: noop,
    findOne: noop,
    update: noop,
    remove: noop,
  }
}

describe('DocumentResolver', () => {
  let resolver: DocumentResolver
  let documentService: DocumentService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DocumentResolver,
        { provide: DocumentService, useFactory: mockDocumentService },
      ],
    }).compile()

    resolver = module.get(DocumentResolver)
    documentService = module.get(DocumentService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('creates document', async () => {
    jest
      .spyOn(documentService, 'create')
      .mockImplementation((_id, doc) => doc as any)

    const ret = await resolver.createDocument({ id: '123' }, {
      my: 'doc',
    } as any)

    expect(ret).toMatchObject({ my: 'doc' })
  })

  it('lists documents user is allowed to see', async () => {
    jest.spyOn(documentService, 'findAll').mockImplementation(
      () =>
        [
          { ye: 'a', hasPermission: ['123'] },
          { ye: 'b', hasPermission: ['123'] },
          { ye: 'c', hasPermission: ['321'] },
        ] as any,
    )

    const ret = await resolver.findAll({ id: '123' })

    expect(ret).toMatchObject([
      { ye: 'a', hasPermission: ['123'] },
      { ye: 'b', hasPermission: ['123'] },
    ])
  })

  it('get doc user is allowed to see', async () => {
    jest
      .spyOn(documentService, 'findOne')
      .mockImplementation(() => ({ ye: 'a', hasPermission: ['123'] } as any))

    const ret = await resolver.findOne({ id: '123' }, 'whatever')

    expect(ret).toMatchObject({ ye: 'a', hasPermission: ['123'] })
  })

  it('does not get doc user is not allowed to see', async () => {
    jest
      .spyOn(documentService, 'findOne')
      .mockImplementation(() => ({ ye: 'a', hasPermission: ['321'] } as any))

    await expect(
      resolver.findOne({ id: '123' }, 'whatever'),
    ).rejects.toThrowError(UnauthorizedException)
  })

  it('allows user to update document and disallows removing self from hasPermission', async () => {
    jest
      .spyOn(documentService, 'findOne')
      .mockImplementation(() => ({ title: 'a', hasPermission: ['123'] } as any))
    jest
      .spyOn(documentService, 'update')
      .mockImplementation((_id, doc) => doc as any)

    const ret = await resolver.updateDocument({ id: '123' }, {
      title: 'b',
    } as any)

    expect(ret).toMatchObject({ title: 'b', hasPermission: ['123'] })
  })

  it('does not allow user to update document without permission', async () => {
    jest
      .spyOn(documentService, 'findOne')
      .mockImplementation(() => ({ title: 'a', hasPermission: ['321'] } as any))
    jest
      .spyOn(documentService, 'update')
      .mockImplementation((_id, doc) => doc as any)

    await expect(
      resolver.updateDocument({ id: '123' }, {
        title: 'b',
      } as any),
    ).rejects.toThrowError(UnauthorizedException)
  })

  it('allows user to delete document', async () => {
    jest
      .spyOn(documentService, 'findOne')
      .mockImplementation(() => ({ title: 'a', hasPermission: ['123'] } as any))
    jest
      .spyOn(documentService, 'remove')
      .mockImplementation((_id) => Promise.resolve())

    const ret = await resolver.removeDocument({ id: '123' }, '111')
    expect(ret).toMatchObject({
      title: 'a',
      hasPermission: ['123'],
    })
  })

  it('does not allow user to delete document without permission', async () => {
    jest
      .spyOn(documentService, 'findOne')
      .mockImplementation(() => ({ title: 'a', hasPermission: ['321'] } as any))
    jest
      .spyOn(documentService, 'remove')
      .mockImplementation((_id) => Promise.resolve())

    await expect(
      resolver.removeDocument({ id: '123' }, '321'),
    ).rejects.toThrowError(UnauthorizedException)
  })
})
