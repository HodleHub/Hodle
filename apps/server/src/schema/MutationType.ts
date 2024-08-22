import { GraphQLObjectType } from 'graphql'

import UserLogin from '../modules/user/mutations/UserLoginMutation'
import UserRegister from '../modules/user/mutations/UserRegisterMutation'
// import * as UserSignOutMutation from "../modules/user/mutations/UserSignOutMutation"


export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of mutations',
  fields: () => ({
   UserLogin,
   UserRegister,
  }),
})