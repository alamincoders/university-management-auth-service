import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interfaces';

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationOptionFields);

    const result = await AcademicSemesterServices.getSemesters(
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester getting Successfully!',
      meta: result.meta,
      data: result.data,
    });

    next();
  }
);

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const semesterData = req.body;
    const result = await AcademicSemesterServices.createSemester(semesterData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Created Successfully!',
      data: result,
    });
    next();
  }
);

export const AcademicSemesterControllers = {
  createSemester,
  getAllSemesters,
};
