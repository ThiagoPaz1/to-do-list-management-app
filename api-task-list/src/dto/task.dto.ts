export type CreateTaskDto = {
  userId: string
  title: string,
  description: string
}

export type GetTaskDto = {
  id: string
  title: string,
  description: string,
  created_at: string
}

export type UpdateTaskDto = {
  id: string
  title: string,
  description: string,
}