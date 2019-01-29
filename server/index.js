import express from 'express';
import morgan from 'morgan';
import config from 'config';
import startupDebugger from 'debug';
import Sequelize from 'sequelize';
import middleware from './middleware';

const connectionString = config.get('DATABASE_URL');
const debug = startupDebugger('readit:start');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get('env') === 'development') app.use(morgan('dev'));

new Sequelize(connectionString)
  .authenticate()
  .then(res => debug('Connected to db:', res))
  .catch(err => debug('Error connecting to db:', err));

middleware(app);

const server = app.listen(config.get('PORT'), () => {
  debug(`server listening on port: ${config.get('PORT')}`);
});

export default server;
