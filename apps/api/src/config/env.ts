import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export interface Config {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  CORS_ORIGIN: string;
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

  return {
    PORT: port,
    NODE_ENV: nodeEnv,
    CORS_ORIGIN: corsOrigin,
  };
}

export const env = validateEnv();
