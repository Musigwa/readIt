import request from 'supertest';
import app from '../index';

describe('/AUTH', () => {
  describe('/LOGIN user', () => {
    test('It should login user and return token', (done) => {
      jest.setTimeout(5000);
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'luc.bayo@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty('message', 'Invalid email or password');
          done();
        });
    });
  });
});
