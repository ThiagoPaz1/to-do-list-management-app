import { useEffect, useState, useContext } from 'react'
import { Button, CircularProgress } from '@mui/material'

// Components
import { Profile } from './components/Profile'
import { CreateTaskModal } from './components/CreateTaskModal'
import { TaskList } from './components/TaskList'
import { EditTaskModal } from './components/EditTaskModal'
import { DeleteTaskModal } from './components/DeleteTaskModal'

// Hooks and contexts
import { useUserDataSession } from '../../hooks/useUserDataSession'
import { TaskContext } from '../../context/taskContext'
import { EditTaskModalData, DeleteTaskModalData } from './types'

// Styles and images
import styles from './styles/home.module.css'

export function Home() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)
  const [showEditTaskModal, setShowEditTaskModal] = useState(false)
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false)
  const [editTaskModalData, setEditTaskModalData] = useState<EditTaskModalData>({} as EditTaskModalData)
  const [deleteTaskModalData, setDeleteTaskModalData] = useState<DeleteTaskModalData>({} as DeleteTaskModalData)
  const { verifyAuthentication, userData, token } = useUserDataSession()
  const { getTasks, tasks } = useContext(TaskContext)

  useEffect(() => {
    verifyAuthentication()
    getTasks()
  }, [])

  function handleEditTaskModalData(id: string, title: string, description: string) {
    setShowEditTaskModal(true)
    setEditTaskModalData({id, title, description})
  }

  function handleDeleteTaskModalData(id: string, title: string) {
    setShowDeleteTaskModal(true)
    setDeleteTaskModalData({id, title})
  }

  return (
    <div className={styles.containerHome}>
      <Profile userName={userData?.name as string} />

      <h1>
        Gerenciador de tarefas
      </h1>

      <div>
        <Button
          variant="contained"
          onClick={() => setShowCreateTaskModal(true)}
          sx={{fontWeight: 'bolder', marginTop: '2rem'}}
        >
          Criar nova tarefa
        </Button>
      </div>

      {
        tasks?.tasks ?
        <TaskList
          taskData={tasks}
          openEditTaskModal={handleEditTaskModalData}
          openDeleteTaskModal={handleDeleteTaskModalData}
        /> :
        <CircularProgress size={80} sx={{marginTop: '5rem'}}/>
      }

      {
        showCreateTaskModal &&
        <CreateTaskModal
          token={token}
          openModal={showCreateTaskModal}
          closeModal={() => setShowCreateTaskModal(false)}
        />
      }


      {
        showEditTaskModal &&
        <EditTaskModal
          id={editTaskModalData?.id}
          title={editTaskModalData?.title}
          description={editTaskModalData?.description}
          open={showEditTaskModal}
          onClose={() => setShowEditTaskModal(false)}
        />
      }

      {
        <DeleteTaskModal
          id={deleteTaskModalData.id}
          title={deleteTaskModalData.title}
          open={showDeleteTaskModal}
          onClose={() => setShowDeleteTaskModal(false)}
        />
      }
    </div>
  )
}