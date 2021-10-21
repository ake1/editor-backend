import { Injectable, OnModuleDestroy, Scope } from '@nestjs/common'
import * as puppeteer from 'puppeteer'
import { Browser, Page, PDFOptions } from 'puppeteer'

@Injectable({ scope: Scope.REQUEST })
export class BrowserService implements OnModuleDestroy {
  private browser: Browser
  private page: Page

  private async launch(): Promise<void> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({ headless: true })
      this.page = await this.browser.newPage()
    }
  }

  async goto(url: string): Promise<void> {
    await this.launch()
    await this.page.goto(url, { waitUntil: 'networkidle0' })
  }

  async setContent(content: string): Promise<void> {
    await this.launch()
    await this.page.setContent(content, { waitUntil: 'domcontentloaded' })
  }

  async getAsPdf(options: PDFOptions = { format: 'a4' }): Promise<Buffer> {
    return this.page.pdf(options)
  }

  async onModuleDestroy(): Promise<void> {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
      this.page = null
    }
  }
}
