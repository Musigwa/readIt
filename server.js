import startupDebugger from 'debug';
import app from './index';

const PORT = process.env.PORT || 5070;
const debug = startupDebugger('readit:start');

app.listen(PORT, () => debug(`server listening on port: ${PORT}`));
