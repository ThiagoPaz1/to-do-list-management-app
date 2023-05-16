import { Router } from 'express'

import { taskController } from '../modules/tasks/controllers'
import { validateData } from '../middlewares/ValidateData'

const route = Router()

route.use('/', validateData.verirfyAuthentication)

route.get('/filter', taskController.filterTasks)
route.get('/getAll', taskController.getAllTasks)

route.post('/', validateData.newTaskData, taskController.newTask)

route.put('/:id', validateData.verifyId, validateData.updateTaskData, taskController.taskUpdate)

route.delete('/:id', validateData.verifyId, taskController.deleteTask)

export const taskRoute = route