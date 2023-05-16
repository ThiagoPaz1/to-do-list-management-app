import { createContext, ReactNode, useState, useEffect } from 'react'

// Services
import { getAllTasksWithPagination } from '../services/tasks'

// Hooks and contexts
import { useUserDataSession } from '../hooks/useUserDataSession'

// Types
import { TasksWithPagination } from '../@types'

type TasksContextProps = {
  children: ReactNode
}

type TaskContextData = {
  tasks: TasksWithPagination
  getTasks: (page?: string, pageSize?: string) => void 
} 

export const TaskContext = createContext<TaskContextData>({} as TaskContextData)

export function TasksProvider({ children }: TasksContextProps) {
  const [tasks, setTasks] = useState<TasksWithPagination>({} as TasksWithPagination)
  const { token } = useUserDataSession()

  useEffect(() => {
    getTasks()
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
  
  return (
    <TaskContext.Provider value={{tasks, getTasks}}>
      { children }
    </TaskContext.Provider>
  )

}