import { Request, Response } from 'express';
import { createUser, getUser } from './users.services';

export const getUserController = async (req: Request, res: Response) => {
  const result = await getUser();

  res.status(200).json({
    success: true,
    message: 'Get All Users Successfully',
    data: result,
  });
};

export const createdUserController = async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await createUser(user);

  res.status(200).json({
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
};
