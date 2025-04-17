import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Admin from './pages/Admin'
import { ThemeProvider } from "@/context/ThemeContext"
import { useUser } from './context/UserContext'
import Manager from './pages/Manager'

const App = () => {
  const { userInfo } = useUser();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        {userInfo ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/manager/users' element={<Manager />} />
            <Route path='/manager/sales' element={<Manager />} />
            <Route path='/admin/users' element={<Admin />} />
            <Route path='/admin/sales' element={<Admin />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Login />} />
          </>
        )}
      </Routes>
    </ThemeProvider >
  )
}

export default App