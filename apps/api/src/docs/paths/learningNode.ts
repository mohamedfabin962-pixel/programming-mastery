export const learningNodePaths = {
  '/api/nodes/tree': {
    get: {
      tags: ['Learning Nodes'],
      summary: 'Retrieve full connected Learning Tree graph for GTA-style map visualizer',
      description:
        'Fetches all published nodes, spatial coordinates, directed prerequisite edges, regions, and learner progression status.',
      responses: {
        '200': {
          description: 'Successfully fetched learning tree graph',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LearningNodeTreeResponse' },
            },
          },
        },
      },
    },
  },
  '/api/nodes/{slug}': {
    get: {
      tags: ['Learning Nodes'],
      summary: 'Retrieve a single learning node by slug',
      description:
        'Fetches node metadata, linked course/lesson, prerequisites, dependent child nodes, and learner progression status.',
      parameters: [
        {
          name: 'slug',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          example: 'js-variables-basics',
        },
      ],
      responses: {
        '200': {
          description: 'Successfully fetched node details',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/LearningNode' },
                },
                required: ['success', 'data'],
              },
            },
          },
        },
        '404': { $ref: '#/components/schemas/NotFoundError' },
      },
    },
  },
  '/api/nodes': {
    post: {
      tags: ['Learning Nodes', 'Admin'],
      summary: 'Create a new learning node (Admin)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                slug: { type: 'string', example: 'js-variables-basics' },
                title: { type: 'string', example: 'Variables & Constants' },
                description: { type: 'string', example: 'Learn scope and dynamic binding.' },
                region: { type: 'string', example: 'FRONTEND_CANVAS' },
                nodeType: { type: 'string', enum: ['CONCEPT', 'LESSON', 'CHALLENGE', 'PROJECT'] },
                positionX: { type: 'number', example: 100 },
                positionY: { type: 'number', example: 200 },
                icon: { type: 'string', example: 'code-brackets' },
                courseId: { type: 'string', format: 'uuid' },
                lessonId: { type: 'string', format: 'uuid' },
                isPublished: { type: 'boolean', example: true },
              },
              required: ['slug', 'title', 'description', 'region'],
            },
          },
        },
      },
      responses: {
        '201': { description: 'Learning node created successfully' },
        '400': { $ref: '#/components/schemas/ValidationError' },
        '401': { $ref: '#/components/schemas/UnauthorizedError' },
      },
    },
  },
  '/api/nodes/{id}': {
    put: {
      tags: ['Learning Nodes', 'Admin'],
      summary: 'Update an existing learning node (Admin)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                region: { type: 'string' },
                positionX: { type: 'number' },
                positionY: { type: 'number' },
              },
            },
          },
        },
      },
      responses: {
        '200': { description: 'Learning node updated successfully' },
        '404': { $ref: '#/components/schemas/NotFoundError' },
      },
    },
  },
  '/api/nodes/{id}/prerequisites': {
    post: {
      tags: ['Learning Nodes', 'Admin'],
      summary: 'Add a prerequisite dependency link (Admin)',
      description:
        'Adds a directed prerequisite edge. Prevents self-dependencies, duplicate edges, and cycle creation.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                prerequisiteId: { type: 'string', format: 'uuid' },
                isMandatory: { type: 'boolean', example: true },
              },
              required: ['prerequisiteId'],
            },
          },
        },
      },
      responses: {
        '201': { description: 'Prerequisite dependency edge added' },
        '409': { description: 'Duplicate edge or cyclic dependency detected' },
      },
    },
  },
  '/api/nodes/{id}/prerequisites/{prerequisiteId}': {
    delete: {
      tags: ['Learning Nodes', 'Admin'],
      summary: 'Remove a prerequisite dependency link (Admin)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
        {
          name: 'prerequisiteId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      ],
      responses: {
        '200': { description: 'Prerequisite dependency edge removed' },
        '404': { $ref: '#/components/schemas/NotFoundError' },
      },
    },
  },
};
