import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterControllers } from './academicSemester.controllers';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.academicSemesterZodSchema),
  AcademicSemesterControllers.createSemester
);

export const AcademicSemesterRoutes = router;
