import { Response } from 'express'

import { taskService } from '../services'
import { RequestData } from '../../../@types'

class TaskController {
  public async getAllTasks(req: RequestData, res: Response): Promise<Response> {
    const page = Number(req.query?.page)
    const pageSize = Number(req.query?.pageSize)
    const userId = String(req.userId)

    try {
      const tasks = await taskService.getAllTasksWithPagination(userId, page, pageSize)
      return res.json(tasks)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  
  public async filterTasks(req: RequestData, res: Response): Promise<Response> {
    const title =req.query?.title as string
    const date = req.query?.date as string
    const userId = String(req.userId)

    try {
      const tasks = await taskService.filterTasks(userId, title, date)
      return res.json(tasks) 
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  public async newTask(req: RequestData, res: Response): Promise<Response> {
    const { title, description } = req.body
    const userId = String(req.userId)

    try {
      const taskData = {
        title,
        description,
        userId
      }

      await taskService.create(taskData)
      return res.status(201).json({message: 'Successfully created task'})
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  public async taskUpdate(req: RequestData, res: Response): Promise<Response> {
    const { id } = req.params
    const title = req.body.title as string
    const description = req.body.description as string
    const userId = req.userId as string

    try {
      const updatedTask = await taskService.taskUpdate(userId, { id, title, description })
      return res.json(updatedTask)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  public async deleteTask(req: RequestData, res: Response): Promise<Response> {
    const { id } = req.params
    const userId = req.userId as string

    try {
      await taskService.deleteTask(userId, id)
      return res.json({message: 'Successfully delete task'})
    } catch (error) {
      return res.status(500).json(error)      
    }
  }
} 

export const taskController = new TaskController()