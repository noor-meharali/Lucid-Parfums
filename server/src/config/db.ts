import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

mongoose.set('strictQuery', true);

export async function connectDatabase(): Promise<void> {
  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connection established');
  });

  mongoose.connection.on('error', (error: Error) => {
    logger.error(`MongoDB connection error: ${error.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB connection lost');
  });

  try {
    await mongoose.connect(env.databaseUrl, {
      // Fail fast instead of hanging: surfaces a bad URI, wrong
      // credentials, or an un-whitelisted IP within 10s instead of
      // the driver's much longer default.
      serverSelectionTimeoutMS: 10000,
    });
  } catch (error) {
    const message = (error as Error).message;
    logger.error(
      `Could not connect to MongoDB: ${message}. ` +
        'Check DATABASE_URL in your .env, your database user\'s credentials, ' +
        'and — if using Atlas — that your current IP is on the cluster\'s Network Access list.',
    );
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
