import { GraphQLFieldConfig, GraphQLObjectType } from 'graphql'
import { nodeField, nodesField } from '../node/typeRegister'
import { UserLoader } from '../modules/user/UserLoader'
import { UserType } from '../modules/user/UserType'
import { GraphQLContext } from '@hodler/types'

const me: GraphQLFieldConfig<Record<string, unknown>, GraphQLContext> = {
  type: UserType,
  description: 'user logged',
  resolve: async (_, __, context) =>
   await UserLoader.load(context, context.user?._id),
}

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'root of all queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    me,
  }),
})