import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { UserProvider } from './context/UserContext'
import { AdminProvider } from './context/AdminContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </UserProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
