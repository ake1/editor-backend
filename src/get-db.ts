import { MongoClient } from 'mongodb'
import config from './config'
import { DatabaseException } from './util'

export default async function getDb() {
  if (!config.dbUrl) throw new DatabaseException('bad DB_URL')
  const client = new MongoClient(config.dbUrl)
  await client.connect()
  const db = client.db(config.dbName)
  const collection = db.collection(config.dbCollectionName)

  const done = async () => await client.close()
  const drop = async () => {
    const colls = await db.listCollections().toArray()
    const toDel = colls.some((c) => c.name === config.dbCollectionName)
    if (toDel) {
      await collection.drop()
      await done()
    }
  }
  return { db, collection, done, drop }
}
