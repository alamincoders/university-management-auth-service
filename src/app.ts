import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.routes';

// create app
const app: Application = express();

// use middleware
app.use(cors());
app.use(globalErrorHandler);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes

app.use('/api/v1/user', UserRoutes);

// default route
app.get('/', (req: Request, res: Response) => {
  res.send(`Welcome to university management auth service backend`);
});

export default app;
