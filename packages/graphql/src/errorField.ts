import { GraphQLString, GraphQLFieldConfig } from 'graphql';
import { GraphQLContext } from '@hodler/types';

const errorField: { error: GraphQLFieldConfig<{ error: string | null }, GraphQLContext> } = {
  error: {
    type: GraphQLString,
    resolve: ({ error }) => error ?? null,
  },
};

export { errorField }