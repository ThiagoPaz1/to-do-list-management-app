export type CreateUserDto = {
  name: string
  email: string
  password: string
}

export type GetUserDto = {
  id: string
  name: string
  email: string
  password?: string
}