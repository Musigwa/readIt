import request from 'supertest';
import app from '../index';

describe('Test comment creation', () => {
  it('It should return comment created successfully', async (done) => {
    try {
      const comment = await request(app)
        .post('/api/v1/post/1/comment')
        .send({
          text: 'first comment',
        });
      expect(comment.body.text).toEqual('first comment');
      done();
    } catch (error) {
      console.log(error);
    }
  });
});
