import { errorLogger } from '../../../shared/logger';
import { IAcademicSemester } from './academicSemester.interfaces';
import AcademicSemester from './academicSemester.model';

const createSemester = async (
  params: IAcademicSemester
): Promise<IAcademicSemester | undefined> => {
  try {
    const createAcademicSemester = await AcademicSemester.create(params);
    return createAcademicSemester;
  } catch (error) {
    errorLogger.error('Failed to created academic semester!', error);
  }
};

export const AcademicSemesterServices = {
  createSemester,
};
