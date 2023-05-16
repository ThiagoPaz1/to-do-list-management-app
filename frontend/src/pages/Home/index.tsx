// Componentes
import { Home } from '../../components/Home'  

// Hooks and contexts
import { TasksProvider } from '../../context/taskContext'

export function HomePage() {
  return (
    <TasksProvider>
      <Home />
    </TasksProvider>
  )
}