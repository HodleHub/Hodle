export type { DeepPartial } from './deepPartial'
export type { Maybe } from './Maybe'

import { ParameterizedContext } from 'koa'
import { UserDocument } from '../../../apps/server/src/modules/user/UserModel'
import { DataLoaders } from '../../../apps/server/src/loader/loaderRegister'

export type GraphQLContext = {
  ctx: ParameterizedContext
  user: UserDocument
  dataloaders: DataLoaders
}