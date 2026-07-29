export const dashboardPaths = {
  '/api/dashboard': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get dashboard summary metrics',
      description:
        'Returns summary statistics for enrolled, active, and completed courses, completed lessons, and completed quiz attempts. Requires authentication.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Dashboard summary retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/DashboardSummary' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UnauthorizedError' },
            },
          },
        },
      },
    },
  },
  '/api/dashboard/continue-learning': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get continue learning course state',
      description:
        "Returns details of the learner's most recently accessed enrollment to continue learning. Requires authentication.",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Continue learning details retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/ContinueLearningResponse' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UnauthorizedError' },
            },
          },
        },
      },
    },
  },
  '/api/dashboard/recent-quizzes': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get recent completed quiz attempts',
      description:
        'Returns the top 10 most recently completed quiz attempts for the user. Requires authentication.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Recent quiz attempts retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/RecentQuizAttemptResponse' },
                  },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UnauthorizedError' },
            },
          },
        },
      },
    },
  },
};
