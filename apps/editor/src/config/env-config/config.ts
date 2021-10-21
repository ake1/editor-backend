export interface Env {
  NODE_ENV: undefined | string
  CI: boolean
  PORT: number
  DB_URI: string
  DB_NAME: string
  DB_COLL_DOCUMENTS: string
  DB_COLL_USERS: string
  PASSWORD_DELIMITER: string
  JWT_SECRET: string
  JWT_EXPIRATION_SECONDS: number
  JWT_COOKIE_NAME: string
  MAIL_DOMAIN: string
  MAIL_API_KEY: string
}

export default function config(): Env {
  const e = process.env
  const port = parseInt(e.PORT, 10)
  const jwtExpirationSeconds = parseInt(e.JWT_EXPIRATION_SECONDS, 10)

  const CI = !!e.CI ?? false
  const NODE_ENV = e.NODE_ENV
  const PORT = port > 0 ? port : 1234
  const DB_URI =
    NODE_ENV === 'test' && !CI
      ? `mongodb://user:pass@localhost:27017`
      : e.DB_URL ?? ''
  const DB_NAME = e.DB_NAME ?? 'editor2'
  const DB_COLL_DOCUMENTS = e.DB_COLL_DOCUMENTS ?? 'documents'
  const DB_COLL_USERS = e.DB_COLL_USERS ?? 'users'
  const PASSWORD_DELIMITER = e.PASSWORD_DELIMITER ?? ':'
  const JWT_SECRET =
    e.JWT_SECRET ?? NODE_ENV ? Math.random().toFixed(20) : 'secret'
  const JWT_EXPIRATION_SECONDS =
    jwtExpirationSeconds > 0 ? jwtExpirationSeconds : 60 * 60
  const JWT_COOKIE_NAME = e.JWT_COOKIE_NAME ?? 'accessToken'
  const MAIL_DOMAIN = e.MAIL_DOMAIN ?? ''
  const MAIL_API_KEY = e.MAIL_API_KEY ?? ''

  return {
    NODE_ENV,
    PORT,
    DB_URI,
    DB_NAME,
    DB_COLL_DOCUMENTS,
    DB_COLL_USERS,
    CI,
    PASSWORD_DELIMITER,
    JWT_SECRET,
    JWT_EXPIRATION_SECONDS,
    JWT_COOKIE_NAME,
    MAIL_DOMAIN,
    MAIL_API_KEY,
  }
}
