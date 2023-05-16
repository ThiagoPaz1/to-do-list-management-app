export type CreateUser = {
  name: string
  email: string
  password: string
}

export type UserResponse = {
  user: {
    id: string
    name: string
    email: string
  }
  token?: string
}