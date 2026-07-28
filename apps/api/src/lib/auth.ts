import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma.js';
import { env } from '../config/env.js';

const getTrustedOrigins = () => {
  const originStr = env.CORS_ORIGIN;
  // If CORS_ORIGIN is empty, undefined, or '*', default to local development origins
  if (!originStr || originStr === '*') {
    return ['http://localhost:3000', 'http://localhost:4000'];
  }
  return originStr.split(',');
};

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: getTrustedOrigins(),
});
