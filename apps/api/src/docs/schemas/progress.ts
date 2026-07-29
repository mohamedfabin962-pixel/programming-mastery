export const progressSchemas = {
  Progress: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d' },
      userId: { type: 'string', example: 'user-unique-id' },
      lessonId: { type: 'string', format: 'uuid', example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b' },
      completed: { type: 'boolean', example: false },
      completedAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-07-28T12:00:00.000Z',
        nullable: true,
      },
      createdAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
      updatedAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
    },
    required: ['id', 'userId', 'lessonId', 'completed', 'createdAt', 'updatedAt'],
  },
  LessonProgressResponse: {
    type: 'object',
    properties: {
      completed: { type: 'boolean', example: false },
      completedAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-07-28T12:00:00.000Z',
        nullable: true,
      },
    },
    required: ['completed', 'completedAt'],
  },
  UpdateLessonProgressInput: {
    type: 'object',
    properties: {
      completed: { type: 'boolean', example: true },
    },
    required: ['completed'],
    additionalProperties: false,
  },
};
