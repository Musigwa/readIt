import { Router } from 'express';
// import the routers here
import commentRouters from './comments';
import postRouters from './posts';
import userRouters from './user';
import authRouters from './auth';
import ratingRouters from './ratings';

const routers = Router();
// add some configuration to all routers

// you can add many more imported routers by separating them with commas, .
routers.use(commentRouters, postRouters, userRouters, authRouters, ratingRouters);

export default routers;
