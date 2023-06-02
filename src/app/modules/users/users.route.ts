import express from 'express'
import { createdUserController, getUserController } from './users.controller'

const router = express.Router()

router.get('/', getUserController)
router.post('/create-user', createdUserController)

export { router }
