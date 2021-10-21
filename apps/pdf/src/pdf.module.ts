import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PdfController } from './pdf.controller'
import { PdfService } from './pdf.service'
import { BrowserModule } from './browser/browser.module'

@Module({
  imports: [ConfigModule.forRoot(), BrowserModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
