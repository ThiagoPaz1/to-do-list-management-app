import { tasksDB } from '../../../database/tasksDB'
import { CreateUserDto, GetUserDto } from '../../../dto'

class UserRepository {
  public async getByEmail(email: string): Promise<GetUserDto> {
    const user =
      await tasksDB
        .ref('users')
        .query()
        .filter('email', '==', email)
        .take(1)
        .get()

    return user.getValues()[0]
  }
  
  public async create(param: CreateUserDto): Promise<void> {
    const newUser = await tasksDB.ref('users').push({
      name: param.name,
      email: param.email,
      password: param.password
    })

   await tasksDB.ref(`users/${newUser.key}`).update({
      id: newUser.key
    })
  }
}

export const userRepository = new UserRepository()