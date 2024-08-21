import { ExecutionResult, GraphQLArgs, graphql } from 'graphql'

export const graphqlExecute = async <T>(args: GraphQLArgs) => {
  const result = (await graphql(args)) as ExecutionResult<T>
  return result
}
