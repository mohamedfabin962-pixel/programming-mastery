import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export interface Config {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  CORS_ORIGIN: string;
  DATABASE_URL: string;
}

function validateEnv(): Config {
  const nodeEnv = process.env['NODE_ENV'] || 'development';

  if (nodeEnv !== 'development' && nodeEnv !== 'production' && nodeEnv !== 'test') {
    throw new Error(
      `Invalid NODE_ENV value: "${nodeEnv}". Expected "development", "production", or "test".`,
    );
  }

  const rawPort = process.env['PORT'] || '4000';
  const port = parseInt(rawPort, 10);
  if (isNaN(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid PORT value: "${rawPort}". Expected a number between 1 and 65535.`);
  }

  const corsOrigin = process.env['CORS_ORIGIN'] || '*';

  const databaseUrl = process.env['DATABASE_URL'];
  if (!databaseUrl) {
    if (nodeEnv === 'production') {
      throw new Error('DATABASE_URL environment variable is required in production.');
    } else {
      console.warn(
        '⚠️  [Config] DATABASE_URL environment variable is missing. Database operations will fail.',
      );
    }
  }

  return {
    PORT: port,
    NODE_ENV: nodeEnv,
    CORS_ORIGIN: corsOrigin,
    DATABASE_URL: databaseUrl || '',
  };
}

export const env = validateEnv();
