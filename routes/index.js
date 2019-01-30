import { Router } from 'express';
// import the routers here
import commentRouters from './comments';
import postRouters from './posts';
import userRouters from './user';
import authRouters from './auth';

const routers = Router();
// add some configuration to all routers

// you can add many more imported routers by separating them with commas.

routers.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome' });
});
routers.use(commentRouters, postRouters, userRouters, authRouters);

export default routers;
