import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { EnvConfigModule } from './config/env-config/env-config.module'
import { DocumentUpdatesModule } from './document-updates/document-updates.module'
import { DocumentModule } from './document/document.module'
import { MailModule } from './mail/mail.module'
import mongooseFactory from './mongoose.factory'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    EnvConfigModule,
    MongooseModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [ConfigService],
      useFactory: mongooseFactory,
    }),
    AuthModule,
    UserModule,
    DocumentModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      include: [UserModule, DocumentModule],
      debug: true,
      playground: true,
    }),
    DocumentUpdatesModule,
    MailModule,
  ],
})
export class AppModule {}
