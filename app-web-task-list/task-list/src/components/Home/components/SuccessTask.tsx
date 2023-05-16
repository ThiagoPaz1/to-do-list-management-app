import { Check } from '@mui/icons-material'

// Types
import { SuccessProps } from "../types"

// Styles and images
import styles from '../styles/successTask.module.css'

const successIconStyle = {
  fontSize: '6em',
  border: '2px #2F7D32 solid',
  borderRadius: '50%',
  marginTop: '1rem'
}

export function SuccessTask({ message }: SuccessProps) {
  
  return (
    <div className={styles.containerSuccessTask}>
      <Check color="success" sx={successIconStyle} />
      <h2>
        { message }
      </h2>
    </div>
  )
}