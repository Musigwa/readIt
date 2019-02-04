import { Router } from 'express';
import passport from 'passport';
import User from '../controllers/users';
import { userAuthorization } from '../helpers/validators';

const userRouters = Router();

userRouters
  .post('/users', User.create)
  .get('/users', passport.authenticate('jwt', { session: false }), User.getAllUser)
<<<<<<< HEAD
  .get('/users/:id', passport.authenticate('jwt', { session: false }), User.getOneUser)
  .put('/users/:id', passport.authenticate('jwt', { session: false }), User.update)
  .get('/user/posts', passport.authenticate('jwt', { session: false }), User.getMyPosts);
=======
  .get(
    '/users/:id',
    passport.authenticate('jwt', { session: false }),
    User.getOneUser,
  )
  .put(
    '/users/:id',
    passport.authenticate('jwt', { session: false }),
    userAuthorization,
    User.update,
  );
>>>>>>> a0a8cb117aa06a013a326f410a05b635c419e679

export default userRouters;
