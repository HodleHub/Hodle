import jwt from 'jsonwebtoken'
import { ParameterizedContext } from 'koa'
import { UserDocument, UserModel } from './modules/user/UserModel'
import { Maybe } from '@hodler/types'
import { config } from './config';

const getUser = async (
  ctx: ParameterizedContext,
): Promise<{ user: Maybe<UserDocument> }> => {

  const token = ctx.cookies.get('token');

  if (!token) {
    return { user: null };
  }

  const subToken = token?.replace('JWT ', '');

  const verifyTokenAndFindUser = async () => {
    const decodedId = jwt.verify(subToken || token, config.JWT_KEY) as { id: string };
    const user = await UserModel.findOne({ _id: decodedId.id });
    
    return { user };
  };

  const user = await verifyTokenAndFindUser();

  return user ;
};

const generateJwtToken = (user: UserDocument) => {
  return `JWT ${jwt.sign({ id: user._id }, config.JWT_KEY)}`
}

export { getUser, generateJwtToken }