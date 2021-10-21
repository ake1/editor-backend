import { BadRequestException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Response } from 'express'
import { BrowserService } from './browser/browser.service'
import { PdfController } from './pdf.controller'
import { PdfService } from './pdf.service'

const mockPdfService = () => ({
  fromUrl: jest.fn(),
  fromContent: jest.fn(),
})

describe('PdfController', () => {
  let pdfController: PdfController
  let pdfService: PdfService

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [PdfController],
      providers: [
        BrowserService,
        { provide: PdfService, useFactory: mockPdfService },
      ],
    }).compile()

    pdfController = app.get(PdfController)
    pdfService = app.get(PdfService)
  })

  describe('/', () => {
    it('should throw BadRequestException without url/content', async () => {
      const res = {} as Response
      const data = {}
      await expect(pdfController.toPdf(res, data)).rejects.toThrowError(
        BadRequestException,
      )
    })

    it('should return a PDF from content', async () => {
      const pipe = jest.fn()
      jest
        .spyOn(pdfService, 'fromContent')
        .mockImplementation((_e) => Promise.resolve({ pipe }) as any)
      const res = {} as Response
      const data = { content: '<h1>hi!</h1>' }
      await pdfController.toPdf(res, data)

      expect(pipe).toHaveBeenCalledWith(res)
    })

    it('should return a PDF from url', async () => {
      const pipe = jest.fn()
      jest
        .spyOn(pdfService, 'fromUrl')
        .mockImplementation((_e) => Promise.resolve({ pipe }) as any)
      const res = {} as Response
      const data = { url: 'some url' }
      await pdfController.toPdf(res, data)

      expect(pipe).toHaveBeenCalledWith(res)
    })
  })
})
