export const lessonPaths = {
  '/api/courses/{courseSlug}/lessons': {
    get: {
      tags: ['Lessons'],
      summary: 'Retrieve all published lessons for a course',
      description:
        'Returns a list of all published lessons belonging to the specified course ordered by order ascending.',
      parameters: [
        {
          name: 'courseSlug',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Unique course slug identifier',
        },
      ],
      responses: {
        200: {
          description: 'A list of published lessons',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Lesson' },
                  },
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
  '/api/courses/{courseSlug}/lessons/{lessonSlug}': {
    get: {
      tags: ['Lessons'],
      summary: 'Retrieve a published lesson by slug',
      description: 'Returns a single published lesson matching the course and lesson slugs.',
      parameters: [
        {
          name: 'courseSlug',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Unique course slug identifier',
        },
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
          description: 'Lesson detail object',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Lesson' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        404: {
          description: 'Course or lesson not found or not published',
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
