import React from "react"
import { CookiesProvider } from "react-cookie"
import { AuthProvider } from "./auth-context"

const AppProviders =({children}) => {
   return (
      <CookiesProvider>
         <AuthProvider>
            {children}
         </AuthProvider>
      </CookiesProvider>
   )
}

export default AppProviders