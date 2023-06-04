import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { errorLogger, logger } from './shared/logger';

const dbConnect = async () => {
  try {
    await mongoose.connect(config.mongo_uri as string);
    logger.info('Mongodb Connected!');

    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect database', err);
  }
};

dbConnect();
