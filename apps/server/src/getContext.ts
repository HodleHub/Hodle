import { ParameterizedContext } from 'koa'
import { getDataLoaders } from './loader/loaderRegister'
import { UserDocument } from './modules/user/UserModel'
import { Maybe } from '@hodler/types'

interface ContextVars {
  ctx?: ParameterizedContext
  user: Maybe<UserDocument>
}

export const getContext = async ({ ctx, user}: ContextVars) => {
  const dataloaders = getDataLoaders()
 
  return {
    ctx,
    dataloaders,
    user,
  } as const
}