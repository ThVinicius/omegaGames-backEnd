import { Router } from 'express'
import { getHome } from '../controllers/userControllers.js'

const router = Router()

router.get('/games', getHome)

export default router
