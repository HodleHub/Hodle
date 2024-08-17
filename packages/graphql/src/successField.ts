import { GraphQLString, GraphQLFieldConfig } from 'graphql';
import { GraphQLContext } from '@hodler/types';

const successField: { error: GraphQLFieldConfig<{ success: string | null }, GraphQLContext> } = {
  error: {
    type: GraphQLString,
    resolve: ({ success }) => success ?? null,
  },
};

export { successField }