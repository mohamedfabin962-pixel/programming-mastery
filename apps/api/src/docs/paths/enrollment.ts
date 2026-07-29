export const enrollmentPaths = {
  '/api/enrollments': {
    post: {
      tags: ['Enrollments'],
      summary: 'Enroll in a course',
      description:
        'Enrolls the authenticated user in a course using the courseSlug. If already enrolled, returns the existing enrollment. Requires authentication.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EnrollInCourseInput' },
          },
        },
      },
      responses: {
        201: {
          description: 'Enrolled successfully or returned existing enrollment',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Enrollment' },
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
          description: 'Course not found or not published',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
      },
    },
    get: {
      tags: ['Enrollments'],
      summary: 'Get all course enrollments of the user',
      description:
        'Returns every enrollment for the authenticated user, sorted newest enrollments first. Includes course metadata. Requires authentication.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of enrollments returned successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Enrollment' },
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
