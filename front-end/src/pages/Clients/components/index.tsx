import {
  Alert,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import { useContext, useEffect } from 'react'
import { PencilSimple, Trash } from 'phosphor-react'
import { ClientsContext, DataClients } from '../../../contexts/ClientsContext'
import { ButtonAddClient } from './styles'
import {
  ModalEditClient,
  PostClientData,
} from '../../../components/ModalEditClient'

interface Column {
  id: 'id' | 'name' | 'email' | 'birthdate' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

interface Data {
  id: number
  name: string
  email: string
  birthdate: string | null
  actions: JSX.Element
}

export function Clients() {
  const {
    changePaginationPage,
    page,
    fetchClients,
    clients,
    totalPages,
    errorAlert,
    errorText,
    changeStateErrorAlert,
    changeTextError,
    addNewClient,
    setShowEditPostClientModal,
    showEditPostClientModal,
  } = useContext(ClientsContext)

  useEffect(() => {
    fetchClients(page)
  }, [])

  const handleEditClient = (id: number) => {
    console.log('id ===', id)
  }

  const handleDeleteClient = (id: number) => {
    console.log('id ===', id)
  }

  const returnActionsButtons = (id: number) => {
    return (
      <>
        <Tooltip title="Editar" onClick={() => handleEditClient(id)}>
          <IconButton>
            <PencilSimple size={24} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Excluir" onClick={() => handleDeleteClient(id)}>
          <IconButton>
            <Trash size={24} />
          </IconButton>
        </Tooltip>
      </>
    )
  }

  const columns: readonly Column[] = [
    { id: 'id', label: 'Id', minWidth: 50 },
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'email', label: 'E-mail', minWidth: 170 },
    { id: 'birthdate', label: 'Data de Nascimento', minWidth: 100 },
    { id: 'actions', label: '', minWidth: 70 },
  ]

  const rows = clients.map((client: DataClients) => {
    const newObjectClient: Data = {
      ...client,
      actions: returnActionsButtons(client.id),
    }
    return newObjectClient
  })

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    changePaginationPage(value)
    fetchClients(value)
  }

  const closeModal = () => {
    setShowEditPostClientModal(false)
  }

  const addClient = ({ birthdate, email, name }: PostClientData) => {
    console.log('birthdate ====', birthdate)
    console.log('email ====', email)
    console.log('name ====', name)
    addNewClient({ birthdate, email, name })
  }

  return (
    <>
      {errorAlert && (
        <Alert
          variant="outlined"
          severity="error"
          onClose={() => {
            changeTextError('')
            changeStateErrorAlert(false)
          }}
        >
          {errorText}
        </Alert>
      )}
      <ModalEditClient
        handleClose={closeModal}
        open={showEditPostClientModal}
        handleClickAdd={addClient}
      />
      <ButtonAddClient onClick={() => setShowEditPostClientModal(true)}>
        Adicionar
      </ButtonAddClient>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          padding: '2rem',
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={totalPages}
          variant="outlined"
          color="primary"
          page={page}
          onChange={handleChangePage}
        />
      </Paper>
    </>
  )
}
