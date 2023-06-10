import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    /* This code block is a middleware function that validates the request data against a given schema
   using the Zod library. It takes in the request object, extracts the relevant data (body, query,
   params, and cookies), and passes it to the `parseAsync` method of the schema object. If the data
   passes validation, it calls the `next` function to pass control to the next middleware function.
   If there is an error during validation, it calls the `next` function with the error object to
   pass control to the error handling middleware. */
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
