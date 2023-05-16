import { instanceUser } from '../instance'

// Types
import { UserResponse } from '../../@types'

export async function singIn(email: string, password: string): Promise<UserResponse | undefined> {
  try {
    const body = {email, password}
    const response = await instanceUser().post(`/user/login`, body)
    return await response.data
  } catch (error) {
    return undefined
  }
}