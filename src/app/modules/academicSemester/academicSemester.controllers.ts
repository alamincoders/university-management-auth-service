import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../constants/pagination';

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //
    // pagination options
    // const paginationOptions: IPaginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy as string,
    //   sortOrder: req.query.sortOrder as 'asc' | 'dsc',
    // };

    // paginationOptionFields-------- ["page", "limit", "sortBy", "sortOrder"]

    const paginationOptions = pick(req.query, paginationOptionFields);

    const result = await AcademicSemesterServices.getSemesters(
      paginationOptions
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester getting Successfully!',
      data: result,
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
