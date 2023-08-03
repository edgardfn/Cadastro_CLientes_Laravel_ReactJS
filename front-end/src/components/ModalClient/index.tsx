import { Box, Modal } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ButtonAddNewClient, ContainerModalHeader, InputDate } from './styles'
import { XCircle } from 'phosphor-react'
import { ClientsContext } from '../../contexts/ClientsContext'

export interface PostClientData {
  name: string
  email: string
  birthdate: string | null
  id?: number
}

interface PropsModalClient {
  open: boolean
  handleClose: () => void
  handleClickAdd: ({ birthdate, email, name }: PostClientData) => void
  headerText: string
  buttonText: string
  action: 'add' | 'edit'
}

export function ModalClient({
  handleClose,
  open,
  handleClickAdd,
  action,
  buttonText,
  headerText,
}: PropsModalClient) {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [birthdate, setBirthDate] = useState<string | null>(null)

  const { getDataClient, clientIdSelected, dataClientSelected } =
    useContext(ClientsContext)

  useEffect(() => {
    if (action === 'edit' && clientIdSelected && clientIdSelected) {
      getDataClient(clientIdSelected)
    }
  }, [action, clientIdSelected])

  useEffect(() => {
    console.log('dataClientSelected ===', dataClientSelected)
    if (
      action === 'edit' &&
      dataClientSelected !== null &&
      dataClientSelected !== undefined
    ) {
      setName(dataClientSelected.name)
      setEmail(dataClientSelected.email)
      setBirthDate(dataClientSelected.birthdate)
    }
  }, [dataClientSelected])

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#202024',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  }

  let disableButtonAddNewClient = false
  if (name === '' || email === '') {
    disableButtonAddNewClient = true
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <ContainerModalHeader>
          <h2 id="parent-modal-title">{headerText}</h2>
          <XCircle size={32} onClick={handleClose} />
        </ContainerModalHeader>

        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          type="text"
          placeholder="Digite o nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          type="email"
          placeholder="Digite o e-mail"
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
        />

        <label htmlFor="birthdate">Data de Nascimento:</label>
        <InputDate
          id="birthdate"
          type="date"
          placeholder="Digite o e-mail"
          onChange={(e) => setBirthDate(e.target.value)}
          value={birthdate || ''}
        />
        <ButtonAddNewClient
          onClick={() =>
            handleClickAdd(
              action === 'edit' && clientIdSelected !== null
                ? { birthdate, email, name, id: clientIdSelected }
                : { birthdate, email, name },
            )
          }
          disabled={disableButtonAddNewClient}
        >
          {buttonText}
        </ButtonAddNewClient>
      </Box>
    </Modal>
  )
}
