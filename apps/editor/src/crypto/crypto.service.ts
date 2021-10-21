import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomBytes, scrypt as scryptCb, timingSafeEqual } from 'crypto'
import { promisify } from 'util'
import { Env } from '../config/env-config/config'

const scrypt = promisify(scryptCb)

@Injectable()
export class CryptoService {
  private delimiter = this.configService.get('PASSWORD_DELIMITER')

  constructor(private readonly configService: ConfigService<Env>) {}

  async hash(pass: string) {
    const salt = randomBytes(16).toString('hex')
    const ret = (await scrypt(pass, salt, 64)) as Buffer
    return salt + this.delimiter + ret.toString('hex')
  }

  async verifyHash(pass: string, hash: string): Promise<boolean> {
    const [salt, key] = hash.split(this.delimiter)
    const keyBuf = Buffer.from(key, 'hex')
    const derived = (await scrypt(pass, salt, 64)) as Buffer
    return timingSafeEqual(keyBuf, derived)
  }
}
