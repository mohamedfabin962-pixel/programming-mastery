export const courseSchemas = {
  Course: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d' },
      slug: { type: 'string', example: 'intro-to-typescript' },
      title: { type: 'string', example: 'Introduction to TypeScript' },
      description: { type: 'string', example: 'Learn the fundamentals of TypeScript development.' },
      thumbnail: {
        type: 'string',
        format: 'uri',
        example: 'https://example.com/ts-thumb.png',
        nullable: true,
      },
      difficulty: {
        type: 'string',
        enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
        example: 'BEGINNER',
      },
      languageCode: { type: 'string', example: 'en' },
      isPublished: { type: 'boolean', example: true },
      createdAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
      updatedAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:00:00.000Z' },
    },
    required: [
      'id',
      'slug',
      'title',
      'description',
      'difficulty',
      'languageCode',
      'isPublished',
      'createdAt',
      'updatedAt',
    ],
  },
};
