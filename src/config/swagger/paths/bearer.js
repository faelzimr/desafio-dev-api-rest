module.exports = {
  '/bearers': {
    summary: 'Bearers CRUD',
    post: {
      summary: 'Creates a bearer',
      description: 'Creates a bearer in the application',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                cpf: {
                  type: 'string',
                },
              },
              required: ['name', 'cpf'],
            },
            example: {
              name: 'John Doe',
              cpf: '999.999.999-99',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Successfully creates a new bearer',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Bearer',
              },
              example: {
                id: '874d29d0-d8bd-4e68-bc00-d3bc561cd56b',
                name: 'John Doe',
                cpf: '999.999.999-99',
              },
            },
          },
        },
        400: {
          description: 'Validation fails',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                name: 'ApplicationError',
                message: 'validation-fails',
                validation: {
                  cpf: 'cpf-is-a-required-field',
                },
              },
            },
          },
        },
        409: {
          description: 'The cpf used is already registered',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                name: 'ApplicationError',
                message: 'cpf-already-registered',
              },
            },
          },
        },
        500: {
          description: 'Returns 500 if server error occurs',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                name: 'ApplicationError',
                message: 'connection-error',
              },
            },
          },
        },
      },
      tags: ['Bearer'],
    },
  },
};
