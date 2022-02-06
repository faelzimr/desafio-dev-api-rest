module.exports = {
  '/operations': {
    summary: 'Operations CRUD',
    post: {
      summary: 'Creates an operation',
      description: 'Creates an operation in the application',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                cpf: {
                  type: 'string',
                },
                operationTypeId: {
                  type: 'uuid',
                },
                value: {
                  type: 'decimal',
                },
              },
              required: ['cpf', 'operationTypeId', 'value'],
            },
            example: {
              cpf: '999.999.999-99',
              operationTypeId: 'faff99d5-1a3d-4f01-bd07-8ff97efc4a2f',
              value: 1000.5,
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Successfully creates a new operation',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Operation',
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
        422: {
          description: 'Validation fails',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                name: 'ApplicationError',
                message: 'daily-limit',
                validation: {
                  available: 0,
                },
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
      tags: ['Operation'],
    },
    get: {
      description: 'Returns a list of operations',
      summary: 'Returns a list of operations',
      parameters: [
        {
          in: 'query',
          name: 'cpf',
          schema: {
            type: 'string',
          },
          required: true,
          description: 'The cpf of account',
        },

        {
          in: 'query',
          name: 'startDate',
          schema: {
            type: 'string',
          },
          required: true,
          description: 'The operation start date',
        },
        {
          in: 'query',
          name: 'endDate',
          schema: {
            type: 'string',
          },
          required: true,
          description: 'The operation end date',
        },
        {
          in: 'query',
          name: 'page',
          schema: {
            type: 'integer',
          },
          description: 'The page to be returned',
        },
        {
          in: 'query',
          name: 'perPage',
          schema: {
            type: 'integer',
          },
          description: 'The number of operation to limit per page',
        },
      ],
      responses: {
        200: {
          description: 'List of operations',
          content: {
            'application/json': {
              schema: {
                properties: {
                  account: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'uuid',
                      },
                      balance: {
                        type: 'decimal',
                      },
                      number: {
                        type: 'string',
                      },
                      agency: {
                        type: 'string',
                      },
                      active: {
                        type: 'boolean',
                      },
                      blocked: {
                        type: 'boolean',
                      },
                    },
                  },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'uuid',
                        },
                        value: {
                          type: 'decimal',
                        },
                        currentBalance: {
                          type: 'decimal',
                        },
                        operationTypeId: {
                          type: 'uuid',
                        },
                      },
                    },
                  },
                  limit: {
                    type: 'integer',
                  },
                  total: {
                    type: 'integer',
                  },
                  totalPages: {
                    type: 'integer',
                  },
                },
              },
              example: {
                account: {
                  id: 'ae9c6d74-5f83-4b23-b314-b4c33a32645c',
                  balance: '48000.59',
                  number: '999999',
                  agency: '0001',
                  active: true,
                  blocked: false,
                },
                items: [
                  {
                    id: '38e2d5d4-42fd-4479-bb1e-ff59d475c3ab',
                    value: '0.59',
                    currentBalance: '50000.59',
                    operationTypeId: '40f22db6-7d8c-4d25-893c-6a0239b8f335',
                  },
                  {
                    id: '0c16b6be-2d8e-4e96-ac63-7b451f04795c',
                    value: '50000',
                    currentBalance: '50000',
                    operationTypeId: '40f22db6-7d8c-4d25-893c-6a0239b8f335',
                  },
                ],
                limit: 10,
                total: 12,
                totalPages: 2,
              },
            },
          },
        },
        204: {
          description: 'Empty list of operation',
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
      tags: ['Operation'],
    },
  },
};
