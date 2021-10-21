import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class QueryUserInput {
  @Field(() => ID, { description: 'id', nullable: true })
  id: string

  @Field(() => String, { description: 'username', nullable: true })
  username: string
}
