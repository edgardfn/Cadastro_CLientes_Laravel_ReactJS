import { useCallback, useContext, useState } from 'react'
import { LoginContainer } from './styles'
import { api } from '../../../lib/axios'
import { Alert } from '@mui/material'
import axios from 'axios'
import { ClientsContext } from '../../../contexts/ClientsContext'
import { useNavigate } from 'react-router-dom'

interface LoginData {
  email: string
  password: string
}

export function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const {
    saveUserAccessToken,
    errorAlert,
    errorText,
    changeStateErrorAlert,
    changeTextError,
  } = useContext(ClientsContext)

  const navigate = useNavigate()

  /**
   * Váriavel que controla o desabilitar do botão de submit do form de login, de acordo com preenchimento dos campos email e senha:
   * @var disableSubmitLoginButton
   */
  let disableSubmitLoginButton = false
  if (email === '' || password === '') {
    disableSubmitLoginButton = true
  }

  const handleLogin = () => {
    event?.preventDefault()
    const data = { email, password }
    userLogin(data)
  }

  /**
   * Realizar a chamada post para realizar o login do usuário:
   * @constructor
   */
  const userLogin = useCallback(async (data: LoginData) => {
    const { email, password } = data

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })
      saveUserAccessToken(response.data.access_token)
      const tokenJason = JSON.stringify(response.data.access_token)
      localStorage.removeItem('@loremIpsulum-Clients:acess-token-user-1.0.0')
      localStorage.setItem(
        '@loremIpsulum-Clients:acess-token-user-1.0.0',
        tokenJason,
      )
      navigate('/clients')
    } catch (e) {
      let message = ''
      if (axios.isAxiosError(e)) {
        message = e.response?.data.error
      } else {
        message = 'Erro ao realizar o login!'
      }

      changeTextError(message)
      changeStateErrorAlert(true)
    }
  }, [])

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
      <LoginContainer>
        <form action="" onSubmit={handleLogin}>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={disableSubmitLoginButton} type="submit">
            Entrar
          </button>
        </form>
      </LoginContainer>
    </>
  )
}
