import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import * as api from '../../api'
import { hash } from '../../util/hash'
import UserType from './user'

const inputUserType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',

  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        input: { type: inputUserType },
      },
      resolve: async (_parent, args) => {
        const { username, password } = args.input
        const existing = await api.getUserByUsername(username)
        if (existing) {
          throw Error('Username taken')
        }
        const h = await hash(password)
        const user = { username, hash: h }
        const created = await api.createUser(user)
        return api.getUserById(created.insertedId.toString())
      },
    },
  }),
})

export default RootMutationType
