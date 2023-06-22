import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login is successfully !',
  });
});

export const AuthController = {
  loginUser,
};
