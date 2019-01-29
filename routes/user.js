import { Router } from 'express';
import User from '../controllers/users';

const userRouters = Router();

userRouters.post('/users', User.create);

export default userRouters;
