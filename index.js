import express from 'express';
import morgan from 'morgan';
import startupDebugger from 'debug';

//initialize the env variables
import dotenv from 'dotenv';

dotenv.config();

const debug = startupDebugger('readit:start');
const app = express();
const PORT = process.env.PORT || 5070;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get('env') === 'development') app.use(morgan('dev'));

const server = app.listen(PORT, () => {
  debug(`server listening on port: ${PORT}`);
});

export default server;
