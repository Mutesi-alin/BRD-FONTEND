// 'use client'
// import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// const API = process.env.NEXT_PUBLIC_API_URL

// const getHeaders = () => ({
//   'Content-Type': 'application/json',
//   Authorization: `Token ${localStorage.getItem('token')}`,
// })

// interface Client {
//   id: number
//   name: string
//   client_type: string
//   national_id: string
//   email: string
//   phone: string
//   address: string
// }

// interface ClientContextType {
//   clients: Client[]
//   loading: boolean
//   error: string | null
//   fetchClients: () => Promise<void>
//   refreshClients: () => Promise<void>
// }

// const ClientContext = createContext<ClientContextType | undefined>(undefined)

// export function ClientProvider({ children }: { children: ReactNode }) {
//   const [clients, setClients] = useState<Client[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const fetchClients = async () => {
//     try {
//       setLoading(true)
//       setError(null)
      
//       const res = await fetch(`${API}/api/clients/`, { headers: getHeaders() })
      
//       if (!res.ok) {
//         if (res.status === 403) {
//           const cached = localStorage.getItem('clients_cache')
//           if (cached) {
//             setClients(JSON.parse(cached))
//             setLoading(false)
//             return
//           }
//         }
//         throw new Error(`Failed to fetch clients: ${res.status}`)
//       }
      
//       const data = await res.json()
//       const clientsList = Array.isArray(data) ? data : []
//       setClients(clientsList)
      
//       // Cache in localStorage
//       localStorage.setItem('clients_cache', JSON.stringify(clientsList))
//     } catch (err: any) {
//       console.error('Error fetching clients:', err)
//       setError(err.message)
      
//       // Fallback to cached data
//       const cached = localStorage.getItem('clients_cache')
//       if (cached) {
//         setClients(JSON.parse(cached))
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const refreshClients = async () => {
//     await fetchClients()
//   }

//   useEffect(() => {
//     fetchClients()
//   }, [])

//   const value: ClientContextType = {
//     clients,
//     loading,
//     error,
//     fetchClients,
//     refreshClients,
//   }

//   return (
//     <ClientContext.Provider value={value}>
//       {children}
//     </ClientContext.Provider>
//   )
// }

// // Export the hook
// export function useClients(): ClientContextType {
//   const context = useContext(ClientContext)
//   if (context === undefined) {
//     throw new Error('useClients must be used within a ClientProvider')
//   }
//   return context
// }

'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
})

interface Client {
  id: number
  name: string
  client_type: string
  national_id: string
  email: string
  phone: string
  address: string
}

interface ClientContextType {
  clients: Client[]
  loading: boolean
  error: string | null
  fetchClients: () => Promise<void>
  refreshClients: () => Promise<void>
}

const ClientContext = createContext<ClientContextType | undefined>(undefined)

export function ClientProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClients = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const res = await fetch(`${API}/api/clients/`, { headers: getHeaders() })
      
      if (!res.ok) {
        if (res.status === 403) {
          const cached = localStorage.getItem('clients_cache')
          if (cached) {
            setClients(JSON.parse(cached))
            setLoading(false)
            return
          }
        }
        throw new Error(`Failed to fetch clients: ${res.status}`)
      }
      
      const data = await res.json()
      const clientsList = Array.isArray(data) ? data : []
      setClients(clientsList)
      
      localStorage.setItem('clients_cache', JSON.stringify(clientsList))
    } catch (err) {
      console.error('Error fetching clients:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch clients')
      
      const cached = localStorage.getItem('clients_cache')
      if (cached) {
        setClients(JSON.parse(cached))
      }
    } finally {
      setLoading(false)
    }
  }

  const refreshClients = async () => {
    await fetchClients()
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const value: ClientContextType = {
    clients,
    loading,
    error,
    fetchClients,
    refreshClients,
  }

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  )
}

export function useClients(): ClientContextType {
  const context = useContext(ClientContext)
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider')
  }
  return context
}