import { Injectable } from '@nestjs/common'
import got from 'got'

@Injectable()
export class HttpService {
  get = got.get
  post = got.post
  put = got.put
  delete = got.delete
  head = got.head
  patch = got.patch
}
