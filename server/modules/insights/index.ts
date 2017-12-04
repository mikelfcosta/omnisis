import { Router } from 'express';
import getAccessByDay from './api/getAccessByDay';
import getActiveInactiveCount from './api/getActiveInactiveCount';
import getAverageAccessTime from './api/getAverageAccessTime';
import getAverageInactiveTime from './api/getAverageInactiveTime';
import getAccessByCampus from './api/getAccessByCampus';

const router = Router();

router.get('/behavior/accessByDay', getAccessByDay);
router.get('/behavior/activeInactiveCount', getActiveInactiveCount);
router.get('/behavior/averageAccessTime', getAverageAccessTime);
router.get('/behavior/averageInactiveTime', getAverageInactiveTime);

router.get('/campus/accessByCampus', getAccessByCampus);
router.get('/campus/accessByMachine');
router.get('/campus/activesByCampus');

export default router;
