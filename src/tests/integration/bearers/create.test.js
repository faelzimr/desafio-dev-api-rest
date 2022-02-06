const request = require('supertest');
const faker = require('faker/locale/pt_BR');
const app = require('../../../config/express');

describe('Bearer Endpoints', () => {
  const bearer = {
    name: faker.name.findName(),
    cpf: '023.027.270-37',
  };

  const url = '/api/v1/bearers';

  describe('POST /bearers', () => {
    test('Should create a new bearer', async () => {
      const response = await request(app).post(url).send(bearer);

      expect(response.status).toBe(201);

      expect(response).toMatchObject({
        body: expect.any(Object),
      });
    });

    test('Should return 400 - required field', async () => {
      const response = await request(app).post(url).send({
        name: bearer.name,
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
        name: bearer.name,
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


    test('Should return 409 - CPF already registered', async () => {
      const response = await request(app).post(url).send(bearer);

      expect(response.status).toBe(409);

      const { body } = response;
      expect(body.message).toEqual(expect.stringMatching('cpf-already-registered'));
    });

    test('Should return 500 - More 255 characters', async () => {
      const BearerError = {
        name: faker.lorem.paragraphs(),
        cpf: '445.887.670-89',
      };

      const response = await request(app).post(url).send(BearerError);

      expect(response.status).toBe(500);
    });
  });
});
