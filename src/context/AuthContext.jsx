import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { usersApi } from '../api/api'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const saved = localStorage.getItem('auth_user')
    if (saved) { try { setUser(JSON.parse(saved)) } catch {} }
    setLoading(false)
  }, [])
  const login = async (username, password) => {
    const data = await usersApi.login(username, password)
    const authUser = { id: data.id, username: data.username, firstName: data.firstName, lastName: data.lastName, email: data.email, token: data.accessToken, role: data.username === 'emilys' ? 'admin' : 'user' }
    setUser(authUser); localStorage.setItem('auth_user', JSON.stringify(authUser)); return authUser
  }
  const register = async (payload) => {
    const data = await usersApi.register(payload)
    const authUser = { id: data.id, username: data.username, firstName: data.firstName, lastName: data.lastName, email: data.email, token: 'mock', role: 'user' }
    setUser(authUser); localStorage.setItem('auth_user', JSON.stringify(authUser)); return authUser
  }
  const logout = () => { setUser(null); localStorage.removeItem('auth_user') }
  const isAdmin = user?.role === 'admin'
  return <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
