import { GraphQLObjectType } from 'graphql'

import * as UserLogin from '../modules/user/mutations/UserLoginMutation'
import * as UserRegister from '../modules/user/mutations/UserRegisterMutation'
// import * as UserSignOutMutation from "../modules/user/mutations/UserSignOutMutation"


export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of mutations',
  fields: () => ({
    ...UserLogin,
    ...UserRegister,
  }),
})