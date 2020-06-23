import dotenv from 'dotenv'
import 'reflect-metadata'
import * as path from 'path'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { authChecker } from './utils/auth-checker'
import { PrismaClient } from '@prisma/client'
import { decode } from './utils/auth'

dotenv.config()

const prisma = new PrismaClient()

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [__dirname + '/graphql/resolvers/**/*.{ts,js}'],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    authChecker,
  })

  const server = new ApolloServer({
    schema,
    playground: true,
    context: async ({ req }) => {
      const token = req.headers.authorization || ''
      const authUser = token ? await decode(token) : null

      return {
        ...req,
        prisma,
        authUser,
      }
    },
  })

  const { url } = await server.listen(4000)
  console.log(`Server is running, GraphQL Playground available at ${url}`)
}

bootstrap()
