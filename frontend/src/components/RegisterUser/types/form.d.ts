export type FormProps = {
  createUser: (user: UserData) => void
}

export type UserData = {
  name: string
  email: string
  password: string
}

export type ErrorInFields = {
  name?: FieldErrorValues
  email?: FieldErrorValues
  password?: FieldErrorValues
}

type FieldErrorValues = 'notVerified' | 'verifiedOk' | 'errorFound' 
