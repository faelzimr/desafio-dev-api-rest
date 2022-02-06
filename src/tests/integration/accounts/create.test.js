const request = require('supertest');
const faker = require('faker/locale/pt_BR');
const app = require('../../../config/express');

describe('Account Endpoints', () => {
  const bearer = {
    name: faker.name.findName(),
    cpf: '576.515.050-00',
  };

  const account = {
    cpf: bearer.cpf,
    agency: faker.random.number().toString(),
    number: faker.random.number().toString(),
  };

  beforeAll(async () => {
    await request(app).post('/api/v1/bearers').send(bearer);
  });

  const url = '/api/v1/accounts';

  describe('POST /accounts', () => {
    test('Should create a new account', async () => {
      const response = await request(app).post(url).send(account);

      expect(response.status).toBe(201);

      expect(response).toMatchObject({
        body: expect.any(Object),
      });
    });

    test('Should return 400 - required field', async () => {
      const response = await request(app).post(url).send({
        agency: account.agency,
        number: account.number,
      });

      expect(response.status).toBe(400);

      const { body } = response;
      expect(body.message).toEqual(expect.stringMatching('validation-fails'));

      expect(body).toMatchObject({
        validation: expect.objectContaining({
          cpf: 'cpf-is-a-required-field',
        }),
      });
    });

    test('Should return 400 - cpf invalid', async () => {
      const response = await request(app).post(url).send({
        agency: account.agency,
        number: account.number,
        cpf: '999',
      });

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
      const response = await request(app).post(url).send({
        agency: account.agency,
        number: account.number,
        cpf: '629.353.060-82',
      });

      expect(response.status).toBe(404);

      const { body } = response;
      expect(body.message).toEqual(expect.stringMatching('bearer-not-found'));
    });

    test('Should return 409 - bearer already has a registered account', async () => {
      const response = await request(app).post(url).send(account);

      expect(response.status).toBe(409);

      const { body } = response;
      expect(body.message).toEqual(expect.stringMatching('bearer-already-has-a-registered-account'));
    });

    test('Should return 409 - number and agency already registered', async () => {
      await request(app).post('/api/v1/bearers').send({ name: faker.name.findName(), cpf: '629.353.060-82' });

      const response = await request(app).post(url).send({
        agency: account.agency,
        number: account.number,
        cpf: '629.353.060-82',
      });

      expect(response.status).toBe(409);

      const { body } = response;
      expect(body.message).toEqual(expect.stringMatching('number-and-agency-already-registered'));
    });
  });
});
