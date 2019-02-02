import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import dotenv from 'dotenv';
import passportConfig from './middleware/passport';
// bring in the routers
import routers from './routes';
// initialize the env variables

const app = express();
// passport config
app.use(passport.initialize());
dotenv.config();
passportConfig(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get('env') === 'development') app.use(morgan('dev'));

<<<<<<< HEAD
app.get('/', (req, res) => res.status(200).send({ message: 'Welcome blogPost API', status: 200 }));
=======
app.get('/', (req, res) => res.status(200).send({ message: 'Welcome blogPost API', status: 200 }),);
>>>>>>> 1e66ef7ed95ddd742b9c54113e4c1956f9c6cfdc

app.use('/api/v1/', routers);

export default app;
