import { Router } from "express";
import { signIn, register } from "../controllers/authControllers.js";
import registerValidate from '../middlewares/authMiddlewares/registerValidate.js';

const router = Router();

router.post("/login", signIn);
router.post('/register', registerValidate, register)

export default router;