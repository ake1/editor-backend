import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as mailgun from 'mailgun-js'
import { Env } from '../config/env-config/config'

export interface Mail {
  to: string
  subject: string
  text: string
}

const SENDER = 'Editor <no-reply@dev.null>'

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name)

  private mg = mailgun({
    apiKey: this.config.get('MAIL_DOMAIN'),
    domain: this.config.get('MAIL_API_KEY'),
  })

  constructor(private readonly config: ConfigService<Env>) {}

  async send(mail: Mail) {
    await this.mg.messages().send({ ...mail, from: SENDER }, (error, body) => {
      if (error) this.logger.error(error)
      else this.logger.log(body)
    })
  }
}
