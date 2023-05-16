import { Request } from 'express'

export interface RequestData extends Request {
  userId?: string
}