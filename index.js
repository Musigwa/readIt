import express from 'express';
import morgan from 'morgan';
import startupDebugger from 'debug';
import passport from 'passport';
import dotenv from 'dotenv';
import poassportConfig from './middleware/passport';
// bring in the routers
import routers from './routes';
// initialize the env variables
dotenv.config();
const debug = startupDebugger('readit:start');
const app = express();
// passport config
app.use(passport.initialize());
poassportConfig(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get('env') === 'development') app.use(morgan('dev'));

app.use('/api/v1/', routers);
const PORT = process.env.PORT || 5070;
const server = app.listen(PORT, () => {
  debug(`server listening on port: ${PORT}`);
});

export default server;
