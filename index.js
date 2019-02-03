/* eslint-disable implicit-arrow-linebreak */
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import dotenv from 'dotenv';
import poassportConfig from './middleware/passport';
import joiValidator from './middleware/joiValidator';
// bring in the routers
import routers from './routes';
// initialize the env variables

dotenv.config();

const app = express();
// passport config
app.use(passport.initialize());
poassportConfig(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get('env') === 'development') app.use(morgan('dev'));

app.get('/', (req, res) => res.status(200).send({ message: 'Welcome blogPost API', status: 200 }));

app.use('/api/v1/', routers);
app.use(joiValidator());
export default app;
