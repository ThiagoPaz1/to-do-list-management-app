import { tasksDB } from '../../../database/tasksDB'
import { CreateTaskDto, GetTaskDto, UpdateTaskDto } from '../../../dto'
import { dateFormat } from '../../../utils/dateFormat'

class TaskRepository {
  public async getById(userId: string, id: string): Promise<GetTaskDto> {
    const path = `users/${userId}/tasks/${id}`
    const taskData = await tasksDB.ref(path).get()
    const task = taskData.val() as GetTaskDto

    return task
  }

  public async getAllWithPagination(
    userId: string,
    page: number,
    pageSize: number): Promise<{
      tasks: GetTaskDto[],
      tasksTotal: number,
      totalPages: number
    }> {
    const skipSize = page <= 1 ? 0 : (page - 1) * pageSize
    const tasksTotal = await tasksDB
      .ref(`users/${userId}/tasks`)
      .query()
      .count()

    const tasks = await tasksDB
      .ref(`users/${userId}/tasks`)
      .query()
      .skip(skipSize)
      .take(pageSize)
      .get()

    const totalPages = (): number => {
      const pages = tasksTotal / pageSize
      const pagesStr = String(pages)
      const index = pagesStr.indexOf('.')

      if (tasksTotal <= 0) {
        return 0
      }

      if (pages < 1) {
        return 1
      }

      if (index) {
        const pagesNumber = Number(pagesStr.substring(0, index)) + 1
        return pagesNumber
      } else {
        return pages
      }
    }
    const allTasksData = tasks.getValues()

    return {
      tasksTotal: tasksTotal,
      totalPages: totalPages(),
      tasks: allTasksData
    }
  }

  public async filter(userId: string, title: string, date: string): Promise<GetTaskDto[]> {
    let filteredTasks: GetTaskDto[] = []
    const tasksData = await tasksDB
      .ref(`users/${userId}/tasks`)
      .query()
      .get()
    const tasks: GetTaskDto[] = [...tasksData.getValues()] as GetTaskDto[]

    if (title && !date) {
      filteredTasks = tasks.filter((el, i) => tasks[i].title.toLowerCase().includes(title))

      return filteredTasks
    }

    if (!title && date) {
      filteredTasks = tasks.filter(i => dateFormat(i.created_at) === date)

      return filteredTasks
    }

    if (title && date) {
      filteredTasks =
        tasks
          .filter((_el, i) => tasks[i].title.toLowerCase().includes(title))
          .filter(i => dateFormat(i.created_at) === date)

      return filteredTasks
    }

    return filteredTasks
  }

  public async create(param: CreateTaskDto): Promise<void> {
    const path = `users/${param.userId}/tasks`
    const newTask = await tasksDB.ref(path).push({
      title: param.title,
      description: param.description,
      created_at: new Date()
    })

    await tasksDB.ref(`${path}/${newTask.key}`).update({
      id: newTask.key
    })
  }

  public async update(userId: string, data: UpdateTaskDto): Promise<GetTaskDto> {
    const path = `users/${userId}/tasks/${data.id}`
    const taskData = await tasksDB.ref(path).get()
    const task = taskData.val() as GetTaskDto

    await tasksDB.ref(path).update({
      title: data.title ? data.title : task.title,
      description: data.description ? data.description : task.description
    })

    const updatedTaskData = await tasksDB.ref(path).get()
    const updatedTask = updatedTaskData.val() as GetTaskDto

    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      created_at: dateFormat(updatedTask.created_at)
    }
  }

  public async delete(userId: string, id: string): Promise<void> {
    const path = `users/${userId}/tasks/${id}`
    await tasksDB.ref(path).remove()
  }
}

export const taskRepository = new TaskRepository()