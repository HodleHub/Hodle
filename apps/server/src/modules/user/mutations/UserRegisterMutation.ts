import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { UserModel } from '../UserModel';
import { Types } from 'mongoose';
import { GraphQLContext } from '../../../graphql/context';
import { userTypeField } from '../UserFields';
import { successField, errorField } from '@hodler/graphql';

type UserRegisterArgs = {
  username: string;
  email: string;
  password: string;
}

type UserRegisterPayload = {
  error?: string;
  token?: string;
  id?: Types.ObjectId;
  success: string | null;
};


const mutation = mutationWithClientMutationId({
  name: 'UserRegister',
  description: 'Register a new user',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },

  mutateAndGetPayload: async (args: UserRegisterArgs, context: GraphQLContext): Promise<UserRegisterPayload> => {
    const hasUser = await UserModel.countDocuments({ email: args.email.trim() }) > 0;

    if (hasUser) {
      return {
        success: null,
        error: 'This user already exists',
      };
    }

    const user = await new UserModel({
      username: args.username,
      email: args.email,
      password: args.password,
    }).save();


    return {
      id: user._id,
      success: 'User registered',
    };
  },
  outputFields: {
    ...errorField,
    ...successField,
    ...userTypeField('me')
  },
});

export default {
  ...mutation,
};
