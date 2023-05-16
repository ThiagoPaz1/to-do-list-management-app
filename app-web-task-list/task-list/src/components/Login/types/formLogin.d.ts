import { FoundError } from "."

export type FormLoginProps = {
  singIn: (email: string, password: string) => void
  foundError: (param: FoundError) => void 
}

export type UserDataForLogin = {
  email: string
  password: string
}