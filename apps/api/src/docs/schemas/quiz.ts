export const quizSchemas = {
  QuizMetadataResponse: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d' },
      title: { type: 'string', example: 'TypeScript Basics Quiz' },
      description: {
        type: 'string',
        example: 'Test your basic understanding of types and compilation.',
        nullable: true,
      },
      questionCount: { type: 'integer', example: 5 },
    },
    required: ['id', 'title', 'questionCount'],
  },
};
