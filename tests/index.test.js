import request from 'supertest';
import app from '../index';

describe('/GET', () => {
  test('It should return a welcome message', async () => {
    const response = await request(app).get('/api/v1');
    expect(response.status).toBe(200);
  });
});
