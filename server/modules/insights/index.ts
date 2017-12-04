import { Router } from 'express';
import getAccessByDay from './api/getAccessByDay';

const router = Router();

router.get('/behavior/accessByDay', getAccessByDay);

export default router;
