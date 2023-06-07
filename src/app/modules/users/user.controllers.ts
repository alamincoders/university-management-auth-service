import { RequestHandler } from 'express';
import { UserServices } from './user.services';
import { z } from 'zod';

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
    // req - validation with zod package

    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required!',
        }),
        password: z.string().optional(),
      }),
    });

    await createUserZodSchema.parseAsync(req);

    const user = req.body;
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
