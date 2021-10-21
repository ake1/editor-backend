import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document as MongoDocument } from 'mongoose'
import { DocumentType } from '../entities/document-type.enum'

export type DocumentDocument = Document & MongoDocument

@Schema()
export class Document {
  @Prop()
  title: string

  @Prop()
  content: string

  @Prop({
    type: String,
    enum: [DocumentType],
  })
  type: DocumentType

  @Prop()
  updated: string

  @Prop()
  hasPermission: string[]

  @Prop()
  comments: (string | null)[]
}

export const DocumentSchema = SchemaFactory.createForClass(Document)
