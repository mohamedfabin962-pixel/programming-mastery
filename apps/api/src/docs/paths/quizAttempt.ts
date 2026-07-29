export const quizAttemptPaths = {
  '/api/quiz-attempts': {
    post: {
      tags: ['Quiz Attempts'],
      summary: 'Start a new quiz attempt',
      description:
        'Starts a new quiz attempt (IN_PROGRESS) or returns the current active IN_PROGRESS attempt. Requires authentication.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/StartQuizAttemptInput' },
          },
        },
      },
      responses: {
        201: {
          description: 'Quiz attempt started or returned successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/QuizAttempt' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        400: {
          description: 'Validation failed',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UnauthorizedError' },
            },
          },
        },
        404: {
          description: 'Quiz not found or not published',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
      },
    },
    get: {
      tags: ['Quiz Attempts'],
      summary: 'Get all quiz attempts of the user',
      description:
        'Returns all attempts for the authenticated user, sorted newest first. Requires authentication.',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of quiz attempts returned successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/QuizAttempt' },
                  },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UnauthorizedError' },
            },
          },
        },
      },
    },
  },
  '/api/quiz-attempts/{id}': {
    get: {
      tags: ['Quiz Attempts'],
      summary: 'Get a specific quiz attempt by ID',
      description:
        'Returns a specific attempt for the authenticated user. Requires authentication.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Quiz attempt UUID identifier',
        },
      ],
      responses: {
        200: {
          description: 'Quiz attempt details returned successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/QuizAttempt' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UnauthorizedError' },
            },
          },
        },
        404: {
          description: 'Quiz attempt not found or does not belong to the user',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
      },
    },
  },
  '/api/quiz-attempts/{attemptId}/answers': {
    post: {
      tags: ['Quiz Attempts'],
      summary: 'Submit an answer to a question in a quiz attempt',
      description:
        'Submits or updates an answer choice for a specific question inside an in-progress quiz attempt. Requires authentication.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'attemptId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Quiz attempt UUID identifier',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/SubmitAnswerInput' },
          },
        },
      },
      responses: {
        200: {
          description: 'Answer submitted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/QuestionAnswer' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        400: {
          description: 'Validation failed or attempt is not in progress',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UnauthorizedError' },
            },
          },
        },
        404: {
          description: 'Quiz attempt, question, or choice not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
      },
    },
  },
  '/api/quiz-attempts/{attemptId}/complete': {
    post: {
      tags: ['Quiz Attempts'],
      summary: 'Complete a quiz attempt',
      description:
        'Marks an active in-progress quiz attempt as completed, scoring all answers. Requires authentication.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'attemptId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Quiz attempt UUID identifier',
        },
      ],
      responses: {
        200: {
          description: 'Quiz attempt completed successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/CompleteAttemptResponse' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        400: {
          description: 'Validation failed, attempt not in progress, or questions unanswered',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UnauthorizedError' },
            },
          },
        },
        404: {
          description: 'Quiz attempt not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotFoundError' },
            },
          },
        },
      },
    },
  },
};
