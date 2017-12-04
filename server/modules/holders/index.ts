import { Router } from 'express';
import getUsers from './api/getUsers';

const router = Router();

router.get('/manage/users', getUsers);

export default router;
