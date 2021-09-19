import { Api } from './api'

export interface UnsavedDoc {
  title: string
  content: string
}

export interface Doc extends UnsavedDoc {
  _id?: string
}

export interface MetaDoc {
  _id: string
  title: string
}

export interface Locals {
  api: Api
}
