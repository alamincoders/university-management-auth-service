import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

import routes from './app/routes';
import httpStatus from 'http-status';

// create app
const app: Application = express();

// use middleware
app.use(cors());
app.use(globalErrorHandler);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes

/* app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/academic-semester', AcademicSemesterRoutes); */
app.use('/api/v1', routes);

/* This code block is a middleware function that handles requests for routes that are not defined in
the application. It sets the HTTP status code to 404 (Not Found) and returns a JSON response with an
error message indicating that the requested API is not found. The `next()` function is called to
pass control to the next middleware function in the stack. */
app.use((req: Request, res: Response, next: NextFunction) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: `Not Found!`,
    errorMessages: [
      {
        path: `${fullUrl}`,
        message: 'API Not Found!',
      },
    ],
  });
  next();
});

// default route
app.get('/', (req: Request, res: Response) => {
  res.send(`Welcome to university management auth service backend`);
});

export default app;
