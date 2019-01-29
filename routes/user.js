import { Router } from 'express';
import User from '../controllers/users';

const userRouters = Router();

userRouters
  .post('/users', User.create)
  .get('/users', User.getAllUser)
  .get('/users/:id', User.getOneUser)
  .put('/users/:id', User.update);

export default userRouters;
