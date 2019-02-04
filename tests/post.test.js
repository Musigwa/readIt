import request from 'supertest';
import app from '../index';
import { userId, userToken } from './user.test';

const validPostId = 15;
const invalidPostId = 84372;
let token;
beforeAll((done) => {
  request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'fabrice@gmail.com', password: '123' })
    .end((err, res) => {
      ({ token } = res.body);
      expect(res.statusCode).toBe(200);
      done();
    });
});

describe('POST api/v1/posts', () => {
  test('It should respond with an object of post', (done) => {
    request(app)
      .post('/api/v1/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'fabricee@gmail.com',
        content: 'Fabrice',
        userId,
        views: 0,
        mediaPath: 'fabricee'
      });
    console.log(post.body, '============== cannot understand why');
    expect(post.body.status).toBe(201);
  });
});

describe('PUT /api/v1/posts/:postId/content', () => {
  test('It should respond with updated info', (done) => {
    request(app)
      .put(`/api/v1/posts/${validPostId}/content`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'fabricee@gmail.com',
        content: 'Fabricew',
        views: 0,
        mediaPath: 'fabricee',
      })
      .end((err, res) => {
        expect(res.body.post.content).toBe('Fabricew');
        done();
      });
  });
  test('It should respond with un-updated info', (done) => {
    request(app)
      .put(`/api/v1/posts/${invalidPostId}/content`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'fabricee@gmail.com',
        content: 'Fabricew',
        views: 0,
<<<<<<< HEAD
        mediaPath: 'fabricee'
=======
        mediaPath: 'fabricee',
      })
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        done();
      });
  });
});

describe('PUT /api/v1/posts/:postId', () => {
  test('It should respond object of requested post', async (done) => {
    request(app)
      .get(`/api/v1/posts/${validPostId}`)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
  test('It should respond with un-updated info', async (done) => {
    request(app)
      .get(`/api/v1/posts/${invalidPostId}`)
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        done();
      });
  });
});
describe('PUT /api/v1/user/posts', () => {
  test('It should respond object of requested post', async (done) => {
    request(app)
      .get('/api/v1/user/posts')
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
  test('It should respond object of requested post', async (done) => {
    request(app)
      .get('/api/v1/user/posts')
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
  test.skip('It should respond with un-updated info', async (done) => {
    request(app)
      .get('/api/v1/user/posts').end((err, res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
describe('GET /api/v1/posts', () => {
  test('It should respond object of requested post', async (done) => {
    request(app)
      .get('/api/v1/posts')
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        done();
>>>>>>> develop
      });
  });
});
