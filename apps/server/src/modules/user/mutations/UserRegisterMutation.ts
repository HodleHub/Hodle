import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { UserModel } from '../UserModel';
import { errorField, successField } from '@hodler/graphql';

type SuccessPayload = {
  success: string | null;
  error?: null;
  id: string;
};

type ErrorPayload = {
  error: string | null;
  success?: null;
};

type UserRegisterResponse = SuccessPayload | ErrorPayload;

const UserRegisterMutation = mutationWithClientMutationId({
  name: 'UserRegister',
  description: 'Register a new user',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },

  mutateAndGetPayload: async (args: { username: string; email: string; password: string }): Promise<UserRegisterResponse> => {
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
