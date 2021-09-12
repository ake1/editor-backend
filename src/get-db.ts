import { Collection, Db, MongoClient } from 'mongodb'
import config from './config'

export default async function getDb(): Promise<{
  db: Db
  collection: Collection
  done: () => void
}> {
  const url = config.prod
    ? config.dbUrl
    : `mongodb://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}`
  const client = new MongoClient(url)
  await client.connect()
  const db = client.db(config.dbName)
  const collection = db.collection(config.dbCollectionName)
  const done = () => client.close()
  return { db, collection, done }
}
