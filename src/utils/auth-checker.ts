import { AuthChecker } from 'type-graphql'
import { AuthContext } from '../types/context'

export const authChecker: AuthChecker<AuthContext> = ({ root, args, context, info }, roles) => {
  return context.authUser ? true : false
}
