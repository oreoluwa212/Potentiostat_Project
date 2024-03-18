import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateNewPassword from './pages/CreateNewPassword'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import CreateClientsPage from './pages/CreateClientsPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Dashboard/>} />
        <Route path="/new-password" element={<CreateNewPassword />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/create-client" element={<CreateClientsPage />} />

      </Routes>
    </>
  )
}

export default App
