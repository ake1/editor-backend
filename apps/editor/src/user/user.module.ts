import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CryptoModule } from '../crypto/crypto.module'
import { User, UserSchema } from './schemas/user.schema'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CryptoModule,
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
