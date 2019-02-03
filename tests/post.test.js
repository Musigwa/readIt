import request from 'supertest';
import app from '../index';

const validPostId = 1;
const invalidPostId = 84372;
describe('POST api/v1/posts', () => {
  test('It should respond with an object of post', async () => {
    const post = await request(app)
      .post('/api/v1/posts')
      .send({
        title: 'fabricee@gmail.com',
        content: 'Fabrice',
        userId: 123,
        views: 0,
        mediaPath: 'fabricee',
      });
    expect(post.body.status).toBe(201);
  });
  test('It should respond with User not found', async () => {
    const post = await request(app)
      .post('/api/v1/posts')
      .send({
        title: 'fabricee@gmail.com',
        content: 'Fabrice',
        userId: 2049,
        views: 0,
        mediaPath: 'fabricee',
      });
    expect(post.body.status).toBe(404);
  });
});

describe('PUT /api/v1/posts/:postId/content', () => {
  test('It should respond with updated info', async () => {
    const post = await request(app)
      .put(`/api/v1/posts/${validPostId}/content`)
      .send({
        title: 'fabricee@gmail.com',
        content: 'Fabricew',
        userId: 2049,
        views: 0,
        mediaPath: 'fabricee',
      });
    expect(post.body.post.content).toBe('Fabricew');
  });
  test('It should respond with un-updated info', async () => {
    const post = await request(app)
      .put(`/api/v1/posts/${invalidPostId}/content`)
      .send({
        title: 'fabricee@gmail.com',
        content: 'Fabricew',
        userId: 2049,
        views: 0,
        mediaPath: 'fabricee',
      });
    expect(post.body.status).toBe(404);
  });
});

describe('PUT /api/v1/posts/:postId', () => {
  test('It should respond object of requested post', async () => {
    const post = await request(app)
      .get(`/api/v1/posts/${validPostId}`);
    expect(post.body.status).toBe(200);
  });
  test('It should respond with un-updated info', async () => {
    const post = await request(app)
      .get(`/api/v1/posts/${invalidPostId}`);
    expect(post.body.status).toBe(404);
  });
});

describe('GET /api/v1/posts', () => {
  test('It should respond object of requested post', async () => {
    const post = await request(app)
      .get('/api/v1/posts/');
    expect(post.body.status).toBe(200);
  });
  // skipped
  test.skip('It should respond with un-updated info', async () => {
    const post = await request(app)
      .get('/api/v1/posts');
    expect(post.body.status).toBe(404);
  });
});
