import React from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../context/auth-context'

const PrivateRoute = ({children}) => {
   const location = useLocation()
   const {token} = useAuth()
  return token && token !== "none" ? (
   <>{children}</>
  ): !token ? (
   <></>
  ):(
   <Navigate to="/login" state={{from: location.pathname}} />
  )
}

export default PrivateRoute