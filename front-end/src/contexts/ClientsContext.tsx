import { ReactNode, createContext, useCallback, useState } from 'react'
import { api } from '../lib/axios'
import axios from 'axios'
import { PostClientData } from '../components/ModalEditClient'

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
  showEditPostClientModal: boolean
  setShowEditPostClientModal: (state: boolean) => void
}

interface ClientsProviderProps {
  children: ReactNode
}

export const ClientsContext = createContext({} as ClientsContextType)

export function ClientsProvider({ children }: ClientsProviderProps) {
  const [accessToken, setAccessToken] = useState<string>('')
  const [page, setPage] = useState(1)
  const [errorAlert, setErrorAlert] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const [clients, setClients] = useState<DataClients[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [showEditPostClientModal, setShowEditPostClientModal] =
    useState<boolean>(false)

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
          setShowEditPostClientModal(false)
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
        setShowEditPostClientModal,
        showEditPostClientModal,
      }}
    >
      {children}
    </ClientsContext.Provider>
  )
}
