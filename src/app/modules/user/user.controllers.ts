import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getUser();

    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Users Successfully',
      data: result,
    });
  }
);

const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const user = req.body;
  const result = await UserServices.createUser(user);

  next();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

export const UserControllers = {
  getUser,
  createUser,
};
