import { Router } from 'express';
import login from './api/login';
import logout from './api/logout';
import getUsers from './api/users/getUsers';
import getUserById from './api/users/getUserById';
import createUser from './api/users/createUser';
import updateUser from './api/users/updateUser';
import deleteUser from './api/users/deleteUser';

const router = Router();

router.get('/login', login);
router.get('/logout', logout);

router.get('', getUsers);
router.post('/new', createUser);
router.route('/:_id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
