import { Router } from 'express';
import iot from './iot';

const router = Router();

router.use('/iot', iot);

export default router;
