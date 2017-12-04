import { Router } from 'express';
import getUsers from './api/getUsers';
import getGroups from './api/getGroups';
import getProfiles from './api/getProfiles';

const router = Router();

router.get('/manage', getUsers);
router.get('/groups', getGroups);
router.get('/profiles', getProfiles);

export default router;
