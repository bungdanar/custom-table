import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import ClientSideTablePage from './pages/client-side-table-page/ClientSideTablePage'
import HomePage from './pages/home/Home'
import ServerSideTablePage from './pages/server-side-table-page/ServerSideTablePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/client-side-table' element={<ClientSideTablePage />} />
      <Route path='/server-side-table' element={<ServerSideTablePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

function NotFoundPage() {
  return <div style={{ textAlign: 'center' }}>Page Not Found</div>
}
