import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateNewPassword from './pages/CreateNewPassword'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import CreateClientsPage from './pages/CreateClientsPage'
import ExperimentHistory from './pages/ExperimentHistory'
import ExpDetails from './pages/ExpDetails'
import NewClient from './components/NewClient'
import Redirect from "./components/utils/Redirect"
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Redirect to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/experiment-details"
          element={
            <PrivateRoute>
              <ExpDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-client"
          element={
            <PrivateRoute>
              <NewClient />
            </PrivateRoute>
          }
        />
        <Route
          path="/experiment-details"
          element={
            <PrivateRoute>
              <ExpDetails />
            </PrivateRoute>
          }
        />
        <Route path="/new-password" element={<CreateNewPassword />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/create-client"
          element={
            <PrivateRoute>
              <CreateClientsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/client-history"
          element={
            <PrivateRoute>
              <ExperimentHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App
