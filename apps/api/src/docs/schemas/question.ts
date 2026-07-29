export const questionSchemas = {
  Question: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d' },
      quizId: { type: 'string', format: 'uuid', example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b' },
      question: {
        type: 'string',
        example: 'What is the type of a boolean variable in TypeScript?',
      },
      explanation: {
        type: 'string',
        example: 'Boolean represents a logical value (true or false).',
        nullable: true,
      },
      order: { type: 'integer', example: 1 },
      points: { type: 'integer', example: 1 },
      createdAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
      updatedAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
    },
    required: ['id', 'quizId', 'question', 'order', 'points', 'createdAt', 'updatedAt'],
  },
  CreateQuestionInput: {
    type: 'object',
    properties: {
      quizId: { type: 'string', format: 'uuid', example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b' },
      question: {
        type: 'string',
        example: 'What is the type of a boolean variable in TypeScript?',
      },
      explanation: {
        type: 'string',
        example: 'Boolean represents a logical value (true or false).',
        nullable: true,
      },
      order: { type: 'integer', example: 1 },
      points: { type: 'integer', example: 1 },
    },
    required: ['quizId', 'question', 'order', 'points'],
    additionalProperties: false,
  },
  UpdateQuestionInput: {
    type: 'object',
    properties: {
      question: {
        type: 'string',
        example: 'What is the type of a boolean variable in TypeScript?',
      },
      explanation: {
        type: 'string',
        example: 'Boolean represents a logical value (true or false).',
        nullable: true,
      },
      order: { type: 'integer', example: 1 },
      points: { type: 'integer', example: 1 },
    },
    additionalProperties: false,
  },
};
