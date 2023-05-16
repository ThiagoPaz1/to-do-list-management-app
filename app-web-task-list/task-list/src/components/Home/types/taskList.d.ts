import { TasksWithPagination } from '../../../@types'

export type TaskListProps = {
  taskData: TasksWithPagination
  openEditTaskModal: (id: string, title: string, description: string) => void
  openDeleteTaskModal: (id: string, title: string) => void
} 