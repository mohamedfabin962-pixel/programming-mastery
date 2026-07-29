export const quizPaths = {
  '/api/lessons/{lessonSlug}/quizzes': {
    get: {
      tags: ['Quizzes'],
      summary: 'Retrieve all published quizzes for a lesson',
      description:
        'Returns a list of published quizzes belonging to the specified published lesson.',
      parameters: [
        {
          name: 'lessonSlug',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Unique lesson slug identifier',
        },
      ],
      responses: {
        200: {
          description: 'A list of published quiz metadata items',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/QuizMetadataResponse' },
                  },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        404: {
          description: 'Lesson not found or not published',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
      },
    },
  },
  '/api/quizzes/{id}': {
    get: {
      tags: ['Quizzes'],
      summary: 'Retrieve single published quiz metadata by ID',
      description: 'Returns metadata for a single published quiz.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Unique quiz UUID identifier',
        },
      ],
      responses: {
        200: {
          description: 'Quiz metadata object',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/QuizMetadataResponse' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        404: {
          description: 'Quiz not found, not published, or belongs to unpublished lesson',
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
