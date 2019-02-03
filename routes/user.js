import { Router } from 'express';
import passport from 'passport';
import User from '../controllers/users';
import { userAuthorization } from '../helpers/validators';

const userRouters = Router();

userRouters
  .post('/users', User.create)
  .get('/users', passport.authenticate('jwt', { session: false }), User.getAllUser)
  .get('/users/:id', passport.authenticate('jwt', { session: false }), User.getOneUser)
  .put(
    '/users/:id',
    passport.authenticate('jwt', { session: false }),
    userAuthorization,
    User.update
  );

export default userRouters;
