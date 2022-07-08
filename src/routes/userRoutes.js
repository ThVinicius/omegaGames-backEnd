import { Router } from 'express';
import { getHome, postGame, getUser } from '../controllers/userControllers.js';
import validateUser from '../middlewares/authMiddlewares/validadeUser.js';

const router = Router();

router.get('/games', getHome);
router.post('/cart/:id', validateUser, postGame);
router.get('/user', validateUser, getUser);

export default router;
