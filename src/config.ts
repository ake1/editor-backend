import dotenv from 'dotenv'

function config() {
  dotenv.config()
  const e = process.env

  return {
    nodeEnv: e.NODE_ENV,
    port: e.PORT ?? 1234,
    dbUrl: e.DB_URL,
    dbUser: e.DB_USER ?? 'user',
    dbPass: e.DB_PASS ?? 'pass',
    dbHost: e.DB_HOST ?? 'localhost',
    dbPort: e.DB_PORT ?? 27017,
    dbName: e.DB_NAME ?? 'editor',
    dbCollectionName: e.DB_COLL_NAME ?? 'documents',
  }
}

export default config()
