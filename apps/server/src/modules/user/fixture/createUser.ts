import { getCounter } from '../../../../test/counters'
import { User, UserDocument, UserModel } from '../UserModel'
import { DeepPartial } from '@hodler/types'

export const createUser = async (
  args?: DeepPartial<User>,
): Promise<UserDocument> => {
  const i = getCounter('user')

  return new UserModel({
    username: `user#${i}`,
    email: `user@example.com#${i}`,
    password: `password#${i}`,
    ...args,
  }).save()
}