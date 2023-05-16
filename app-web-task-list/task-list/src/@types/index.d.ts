import { ChangeEvent } from 'react'
import { UserResponse, CreateUser } from './user'
import { Task, TasksWithPagination } from './task'

export type ChangeInput = ChangeEvent<HTMLInputElement>

export {
  UserResponse,
  CreateUser,
  Task,
  TasksWithPagination
}