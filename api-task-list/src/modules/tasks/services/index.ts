import { taskRepository } from '../repository'
import { CreateTaskDto, GetTaskDto, UpdateTaskDto } from '../../../dto'

import { dateFormat } from '../../../utils/dateFormat'

class TaskService {
  public async getById(userId: string, id: string): Promise<GetTaskDto> {
    const task = await taskRepository.getById(userId, id)

    return task
  }

  public async getAllTasksWithPagination(
    userId: string,
    page: number,
    pageSize: number): Promise<{
      tasks: GetTaskDto[],
      tasksTotal: number,
      totalPages: number
    }> {
    const pageData = !page ? 0 : page
    const pageSizeData = !pageSize ? 10 : pageSize
    const { tasksTotal, tasks, totalPages } = await taskRepository.getAllWithPagination(userId, pageData, pageSizeData)
    const tasksData: GetTaskDto[] = tasks.map(i => ({
      id: i.id,
      title: i.title,
      description: i.description,
      created_at: dateFormat(i.created_at)
    }))
    
    const allTasks = {
      tasksTotal,
      totalPages,
      tasks: tasksData
    }

    return allTasks
  }

  public async filterTasks(userId: string, title: string, date: string): Promise<GetTaskDto[]> {
    const tasksData: GetTaskDto[] = await taskRepository.filter(userId, title, date)
    const tasks: GetTaskDto[] = tasksData.map(i => ({
      id: i.id,
      title: i.title,
      description: i.description,
      created_at: dateFormat(i.created_at)
    }))

    return tasks
  }

  public async create(param: CreateTaskDto): Promise<void> {
    await taskRepository.create(param)
  }

  public async taskUpdate(userId: string, data: UpdateTaskDto): Promise<GetTaskDto> {
    const updatedTask = await taskRepository.update(userId, data)

    return updatedTask
  }

  public async deleteTask(userId: string, id: string): Promise<void> {
    await taskRepository.delete(userId, id)
  }
}

export const taskService = new TaskService()