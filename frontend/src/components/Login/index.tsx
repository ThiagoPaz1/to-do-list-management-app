import { useNavigate } from 'react-router-dom'
import { Link } from '@mui/material'
import { useState } from 'react'

// Components
import { FormLogin } from './components/FormLogin'
import { AlertComponent } from '../Alert'

// Services
import { singIn } from '../../services/users/singIn'

// Types
import { FoundError } from './types'

// Styles and images
import styles from './styles/login.module.css'

export function Login() {
  const [foundError, setFoundError] = useState<FoundError>({} as FoundError)
  const navigate = useNavigate()

  function handleRedirectForRegisterPage() {
    navigate('/register')
  }

  async function handleSingIn(email: string, password: string) {
    const data = await singIn(email, password)

    if (!data) {
      setFoundError({
        found: true,
        descriptionError: 'E-mail ou senha inválidos'
      })
      
      return
    }

    localStorage.setItem('userDataSession', JSON.stringify(data))
    navigate('/')
  }

  return (
    <div className={styles.containerLogin}>
      {
        foundError?.found &&
          <AlertComponent
            open={foundError?.found}
            handleClose={() => setFoundError({ ...foundError, found: false })}
            severity="error"
            description={foundError?.descriptionError}
          />
        }

        <h1>
          Login
        </h1>
        <FormLogin singIn={handleSingIn} foundError={setFoundError} />
        <Link
          onClick={handleRedirectForRegisterPage}
          sx={{marginTop: '1rem', cursor: 'pointer'}}
        >
          Não tem conta ? Clique aqui e cadastre-se
        </Link>
    </div>
  )
}