import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableCell,
  TableHead,
} from '@mui/material'

// Components
import { TableActions } from './TableActions'
import { PaginationComponent } from './Pagination'

// Types
import { TaskListProps } from '../types/taskList'

export function TaskList({
  taskData,
  openEditTaskModal,
  openDeleteTaskModal
}: TaskListProps) {
  return (
    <>
      {
        taskData?.tasks.length ?
          <TableContainer
            component={Paper}
            sx={{ marginTop: '3.5rem' }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Título</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Data de criação</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taskData?.tasks.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.created_at}</TableCell>
                    <TableCell align="center">
                      <TableActions
                        openEditTaskModal={() => openEditTaskModal(row.id, row.title, row.description)}
                        openDeleteTaskModal={() => openDeleteTaskModal(row.id, row.title)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <PaginationComponent />
          </TableContainer> :
          <h1>
            Sem tarefas criadas no momento :/
          </h1>
      }
    </>
  )
}