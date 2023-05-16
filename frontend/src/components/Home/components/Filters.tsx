import { useState, useContext, useEffect } from 'react'
import { Button, TextField } from '@mui/material'

// Hooks and contexts
import { useUserDataSession } from '../../../hooks/useUserDataSession'
import { TaskContext } from '../../../context/taskContext'

// Types
import { ChangeInput } from '../../../@types'

// Utils
import { dateFormat } from '../../../utils/dateFormat'

// Styles and images
import styles from '../styles/filters.module.css'

export function Filters() {
  const [searchTitle, setSearchTitle] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [activedFilter, setActivedFilter] = useState(false)
  const { verifyAuthentication } = useUserDataSession()
  const { tasksFilter, getTasks } = useContext(TaskContext)

  useEffect(() => {
    verifyAuthentication()
  }, [])

  function handleChange(event: ChangeInput): void {
    const { value, name } = event.target

    if (name === 'title') {
      setSearchTitle(value)
    }

    if (name === 'date') {
      setSearchDate(value)
    }
  }
  
  function handleTasksFilter() {
    const date = searchDate ? dateFormat(searchDate) : ''

    tasksFilter(searchTitle, date)
    setActivedFilter(true)
  }

  function handleClearFilter() {
    setActivedFilter(true)
    setSearchDate('')
    setSearchTitle('')
    getTasks()
    setActivedFilter(false)
  }

  return (
    <div className={styles.containerFilters}>
      <h3>
        Filtros de pesquisa
      </h3>

      <div>
        <label>
          Busque por título
          <TextField
            id="outlined-basic"
            name="title"
            value={searchTitle}
            variant="outlined"
            size="small"
            onChange={(event: ChangeInput) => handleChange(event)}
            sx={{
              width: '15rem',
              alignSelf: 'end'
            }}
          />
        </label>

        <label>
          Data de criação
          <TextField
            type="date"
            id="outlined-basic"
            name="date"
            value={searchDate}
            variant="outlined"
            size="small"
            onChange={(event: ChangeInput) => handleChange(event)}
            sx={{ width: '11rem' }}
          />
        </label>

        <Button
          onClick={handleTasksFilter}
          variant="contained"
          sx={{
            alignSelf: 'end',
            padding: '0.5rem',
            marginLeft: '1rem',
            fontWeight: 'bolder'
          }}
        >
          Pesquisar
        </Button>

        {
          activedFilter &&
          <Button
            onClick={handleClearFilter}
            variant="contained"
            sx={{
              alignSelf: 'end',
              padding: '0.5rem',
              marginLeft: '1rem',
              fontWeight: 'bolder'
            }}
          >
            Limpar filtro
          </Button>
        }
      </div>
    </div>
  )
}