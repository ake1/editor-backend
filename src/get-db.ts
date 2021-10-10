import { MongoClient } from 'mongodb'
import config from './config'
import { SavedDoc, User, WithId } from './types'
import { DatabaseException } from './util/exceptions'

export default async function getDb() {
  if (!config.dbUrl) throw new DatabaseException('bad DB_URL')
  const client = new MongoClient(config.dbUrl)
  await client.connect()
  const db = client.db(config.dbName)
  const documents = db.collection<SavedDoc>(config.dbCollectionName)
  const users = db.collection<WithId<User>>(config.dbUserCollection)

  const done = async () => await client.close()
  const drop = async () => {
    const colls = await db.listCollections().toArray()
    const toDel = colls.some((c) => c.name === config.dbCollectionName)
    if (toDel) {
      await documents.drop()
      await users.drop()
      await done()
    }
  }

  return { db, documents, users, done, drop }
}
