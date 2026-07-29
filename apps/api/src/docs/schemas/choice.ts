export const choiceSchemas = {
  Choice: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d' },
      questionId: {
        type: 'string',
        format: 'uuid',
        example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
      },
      text: { type: 'string', example: 'Boolean' },
      isCorrect: { type: 'boolean', example: true },
      order: { type: 'integer', example: 1 },
      createdAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
      updatedAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
    },
    required: ['id', 'questionId', 'text', 'isCorrect', 'order', 'createdAt', 'updatedAt'],
  },
  CreateChoiceInput: {
    type: 'object',
    properties: {
      questionId: {
        type: 'string',
        format: 'uuid',
        example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
      },
      text: { type: 'string', example: 'Boolean' },
      isCorrect: { type: 'boolean', example: true },
      order: { type: 'integer', example: 1 },
    },
    required: ['questionId', 'text', 'isCorrect', 'order'],
    additionalProperties: false,
  },
  UpdateChoiceInput: {
    type: 'object',
    properties: {
      text: { type: 'string', example: 'Boolean' },
      isCorrect: { type: 'boolean', example: true },
      order: { type: 'integer', example: 1 },
    },
    additionalProperties: false,
  },
};
