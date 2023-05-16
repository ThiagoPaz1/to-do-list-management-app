export type Task = {
  id: string
  title: string,
  description: string,
  created_at: string
}

export type TasksWithPagination = {
  tasksTotal: number
  totalPages: number
  tasks: Task[]
}