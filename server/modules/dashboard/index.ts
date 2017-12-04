import { Router } from 'express';
import getInsightsSummary from './api/getInsightsSummary';

const router = Router();

router.get('/summary', getInsightsSummary);

export default router;
