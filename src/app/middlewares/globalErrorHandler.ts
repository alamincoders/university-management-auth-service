import { NextFunction, Request, Response } from 'express';
import { IGenericErrorMessage } from '../../interfaces/error';
import config from '../../config';
import handleValidationError from '../../errors/ValidationError';

const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number | string = 500;
  let message = 'something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  res.status(statusCode as number).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
