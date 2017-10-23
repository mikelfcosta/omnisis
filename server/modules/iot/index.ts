import { Router } from 'express';
import checkCardById from './api/checkCardById';

const router = Router();

router.get('/cards/:_id', checkCardById);

export default router;
