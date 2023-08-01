import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/components'
import { Clients } from './pages/Clients/components'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/clients" element={<Clients />} />
      </Route>
    </Routes>
  )
}
