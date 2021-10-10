import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
  }),
})

export default UserType
