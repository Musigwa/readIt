import request from 'supertest';
import app from '../index';

describe('POST api/v1/posts', () => {
  test('It should respond with an object of post', async () => {
    jest.setTimeout(50000);
    const post = await request(app)
      .post('/api/v1/posts')
      .send({
        title: 'fabricee@gmail.com',
        content: 'Fabrice',
        userId: 123,
        views: 0,
        mediaPath: 'fabricee',
      });
    expect(post.status).toBe(404);
  });
  test('It should respond with User not found', async () => {
    jest.setTimeout(50000);
    const post = await request(app)
      .post('/api/v1/posts')
      .send({
        title: 'fabricee@gmail.com',
        content: 'Fabrice',
        userId: 2049,
        views: 0,
        mediaPath: 'fabricee',
      });
    expect(post.status).toBe(404);
  });
});
