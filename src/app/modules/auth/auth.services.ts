import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<> => {
  const { id, password } = payload;

  // checking user exists
  const isUserExist = User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  ).lean();

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist !');
  }

  // match password
  const isPasswordMatch = await bcrypt.compare(
    password,
    isUserExist?.password as string
  );

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password incorrect !');
  }



  // create access token with jwt
  


  return {};
};

export const AuthServices = {
  loginUser,
};
