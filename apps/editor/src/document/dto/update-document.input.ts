import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateDocumentInput } from './create-document.input'

@InputType()
export class UpdateDocumentInput extends PartialType(CreateDocumentInput) {
  @Field(() => String)
  id: string

  /*
   * needs to be here as PartialType apparently doesn't preserve nullability
   * for items
   */
  @Field(() => [String], {
    description: 'Document comments',
    nullable: 'itemsAndList',
  })
  comments?: (string | null)[]
}
