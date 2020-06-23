import { AuthChecker } from 'type-graphql'
import { AuthContextType } from '../types/context'

export const authChecker: AuthChecker<AuthContextType> = ({ root, args, context, info }, roles) => {
  return context.authUser ? true : false
}
