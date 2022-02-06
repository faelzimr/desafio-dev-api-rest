const { operationTypesController } = require('../../../controllers');
const { operationTypesService } = require('../../../services');

jest.mock('../../../services/operationTypes');

const req = { params: {}, query: {}, body: {}, session: {} };
const error = { name: 'TestError', message: 'Testing', validation: {} };

describe('Operation types controller', () => {
  test('List', async () => {
    operationTypesService.list.mockImplementationOnce(() => Promise.reject(error));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await operationTypesController.list(req, res);
    expect(res.status).toBeCalledWith(500);
  });
});
