


'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

type Role = 'ADMIN' | 'CLIENT' | 'LOAN_OFFICER' | 'MANAGEMENT' | 'FINANCE' | 'PROJECT_OFFICER'

interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  phone_number: string
  role: Role
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>
  register: (data: Record<string, unknown>) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const ROLE_ROUTES: Record<Role, string> = {
  ADMIN: '/dashboard/admin',
  CLIENT: '/dashboard/client',
  LOAN_OFFICER: '/dashboard/loan',
  MANAGEMENT: '/dashboard/management',
  FINANCE: '/dashboard/finance',
  PROJECT_OFFICER: '/dashboard/project',
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      router.push(ROLE_ROUTES[data.user.role as Role] || '/dashboard/admin')
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  const register = async (userData: Record<string, unknown>) => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      router.push(ROLE_ROUTES[data.user.role as Role] || '/dashboard/admin')
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('token')
      await fetch(`${BASE_URL}/api/users/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
    } catch {}
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
