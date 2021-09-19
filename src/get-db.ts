import { MongoClient } from 'mongodb'
import config from './config'

function getUrl() {
  switch (config.nodeEnv) {
    case 'production':
      return config.dbUrl
    default:
      return `mongodb://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}`
  }
}

export default async function getDb() {
  const url = getUrl()
  const client = new MongoClient(url)
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
