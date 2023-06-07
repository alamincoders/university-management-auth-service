import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.get('/', UserControllers.getUserController);
router.post('/create-user', UserControllers.createdUserController);

export const UserRoutes = router;
