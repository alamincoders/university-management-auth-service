/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import  jwt from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser) => {
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

 /*  const accessToken = jwt.sign({
    id: id,
    role: isUserExist?.role
  }, "j") */

  return {};
};

export const AuthServices = {
  loginUser,
};
