import jwt from 'jsonwebtoken';
import { User } from '../modules/user/UserModel';
import { getObjectId } from '@entria/graphql-mongo-helpers';
import { ParameterizedContext } from 'koa';
import { config } from '../config';

// 7 days
// eslint-disable-next-line
const maxAge = 7 * 24 * 60 * 60 * 100;

export const setSessionTokenCookie = async (
  context: ParameterizedContext,
  COOKIE_NAME: string,
  token: string | null,
) => {
  // const domain = process.env.NODE_ENV === 'production' ? 'hodler...' : undefined;
  try {
    const options = {
      // domain: undefined,
      httpOnly: true,
      secure: context.secure,
      sameSite: true,
      path: '/',
      maxAge,
    };

    context.ctx.cookies.set(COOKIE_NAME, token, options);
  } catch (err) {
    // eslint-disable-next-line
    console.log('set cookie failed: ', err);

    // TODO: sendToSlack, sendToDiscord here
  }
};

export const generateUserToken = (model: User) =>
  jwt.sign({id: getObjectId(model)?.toString()}, config.JWT_KEY as string);
