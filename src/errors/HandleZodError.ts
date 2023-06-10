import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  /* This code is mapping over the `issues` array of a `ZodError` object and creating an array of
 `IGenericErrorMessage` objects. For each `ZodIssue` in the `issues` array, it extracts the last
 element of the `path` array and sets it as the `path` property of the `IGenericErrorMessage`
 object. It also sets the `message` property of the `IGenericErrorMessage` object to the `message`
 property of the `ZodIssue`. The resulting array of `IGenericErrorMessage` objects is then returned
 and assigned to the `errors` variable. */
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
