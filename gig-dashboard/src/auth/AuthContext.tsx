import React, { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User, AccountType } from '../types.d'

type AuthContextType = {
  user: User | null
  token: string | null
  signup: (payload: { name: string; email: string; password: string; accountType: AccountType }) => Promise<{ token: string; user: User }>
  login: (payload: { email: string; password: string }) => Promise<{ token: string; user: User }>
  logout: () => void
  updateProfile: (updates: Partial<Pick<User, 'name' | 'email' | 'password' | 'accountType'>>) => Promise<User>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_USERS = '_gp_users_v1'
const STORAGE_TOKEN = 'gp_token'
const STORAGE_USER = 'gp_user'

function delay(ms = 300) {
  return new Promise((res) => setTimeout(res, ms))
}

async function fakeSignup({ name, email, password, accountType }: { name: string; email: string; password: string; accountType: AccountType }) {
  await delay()
  const users: User[] = JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]')
  if (users.find((u) => u.email === email)) {
    const e = new Error('Email already registered')
    ;(e as any).code = 'EMAIL_EXISTS'
    throw e
  }
  const user: User = { id: Date.now(), name, email, password, accountType, createdAt: new Date().toISOString() }
  users.push(user)
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users))
  const token = btoa(JSON.stringify({ id: user.id, t: Date.now() }))
  localStorage.setItem(STORAGE_TOKEN, token)
  localStorage.setItem(STORAGE_USER, JSON.stringify(user))
  return { token, user }
}

async function fakeLogin({ email, password }: { email: string; password: string }) {
  await delay()
  const users: User[] = JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]')
  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) {
    const e = new Error('Invalid credentials')
    ;(e as any).code = 'INVALID_CREDENTIALS'
    throw e
  }
  const token = btoa(JSON.stringify({ id: user.id, t: Date.now() }))
  localStorage.setItem(STORAGE_TOKEN, token)
  localStorage.setItem(STORAGE_USER, JSON.stringify(user))
  return { token, user }
}

async function fakeUpdateProfile(updates: Partial<Pick<User, 'name' | 'email' | 'password' | 'accountType'>>) {
  await delay()
  const raw = localStorage.getItem(STORAGE_USER)
  if (!raw) throw new Error('Not authenticated')
  const current: User = JSON.parse(raw)
  const users: User[] = JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]')
  const idx = users.findIndex((u) => u.id === current.id)
  const updated = { ...current, ...updates }
  if (idx >= 0) users[idx] = updated
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users))
  localStorage.setItem(STORAGE_USER, JSON.stringify(updated))
  return updated
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(STORAGE_USER)
    return raw ? (JSON.parse(raw) as User) : null
  })
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_TOKEN))

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_USER) setUser(e.newValue ? (JSON.parse(e.newValue) as User) : null)
      if (e.key === STORAGE_TOKEN) setToken(e.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  async function signup(payload: { name: string; email: string; password: string; accountType: AccountType }) {
    const res = await fakeSignup(payload)
    setUser(res.user)
    setToken(res.token)
    return res
  }

  async function login(payload: { email: string; password: string }) {
    const res = await fakeLogin(payload)
    setUser(res.user)
    setToken(res.token)
    return res
  }

  function logout() {
    localStorage.removeItem(STORAGE_TOKEN)
    localStorage.removeItem(STORAGE_USER)
    setToken(null)
    setUser(null)
  }

  async function updateProfile(updates: Partial<Pick<User, 'name' | 'email' | 'password' | 'accountType'>>) {
    const updated = await fakeUpdateProfile(updates)
    setUser(updated)
    return updated
  }

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
