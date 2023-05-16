import { Button } from '@mui/material'

// Types
import { TableActionsProps } from '../types'

export function TableActions({ openEditTaskModal, openDeleteTaskModal }: TableActionsProps) {
  return (
    <div>
      <Button
        onClick={() => openEditTaskModal()}
        variant="contained"
      >
        Editar
      </Button>
      <Button
        onClick={() => openDeleteTaskModal()}
        variant="contained"
        color="error"
        sx={{ marginLeft: '1rem' }}
      >
        Apagar
      </Button>
    </div>
  )
}