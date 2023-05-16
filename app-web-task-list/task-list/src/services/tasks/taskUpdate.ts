import { instanceTask } from '../instance'

// Types
import { Task } from '../../@types'

type TaskUpdate = Omit<Task, 'created_at' | 'id'>

export async function taskUpdate(token: string, id: string, body: TaskUpdate): Promise<void> {
  await instanceTask(token).put(`/task/${id}`, body)
}

