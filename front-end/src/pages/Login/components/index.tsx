import { useState } from 'react'
import { LoginContainer } from './styles'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let disableSubmitLoginButton = false
  if (email === '' || password === '') {
    disableSubmitLoginButton = true
  }

  const handleLogin = () => {
    event.preventDefault()
    console.log('Submit form')
  }

  return (
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
  )
}
