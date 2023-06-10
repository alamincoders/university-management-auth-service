import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { errorLogger } from '../../../shared/logger';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interfaces';
import AcademicSemester from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';

const getSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

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
  getSemesters,
};
