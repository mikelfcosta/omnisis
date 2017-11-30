import { Router } from 'express';
import checkCardById from './api/checkCardById';
import searchCardById from "./api/searchCardById";
import createTag from "./api/createTag";

export const PRIVATE_KEY = '7ec8336709bf8a8d71d0ffff69127903';

const router = Router();

router.get('/cards/:_id', checkCardById);
router.get('/cards/search/:_id', searchCardById);
router.get('/cards/new/:_id', createTag);

export default router;
