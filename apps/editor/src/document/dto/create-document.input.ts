import { Field, InputType } from '@nestjs/graphql'
import { DocumentType } from '../entities/document-type.enum'

@InputType()
export class CreateDocumentInput {
  @Field(() => String, { description: 'Document title' })
  title: string

  @Field(() => String, { description: 'Document content' })
  content: string

  @Field(() => DocumentType, { description: 'Type of document' })
  type: DocumentType

  @Field(() => [String], {
    description: 'Id of users with read/write permission',
    nullable: true,
  })
  hasPermission?: string[]

  @Field(() => String, { description: 'Document updated', nullable: true })
  updated?: string

  @Field(() => [String], {
    description: 'Document comments',
    nullable: 'itemsAndList',
  })
  comments?: (string | null)[]
}
