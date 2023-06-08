import { RequestHandler } from 'express';
import { AcademicSemesterServices } from './academicSemester.services';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const semesterData = req.body;
    const result = await AcademicSemesterServices.createSemester(semesterData);

    res.status(200).json({
      success: true,
      message: 'Academic Semester Created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterControllers = {
  createSemester,
};
