import { Router } from 'express'
import registerValidate from '../middlewares/authMiddlewares/registerValidate.js'
import { register } from '../controllers/authControllers.js'

const router = Router()

router.post('/register', registerValidate, register)

export default router
