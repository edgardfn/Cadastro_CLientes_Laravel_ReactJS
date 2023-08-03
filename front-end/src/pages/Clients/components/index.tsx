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
import { ModalClient, PostClientData } from '../../../components/ModalClient'
import moment from 'moment'

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
    setShowAddClientModal,
    showAddClientModal,
    sucessAlert,
    setSucessAlert,
    setSucessText,
    sucessText,
    showEditClientModal,
    setShowEditClientModal,
    changeClient,
    setClientIdSelected,
    deleteClient,
    accessToken,
    setAccessToken,
  } = useContext(ClientsContext)

  useEffect(() => {
    console.log('accessTGOke==', accessToken)
    if (!accessToken || accessToken === '') {
      const storedTokenAsJson = localStorage.getItem(
        '@loremIpsulum-Clients:acess-token-user-1.0.0',
      )
      if (storedTokenAsJson) {
        console.log(
          'JSON.parse(storedTokenAsJson) ===',
          JSON.parse(storedTokenAsJson),
        )
        const token = JSON.parse(storedTokenAsJson)
        setAccessToken(token)
        fetchClients(page, token)
      }
    } else {
      fetchClients(page, accessToken)
    }
  }, [])

  const handleEditClient = (id: number) => {
    setClientIdSelected(id)
    setShowEditClientModal(true)
  }

  const handleDeleteClient = (id: number) => {
    setClientIdSelected(id)
    deleteClient(id)
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

  let rows: Data[] | [] = []
  if (clients) {
    rows = clients.map((client: DataClients) => {
      const newObjectClient: Data = {
        ...client,
        birthdate: client.birthdate
          ? moment(new Date(client.birthdate))
              .add(1, 'day')
              .format('DD/MM/YYYY')
          : null,
        actions: returnActionsButtons(client.id),
      }
      return newObjectClient
    })
  }

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    changePaginationPage(value)
    fetchClients(value, accessToken)
  }

  const closeAddModal = () => {
    setShowAddClientModal(false)
  }

  const closeEditModal = () => {
    setShowEditClientModal(false)
  }

  const addClient = ({ birthdate, email, name }: PostClientData) => {
    addNewClient({ birthdate, email, name })
  }

  const editClient = ({ birthdate, email, name, id }: PostClientData) => {
    changeClient({ birthdate, email, name, id })
  }

  return (
    <>
      {sucessAlert && (
        <Alert
          variant="outlined"
          severity="success"
          onClose={() => {
            setSucessText('')
            setSucessAlert(false)
          }}
        >
          {sucessText}
        </Alert>
      )}
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
      <ModalClient
        handleClose={closeAddModal}
        open={showAddClientModal}
        handleClickAdd={addClient}
        headerText="Adicionar Novo Cliente"
        buttonText="Adicionar"
        action="add"
      />
      <ModalClient
        handleClose={closeEditModal}
        open={showEditClientModal}
        handleClickAdd={editClient}
        headerText="Editar Cliente"
        buttonText="Alterar"
        action="edit"
      />
      <ButtonAddClient onClick={() => setShowAddClientModal(true)}>
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
