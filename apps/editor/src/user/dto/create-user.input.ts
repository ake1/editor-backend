import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'username' })
  username: string

  @Field(() => String, { description: 'password' })
  password: string
}
