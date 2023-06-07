import express from 'express';
import { UserControllers } from './user.controllers';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', UserControllers.getUser);
router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserControllers.createdUser
);

export const UserRoutes = router;
