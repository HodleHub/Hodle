import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { UserModel } from '../UserModel';
import { errorField, successField } from '@entria/graphql-mongo-helpers';

const UserRegisterMutation = mutationWithClientMutationId({
  name: 'UserRegister',
  description: 'Register a new user',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },

  mutateAndGetPayload: async (args: { username: string; email: string; password: string }) => {
    const hasUser = await UserModel.countDocuments({ email: args.email.trim() }) > 0;
    
    if (hasUser) {
      return { success: null, error: 'This user already exists' };
    }

    const user = await new UserModel({
      username: args.username,
      email: args.email,
      password: args.password,
    }).save();
    
    return {
      error: null,
      id: user._id.toString(),
      success: 'User registered',
    };
  },
  
  outputFields: {
    ...errorField,
    ...successField,
  },
});

export default UserRegisterMutation;
