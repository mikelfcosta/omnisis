import { Router } from 'express';
import iot from './iot';
import holders from './holders';

const router = Router();

router.use('/iot', iot);
router.use('/holders', holders);

export default router;
