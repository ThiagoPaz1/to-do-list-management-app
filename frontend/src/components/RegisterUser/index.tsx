import { useState } from 'react'

// Components
import { UserForm } from './components/UserForm'
import { Success } from './components/Success'

// Services
import { createNewUser } from '../../services/users'

// Types
import { UserData } from './types'

// Styles and images
import styles from './styles/register.module.css'

export function RegisterUser() {
  const [userCreated, setUserCreated] = useState(false)

  async function handleCreateUser(user: UserData): Promise<void> {
    await createNewUser(user)
    setUserCreated(true)
  }

  return (
    <div className={styles.containerRegister}>
      {
        userCreated ?
          <Success /> :
          <>
            <h1>
              Cadastro
            </h1>
            <UserForm createUser={handleCreateUser} />
          </>
      }
    </div>
  )
}