import { Router } from 'express';
import passport from 'passport';
import AuthController from '../controllers/auth';

const authRouters = Router();

authRouters
  .post('/auth/login', AuthController.login)
  .get('/auth/current', passport.authenticate('jwt', { session: false }), AuthController.current);

export default authRouters;
