import { Router } from 'express';
import Comment from '../controllers/comments';

const commentRouters = Router();

commentRouters
  .post('/posts/:id/comments', Comment.create)
  .put('/posts/:id/comments/:commentId', Comment.update)
  .delete('/posts/:id/comments/:commentId', Comment.delete)
  .get('/posts/:id/comments', Comment.fetchComments);

export default commentRouters;
