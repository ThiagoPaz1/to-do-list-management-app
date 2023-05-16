import { useState } from 'react'
import { TextField, Button } from '@mui/material'

// Types
import { FormLoginProps, UserDataForLogin } from '../types'
import { ChangeInput } from '../../../@types'

// Styles
import styles from '../styles/formLogin.module.css'

export function FormLogin({ singIn, foundError }: FormLoginProps) {
  const [userDataForLogin, setUserDataForLogin] = useState<UserDataForLogin>({} as UserDataForLogin)

  function handleChange(event: ChangeInput): void {
    const { value, name } = event.target

    setUserDataForLogin({
      ...userDataForLogin,
      [name]: value
    })
  }

  function verifyIsOkFieldsValues(userData: UserDataForLogin): boolean {
    const { email, password } = userData
    
    if (!email || !password) {
      foundError({
        found: true,
        descriptionError: 'Todos os campos são de preenchimento obrigatório'
      })

      return false
    } else {
      return true
    }
  }

  function handleSingIn() {
    if (verifyIsOkFieldsValues(userDataForLogin)) {
      singIn(userDataForLogin.email, userDataForLogin.password)
    }
  }

  return (
    <form className={styles.containerFormLogin}>
      <TextField
        id="outlined-basic"
        name="email"
        label="Digite seu e-mail"
        variant="outlined"
        margin="normal"
        size="small"
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
        onChange={(event: ChangeInput) => handleChange(event)}
        fullWidth
      />

      <Button
        size="small"
        variant="contained"
        onClick={handleSingIn}
        sx={{
          width: '10rem',
          marginTop: '1rem',
          fontWeight: 'bolder',
          fontSize: '1em'
        }}
      >
        Entrar
      </Button>
    </form>
  )
}