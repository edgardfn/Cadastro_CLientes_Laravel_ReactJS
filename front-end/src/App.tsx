import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './themes/default'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { ClientsProvider } from './contexts/ClientsContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <ClientsProvider>
          <Router />
        </ClientsProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
