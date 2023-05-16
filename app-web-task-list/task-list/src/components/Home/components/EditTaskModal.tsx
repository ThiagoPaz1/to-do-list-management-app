import { useState, useEffect, useContext } from 'react'
import {
  Modal,
  Button,
  TextField,
  CircularProgress
} from '@mui/material'

// Components
import { SuccessTask } from './SuccessTask'

// Service
import { taskUpdate } from '../../../services/tasks'

// Hooks and contexts
import { useUserDataSession } from '../../../hooks/useUserDataSession'
import { TaskContext } from '../../../context/taskContext'

// Types 
import { TaskData, ErrorInFields, EditTaskModalProps } from '../types'
import { ChangeInput } from '../../../@types'

// Styles and images
import styles from '../styles/editTaskModal.module.css'

const defautlValuesErrorInField: ErrorInFields = {
  title: 'notVerified',
  description: 'notVerified',
}

export function EditTaskModal({
  id,
  title,
  description,
  open,
  onClose
}: EditTaskModalProps) {
  const [taskData, setTaskData] = useState<TaskData>({} as TaskData)
  const [errorInField, setErrorInField] = useState<ErrorInFields>(defautlValuesErrorInField)
  const [isLoading, setIsLoading] = useState(false)
  const [taskUpdated, setTaskUpdated] = useState(false)
  const { verifyAuthentication, token } = useUserDataSession()
  const { getTasks } = useContext(TaskContext)

  useEffect(() => {
    verifyAuthentication()
    setTaskData({ title, description })
  }, [])

  useEffect(() => {
    validateFieldsValues(taskData)
  }, [taskData])

  function handleChange(event: ChangeInput): void {
    const { value, name } = event.target

    setTaskData({
      ...taskData,
      [name]: value
    })
  }

  function validateFieldsValues(taskData: TaskData) {
    const { title, description } = taskData

    if (title?.length < 2) {
      setErrorInField({
        ...errorInField,
        title: 'errorFound'
      })
    } else if (errorInField.title !== 'verifiedOk' && title?.length >= 2) {
      setErrorInField({
        ...errorInField,
        title: 'verifiedOk'
      })
    }

    if (description?.length < 2) {
      setErrorInField({
        ...errorInField,
        description: 'errorFound'
      })
    } else if (errorInField.description !== 'verifiedOk' && description?.length >= 2) {
      setErrorInField({
        ...errorInField,
        description: 'verifiedOk'
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

  async function handleTaskUpdate() {
    setIsLoading(true)

    await taskUpdate(token, id, taskData)
    
    getTasks()
    setIsLoading(false)
    setTaskUpdated(true)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.containerEditTaskModal}>
        {
          taskUpdated ?
            <SuccessTask message="Tarefa editada com sucesso!" /> :
            <>
              <h2>
                Crie sua tarefa
              </h2>

              <form>
                <TextField
                  id="outlined-basic"
                  name="title"
                  value={taskData.title}
                  label="Digite um título"
                  variant="outlined"
                  size="small"
                  error={errorInField.title === 'errorFound'}
                  helperText={(errorInField.title === 'errorFound') && "O título precisa ter ao menos 2 caracteres"}
                  onChange={(event: ChangeInput) => handleChange(event)}
                  sx={{ width: '90%' }}
                />

                <TextField
                  id="outlined-basic"
                  name="description"
                  value={taskData.description}
                  margin="dense"
                  label="Digite uma descrição"
                  variant="outlined"
                  size="small"
                  error={errorInField.description === 'errorFound'}
                  helperText={(errorInField.description === 'errorFound') && "A descrição precisa ter ao menos 2 caracteres"}
                  onChange={(event: ChangeInput) => handleChange(event)}
                  sx={{ width: '90%' }}
                />

                {
                  isLoading ?
                    <CircularProgress /> :
                    <div className={styles.containerButtons}>
                      <Button
                        color="success"
                        variant="contained"
                        onClick={handleTaskUpdate}
                        disabled={buttonDisabled()}
                        sx={{
                          width: '40%',
                          fontWeight: 'bolder',
                        }}
                      >
                        Salvar mudanças
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
              </form>
            </>
        }
      </div>
    </Modal>
  )
}