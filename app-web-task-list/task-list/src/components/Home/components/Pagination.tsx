import { useEffect, useState, ChangeEvent, useContext } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Pagination
} from '@mui/material'

// Hooks and contexts
import { TaskContext } from '../../../context/taskContext'

// Styles and images
import styles from '../styles/pagination.module.css'

export function PaginationComponent() {
  const [pageSize, setPageSize] = useState('10')
  const [page, setPage] = useState(1)
  const { getTasks, tasks } = useContext(TaskContext)

  useEffect(() => {
    getTasks(String(page), String(pageSize))
  }, [pageSize, page])

  const handleChangePageSize = (event: SelectChangeEvent) => {
    setPageSize(event.target.value)
  }

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <div className={styles.containerPagination}> 
      <h3>
        Quantidade de tarefas por página:
      </h3>
      <Box sx={{marginLeft: '1rem'}}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            Tarefas
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={String(pageSize)}
            label="Age"
            onChange={handleChangePageSize}
            sx={{ width: '5rem', height: '3rem' }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Pagination
        count={tasks.totalPages}
        page={page} 
        onChange={handleChange}
        sx={{alignSelf: 'center', marginLeft: '10rem'}}
      />
    </div>
  )
}