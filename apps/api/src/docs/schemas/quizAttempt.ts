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
  SubmitAnswerInput: {
    type: 'object',
    properties: {
      questionId: {
        type: 'string',
        format: 'uuid',
        example: '3f4a5b6c-7d8e-9f0a-1b2c-3d4e5f6a7b8c',
      },
      choiceId: {
        type: 'string',
        format: 'uuid',
        example: 'a2b3c4d5-e6f7-8a9b-0c1d-2e3f4a5b6c7d',
      },
    },
    required: ['questionId', 'choiceId'],
    additionalProperties: false,
  },
  QuestionAnswer: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: 'f8c3d9a2-5e6b-4c0d-9b1e-3f4a5b6c7d8e' },
      attemptId: {
        type: 'string',
        format: 'uuid',
        example: 'd3b07384-d113-4956-a5cc-991c1032dfa9',
      },
      questionId: {
        type: 'string',
        format: 'uuid',
        example: '3f4a5b6c-7d8e-9f0a-1b2c-3d4e5f6a7b8c',
      },
      choiceId: {
        type: 'string',
        format: 'uuid',
        example: 'a2b3c4d5-e6f7-8a9b-0c1d-2e3f4a5b6c7d',
        nullable: true,
      },
      isCorrect: { type: 'boolean', example: true, nullable: true },
      earnedPoints: { type: 'integer', example: 2, nullable: true },
      createdAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:05:00.000Z' },
      updatedAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:05:00.000Z' },
    },
    required: ['id', 'attemptId', 'questionId', 'createdAt', 'updatedAt'],
  },
  CompleteAttemptResponse: {
    type: 'object',
    properties: {
      attempt: { $ref: '#/components/schemas/QuizAttempt' },
      summary: {
        type: 'object',
        properties: {
          totalQuestions: { type: 'integer', example: 5 },
          correctAnswers: { type: 'integer', example: 4 },
          totalScore: { type: 'integer', example: 8 },
          maximumScore: { type: 'integer', example: 10 },
          percentage: { type: 'number', format: 'float', example: 80.0 },
        },
        required: ['totalQuestions', 'correctAnswers', 'totalScore', 'maximumScore', 'percentage'],
      },
    },
    required: ['attempt', 'summary'],
  },
};
