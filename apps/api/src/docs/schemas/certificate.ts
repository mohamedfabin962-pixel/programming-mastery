export const certificateSchemas = {
  Certificate: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      },
      userId: { type: 'string', example: 'user_123' },
      courseId: {
        type: 'string',
        format: 'uuid',
        example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
      },
      certificateNumber: { type: 'string', example: 'CERT-ABCD1234' },
      issuedAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-07-28T12:00:00.000Z',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-07-28T12:00:00.000Z',
      },
    },
    required: ['id', 'userId', 'courseId', 'certificateNumber', 'issuedAt', 'createdAt'],
  },
  LearnerCertificate: {
    type: 'object',
    properties: {
      certificateNumber: { type: 'string', example: 'CERT-ABCD1234' },
      issuedAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-07-28T12:00:00.000Z',
      },
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
        },
        required: ['id', 'slug', 'title'],
      },
    },
    required: ['certificateNumber', 'issuedAt', 'course'],
  },
};
