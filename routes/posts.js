import { Router } from 'express';
import passport from 'passport';
import Post from '../controllers/posts';

const postRouters = Router();

<<<<<<< HEAD
postRouters
  .post('/posts', passport.authenticate('jwt', { session: false }), Post.create)
  .put('/posts/:postId/content', passport.authenticate('jwt', { session: false }), Post.editPost)
  .get('/posts/:postId', Post.getOnePost)
  .get('/posts', Post.getAllPost);
=======
postRouters.post('/posts', Post.create);
postRouters.delete('/posts/:id', Post.delete);
>>>>>>> a0a8cb117aa06a013a326f410a05b635c419e679

export default postRouters;
