module.exports = {
  '/operation-types': {
    get: {
      description: 'Returns a list of all operation types',
      summary: 'Returns a list of all operation types',
      responses: {
        200: {
          description: 'List of operation types',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OperationType',
              },
              example: [
                {
                  id: 'faff99d5-1a3d-4f01-bd07-8ff97efc4a2f',
                  name: 'Saque',
                },
                {
                  id: '40f22db6-7d8c-4d25-893c-6a0239b8f335',
                  name: 'Depósito',
                },
              ],
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
      tags: ['Operation Type'],
    },
  },
};
