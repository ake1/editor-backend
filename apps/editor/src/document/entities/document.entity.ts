import { Field, ID, ObjectType } from '@nestjs/graphql'
import { DocumentType } from './document-type.enum'

@ObjectType()
export class Document {
  @Field(() => ID, { description: 'id' })
  id: string

  @Field(() => String, { description: 'Document title' })
  title: string

  @Field(() => String, { description: 'Document content' })
  content: string

  @Field(() => DocumentType, { description: 'Type of document' })
  type: DocumentType

  @Field(() => String, { description: 'Document updated' })
  updated: string

  @Field(() => [String], {
    description: 'Id of users with read/write permission',
  })
  hasPermission: string[]

  @Field(() => [String], {
    description: 'Document comments',
    nullable: 'items',
  })
  comments: (string | null)[]
}
