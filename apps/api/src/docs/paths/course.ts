export const coursePaths = {
  '/api/courses': {
    get: {
      tags: ['Courses'],
      summary: 'Retrieve all published courses',
      description: 'Returns a list of all published courses ordered by creation date.',
      responses: {
        200: {
          description: 'A list of published courses',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Course' },
                  },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
      },
    },
  },
  '/api/courses/{slug}': {
    get: {
      tags: ['Courses'],
      summary: 'Retrieve a published course by slug',
      description: 'Returns a single published course matching the unique slug.',
      parameters: [
        {
          name: 'slug',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Unique course slug identifier',
        },
      ],
      responses: {
        200: {
          description: 'Course detail object',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Course' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        404: {
          description: 'Course not found or not published',
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
