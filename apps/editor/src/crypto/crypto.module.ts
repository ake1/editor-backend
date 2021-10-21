import { Module } from '@nestjs/common'
import { EnvConfigModule } from '../config/env-config/env-config.module'
import { CryptoService } from './crypto.service'

@Module({
  imports: [EnvConfigModule],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
