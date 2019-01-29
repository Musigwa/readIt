import { Router } from 'express';
import Post from '../controllers/posts';

const postRouters = Router();

postRouters.post('/posts', Post.create);

export default postRouters;
