import { Router } from 'express';
import getMachines from './api/getMachines';

const router = Router();

router.get('/machines', getMachines);

export default router;
