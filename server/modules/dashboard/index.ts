import { Router } from 'express';
import getInsightsSummary from './api/getInsightsSummary';
import getLastLogs from './api/getLastLogs';

const router = Router();

router.get('/summary', getInsightsSummary);
router.get('/logs', getLastLogs);

export default router;
