import isJwtExpired from "../constants/isJwtExpired"
import React, {useState, createContext, useContext, useEffect} from "react"
import { Cookies, useCookies } from "react-cookie"
export const AuthContext = createContext({})
export const useAuth =  () => useContext(AuthContext)

export const AuthProvider= ({children})=> {
   const [, setCookie, removeCookie]= useCookies(["token"])
   const [token, setToken] = useState("")

   useEffect(() => {
      const cookies = new Cookies()
      const token = cookies.get("token")
      setToken(isJwtExpired(token)? "none": token)
   }, [])

   const authenticate = async (token) => {
      try{
         setCookie("token", token)
         setToken(token)
         return Promise.resolve("")
      } catch (error) {
         removeCookie("token")
         return null
      }
   }
   const logout =  () => {
      
         removeCookie("token")
         setToken("none")
      }
   return (
      <AuthContext.Provider value={{
         token, setToken,authenticate, logout
      }}>
         {children}
      </AuthContext.Provider>
   )
}