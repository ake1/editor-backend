import {
  BadRequestException,
  Body,
  Controller,
  Header,
  Post,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { PdfService } from './pdf.service'

@Controller()
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  @Header('Content-type', 'application/pdf')
  async toPdf(
    @Res() res: Response,
    @Body() body: { content?: string; url?: string },
  ) {
    if (!body.url && !body.content) throw new BadRequestException()

    const pdf = body.url
      ? await this.pdfService.fromUrl(body.url)
      : await this.pdfService.fromContent(body.content)

    pdf.pipe(res)
  }
}
