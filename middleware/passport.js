import dotenv from 'dotenv';
import passportJwt from 'passport-jwt';
import models from '../models';

dotenv.config();
const { Strategy, ExtractJwt } = passportJwt;
const { User } = models;
const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET_OR_KEY;

export default passport => {
  passport.use(
    new Strategy(options, async (jwtPayload, done) => {
      try {
        const user = await User.findOne({
          where: {
            id: jwtPayload.id
          },
          attributes: ['id', 'firstName', 'lastName', 'email']
        });
        if (user) {
          return done(null, user);
        }
        return done(null, false, {
          message: 'User not found'
        });
      } catch (error) {
        return done(error, false, {
          message: 'Please provide a token to perform this action'
        });
      }
    })
  );
};
