import { ReactNode, createContext, useState } from 'react'

interface ClientsContextType {
  accessToken: string
  saveUserAccessToken: (token: string) => void
}

interface ClientsProviderProps {
  children: ReactNode
}

export const ClientsContext = createContext({} as ClientsContextType)

export function ClientsProvider({ children }: ClientsProviderProps) {
  const [accessToken, setAccessToken] = useState<string>('')
  console.log('accessToken ====', accessToken)

  const saveUserAccessToken = (token: string) => {
    setAccessToken(token)
  }

  return (
    <ClientsContext.Provider value={{ accessToken, saveUserAccessToken }}>
      {children}
    </ClientsContext.Provider>
  )
}
