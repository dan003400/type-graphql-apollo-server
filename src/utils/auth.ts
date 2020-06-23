import jwt from 'jsonwebtoken'
import { AuthUser } from '../types/context'
import { ProcessEnv } from '../types/env'

export const encode = async (user: AuthUser): Promise<string> => {
  try {
    return (await jwt.sign(user, process.env.JWT_SECRET as string)) as string
  } catch (err) {
    throw new Error('There was an error signing your request: ' + err.message)
  }
}

export const decode = async (token: string): Promise<AuthUser> => {
  try {
    return (await jwt.verify(token, String(process.env.JWT_SECRET) as string)) as AuthUser
  } catch (err) {
    throw new Error('Invalid Authorization Token: ' + err.message)
  }
}
