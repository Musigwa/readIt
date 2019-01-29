import express from 'express';
import morgan from 'morgan';
import startupDebugger from 'debug';

// initialize the env variables
import dotenv from 'dotenv';
// bring in the routers
import routers from './routes';


dotenv.config();

const debug = startupDebugger('readit:start');
const app = express();
const PORT = process.env.PORT || 5070;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get('env') === 'development') app.use(morgan('dev'));

app.get('/', (req, res) => res.status(200)
  .send({ message: 'Welcome blogPost API', status: 200 }));

app.use('/api/v1/', routers);
const server = app.listen(PORT, () => {
  debug(`server listening on port: ${PORT}`);
});

export default server;
