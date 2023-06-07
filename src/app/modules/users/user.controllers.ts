import { RequestHandler } from 'express';
import { UserServices } from './user.services';

const getUserController: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.getUser();

    res.status(200).json({
      success: true,
      message: 'Get All Users Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createdUserController: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UserServices.createUser(user);

    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  getUserController,
  createdUserController,
};
