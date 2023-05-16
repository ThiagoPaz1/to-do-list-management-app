import { Snackbar, Alert } from '@mui/material'

// Types
import { AlertProps } from './types'

export function AlertComponent({
  description,
  open,
  handleClose,
  severity,
  autoHideDuration
}: AlertProps) {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={autoHideDuration ? autoHideDuration: 5000}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
      >
        { description }
      </Alert>
    </Snackbar>
  )
}