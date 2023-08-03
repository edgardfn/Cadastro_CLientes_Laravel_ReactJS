import { ReactNode, createContext, useCallback, useState } from 'react'
import { api } from '../lib/axios'
import axios from 'axios'
import { PostClientData } from '../components/ModalClient'

export interface DataClients {
  id: number
  name: string
  email: string
  birthdate: string | null
}

interface ClientsContextType {
  accessToken: string
  saveUserAccessToken: (token: string) => void
  page: number
  changePaginationPage: (page: number) => void
  fetchClients: (currentPage: number) => void
  errorAlert: boolean
  errorText: string
  changeStateErrorAlert: (state: boolean) => void
  changeTextError: (text: string) => void
  clients: DataClients[]
  totalPages: number
  addNewClient: ({ birthdate, email, name }: PostClientData) => void
  changeClient: ({ birthdate, email, name, id }: PostClientData) => void
  showAddClientModal: boolean
  setShowAddClientModal: (state: boolean) => void
  sucessAlert: boolean
  setSucessAlert: (state: boolean) => void
  sucessText: string
  setSucessText: (text: string) => void
  showEditClientModal: boolean
  setShowEditClientModal: (state: boolean) => void
  getDataClient: (id: number) => void
  clientIdSelected: number | null
  setClientIdSelected: (id: number) => void
  dataClientSelected: DataClients | null
  setDataClientSelected: (client: DataClients) => void
  deleteClient: (id: number) => void
}

interface ClientsProviderProps {
  children: ReactNode
}

export const ClientsContext = createContext({} as ClientsContextType)

export function ClientsProvider({ children }: ClientsProviderProps) {
  const [accessToken, setAccessToken] = useState<string>('')
  const [page, setPage] = useState(1)
  const [errorAlert, setErrorAlert] = useState<boolean>(false)
  const [sucessAlert, setSucessAlert] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const [sucessText, setSucessText] = useState<string>('')
  const [clients, setClients] = useState<DataClients[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [showAddClientModal, setShowAddClientModal] = useState<boolean>(false)
  const [showEditClientModal, setShowEditClientModal] = useState<boolean>(false)
  const [clientIdSelected, setClientIdSelected] = useState<number | null>(null)
  const [dataClientSelected, setDataClientSelected] =
    useState<DataClients | null>(null)

  const saveUserAccessToken = (token: string) => {
    setAccessToken(token)
  }

  const fetchClients = useCallback(
    async (currentPage = page) => {
      try {
        const response = await api.get(`/clients?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        if (response.data) {
          console.log(response.data)
          setClients(response.data.data)
          setTotalPages(response.data.last_page)
        }
      } catch (e) {
        let message = ''
        if (axios.isAxiosError(e)) {
          message = e.response?.data.error
        } else {
          message = 'Erro ao listar clientes!'
        }

        changeTextError(message)
        changeStateErrorAlert(true)
      }
    },
    [accessToken],
  )

  const addNewClient = useCallback(
    async ({ birthdate, email, name }: PostClientData) => {
      try {
        const response = await api.post(
          `/clients`,
          {
            birthdate,
            email,
            name,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        if (response && response.status === 200) {
          setShowAddClientModal(false)
          setSucessText('Cliente adicionado com sucesso')
          setSucessAlert(true)
          fetchClients(1)
        }
      } catch (e) {
        let message = ''
        if (axios.isAxiosError(e)) {
          message = e.response?.data.error
        } else {
          message = 'Erro ao adicionar cliente!'
        }

        changeTextError(message)
        changeStateErrorAlert(true)
      }
    },
    [accessToken],
  )

  const changeClient = useCallback(
    async ({ birthdate, email, name, id }: PostClientData) => {
      try {
        console.log('dataClientSelected ===', dataClientSelected)
        console.log('clientIdSelected ====', clientIdSelected)
        const response = await api.put(
          `/clients`,
          {
            birthdate,
            email,
            name,
            id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        if (response && response.status === 200) {
          setShowEditClientModal(false)
          setSucessText('Cliente alterado com sucesso')
          setSucessAlert(true)
          fetchClients(1)
        }
      } catch (e) {
        let message = ''
        if (axios.isAxiosError(e)) {
          message = e.response?.data.error
        } else {
          message = 'Erro ao editar cliente!'
        }

        changeTextError(message)
        changeStateErrorAlert(true)
      }
    },
    [accessToken],
  )

  const getDataClient = useCallback(
    async (id: number) => {
      try {
        const response = await api.get(`/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        if (response.data) {
          setDataClientSelected(response.data)
        }
      } catch (e) {
        let message = ''
        if (axios.isAxiosError(e)) {
          message = e.response?.data.error
        } else {
          message = 'Erro ao consultar dados de um cliente!'
        }

        changeTextError(message)
        changeStateErrorAlert(true)
      }
    },
    [accessToken],
  )

  const deleteClient = useCallback(
    async (id: number) => {
      try {
        const response = await api.delete(`/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        if (response.status === 200 && response.statusText === 'OK') {
          setSucessText('Cliente excluído com sucesso !')
          setSucessAlert(true)
          fetchClients(1)
        }
      } catch (e) {
        let message = ''
        if (axios.isAxiosError(e)) {
          message = e.response?.data.error
        } else {
          message = 'Erro ao excluir um cliente!'
        }

        changeTextError(message)
        changeStateErrorAlert(true)
      }
    },
    [accessToken],
  )

  const changePaginationPage = (page: number) => {
    setPage(page)
  }

  const changeStateErrorAlert = (state: boolean) => {
    setErrorAlert(state)
  }

  const changeTextError = (text: string) => {
    setErrorText(text)
  }

  return (
    <ClientsContext.Provider
      value={{
        accessToken,
        saveUserAccessToken,
        page,
        changePaginationPage,
        errorAlert,
        errorText,
        fetchClients,
        changeStateErrorAlert,
        changeTextError,
        clients,
        totalPages,
        addNewClient,
        setShowAddClientModal,
        showAddClientModal,
        setSucessAlert,
        sucessAlert,
        sucessText,
        setSucessText,
        setShowEditClientModal,
        showEditClientModal,
        changeClient,
        getDataClient,
        clientIdSelected,
        setClientIdSelected,
        dataClientSelected,
        setDataClientSelected,
        deleteClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  )
}
