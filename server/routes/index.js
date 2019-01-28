import express, { Router } from 'express';
import checkAuth from '../middleware/checkAuth';
import constants from '../helpers/constants'
const all = Router();

/** ********* API ENTRYPOINT **************************** */

const entryPoint = Router();
entryPoint.get('/', (req, res) => 
  res.status(constants.statusCode.OK).json({ message: 'welcome' })
);

/** ********* UPLOADS ENDPOINT ************************** */

const uploads = ('/uploads', express.static('uploads'));

/** ********** ALL ENDPOINTS *************************** */

// Unprotected routes
all.use(entryPoint);
// Protected routes
all.use(checkAuth);

export default all;
