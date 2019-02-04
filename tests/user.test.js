import request from 'supertest';
import app from '../index';
import db from '../models';

const damieUser = {
  firstName: 'Luc',
  lastName: 'Abayo',
  password: 'password',
  email: 'luc.bayo@gmail.com'
};
let userToken;
let userId;

describe('/USER', () => {
  beforeAll(async done => {
    request(app)
      .post('/api/v1/users')
      .send({
        ...damieUser
      })
      .end((err, res) => {
        const { id } = res.body.user;
        userId = id;
        done();
      });
  });
  beforeEach(done => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: damieUser.email,
        password: damieUser.password
      })
      .end((err, res) => {
        const { token } = res.body;
        userToken = token;
        done();
      });
  });
  afterAll(async done => {
    await db.User.destroy({ truncate: true, cascade: true });
    done();
  });
  describe('/POST user', () => {
    test('It should return created user', done => {
      request(app)
        .post('/api/v1/users')
        .send({
          firstName: 'Luc',
          lastName: 'Abayo',
          password: 'password',
          email: 'luc.abayo@andela.com'
        })
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.body.user).toHaveProperty('firstName', 'Luc');
          expect(res.body.user).toHaveProperty('lastName', 'Abayo');
          expect(res.body.user).toHaveProperty('password', '************');
          expect(res.body.user).toHaveProperty('isAdmin', false);
          expect(res.body.user).toHaveProperty('email', 'luc.abayo@andela.com');
          done();
        });
    });
    test('It should return user already exist error', done => {
      request(app)
        .post('/api/v1/users')
        .send({
          ...damieUser
        })
        .end((err, res) => {
          expect(res.status).toBe(400);
          expect(res.body.errors).toHaveProperty('message', 'User already exist');
          done();
        });
    });
    test('It should return invalid email error', done => {
      jest.setTimeout(100);
      request(app)
        .post('/api/v1/users')
        .send({
          ...damieUser,
          email: 'luc.bakjdf'
        })
        .end((err, res) => {
          expect(res.status).toBe(400);
          expect(res.body.errors).toHaveProperty('message', 'Invalid email address');
          done();
        });
    });
    test('It should return error', done => {
      request(app)
        .post('/api/v1/users')
        .send({
          email: 'jean.abayo@gmail.com'
        })
        .end((err, res) => {
          expect(res.status).toBe(400);
          expect(res.body.errors).toHaveProperty('firstName', 'required');
          expect(res.body.errors).toHaveProperty('lastName', 'required');
          expect(res.body.errors).toHaveProperty('password', 'required');
          done();
        });
    });
  });
  describe('/GET users', () => {
    test('It should return unauthorized', done => {
      request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.status).toBe(401);
          done();
        });
    });
    // why some test are failing where are they??
    test('It should return array of users', done => {
      request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.body.users).toHaveLength(2);
          done();
        });
    });
  });

  describe('/GET one user', () => {
    test('It should return unauthorized', done => {
      request(app)
        .get(`/api/v1/users/${userId}`)
        .end((err, res) => {
          expect(res.status).toBe(401);
          done();
        });
    });

    test('It should return user object', done => {
      request(app)
        .get(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.body.user).toHaveProperty('firstName', damieUser.firstName);
          expect(res.body.user).toHaveProperty('lastName', damieUser.lastName);
          expect(res.body.user).toHaveProperty('isAdmin', false);
          done();
        });
    });
    test('It should return user object', done => {
      request(app)
        .get('/api/v1/users/39898')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).toBe(404);
          expect(res.body.errors).toHaveProperty('message', 'User not found');
          done();
        });
    });
  });

  describe('/UPDATE user', () => {
    test('It will return Unthorized due to missing token', done => {
      request(app)
        .put(`/api/v1/users/${userId}`)
        .send({
          firstName: 'Silas',
          lastName: 'Gasasira'
        })
        .end((error, res) => {
          expect(res.status).toBe(401);
          done();
        });
    });

    test('It will return updated user', done => {
      request(app)
        .put(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          firstName: 'Silas',
          lastName: 'Gasasira'
        })
        .end((error, res) => {
          expect(res.status).toBe(200);
          expect(res.body.user).toHaveProperty('firstName', 'Silas');
          expect(res.body.user).toHaveProperty('lastName', 'Gasasira');
          done();
        });
    });

    test('It will return Unthorized for trying upadating other user', done => {
      request(app)
        .put('/api/v1/users/5663')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          firstName: 'Silas',
          lastName: 'Gasasira'
        })
        .end((error, res) => {
          expect(res.status).toBe(401);
          expect(res.body.errors).toHaveProperty('message', 'Unthorized');
          done();
        });
    });
  });
});

export { userId, userToken };
