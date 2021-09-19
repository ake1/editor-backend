import dotenv from 'dotenv'

function config() {
  dotenv.config()
  const e = process.env

  return {
    nodeEnv: e.NODE_ENV,
    port: e.PORT ?? 1234,
    dbUrl:
      e.NODE_ENV === 'test' && !e.CI
        ? `mongodb://user:pass@localhost:27017`
        : e.DB_URL,
    dbName: e.DB_NAME ?? 'editor',
    dbCollectionName: e.DB_COLL_NAME ?? 'documents',
    ci: !!e.CI ?? false,
  }
}

export default config()
