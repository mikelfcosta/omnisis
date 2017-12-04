import { Router } from 'express';
import getUsers from './api/getUsers';
import getGroups from './api/getGroups';

const router = Router();

router.get('/manage', getUsers);
router.get('/groups', getGroups);

export default router;
