import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { UserModel } from '../UserModel'
import { userTypeField } from '../UserFields'
import { generateUserToken, setSessionTokenCookie } from '../../../session/setSessionToken'
import { errorField, successField } from '@entria/graphql-mongo-helpers'

type UserLoginArgs = {
  email: string
  password: string
}

const mutation = mutationWithClientMutationId({
  name: 'UserLoginMutation',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: UserLoginArgs, context)=> {
    const { email, password } = {
      password: args.password.trim(),
      email: args.email.trim().toLowerCase(),
    }

    const user = await UserModel.findOne({ email })

    if (!user) {
      return {
        success: null,
        error: 'User not found!',
      }
    }

    const passwordIsCorrect = user.authenticate(password)

    if (!passwordIsCorrect) {
      return {
        success: null,
        error: 'Password is incorrect!',
      }
    }

    const token = generateUserToken(user);

    await setSessionTokenCookie(context.ctx, 'token', `JWT ${token}`);

    return {
      id: user._id,
      token,
      success: 'Login In successfully',
    }
  },
  outputFields: {
    ...errorField,
    ...successField,
    ...userTypeField('me')
  },
})

export default { 
  ...mutation
}
