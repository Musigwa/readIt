import request from 'supertest';
import app from '../index';

describe('POST /api/v1/posts/1/comments', () => {
  it('It should return comment created successfully', async (done) => {
    try {
      const comment = await request(app)
        .post('/api/v1/posts/1/comments')
        .send({
          text: 'first comment',
        });
      expect(comment.body.text).toEqual('first comment');
      done();
    } catch (error) {
      console.log(error);
    }
  });

  it('It should return an empty comment error', (done) => {
    request(app)
      .put('/api/v1/posts/1/comments')
      .send({ text: '' })
      .end((res, error) => {
        expect(res.body.message).toEqual('Cannot set a comment to an empty message');
        expect(res.statusCode).toBe(400);
        done();
      });
  });
  it('It should return an non-existing post error', (done) => {
    const postId = '21';
    request(app)
      .put(`/api/v1/posts/${postId}`)
      .send({
        text: 'Trying to updated a non-existing post',
      })
      .end((res, error) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual(
          'Cannot create a comment on non-existing post',
        );
        done();
      });
  });
});

describe('PUT /api/v1/posts/:postId/comments/:commentId', () => {
  const commentId = 12;
  const postId = 2;
  it('It should return the udpated comment', (done) => {
    request(app)
      .put(`/api/v1/posts/${postId}/comments/${commentId}`)
      .send({ text: 'Update the comment' })
      .end((res, error) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('messsage', 'Comment updated successfully');
        done();
      });
  });
});

describe('DELETE /api/v1/posts/:postId/comments/:commentId', () => {
  let commentId = 11;
  const postId = 0;
  it('It should return comment deleted successfully', (done) => {
    request(app)
      .delete(`/api/v1/posts/${postId}/comments/${commentId}`)
      .end((res, error) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Comment deleted successfully');
        done();
      });
  });
  it('It should return a non-existing comment', (done) => {
    commentId = 10;
    request(app)
      .delete(`/api/v1/posts/${postId}/comments/${commentId}`)
      .end((res, error) => {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty(
          'message',
          'there is no comment with that id',
        );
        done();
      });
  });
});

describe('GET /api/v1/posts/:postId/comments', () => {
  const postId = 34;
  let commentId = 34;
  it('It should return all comments related to a post', (done) => {
    request(app)
      .get(`/api/v1/posts/${postId}/comments`)
      .end((res, error) => {
        expect(res.status).toBe(200);
        expect(typeof res.body.comments).toBe('array');
        done();
      });
  });
  it('It should return a particular comment', (done) => {
    request(app)
      .get(`/api/v1/posts/${postId}/comments/${commentId}`)
      .end((res, error) => {
        expect(res.status).toBe(200);
        expect(typeof res.body.comment).toBe('object');
        done();
      });
  });
  it('It should return non-existing comment error', (done) => {
    commentId = 3564;
    request(app)
      .get(`/api/v1/posts/${postId}/comments/${commentId}`)
      .end((res, error) => {
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual('The comment not found');
        done();
      });
  });
});
