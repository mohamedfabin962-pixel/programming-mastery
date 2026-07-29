export const reviewSchemas = {
  Review: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        example: 'e4d5c6b7-a8a9-0b1c-2d3e-4f5a6b7c8d9e',
      },
      userId: { type: 'string', example: 'user_123' },
      courseId: {
        type: 'string',
        format: 'uuid',
        example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
      },
      rating: { type: 'integer', example: 5 },
      review: { type: 'string', example: 'Excellent course.', nullable: true },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-07-28T12:00:00.000Z',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-07-28T12:00:00.000Z',
      },
    },
    required: ['id', 'userId', 'courseId', 'rating', 'createdAt', 'updatedAt'],
  },
  CreateReviewInput: {
    type: 'object',
    properties: {
      courseSlug: { type: 'string', example: 'javascript-fundamentals' },
      rating: { type: 'integer', example: 5 },
      review: { type: 'string', example: 'Excellent course.', nullable: true },
    },
    required: ['courseSlug', 'rating'],
    additionalProperties: false,
  },
  UpdateReviewInput: {
    type: 'object',
    properties: {
      rating: { type: 'integer', minimum: 1, maximum: 5, example: 4 },
      review: { type: 'string', maxLength: 2000, example: 'Updated thoughts.', nullable: true },
    },
    additionalProperties: false,
    description: 'At least one of rating or review must be provided.',
  },
};
