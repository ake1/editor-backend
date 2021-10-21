import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  username: string

  @Prop()
  hash: string
}

export const UserSchema = SchemaFactory.createForClass(User)
