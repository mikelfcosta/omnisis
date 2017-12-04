import { Router } from 'express';
import dashboard from './dashboard';
import iot from './iot';
import holders from './holders';
import locations from './locations';

const router = Router();

router.use('/dashboard', dashboard);
router.use('/iot', iot);
router.use('/holders', holders);
router.use('/locations', locations);

export default router;
