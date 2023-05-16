import { Router } from 'express'

import { userController } from '../modules/user/controllers'
import { validateData } from '../middlewares/ValidateData'

const route = Router()

route.get('/:email', userController.getUserByEmail)

route.post('/', validateData.newUserData, userController.newUser)
route.post('/login', validateData.loginData, userController.singIn)

export const userRoute = route