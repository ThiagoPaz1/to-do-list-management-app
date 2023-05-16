import axios, { AxiosInstance } from 'axios'

export function instanceUser(): AxiosInstance {
  return axios.create({
    baseURL: 'http://localhost:3001/'
  })
}

export function instanceTask(token: string): AxiosInstance {
  return axios.create({
    baseURL: 'http://localhost:3001/',
    headers: { 'authorization': token }
  })
}