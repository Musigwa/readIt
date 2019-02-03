import { Router } from 'express';
import Post from '../controllers/posts';

const postRouters = Router();

postRouters
  .post('/posts', Post.create)
  .put('/posts/:postId/content', Post.editPost)
  .get('/posts/:postId', Post.getOnePost)
  .get('/posts', Post.getAllPost);

export default postRouters;
