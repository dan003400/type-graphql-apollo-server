import { Resolver, Query, Arg, Ctx, Mutation, ResolverInterface, Authorized } from 'type-graphql'
import { Context, AuthContext, AuthUser } from '../../types/context'
import { encode } from '../../utils/auth'

import { Session } from '../types/auth-type'
import { SessionInput } from '../inputs/auth-input'

@Resolver(of => Session)
export class AuthResolver {
  @Query(returns => String)
  async test(@Ctx() context: Context) {
    return 'Success'
  }

  @Query(returns => String)
  @Authorized()
  async hello(@Ctx() context: AuthContext) {
    const user = await context.prisma.user.findOne({ where: { id: context.authUser.userId } })
    return `Welcome: ${user ? user.email : 'Unknown'}`
  }

  @Mutation(returns => Session)
  async createSession(@Ctx() context: Context, @Arg('data') { email, password }: SessionInput): Promise<Session> {
    const users = await context.prisma.user.findMany()

    const token = await encode({ userId: users[0].id, email: users[0].email } as AuthUser)

    return {
      token,
    }
  }
}
