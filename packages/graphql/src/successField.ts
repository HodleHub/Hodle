import { GraphQLString, GraphQLFieldConfig } from 'graphql';
import { GraphQLContext } from '@hodler/types';

type SuccessPayload = {
  success?: string;
};

const successField = <T extends SuccessPayload>(): { field: GraphQLFieldConfig<T, GraphQLContext> } => ({
  field: {
    type: GraphQLString,
    resolve: (payload: T) => payload.success ?? null,
  },
});

export { successField };
