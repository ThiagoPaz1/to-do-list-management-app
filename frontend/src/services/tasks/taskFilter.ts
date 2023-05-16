import { AxiosError } from 'axios'

import { instanceTask } from '../instance'

import { Task } from '../../@types'

type ResposeCode = number

export async function taskFilter(
  token: string,
  title?: string,
  date?: string,
  ): Promise<Task[] | ResposeCode> {
  try {
    const response = await instanceTask(token).get(`task/filter?title=${title}&date=${date}`)
    return await response.data
  } catch (error) {
    const responseError = error as AxiosError
    const responseCode = responseError.response?.status as number
    return responseCode
  }
}