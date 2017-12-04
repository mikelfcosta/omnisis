import { Router } from 'express';
import getAccessByDay from './api/getAccessByDay';
import getActiveInactiveCount from './api/getActiveInactiveCount';
import getAverageAccessTime from './api/getAverageAccessTime';
import getAverageInactiveTime from './api/getAverageInactiveTime';

const router = Router();

router.get('/behavior/accessByDay', getAccessByDay);
router.get('/behavior/activeInactiveCount', getActiveInactiveCount);
router.get('/behavior/averageAccessTime', getAverageAccessTime);
router.get('/behavior/averageInactiveTime', getAverageInactiveTime);

export default router;
