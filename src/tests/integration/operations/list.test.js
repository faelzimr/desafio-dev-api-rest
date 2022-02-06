const request = require('supertest');
const faker = require('faker/locale/pt_BR');
const app = require('../../../config/express');
const { constant } = require('../../../helpers');

describe('Account Endpoints', () => {
  const today = new Date();
  const pastDate = faker.date.recent(5);

  const bearer = {
    name: faker.name.findName(),
    cpf: '137.364.440-01',
  };

  const account = {
    cpf: bearer.cpf,
    agency: faker.random.number().toString(),
    number: faker.random.number().toString(),
  };

  let withdraw, deposit, operation;

  beforeAll(async () => {
    const types = await request(app).get('/api/v1/operation-types');

    withdraw = types.body.filter((type) => type.name === constant.operationType.withdraw);
    deposit = types.body.filter((type) => type.name === constant.operationType.deposit);
    operation = {
      cpf: bearer.cpf,
      value: 5000,
      operationTypeId: withdraw[0].id,
    };
  });

  const url = '/api/v1/operations';

  describe('POST /operations', () => {
    test('Should return 400 - cpf invalid', async () => {
      const response = await request(app).get(`${url}?cpf=999&startDate=${pastDate}&endDate=${today}`);

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
      const response = await request(app).get(
        `${url}?cpf=${bearer.cpf}&startDate=${pastDate}&endDate=${today}`,
      );

      expect(response.status).toBe(404);

      const { body } = response;
      expect(body.message).toEqual(expect.stringMatching('bearer-not-found'));
    });

    test('Should return 404 - account not found', async () => {
      await request(app).post('/api/v1/bearers').send(bearer);
      const response = await request(app).get(
        `${url}?cpf=${bearer.cpf}&startDate=${pastDate}&endDate=${today}`,
      );

      expect(response.status).toBe(404);

      const { body } = response;
      expect(body.message).toEqual(expect.stringMatching('account-not-found'));
    });

    // test('Should return 422 - inactive account', async () => {
    //   await request(app).post('/api/v1/accounts').send(account);
    //   await request(app).patch(`/api/v1/accounts/${operation.cpf}/active`);
    //   const response = await request(app).post(url).send(operation);

    //   expect(response.status).toBe(422);

    //   const { body } = response;
    //   expect(body.message).toEqual(expect.stringMatching('inactive-account'));

    //   await request(app).patch(`/api/v1/accounts/${operation.cpf}/active`);
    // });

    // test('Should return 422 - blocked account', async () => {
    //   await request(app).patch(`/api/v1/accounts/${operation.cpf}/blocked`);
    //   const response = await request(app).post(url).send(operation);

    //   expect(response.status).toBe(422);

    //   const { body } = response;
    //   expect(body.message).toEqual(expect.stringMatching('blocked-account'));

    //   await request(app).patch(`/api/v1/accounts/${operation.cpf}/blocked`);
    // });

    // test('Should return 404 - operationTypeId not found', async () => {
    //   const response = await request(app)
    //     .post(url)
    //     .send({ ...operation, operationTypeId: '93c9a37b-a580-4adc-a82d-d30a12353f0c' });

    //   expect(response.status).toBe(404);

    //   const { body } = response;
    //   expect(body.message).toEqual(expect.stringMatching('operationTypeId-not-found'));
    // });

    // test('Should return 422 - insufficient funds', async () => {
    //   const response = await request(app).post(url).send(operation);

    //   expect(response.status).toBe(422);

    //   const { body } = response;
    //   expect(body.message).toEqual(expect.stringMatching('insufficient-funds'));
    // });

    test('Should return list empty of operations', async () => {
      await request(app).post('/api/v1/accounts').send(account);
      const response = await request(app).get(
        `${url}?cpf=${bearer.cpf}&startDate=${pastDate}&endDate=${today}`,
      );

      expect(response.status).toBe(204);
    });

    test('Should create a new operation of deposit', async () => {
      await request(app)
        .post(url)
        .send({ ...operation, operationTypeId: deposit[0].id });

      const response = await request(app).get(
        `${url}?cpf=${bearer.cpf}&startDate=${pastDate}&endDate=${today}`,
      );

      expect(response.status).toBe(200);

      expect(response).toMatchObject({
        body: expect.any(Object),
      });
    });

    // test('Should create a new operation of withdraw', async () => {
    //   const response = await request(app)
    //     .post(url)
    //     .send({ ...operation, value: 2000 });

    //   expect(response.status).toBe(201);

    //   expect(response).toMatchObject({
    //     body: expect.any(Object),
    //   });
    // });

    // test('Should return 422 - daily limit', async () => {
    //   const response = await request(app)
    //   .post(url)
    //   .send({ ...operation, value: 1 });

    //   expect(response.status).toBe(422);

    //   const { body } = response;
    //   expect(body.message).toEqual(expect.stringMatching('daily-limit'));

    //   expect(body).toMatchObject({
    //     validation: expect.objectContaining({
    //       available: 0,
    //     }),
    //   });
    // });

    // test('Should return 409 - bearer already has a registered account', async () => {
    //   const response = await request(app).post(url).send(account);

    //   expect(response.status).toBe(409);

    //   const { body } = response;
    //   expect(body.message).toEqual(expect.stringMatching('bearer-already-has-a-registered-account'));
    // });

    // test('Should return 409 - number and agency already registered', async () => {
    //   await request(app).post('/api/v1/bearers').send({ name: faker.name.findName(), cpf: '629.353.060-82' });

    //   const response = await request(app).post(url).send({
    //     agency: account.agency,
    //     number: account.number,
    //     cpf: '629.353.060-82',
    //   });

    //   expect(response.status).toBe(409);

    //   const { body } = response;
    //   expect(body.message).toEqual(expect.stringMatching('number-and-agency-already-registered'));
    // });
  });
});
