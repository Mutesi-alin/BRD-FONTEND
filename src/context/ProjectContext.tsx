// 'use client'
// import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// const API = process.env.NEXT_PUBLIC_API_URL

// const getHeaders = () => ({
//   'Content-Type': 'application/json',
//   Authorization: `Token ${localStorage.getItem('token')}`,
// })

// interface Project {
//   id: number
//   name: string
//   description: string
//   client: number
//   budget: number | null
//   start_date: string
//   end_date: string
//   status: string
// }

// interface ProjectContextType {
//   projects: Project[]
//   loading: boolean
//   error: string | null
//   fetchProjects: () => Promise<void>
//   refreshProjects: () => Promise<void>
// }

// const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

// export function ProjectProvider({ children }: { children: ReactNode }) {
//   const [projects, setProjects] = useState<Project[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const fetchProjects = async () => {
//     try {
//       setLoading(true)
//       setError(null)
      
//       const res = await fetch(`${API}/api/projects/`, { headers: getHeaders() })
      
//       if (!res.ok) {
//         throw new Error(`Failed to fetch projects: ${res.status}`)
//       }
      
//       const data = await res.json()
//       setProjects(Array.isArray(data) ? data : [])
//     } catch (err: any) {
//       console.error('Error fetching projects:', err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const refreshProjects = async () => {
//     await fetchProjects()
//   }

//   useEffect(() => {
//     fetchProjects()
//   }, [])

//   const value: ProjectContextType = {
//     projects,
//     loading,
//     error,
//     fetchProjects,
//     refreshProjects,
//   }

//   return (
//     <ProjectContext.Provider value={value}>
//       {children}
//     </ProjectContext.Provider>
//   )
// }

// export function useProjects(): ProjectContextType {
//   const context = useContext(ProjectContext)
//   if (context === undefined) {
//     throw new Error('useProjects must be used within a ProjectProvider')
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

interface Project {
  id: number
  name: string
  description: string
  client: number
  budget: number | null
  start_date: string
  end_date: string
  status: string
}

interface ProjectContextType {
  projects: Project[]
  loading: boolean
  error: string | null
  fetchProjects: () => Promise<void>
  refreshProjects: () => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const res = await fetch(`${API}/api/projects/`, { headers: getHeaders() })
      
      if (!res.ok) {
        throw new Error(`Failed to fetch projects: ${res.status}`)
      }
      
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  const refreshProjects = async () => {
    await fetchProjects()
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const value: ProjectContextType = {
    projects,
    loading,
    error,
    fetchProjects,
    refreshProjects,
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects(): ProjectContextType {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}