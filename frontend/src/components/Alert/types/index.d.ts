export type AlertProps = {
  handleClose: () => void
  open: boolean
  severity: SeverityType
  description: string
  autoHideDuration?: number
}

type SeverityType = 'error' | 'info' | 'warning' | 'success'