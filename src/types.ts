export type WithId<T> = T & { _id: string }

export interface User {
  username: string
  hash: string
}

export interface DocMeta {
  _id: string
  title: string
}

export interface UnsavedDoc {
  title: string
  content: string
}

export interface SavedDoc extends UnsavedDoc {
  _id: string
  updated: number
  hasPermission: string[]
}

export interface SomeDoc extends UnsavedDoc {
  _id?: string
  hasPermission?: string[]
}

export function isSaved(doc: SomeDoc): doc is SavedDoc {
  return !!doc._id
}
