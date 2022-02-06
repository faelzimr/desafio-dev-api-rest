const request = require('supertest');
const app = require('../../../config/express');

describe('Operation Types endpoints', () => {
  describe('GET /operation-types', () => {
    test('Should return 200', async () => {
      const response = await request(app).get('/api/v1/operation-types');

      expect(response.status).toBe(200);

      expect(response).toMatchObject({
        body: expect.any(Object),
      });
    });
  });
});
