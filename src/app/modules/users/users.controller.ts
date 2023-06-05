import { NextFunction, Request, Response } from 'express';
import { createUser, getUser } from './users.services';

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getUser();

    res.status(200).json({
      success: true,
      message: 'Get All Users Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createdUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;
    const result = await createUser(user);

    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
