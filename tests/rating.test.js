import request from 'supertest';
import app from '../index';
import db from '../models';

let post;
let user;

const dummyPost = {
  title: 'a story from espoir murhabazi',
  content: 'this is a story from espoir murhabazi',
  views: 0,
  mediaPath: 'somewhere in my laptop'
};

const dummyUser = {
  firstName: 'espoir',
  lastName: 'Murhabazi',
  password: 'password',
  email: 'you.can.se@me.com'
};
const createPost = async done => {
  dummyPost.userId = user.id;
  request(app)
    .post('/api/v1/posts')
    .send({
      ...dummyPost
    })
    .end((err, res) => {
      post = res.body;
      done();
    });
};

const createUser = async done => {
  request(app)
    .post('/api/v1/users')
    .send({
      ...dummyUser
    })
    .end((err, res) => {
      ({ user } = res.body);
      expect(user).toBeDefined();
      done();
    });
};

const cannotPostIfNoToken = done => {
  request(app)
    .post(`/api/v1/post/${post.id}/rating`)
    .end((err, res) => {
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Please provide a token to perform this action');
      done();
    });
};
const cannotifPostIdInvalid = done => {
  request(app)
    .post(`/api/v1/post/400009/rating`)
    .end((err, res) => {
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Post you are looking for cannot be found');
      done();
    });
};
const cannotifEditIfNotFound = done => {
  request(app)
    .put(`/api/v1/post/400009/rating`)
    .end((err, res) => {
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Post you are looking for cannot be found');
      done();
    });
};
const cannotIfRateUndefinded = done => {
  request(app)
    .post(`/api/v1/post/${post.id}/rating`)
    .set('Authorization', `Bearer ${user.token}`)
    .send({ userId: user.id, postId: post.id, rating: undefined })
    .end((err, res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Please provide a valid rating ');
      done();
    });
};

const cannotIfRateSupTo5 = done => {
  request(app)
    .post(`/api/v1/post/${post.id}/rating`)
    .set('Authorization', `Bearer ${user.token}`)
    .send({ userId: user.id, postId: post.id, rating: 10 })
    .end((err, res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Please provide a valid rating ');
      done();
    });
};
const canRate = done => {
  request(app)
    .post(`/api/v1/post/${post.id}/rating`)
    .set('Authorization', `Bearer ${user.token}`)
    .send({ userId: user.id, postId: post.id, rating: 4 })
    .end((err, res) => {
      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Post rated successfully');
      done();
    });
};
const canGetAllRating = done => {
  request(app)
    .get(`/api/v1/post/${post.id}/rating`)
    .set('Authorization', `Bearer ${user.token}`)
    .end((err, res) => {
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('All post retrieved successfully');
      done();
    });
};
const canEditARating = done => {
  request(app)
    .put(`/api/v1/post/${post.id}/rating`)
    .set('Authorization', `Bearer ${user.token}`)
    .send({ userId: user.id, postId: post.id, rating: 4 })
    .end((err, res) => {
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Post rating edited successfully');
      done();
    });
};
const canDeleteRating = done => {
  request(app)
    .delete(`/api/v1/post/${post.id}/rating`)
    .set('Authorization', `Bearer ${user.token}`)
    .end((err, res) => {
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Post has been deleted');
      done();
    });
};
beforeAll(createUser);
beforeAll(createPost);
afterAll(async done => {
  await db.User.destroy({ truncate: true, cascade: true });
  await db.Post.destroy({ truncate: true, cascade: true });
  done();
});

describe('All test related to rating ', () => {
  jest.setTimeout(50000);
  test('cannot rate a post if there is no token', cannotPostIfNoToken);
  test('cannot rate if post id is invalid ', cannotifPostIdInvalid);
  test('cannot edit rating if post not found ', cannotifEditIfNotFound);
  test('cannot rate if the rating is undefined', cannotIfRateUndefinded);
  test('cannot rate if the rating is less than 1 and more than 5', cannotIfRateSupTo5);
  test('can rate', canRate);
  test('can get all rating ', canGetAllRating);

  test('can edit rating ', canEditARating);

  test('can delete rating ', canDeleteRating);
});
