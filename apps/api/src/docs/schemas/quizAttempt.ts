export const quizAttemptSchemas = {
  AttemptStatus: {
    type: 'string',
    enum: ['IN_PROGRESS', 'COMPLETED', 'ABANDONED'],
    example: 'IN_PROGRESS',
  },
  QuizAttempt: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: 'd3b07384-d113-4956-a5cc-991c1032dfa9' },
      userId: { type: 'string', example: 'user_123' },
      quizId: { type: 'string', format: 'uuid', example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b' },
      status: { $ref: '#/components/schemas/AttemptStatus' },
      startedAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
      completedAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-07-28T12:30:00.000Z',
        nullable: true,
      },
      createdAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
      updatedAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:30:00.000Z' },
      quiz: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
          },
          title: { type: 'string', example: 'TypeScript Basics Quiz' },
          lesson: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                example: 'a2b3c4d5-e6f7-8a9b-0c1d-2e3f4a5b6c7d',
              },
              title: { type: 'string', example: 'Introduction to Types' },
            },
            required: ['id', 'title'],
          },
        },
        required: ['id', 'title', 'lesson'],
      },
    },
    required: ['id', 'userId', 'quizId', 'status', 'startedAt', 'createdAt', 'updatedAt', 'quiz'],
  },
  StartQuizAttemptInput: {
    type: 'object',
    properties: {
      quizId: {
        type: 'string',
        format: 'uuid',
        example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
      },
    },
    required: ['quizId'],
    additionalProperties: false,
  },
};
