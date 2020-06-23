import { PrismaClient } from '@prisma/client'

export interface AuthUserType {
  userId: int
  email: string
}

export interface ContextType {
  prisma: PrismaClient
}

export interface AuthContextType {
  prisma: PrismaClient
  authUser: AuthUser
}
