import { useState, useEffect } from 'react'
import { TextField, CircularProgress, Button } from '@mui/material'

// Components
import { AlertComponent } from '../../Alert'

// Services
import { getUserByEmail } from '../../../services/users'

// Types
import { FormProps, ErrorInFields, UserData } from '../types'
import { ChangeInput } from '../../../@types'

// Styles and images
import styles from '../styles/userForm.module.css'

const defautlValuesErrorInField: ErrorInFields = {
  name: 'notVerified',
  email: 'notVerified',
  password: 'notVerified'
}

export function UserForm({ createUser }: FormProps) {
  const [userData, setUserData] = useState<UserData>({} as UserData)
  const [errorInField, setErrorInField] = useState<ErrorInFields>(defautlValuesErrorInField)
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    validateFieldsValues(userData)
  }, [userData])

  function handleChange(event: ChangeInput): void {
    const { value, name } = event.target

    setUserData({
      ...userData,
      [name]: value
    })
  }

  function validateFieldsValues(userData: UserData) {
    const { name, email, password } = userData
    const checkErrorValueEmail = errorInField.email === 'errorFound' || errorInField.email === 'verifiedOk'
    const validateEmail = /\S+@\S+\.\S+/

    if (name?.length < 2) {
      setErrorInField({
        ...errorInField,
        name: 'errorFound'
      })
    } else if (errorInField.name !== 'verifiedOk' && name?.length >= 2) {
      setErrorInField({
        ...errorInField,
        name: 'verifiedOk'
      })
    }

    if (email && !validateEmail.test(email)) {
      setErrorInField({
        ...errorInField,
        email: 'errorFound'
      })
    }
    else if (checkErrorValueEmail && !email) {
      setErrorInField({
        ...errorInField,
        email: 'errorFound'
      })
    }
    else if (errorInField.email !== 'verifiedOk' && validateEmail.test(email)) {
      setErrorInField({
        ...errorInField,
        email: 'verifiedOk'
      })
    }

    if (password?.length < 6) {
      setErrorInField({
        ...errorInField,
        password: 'errorFound'
      })
    } else if (errorInField.password !== 'verifiedOk' && password?.length >= 6) {
      setErrorInField({
        ...errorInField,
        password: 'verifiedOk'
      })
    }
  }

  function buttonDisabled(): boolean {
    const foundErrorFieldsValues = Object.values(errorInField).find(i => i === 'notVerified' || i === 'errorFound')

    if (foundErrorFieldsValues) {
      return true
    } else {
      return false
    }
  }

  async function handleRegisterUser() {
    setIsLoading(true)

    const verify = await checkIfExitsEmail()

    setIsLoading(false)

    if (!verify) {
      createUser(userData)
    }
  }

  async function checkIfExitsEmail(): Promise<boolean> {
    const response = await getUserByEmail(userData.email)
    const data = response.data

    if (data) {
      setEmailAlreadyExists(true)
      return true
    } else {
      return false
    }
  }

  return (
    <form className={styles.containerForm}>
      {
        emailAlreadyExists &&
        <AlertComponent
          open={emailAlreadyExists}
          handleClose={() => setEmailAlreadyExists(false)}
          description="Esse e-mail já esta sendo usado."
          severity="error"
        />
      }
            
      <TextField
        id="outlined-basic"
        name="name"
        label="Digite seu nome"
        variant="outlined"
        margin="normal"
        size="small"
        error={errorInField.name === 'errorFound'}
        helperText={(errorInField.name === 'errorFound') && "O nome precisa ter ao menos 2 caracteres"}
        onChange={(event: ChangeInput) => handleChange(event)}
        fullWidth
      />

      <TextField
        id="outlined-basic"
        name="email"
        label="Digite seu e-mail"
        variant="outlined"
        margin="normal"
        size="small"
        error={errorInField.email === 'errorFound'}
        helperText={(errorInField.email === 'errorFound') && 'Digite um e-mail válido'}
        onChange={(event: ChangeInput) => handleChange(event)}
        fullWidth
      />

      <TextField
        id="outlined-basic"
        name="password"
        type="password"
        margin="normal"
        label="Digite uma senha"
        variant="outlined"
        size="small"
        error={errorInField.password === 'errorFound'}
        helperText={(errorInField.password === 'errorFound') && "A senha precisa ter ao menos 6 caracteres"}
        onChange={(event: ChangeInput) => handleChange(event)}
        fullWidth
      />

      {
        isLoading ?
          <CircularProgress /> :
          <div className={styles.containerButtonRegister}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleRegisterUser}
              disabled={buttonDisabled() ? true : false}
            >
              <span className={styles.buttonRegister}>
                cadastrar
              </span>
            </Button>
          </div>
      }
    </form>
  )
}