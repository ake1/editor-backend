import crypto from 'crypto'
import { promisify } from 'util'

const delim = ':'
const scrypt = promisify(crypto.scrypt)

export async function hash(pass: string) {
  const salt = crypto.randomBytes(16).toString('hex')
  const ret = (await scrypt(pass, salt, 64)) as Buffer
  return salt + delim + ret.toString('hex')
}

export async function verify(pass: string, hash: string) {
  const [salt, key] = hash.split(delim)
  const keyBuf = Buffer.from(key, 'hex')
  const derived = (await scrypt(pass, salt, 64)) as Buffer
  return crypto.timingSafeEqual(keyBuf, derived)
}
