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
    post: {
      tags: ['Lessons'],
      summary: 'Create a new lesson for a course',
      description:
        'Creates a new lesson domain entry for a course matching the course slug. Requires authentication.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'courseSlug',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Unique course slug identifier',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateLessonInput' },
          },
        },
      },
      responses: {
        201: {
          description: 'Lesson created successfully',
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
        400: {
          description: 'Validation failed',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
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
          description: 'Course not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
        409: {
          description: 'Conflict (slug or order already exists)',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
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
  '/api/lessons/{id}': {
    patch: {
      tags: ['Lessons'],
      summary: 'Update a lesson',
      description: 'Updates properties of an existing lesson by ID. Requires authentication.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Lesson unique ID identifier',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateLessonInput' },
          },
        },
      },
      responses: {
        200: {
          description: 'Lesson updated successfully',
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
        400: {
          description: 'Validation failed',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
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
        409: {
          description: 'Conflict (order already exists in parent course)',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Lessons'],
      summary: 'Delete a lesson',
      description: 'Deletes a lesson by ID. Requires authentication.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Lesson unique ID identifier',
        },
      ],
      responses: {
        200: {
          description: 'Lesson deleted successfully',
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
