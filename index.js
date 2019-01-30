import express from 'express';
import morgan from 'morgan';
// bring in the routers
import dotenv from 'dotenv';
import routers from './routes';
// initialize the env variables

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get('env') === 'development') app.use(morgan('dev'));

app.use('/api/v1/', routers);

module.exports = app;
