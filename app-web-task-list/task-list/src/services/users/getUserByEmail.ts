import { instanceUser } from '../instance'

// Types
import { UserResponse } from '../../@types'

export async function getUserByEmail(email: string) {
  return await instanceUser().get<UserResponse>(`/user/${email}`)
}