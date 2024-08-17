import { GraphQLObjectType, GraphQLString } from 'graphql';

const UserRegisterType = new GraphQLObjectType({
  name: 'UserRegisterPayload',
  fields: {
    error: { type: GraphQLString },
    token: { type: GraphQLString },
    id: { type: GraphQLString }, 
    success: { type: GraphQLString },
  },
});

export default UserRegisterType;