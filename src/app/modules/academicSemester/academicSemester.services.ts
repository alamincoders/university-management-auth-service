import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { errorLogger } from '../../../shared/logger';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interfaces';
import AcademicSemester from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | undefined> => {
  try {
    if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code !');
    }

    const createAcademicSemester = await AcademicSemester.create(payload);
    return createAcademicSemester;
  } catch (error) {
    errorLogger.error('Failed to created academic semester!', error);
  }
};

export const AcademicSemesterServices = {
  createSemester,
};
