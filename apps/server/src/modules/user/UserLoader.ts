import { createLoader } from '@entria/graphql-mongo-helpers'

import { UserModel } from './UserModel'
import { registerLoader } from '../../loader/loaderRegister'

const { Wrapper, getLoader, clearCache, load, loadAll } = createLoader({
  model: UserModel,
  loaderName: 'UserLoader',
})

export const UserLoader = {
  User: Wrapper,
  getLoader,
  clearCache,
  load,
  loadAll,
}
registerLoader('UserLoader', getLoader)