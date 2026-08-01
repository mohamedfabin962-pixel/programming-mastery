export const certificatePaths = {
  '/api/certificates': {
    get: {
      tags: ['Certificates'],
      summary: 'Get all certificates for the authenticated user',
      description:
        'Returns a list of all course completion certificates issued to the authenticated user, ordered by issuedAt DESC, createdAt DESC. Requires authentication.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Certificates retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/LearnerCertificate',
                    },
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
  '/api/certificates/{courseSlug}': {
    get: {
      tags: ['Certificates'],
      summary: 'Get certificate for a specific course',
      description:
        'Returns the certificate for the given course, or null if the user is enrolled but has not completed the course / generated a certificate yet. Requires authentication.',
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
          description: 'Certificate retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    anyOf: [{ $ref: '#/components/schemas/Certificate' }, { type: 'null' }],
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
          description: 'Course not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
      },
    },
  },
  '/api/certificates/{courseSlug}/generate': {
    post: {
      tags: ['Certificates'],
      summary: 'Generate certificate for a specific course',
      description:
        'Generates a course completion certificate if the user has completed all published lessons. Requires authentication.',
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
        201: {
          description: 'Certificate generated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Certificate' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        400: {
          description: 'Validation failed or lessons incomplete',
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
      },
    },
  },
};
