import { Task } from "../../../@types"

export type CreateTaskModalProps = {
  token: string
  openModal: boolean
  closeModal: () => void
}

export type TaskData = Omit<Task, 'created_at' | 'id'>

export type ErrorInFields = {
  title: FieldErrorValues
  description: FieldErrorValues
}

type FieldErrorValues = 'notVerified' | 'verifiedOk' | 'errorFound'