import { instanceTask } from '../instance'

type CreateTask = {
  title: string
  description: string
}

export async function createNewTask(body: CreateTask, token: string) {
  await instanceTask(token).post('/task', body)
}