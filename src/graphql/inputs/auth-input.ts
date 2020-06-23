import { InputType, Field } from 'type-graphql'

@InputType()
export class SessionInput {
  @Field({ description: 'The user email' })
  email!: string

  @Field({ description: 'The user password' })
  password!: string
}
