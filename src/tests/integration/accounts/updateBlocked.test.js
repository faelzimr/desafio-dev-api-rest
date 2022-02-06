const request = require('supertest');
const faker = require('faker/locale/pt_BR');
const app = require('../../../config/express');

describe('Account Endpoints', () => {
  const bearer = {
    name: faker.name.findName(),
    cpf: '563.570.860-96',
  };

  const account = {
    cpf: bearer.cpf,
    agency: faker.random.number().toString(),
    number: faker.random.number().toString(),
  };

  beforeAll(async () => {
    await request(app).post('/api/v1/bearers').send(bearer);
    await request(app).post('/api/v1/accounts').send(account);
  });

  const url = '/api/v1/accounts/';

  describe('PATCH /accounts/:cpf/blocked', () => {
    test('Should update account', async () => {
      const response = await request(app).patch(`${url}${bearer.cpf}/blocked`);

      expect(response.status).toBe(204);
    });

    test('Should return 400 - cpf invalid', async () => {
      const response = await request(app).patch(url + '999/blocked');

      expect(response.status).toBe(400);

      const { body } = response;
      expect(body.message).toEqual(expect.stringMatching('validation-fails'));

      expect(body).toMatchObject({
        validation: expect.objectContaining({
          cpf: 'cpf-invalid',
        }),
      });
    });

    test('Should return 404 - bearer not found', async () => {
      const response = await request(app).patch(url + '598.655.760-31/blocked');

      expect(response.status).toBe(404);

      const { body } = response;
      expect(body.message).toEqual(expect.stringMatching('bearer-not-found'));
    });

    test('Should return 404 - account not found', async () => {
      await request(app).post('/api/v1/bearers').send({ name: faker.name.findName(), cpf: '598.655.760-31' });
      const response = await request(app).patch(url + '598.655.760-31/blocked');

      expect(response.status).toBe(404);

      const { body } = response;
      expect(body.message).toEqual(expect.stringMatching('account-not-found'));
    });
  });
});
