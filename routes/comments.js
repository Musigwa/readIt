import { Router } from 'express';
import Comment from '../controllers/comments';

const commentRouters = Router();

commentRouters.post('/posts/:id/comments', Comment.create);

export default commentRouters;
