import { Injectable } from '@nestjs/common'
import { Readable } from 'stream'
import { BrowserService } from './browser/browser.service'

@Injectable()
export class PdfService {
  constructor(private readonly browser: BrowserService) {}

  private toReadable(buf: Buffer): Readable {
    const stream = new Readable()
    stream.push(buf)
    stream.push(null)
    return stream
  }

  async fromUrl(url: string): Promise<Readable> {
    await this.browser.goto(url)
    const pdf = await this.browser.getAsPdf()
    return this.toReadable(pdf)
  }

  async fromContent(content: string): Promise<Readable> {
    await this.browser.setContent(content)
    const pdf = await this.browser.getAsPdf()
    return this.toReadable(pdf)
  }
}
