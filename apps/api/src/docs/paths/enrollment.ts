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
  '/api/enrollments/{courseSlug}': {
    get: {
      tags: ['Enrollments'],
      summary: "Get authenticated user's enrollment for a specific course",
      description:
        "Returns the authenticated user's enrollment for the course identified by courseSlug. Requires authentication.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'courseSlug',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Course slug identifier',
        },
      ],
      responses: {
        200: {
          description: 'Enrollment retrieved successfully',
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
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UnauthorizedError' },
            },
          },
        },
        404: {
          description: 'Course or enrollment not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Enrollments'],
      summary: 'Unenroll from a course',
      description:
        "Deletes the authenticated user's enrollment for the course identified by courseSlug. Requires authentication.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'courseSlug',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Course slug identifier',
        },
      ],
      responses: {
        200: {
          description: 'Unenrolled successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                    },
                    required: ['success'],
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
        404: {
          description: 'Course or enrollment not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
      },
    },
  },
  '/api/enrollments/{courseSlug}/last-access': {
    patch: {
      tags: ['Enrollments'],
      summary: "Update user's last accessed timestamp for a course",
      description:
        "Updates the last accessed timestamp for the authenticated user's course enrollment to the current time. Requires authentication.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'courseSlug',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Course slug identifier',
        },
      ],
      responses: {
        200: {
          description: 'Last access timestamp updated successfully',
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
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UnauthorizedError' },
            },
          },
        },
        404: {
          description: 'Course or enrollment not found',
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
