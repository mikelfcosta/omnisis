import { Router } from 'express';
import iot from './iot';
import holders from './holders';
import locations from './locations';

const router = Router();

router.use('/iot', iot);
router.use('/holders', holders);
router.use('/locations', locations);

export default router;
