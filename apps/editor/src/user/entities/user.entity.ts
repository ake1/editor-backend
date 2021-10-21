import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => ID, { description: 'id' })
  id: string

  @Field(() => String, { description: 'Username' })
  username: string

  @Field(() => String, { description: 'Password hash', nullable: true })
  password: string
}
