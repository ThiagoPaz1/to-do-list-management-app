import { useEffect, useState, useContext } from 'react'
import {
  Modal,
  Button,
  CircularProgress
} from '@mui/material'


// Components
import { SuccessTask } from './SuccessTask'

// Service
import { taskDelete} from '../../../services/tasks'

// Hooks and contexts
import { useUserDataSession } from '../../../hooks/useUserDataSession'
import { TaskContext } from '../../../context/taskContext'

// Types
import { DeleteTaskModalProps } from '../types'

// Styles and images
import styles from '../styles/deleteTaskModal.module.css'

export function DeleteTaskModal({
  id,
  title,
  open,
  onClose
}: DeleteTaskModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [taskDeleted, setTaskDeleted] = useState(false)
  const { verifyAuthentication, token } = useUserDataSession()
  const { getTasks } = useContext(TaskContext)

  useEffect(() => {
    verifyAuthentication()
  }, [])

  async function handleTaskDelete() {
    setIsLoading(true)

    await taskDelete(token, id)
    
    getTasks()
    setIsLoading(false)
    setTaskDeleted(true)
  }

  function handleOnClose() {
    onClose()
    setTaskDeleted(false)
  }

  return (
    <Modal open={open} onClose={handleOnClose}>
      <div className={styles.containerDeleteTaskModal}>
        {
          taskDeleted ?
          <SuccessTask message="Tarefa excluída com sucesso!" /> :
          <>
            <h2>
              Tem certeza que deseja apagar a tarefa { title } ?
            </h2>

            {
                  isLoading ?
                    <CircularProgress /> :
                    <div className={styles.containerButtons}>
                      <Button
                        variant="contained"
                        onClick={handleTaskDelete}
                        sx={{
                          width: '40%',
                          fontWeight: 'bolder',
                        }}
                      >
                        Confirmar
                      </Button>

                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => onClose()}
                        sx={{
                          width: '40%',
                          marginLeft: '1rem',
                          fontWeight: 'bolder',
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                }
          </>
        }
      </div>
    </Modal>
  )
}