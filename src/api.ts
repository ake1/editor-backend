import { ObjectId, Collection } from 'mongodb'
import getDb from './get-db'
import { DatabaseException } from './util'

async function query<R>(fn: (coll: Collection) => Promise<R>) {
  const { collection, done } = await getDb()
  try {
    return await fn(collection)
  } catch (e) {
    if (e instanceof Error) throw new DatabaseException(e)
    else throw new DatabaseException('Unknown error')
  } finally {
    done()
  }
}

interface UnsavedDoc {
  title: string
  content: string
}

interface Doc extends UnsavedDoc {
  _id?: string
}

export const listAll = () =>
  query((c) => c.find({}, { projection: { _id: 1, title: 1 } }).toArray())
export const getOne = (id: string) =>
  query(async (c) => {
    const res = await c.findOne(
      { _id: new ObjectId(id) },
      { projection: { _id: 1, title: 1, content: 1 } },
    )
    return res
  })
export const createOne = (doc: UnsavedDoc) => query((c) => c.insertOne(doc))
export const updateOne = (doc: Doc) =>
  query((c) =>
    c.updateOne(
      { _id: new ObjectId(doc._id) },
      {
        $set: {
          title: doc.title,
          content: doc.content,
        },
      },
    ),
  )
export const deleteOne = (id: string) =>
  query((c) => c.deleteOne({ _id: new ObjectId(id) }))
