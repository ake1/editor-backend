import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { PdfModule } from './pdf.module'

async function bootstrap() {
  const app = await NestFactory.create(PdfModule)
  const configService = app.get(ConfigService)
  const port = configService.get('PORT') ?? 1234
  const logger = new Logger('bootstrap')
  await app.listen(port, () => logger.log(`Listening on port ${port}`))
}

bootstrap()
