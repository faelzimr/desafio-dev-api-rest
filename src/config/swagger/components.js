module.exports = {
  components: {
    schemas: {
      Account: {
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
          bearerId: {
            type: 'uuid',
          },
          createdAt: {
            type: 'date',
          },
          updatedAt: {
            type: 'date',
          },
        },
      },
      Bearer: {
        type: 'object',
        properties: {
          id: {
            type: 'uuid',
          },
          name: {
            type: 'string',
          },
          cpf: {
            type: 'string',
          },
          createdAt: {
            type: 'date',
          },
          updatedAt: {
            type: 'date',
          },
        },
      },
      OperationType: {
        type: 'object',
        properties: {
          id: {
            type: 'uuid',
          },
          name: {
            type: 'string',
          },
          createdAt: {
            type: 'date',
          },
          updatedAt: {
            type: 'date',
          },
        },
      },
      Operation: {
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
          accountId: {
            type: 'uuid',
          },
          createdAt: {
            type: 'date',
          },
          updatedAt: {
            type: 'date',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          validation: {
            type: 'object',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
    securitySchemes: {
      BearerToken: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Bearer token to authenticate the user',
      },
    },
  },
};
