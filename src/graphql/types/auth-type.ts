import { ObjectType, Field } from 'type-graphql'

@ObjectType({ description: 'Object representing auth session' })
export class SessionType {
  @Field({ description: 'Token to be used in Authorization header' })
  token!: string
}
