import AppContext from "@/_context/AppContext"
import { useContext } from "react"

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within <AppContextProvider>')
  return ctx
}