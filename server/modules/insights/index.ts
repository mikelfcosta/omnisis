import { Router } from 'express';
import getAccessByDay from './api/getAccessByDay';
import getActiveInactiveCount from './api/getActiveInactiveCount';
import getAverageAccessTime from './api/getAverageAccessTime';
import getAverageInactiveTime from './api/getAverageInactiveTime';
import getAccessByCampus from './api/getAccessByCampus';
import getAccessByMachine from './api/getAccessByMachine';
import getActivesByCampus from './api/getActivesByCampus';

const router = Router();

router.get('/behavior/accessByDay', getAccessByDay);
router.get('/behavior/activeInactiveCount', getActiveInactiveCount);
router.get('/behavior/averageAccessTime', getAverageAccessTime);
router.get('/behavior/averageInactiveTime', getAverageInactiveTime);

router.get('/campus/accessByCampus', getAccessByCampus);
router.get('/campus/accessByMachine', getAccessByMachine);
router.get('/campus/activesByCampus', getActivesByCampus);

export default router;
