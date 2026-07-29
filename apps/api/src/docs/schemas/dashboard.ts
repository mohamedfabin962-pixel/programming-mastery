export const dashboardSchemas = {
  DashboardSummary: {
    type: 'object',
    properties: {
      enrolledCourses: { type: 'integer', example: 5 },
      activeCourses: { type: 'integer', example: 2 },
      completedCourses: { type: 'integer', example: 1 },
      completedLessons: { type: 'integer', example: 12 },
      completedQuizzes: { type: 'integer', example: 4 },
    },
    required: [
      'enrolledCourses',
      'activeCourses',
      'completedCourses',
      'completedLessons',
      'completedQuizzes',
    ],
  },
  ContinueLearningResponse: {
    type: 'object',
    nullable: true,
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
      latestCompletedLesson: {
        type: 'object',
        nullable: true,
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'f8c3d9a2-5e6b-4c0d-9b1e-3f4a5b6c7d8e',
          },
          title: { type: 'string', example: 'Variables and Constants' },
          completedAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:10:00.000Z' },
        },
        required: ['id', 'title', 'completedAt'],
      },
    },
    required: ['id', 'userId', 'courseId', 'enrolledAt', 'createdAt', 'updatedAt', 'course'],
  },
  RecentQuizAttemptResponse: {
    type: 'object',
    properties: {
      quiz: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'd3b07384-d113-4956-a5cc-991c1032dfa9',
          },
          title: { type: 'string', example: 'Variables Quiz' },
        },
        required: ['id', 'title'],
      },
      lesson: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'f8c3d9a2-5e6b-4c0d-9b1e-3f4a5b6c7d8e',
          },
          title: { type: 'string', example: 'Variables and Constants' },
        },
        required: ['id', 'title'],
      },
      attempt: {
        type: 'object',
        properties: {
          score: { type: 'integer', example: 4 },
          maximumScore: { type: 'integer', example: 5 },
          percentage: { type: 'number', format: 'float', example: 80.0 },
          completedAt: { type: 'string', format: 'date-time', example: '2026-07-28T12:15:00.000Z' },
        },
        required: ['score', 'maximumScore', 'percentage', 'completedAt'],
      },
    },
    required: ['quiz', 'lesson', 'attempt'],
  },
};
