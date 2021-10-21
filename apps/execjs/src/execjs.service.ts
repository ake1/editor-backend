import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from './http/http.service'

@Injectable()
export class ExecjsService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  execute(json: { code: string }): Promise<{ data: string }> {
    const url =
      this.config.get('EXECJS_ENDPOINT') ?? 'https://execjs.emilfolino.se/code'
    return this.httpService.post(url, { json }).json()
  }
}
