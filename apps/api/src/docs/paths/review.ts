export const reviewPaths = {
  '/api/reviews': {
    post: {
      tags: ['Reviews'],
      summary: 'Submit a review for a course',
      description:
        'Submits a course rating and optional textual review. The user must be enrolled in the course and have completed at least one lesson. Requires authentication.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateReviewInput' },
          },
        },
      },
      responses: {
        201: {
          description: 'Review created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Review' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        400: {
          description: 'Validation failed or review constraints violated',
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
  '/api/reviews/{courseSlug}': {
    get: {
      tags: ['Reviews'],
      summary: 'Get all reviews for a specific course',
      description:
        'Returns all reviews submitted for a course, sorted newest reviews first. Requires authentication.',
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
          description: 'Reviews retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        rating: { type: 'integer', example: 5 },
                        review: {
                          type: 'string',
                          example: 'Excellent course.',
                          nullable: true,
                        },
                        createdAt: {
                          type: 'string',
                          format: 'date-time',
                          example: '2026-07-28T12:00:00.000Z',
                        },
                        user: {
                          type: 'object',
                          properties: {
                            id: { type: 'string', example: 'user_123' },
                            name: { type: 'string', example: 'John Doe' },
                          },
                          required: ['id', 'name'],
                        },
                      },
                      required: ['rating', 'createdAt', 'user'],
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
  '/api/reviews/{reviewId}': {
    patch: {
      tags: ['Reviews'],
      summary: 'Update own review',
      description:
        "Updates the authenticated user's review for a course. At least one of rating or review must be provided. Requires authentication.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'reviewId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'UUID of the review to update',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateReviewInput' },
          },
        },
      },
      responses: {
        200: {
          description: 'Review updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Review' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        400: {
          description: 'Validation failed or empty payload',
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
        403: {
          description: 'Forbidden — not the review owner',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ForbiddenError' },
            },
          },
        },
        404: {
          description: 'Review not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Reviews'],
      summary: 'Delete own review',
      description:
        "Deletes the authenticated user's review for a course. Course rating aggregates are recalculated automatically. Requires authentication.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'reviewId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'UUID of the review to delete',
        },
      ],
      responses: {
        200: {
          description: 'Review deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                },
                required: ['success'],
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
        403: {
          description: 'Forbidden — not the review owner',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ForbiddenError' },
            },
          },
        },
        404: {
          description: 'Review not found',
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
