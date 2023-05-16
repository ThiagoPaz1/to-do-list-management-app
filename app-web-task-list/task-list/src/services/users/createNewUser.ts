import { instanceUser } from '../instance'

// Types
import { CreateUser } from '../../@types'

export async function createNewUser(user: CreateUser): Promise<void> {
  await instanceUser().post('/user', user)
}