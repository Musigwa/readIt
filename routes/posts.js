import { Router } from 'express';
import Post from '../controllers/posts';

const postRouters = Router();

postRouters.post('/posts', Post.create);
postRouters.delete('/posts/:id', Post.delete);

export default postRouters;
