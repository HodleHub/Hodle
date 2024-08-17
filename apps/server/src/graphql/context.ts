import { ParameterizedContext } from 'koa'
import { UserDocument } from '../modules/user/UserModel'
import { DataLoaders } from '../loader/loaderRegister'

export interface GraphQLContext {
  ctx: ParameterizedContext
  user: UserDocument
  dataloaders: DataLoaders
}