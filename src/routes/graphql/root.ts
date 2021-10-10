import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import * as api from '../../api'
import UserType from './user'

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',

  fields: () => ({
    users: {
      type: GraphQLList(UserType),
      description: 'All user',
      args: {
        _id: {
          type: GraphQLString,
        },
        username: {
          type: GraphQLString,
        },
      },
      resolve: async (_parent, args, ctx) => {
        if (!ctx.isAuthenticated()) {
          throw Error('Not Authenticated')
        }
        const users = await api.listUsers()
        return users
          .filter((u) => (args._id ? u._id.toString() === args._id : true))
          .filter((u) => (args.username ? u.username === args.username : true))
      },
    },
  }),
})

export default RootQueryType
