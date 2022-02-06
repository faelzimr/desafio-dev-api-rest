const { accountsController } = require('../../../controllers');
const { accountsService } = require('../../../services');

jest.mock('../../../services/accounts');

const req = { params: {}, query: {}, body: {}, session: {} };
const error = { name: 'TestError', message: 'Testing', validation: {} };

describe('Operation controller', () => {
  test('Get', async () => {
    accountsService.get.mockImplementationOnce(() => Promise.reject(error));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await accountsController.get(req, res);
    expect(res.status).toBeCalledWith(500);
  });

  test('Create', async () => {
    accountsService.create.mockImplementationOnce(() => Promise.reject(error));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await accountsController.create(req, res);
    expect(res.status).toBeCalledWith(500);
  });

  test('Update Active', async () => {
    accountsService.updateActive.mockImplementationOnce(() => Promise.reject(error));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await accountsController.updateActive(req, res);
    expect(res.status).toBeCalledWith(500);
  });

  test('Update Blocked', async () => {
    accountsService.updateBlocked.mockImplementationOnce(() => Promise.reject(error));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await accountsController.updateBlocked(req, res);
    expect(res.status).toBeCalledWith(500);
  });
});
