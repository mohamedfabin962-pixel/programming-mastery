export const progressPaths = {
  '/api/lessons/{lessonId}/progress': {
    get: {
      tags: ['Progress'],
      summary: 'Retrieve authenticated user progress for a lesson',
      description: 'Returns the user progress payload. Requires authentication.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'lessonId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Unique lesson UUID identifier',
        },
      ],
      responses: {
        200: {
          description: 'Lesson progress status',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/LessonProgressResponse' },
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
        404: {
          description: 'Lesson not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
      },
    },
  },
};
