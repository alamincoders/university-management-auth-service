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

// not found middleware use
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
