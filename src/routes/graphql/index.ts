import { Router } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'
import RootQueryType from './root'
import RootMutationType from './root-mutation'

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})

export default Router()
  .post('/', graphqlHTTP({ schema, graphiql: false }))
  .get('/', graphqlHTTP({ schema, graphiql: true }))
