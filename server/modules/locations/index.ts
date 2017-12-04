import { Router } from 'express';
import getMachines from './api/getMachines';
import getLocations from './api/getLocations';

const router = Router();

router.get('/machines', getMachines);
router.get('/locations', getLocations);

export default router;
