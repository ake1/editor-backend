import { Body, Controller, Post } from '@nestjs/common'
import { ExecjsService } from './execjs.service'

@Controller()
export class ExecjsController {
  constructor(private readonly execjsService: ExecjsService) {}

  @Post()
  execute(@Body() body: { code: string }): Promise<{ data: string }> {
    return this.execjsService.execute(body)
  }
}
