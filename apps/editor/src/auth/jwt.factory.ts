import { ConfigService } from '@nestjs/config'
import { Env } from '../config/env-config/config'

export function jwtFactory(configService: ConfigService<Env>) {
  const sec = configService.get('JWT_EXPIRATION_SECONDS')
  return {
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: sec + 's' },
  }
}
