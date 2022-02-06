const { operationsController } = require('../../../controllers');
const { operationsService } = require('../../../services');

jest.mock('../../../services/operations');

const req = { params: {}, query: {}, body: {}, session: {} };
const error = { name: 'TestError', message: 'Testing', validation: {} };

describe('Operation controller', () => {
  test('List', async () => {
    operationsService.list.mockImplementationOnce(() => Promise.reject(error));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await operationsController.list(req, res);
    expect(res.status).toBeCalledWith(500);
  });

  test('Create', async () => {
    operationsService.create.mockImplementationOnce(() => Promise.reject(error));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await operationsController.create(req, res);
    expect(res.status).toBeCalledWith(500);
  });
});
