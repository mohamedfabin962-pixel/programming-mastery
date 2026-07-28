import { env } from '../config/env.js';
import { paths } from './paths/index.js';
import { schemas } from './schemas/index.js';

export const openApiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'Programming Mastery API',
    version: '1.0.0',
    description: 'Backend API documentation for the Programming Mastery platform.',
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}`,
      description: 'Local Development Server',
    },
  ],
  tags: [
    { name: 'Authentication', description: 'User registration, sign-in, and session management' },
    { name: 'Health', description: 'System health checks' },
    { name: 'Users', description: 'User profiles and accounts' },
    { name: 'Courses', description: 'Course management and navigation' },
    { name: 'Lessons', description: 'Lessons and learning content' },
    { name: 'Progress', description: 'Learner progress tracking' },
    { name: 'Admin', description: 'Administrative and moderator actions' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ...schemas,
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'An unexpected error occurred' },
              code: { type: 'string', example: 'INTERNAL_SERVER_ERROR' },
              status: { type: 'number', example: 500 },
            },
            required: ['message', 'code', 'status'],
          },
        },
        required: ['success', 'error'],
      },
      ValidationError: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Validation failed' },
              code: { type: 'string', example: 'VALIDATION_ERROR' },
              status: { type: 'number', example: 400 },
              details: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    field: { type: 'string', example: 'body.email' },
                    message: { type: 'string', example: 'Invalid email address' },
                    rule: { type: 'string', example: 'invalid_string' },
                  },
                  required: ['field', 'message', 'rule'],
                },
              },
            },
            required: ['message', 'code', 'status', 'details'],
          },
        },
        required: ['success', 'error'],
      },
      UnauthorizedError: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Unauthorized' },
              code: { type: 'string', example: 'UNAUTHORIZED' },
              status: { type: 'number', example: 401 },
            },
            required: ['message', 'code', 'status'],
          },
        },
        required: ['success', 'error'],
      },
      NotFoundError: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Resource not found' },
              code: { type: 'string', example: 'NOT_FOUND' },
              status: { type: 'number', example: 404 },
            },
            required: ['message', 'code', 'status'],
          },
        },
        required: ['success', 'error'],
      },
    },
  },
  paths,
};
