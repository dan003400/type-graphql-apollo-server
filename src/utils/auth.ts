import jwt from 'jsonwebtoken'
import { AuthUserType } from '../types/context'

export const encode = async (user: AuthUserType): Promise<string> => {
  try {
    return (await jwt.sign(user, process.env.JWT_SECRET as string)) as string
  } catch (err) {
    throw new Error('There was an error signing your request: ' + err.message)
  }
}

export const decode = async (token: string): Promise<AuthUserType> => {
  try {
    return (await jwt.verify(token, String(process.env.JWT_SECRET) as string)) as AuthUserType
  } catch (err) {
    throw new Error('Invalid Authorization Token: ' + err.message)
  }
}
