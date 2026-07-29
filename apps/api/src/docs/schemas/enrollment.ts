export const enrollmentSchemas = {
  Enrollment: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: 'e4d5c6b7-a8a9-0b1c-2d3e-4f5a6b7c8d9e' },
      userId: { type: 'string', example: 'user_123' },
      courseId: { type: 'string', format: 'uuid', example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b' },
      lastAccessedAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-07-28T12:00:00.000Z',
        nullable: true,
      },
      enrolledAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
      createdAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
      updatedAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
      course: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
          },
          slug: { type: 'string', example: 'javascript-fundamentals' },
          title: { type: 'string', example: 'JavaScript Fundamentals' },
          thumbnail: { type: 'string', example: 'https://example.com/js.png', nullable: true },
          difficulty: { $ref: '#/components/schemas/Difficulty' },
          languageCode: { type: 'string', example: 'en' },
        },
        required: ['id', 'slug', 'title', 'difficulty', 'languageCode'],
      },
    },
    required: ['id', 'userId', 'courseId', 'enrolledAt', 'createdAt', 'updatedAt'],
  },
  EnrollInCourseInput: {
    type: 'object',
    properties: {
      courseSlug: { type: 'string', example: 'javascript-fundamentals' },
    },
    required: ['courseSlug'],
    additionalProperties: false,
  },
};
