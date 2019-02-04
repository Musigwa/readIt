import { Router } from 'express';
import passport from 'passport';
import Post from '../controllers/posts';

const postRouters = Router();

postRouters.delete(
  '/posts/:id',
  passport.authenticate('jwt', { session: false }),
  Post.delete,
);

postRouters.put('/posts/:id/views', Post.updateViewers);
postRouters
  .post('/posts', passport.authenticate('jwt', { session: false }), Post.create)
  .put(
    '/posts/:postId/content',
    passport.authenticate('jwt', { session: false }),
    Post.editPost,
  )
  .get('/posts/:postId', Post.getOnePost)
  .get('/posts', Post.getAllPost);

export default postRouters;
