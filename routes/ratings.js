import { Router } from 'express';
import passport from 'passport';
import RatingController from '../controllers/ratings';

const ratingRouters = Router();
ratingRouters.use((req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (!user) {
      return res.status(401).json({
        message: 'Please provide a token to perform this action'
      });
    }
    // pass the user to the next middleware
    req.user = user.dataValues;
    next();
  })(req, res, next);
});
ratingRouters.post('/post/:id/rating', RatingController.create);
ratingRouters.get('/post/:id/rating', RatingController.getAll);
ratingRouters.put('/post/:postId/rating/:ratingId', RatingController.update);
export default ratingRouters;
