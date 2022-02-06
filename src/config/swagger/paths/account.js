module.exports = {
  '/accounts': {
    summary: 'Accounts CRUD',
    post: {
      summary: 'Creates an account',
      description: 'Creates an account in the application',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                cpf: {
                  type: 'string',
                },
                number: {
                  type: 'string',
                },
                agency: {
                  type: 'string',
                },
              },
              required: ['cpf', 'number', 'agency'],
            },
            example: {
              cpf: '999.999.999-99',
              agency: '0001',
              number: '999999',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Successfully creates a new account',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Account',
              },
              example: {
                id: 'ae9c6d74-5f83-4b23-b314-b4c33a32645c',
                balance: '0',
                number: '999999',
                agency: '0001',
                active: true,
                blocked: false,
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
        404: {
          description: 'Bearer not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                name: 'ApplicationError',
                message: 'bearer-not-found',
              },
            },
          },
        },
        409: {
          description: 'The agency and the number used is already registered',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                name: 'ApplicationError',
                message: 'number-and-agency-already-registered',
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
      tags: ['Account'],
    },
  },
  '/accounts/{cpf}': {
    summary: 'Get account',
    get: {
      description: 'Return account by cpf',
      summary: 'Return account by cpf',
      parameters: [
        {
          in: 'path',
          name: 'cpf',
          schema: {
            type: 'string',
          },
          required: true,
          description: 'cpf of the bearer',
        },
      ],
      responses: {
        200: {
          description: 'Return account by cpf',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Account',
              },
              example: {
                id: 'ae9c6d74-5f83-4b23-b314-b4c33a32645c',
                balance: '0',
                number: '999999',
                agency: '0001',
                active: true,
                blocked: false,
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
                  cpf: 'cpf-invalid',
                },
              },
            },
          },
        },
        404: {
          description: 'Account not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                name: 'ApplicationError',
                message: 'Account-not-found',
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
      tags: ['Account'],
    },
  },
  '/accounts/{cpf}/active': {
    summary: 'Change account active status',
    patch: {
      description: 'Change account active status by cpf',
      summary: 'Change account active status by cpf',
      parameters: [
        {
          in: 'path',
          name: 'cpf',
          schema: {
            type: 'string',
          },
          required: true,
          description: 'cpf of the bearer',
        },
      ],
      responses: {
        204: {
          description: 'account updated',
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
                  cpf: 'cpf-invalid',
                },
              },
            },
          },
        },
        404: {
          description: 'Account not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                name: 'ApplicationError',
                message: 'Account-not-found',
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
      tags: ['Account'],
    },
  },
  '/accounts/{cpf}/blocked': {
    summary: 'Change account blocked status',
    patch: {
      description: 'Change account blocked status by cpf',
      summary: 'Change account blocked status by cpf',
      parameters: [
        {
          in: 'path',
          name: 'cpf',
          schema: {
            type: 'string',
          },
          required: true,
          description: 'cpf of the bearer',
        },
      ],
      responses: {
        204: {
          description: 'account updated',
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
                  cpf: 'cpf-invalid',
                },
              },
            },
          },
        },
        404: {
          description: 'Account not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                name: 'ApplicationError',
                message: 'Account-not-found',
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
      tags: ['Account'],
    },
  },
};
