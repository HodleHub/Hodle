import { GraphQLString, GraphQLFieldConfig } from 'graphql';
import { GraphQLContext } from '@hodler/types';

type ErrorPayload = {
  error?: string;
};

const errorField = <T extends ErrorPayload>(): { field: GraphQLFieldConfig<T, GraphQLContext> } => ({
  field: {
    type: GraphQLString,
    resolve: (payload: T) => payload.error ?? null,
  },
});

export { errorField };
