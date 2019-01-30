import request from 'supertest';
import app from '../index';

describe('/GET', () => {
  test('It should return an array of users', async () => {
    const response = await request(app).get('/api/v1/users');
    expect(response.statusCode).toBe(200);
  });
});
