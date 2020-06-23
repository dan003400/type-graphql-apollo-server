import { Resolver, Query, Arg, Ctx, Mutation, ResolverInterface, Authorized } from 'type-graphql'
import { ContextType, AuthContextType, AuthUserType } from '../../types/context'
import { encode } from '../../utils/auth'

import { SessionType } from '../types/auth-type'
import { SessionInput } from '../inputs/auth-input'

@Resolver(of => SessionType)
export class AuthResolver {
  @Query(returns => String)
  async test(@Ctx() context: ContextType) {
    return 'Success'
  }

  @Query(returns => String)
  @Authorized()
  async hello(@Ctx() context: AuthContextType) {
    const user = await context.prisma.user.findOne({ where: { id: context.authUser.userId } })
    return `Welcome: ${user ? user.email : 'Unknown'}`
  }

  @Mutation(returns => SessionType)
  async createSession(
    @Ctx() context: ContextType,
    @Arg('data') { email, password }: SessionInput
  ): Promise<SessionType> {
    const users = await context.prisma.user.findMany()

    const token = await encode({ userId: users[0].id, email: users[0].email } as AuthUserType)

    return {
      token,
    }
  }
}
