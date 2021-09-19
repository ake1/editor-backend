import jsonConfig from '../config.json'

const json: any = jsonConfig

const config = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT ?? json.port ?? 1234,
  dbUrl: process.env.DB_URL ?? json.dbUrl,
  dbUser: process.env.DB_USER ?? json.dbUser ?? 'user',
  dbPass: process.env.DB_PASS ?? json.dbPass ?? 'pass',
  dbHost: process.env.DB_HOST ?? json.dbHost ?? 'localhost',
  dbPort: process.env.DB_PORT ?? json.dbPort ?? 27017,
  dbName: process.env.DB_NAME ?? json.dbName ?? 'editor',
  dbCollectionName:
    process.env.DB_COLL_NAME ?? json.dbCollectionName ?? 'documents',
}

export default config
