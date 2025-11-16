import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export function useAuth(){
  return useContext(AuthContext)
}

export default function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const raw = localStorage.getItem('auth')
    if (raw){
      try{
        const parsed = JSON.parse(raw)
        setUser(parsed.user)
        setToken(parsed.token)
      }catch(e){/* ignore */}
    }
  },[])

  function save(auth){
    setUser(auth.user)
    setToken(auth.token)
    localStorage.setItem('auth', JSON.stringify(auth))
  }

  async function login(email, password){
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')
    save({ user: data.user, token: data.token })
    return data
  }

  async function register(name, email, password){
    const res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Registration failed')
    save({ user: data.user, token: data.token })
    return data
  }

  function logout(){
    setUser(null); setToken(null); localStorage.removeItem('auth'); navigate('/')
  }

  function authFetch(url, opts={}){
    const headers = opts.headers ? { ...opts.headers } : {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    return fetch(url, { ...opts, headers })
  }

  const value = { user, token, login, register, logout, authFetch }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
