import { instanceTask } from '../instance'

export async function taskDelete(token: string, id: string): Promise<void> {  
  await instanceTask(token).delete(`/task/${id}`)
}