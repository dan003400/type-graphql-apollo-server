import { PrismaClient } from '@prisma/client'

export interface AuthUser {
  userId: int
  email: string
}

export interface Context {
  prisma: PrismaClient
}

export interface AuthContext {
  prisma: PrismaClient
  authUser: AuthUser
}
