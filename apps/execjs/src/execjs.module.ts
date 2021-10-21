import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ExecjsController } from './execjs.controller'
import { ExecjsService } from './execjs.service'
import { HttpService } from './http/http.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ExecjsController],
  providers: [ExecjsService, HttpService],
})
export class ExecjsModule {}
