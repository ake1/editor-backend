import { Collection, ObjectId, WithId, WithoutId } from 'mongodb'
import getDb from './get-db'
import { SavedDoc, UnsavedDoc, User } from './types'
import { DatabaseException } from './util/exceptions'

async function queryDocs<R>(fn: (coll: Collection<SavedDoc>) => Promise<R>) {
  const { documents, done } = await getDb()
  try {
    return await fn(documents)
  } catch (e) {
    if (e instanceof Error) throw new DatabaseException(e)
    else throw new DatabaseException('Unknown error')
  } finally {
    await done()
  }
}

async function queryUsers<R>(fn: (coll: Collection<User>) => Promise<R>) {
  const { users, done } = await getDb()
  try {
    return await fn(users)
  } catch (e) {
    if (e instanceof Error) throw new DatabaseException(e)
    else throw new DatabaseException('Unknown error')
  } finally {
    await done()
  }
}

export const listAll = (id: string) =>
  queryDocs((c) =>
    c
      .find(
        { hasPermission: { $in: [id] } },
        { projection: { _id: 1, title: 1 } },
      )
      .toArray(),
  )

export const getOne = (id: string) =>
  queryDocs(async (c) => {
    const res = await c.findOne(
      { _id: new ObjectId(id) },
      { projection: { _id: 1, title: 1, content: 1, hasPermission: 1 } },
    )
    if (res && !res.updated) res.updated = Date.now()
    return res
  })

export const createOne = (doc: UnsavedDoc) =>
  queryDocs((c) => c.insertOne(doc as any))

export const updateOne = (doc: SavedDoc) =>
  queryDocs((c) =>
    c.updateOne(
      { _id: new ObjectId(doc._id) },
      {
        $set: {
          title: doc.title,
          content: doc.content,
          hasPermission: doc.hasPermission,
        },
      },
    ),
  )

export const deleteOne = (id: string) =>
  queryDocs((c) => c.deleteOne({ _id: new ObjectId(id) }))

export const listUsers = () =>
  queryUsers((c) =>
    c.find({}, { projection: { _id: 1, username: 1 } }).toArray(),
  )

export const getUserByUsername = (username: string) =>
  queryUsers<User>(async (c: Collection<User>) => {
    const res = await c.findOne(
      { username },
      { projection: { _id: 1, username: 1, hash: 1 } },
    )
    return res as WithId<User>
  })

export const createUser = (user: WithoutId<User>) =>
  queryUsers((c) => c.insertOne(user as User))

export const updateUser = (user: WithId<User>) =>
  queryUsers((c) =>
    c.updateOne(
      { _id: new ObjectId(user._id) },
      {
        $set: {
          name: user.username,
          hash: user.hash,
        },
      },
    ),
  )

export const deleteUser = (id: string) =>
  queryUsers((c) => c.deleteOne({ _id: new ObjectId(id) }))

export const deleteAllDocuments = () => queryDocs((c) => c.drop())

export const deleteAllUsers = () => queryUsers((c) => c.drop())
