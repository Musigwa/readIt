import request from 'supertest';
import app from '../index';

const validUserId = 123;
const invalidUserId = 84773;

describe('/GET', () => {
  test('It should return...', async () => {});
});

describe('PUT /api/v1/users/:id/posts', () => {
  test('It should respond object of requested post', async () => {
    const post = await request(app)
      .get(`/api/v1/users/${validUserId}/posts`);
    expect(post.body.status).toBe(200);
  });
  test('It should respond with un-updated info', async () => {
    const post = await request(app)
      .get(`/api/v1/users/${invalidUserId}/posts`);
    expect(post.body.status).toBe(404);
  });
});
