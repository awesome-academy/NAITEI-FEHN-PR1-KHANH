import React from 'react'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User, AuthResponse } from '../interfaces/User'
import { authService } from '../services/authService'

interface AuthContextType {
  currentUser: Omit<User, 'password'> | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<AuthResponse>
  register: (userData: User) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Omit<User, 'password'> | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const auth = authService.getCurrentUser()
    if (auth) {
      setCurrentUser(auth.user)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password })
    setCurrentUser(response.user)
    setIsAuthenticated(true)
    return response
  }

  const register = async (userData: User): Promise<void> => {
    await authService.register(userData)
  }

  const logout = () => {
    authService.logout()
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  const value = React.useMemo(
    () => ({
      currentUser,
      isAuthenticated,
      login,
      register,
      logout
    }),
    [currentUser, isAuthenticated, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
