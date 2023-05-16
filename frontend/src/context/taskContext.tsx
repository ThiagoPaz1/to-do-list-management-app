import { createContext, ReactNode, useState, useEffect } from 'react'

// Services
import { getAllTasksWithPagination, taskFilter } from '../services/tasks'

// Hooks and contexts
import { useUserDataSession } from '../hooks/useUserDataSession'

// Types
import { Task, TasksWithPagination } from '../@types'

type TasksContextProps = {
  children: ReactNode
}

type TaskContextData = {
  tasks: TasksWithPagination
  getTasks: (page?: string, pageSize?: string) => void
  tasksFilter: (title?: string, date?: string) => void 
} 

export const TaskContext = createContext<TaskContextData>({} as TaskContextData)

export function TasksProvider({ children }: TasksContextProps) {
  const [tasks, setTasks] = useState<TasksWithPagination>({} as TasksWithPagination)
  const { token } = useUserDataSession()

  useEffect(() => {
    getTasks()
    tasksFilter()
  }, []) 

  async function getTasks(page?: string, pageSize?: string) {
    const pageN = page ? page : '1'
    const pageSizeN = pageSize ? pageSize : '10'
    const data = await getAllTasksWithPagination(token, pageN, pageSizeN)

    if (data === 401) {
      setTasks({
        totalPages: 0,
        tasksTotal: 0,
        tasks: []
      })
    } else {
      const tasksData = data as TasksWithPagination
      setTasks(tasksData)
    }
  }

  async function tasksFilter(title?: string, date?: string) {
    const titleAdjusted = title ? title : ''
    const dateAdjusted = date ? date : ''
    const data = await taskFilter(token, titleAdjusted, dateAdjusted)

    if (data === 401) {
      setTasks({
        totalPages: 0,
        tasksTotal: 0,
        tasks: []
      })
    } else {
      setTasks({
        ...tasks,
        tasks: data as Task[]
      })
    }

  }
  
  return (
    <TaskContext.Provider value={{tasks, getTasks, tasksFilter}}>
      { children }
    </TaskContext.Provider>
  )

}