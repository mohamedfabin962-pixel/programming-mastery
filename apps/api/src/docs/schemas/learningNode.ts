export const learningNodeSchemas = {
  LearningNode: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      },
      slug: { type: 'string', example: 'js-variables-basics' },
      title: { type: 'string', example: 'Variables & Constants' },
      description: {
        type: 'string',
        example: 'Learn scope, let vs const, and dynamic memory binding.',
      },
      region: { type: 'string', example: 'FRONTEND_CANVAS' },
      nodeType: {
        type: 'string',
        enum: ['CONCEPT', 'LESSON', 'CHALLENGE', 'PROJECT'],
        example: 'CONCEPT',
      },
      positionX: { type: 'number', example: 120.5 },
      positionY: { type: 'number', example: 340.0 },
      icon: { type: 'string', nullable: true, example: 'code-brackets' },
      courseId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        example: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
      },
      lessonId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        example: '8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c',
      },
      isPublished: { type: 'boolean', example: true },
      status: {
        type: 'string',
        enum: ['LOCKED', 'UNLOCKED', 'IN_PROGRESS', 'COMPLETED', 'MASTERED'],
        example: 'UNLOCKED',
      },
      createdAt: { type: 'string', format: 'date-time', example: '2026-08-12T12:00:00.000Z' },
      updatedAt: { type: 'string', format: 'date-time', example: '2026-08-12T12:00:00.000Z' },
    },
    required: [
      'id',
      'slug',
      'title',
      'description',
      'region',
      'nodeType',
      'positionX',
      'positionY',
      'isPublished',
      'status',
      'createdAt',
      'updatedAt',
    ],
  },
  NodeDependency: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e' },
      nodeId: { type: 'string', format: 'uuid', example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d' },
      prerequisiteId: {
        type: 'string',
        format: 'uuid',
        example: 'f1e2d3c4-b5a6-7890-1234-56789abcdef0',
      },
      isMandatory: { type: 'boolean', example: true },
    },
    required: ['id', 'nodeId', 'prerequisiteId', 'isMandatory'],
  },
  LearningNodeTreeResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      data: {
        type: 'object',
        properties: {
          nodes: {
            type: 'array',
            items: { $ref: '#/components/schemas/LearningNode' },
          },
          edges: {
            type: 'array',
            items: { $ref: '#/components/schemas/NodeDependency' },
          },
          regions: {
            type: 'array',
            items: { type: 'string' },
            example: ['FRONTEND_CANVAS', 'BACKEND_SYSTEMS', 'DATABASE_VAULT'],
          },
        },
        required: ['nodes', 'edges', 'regions'],
      },
    },
    required: ['success', 'data'],
  },
};
