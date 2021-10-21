import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EnvConfigModule } from '../config/env-config/env-config.module'
import { CryptoModule } from '../crypto/crypto.module'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { jwtFactory } from './jwt.factory'
import { LoginController } from './login/login.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    EnvConfigModule,
    CryptoModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      inject: [ConfigService],
      useFactory: jwtFactory,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [LoginController],
})
export class AuthModule {}
