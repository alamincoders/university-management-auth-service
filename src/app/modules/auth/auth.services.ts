import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const user = new User();

  // checking user exists
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist !');
  }

  if (
    isUserExist.password &&
    !user.isPasswordMatch(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password incorrect !');
  }

  // create access token & refresh token with jwt

  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    {
      id: userId,
      role,
    },
    config.jwt.access_token as Secret,
    config.jwt.access_expires as string
  );
  const refreshToken = jwtHelpers.createToken(
    {
      id: userId,
      role,
    },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expires as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
