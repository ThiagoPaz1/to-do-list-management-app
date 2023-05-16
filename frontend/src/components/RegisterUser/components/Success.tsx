import { useNavigate } from 'react-router-dom'
import { Link } from '@mui/material'
import { Check } from '@mui/icons-material'

// Styles and images
import styles from '../styles/success.module.css'

const successIconStyle = {
  fontSize: 100,
  border: '2px #2F7D32 solid',
  borderRadius: '50%',
  marginBottom: '1rem'
}

export function Success() {
  const navigate = useNavigate()

  function handleRedirectForLoginPage() {
    navigate('/login')
  }

  return (
    <div className={styles.containerSuccess}>
      <Check color="success" sx={successIconStyle} />
      <h2>
        Cadastro realizado com sucesso!
      </h2>
      <Link
        onClick={handleRedirectForLoginPage}
        sx={{cursor: 'pointer'}}
      >
        Clique aqui para ir para a página de login
      </Link>
    </div>
  )
}