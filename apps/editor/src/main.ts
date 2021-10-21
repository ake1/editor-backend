import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookies from 'cookie-parser'
import { AppModule } from './app.module'
import { Env } from './config/env-config/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookies())
  const configService = app.get<ConfigService<Env>>(ConfigService)
  const port = configService.get('PORT')
  const logger = new Logger('bootstrap')
  await app.listen(port, () => logger.log(`Listening on port ${port}`))
}

bootstrap()
