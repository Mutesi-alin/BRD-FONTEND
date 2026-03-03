

// 'use client'
// import { useEffect } from 'react'
// import { useRouter, usePathname } from 'next/navigation'
// import { useAuth } from '@/context/AuthContext'
// import { ClientProvider } from '@/context/ClientContext'
// import { ProjectProvider } from '@/context/ProjectContext'
// import Sidebar from '../components/Sidebar'

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const { user, loading } = useAuth()
//   const router = useRouter()
//   const pathname = usePathname()

//   const roleRedirects: Record<string, string> = {
//     ADMIN: '/dashboard/admin',
//     LOAN_OFFICER: '/dashboard/loan',
//     PROJECT_OFFICER: '/dashboard/project',
//     MANAGEMENT: '/dashboard/management',
//     FINANCE_OFFICER: '/dashboard/finance',
//   }

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/login')
//     }
//   }, [user, loading, router])

//   useEffect(() => {
//     if (!loading && pathname === '/dashboard' && user?.role) {
//       const targetPath = roleRedirects[user.role]
//       if (targetPath) {
//         router.push(targetPath)
//       }
//     }
//   }, [pathname, user, loading, router])

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-700 mx-auto"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!user) {
//     return null
//   }

//   return (
//     <ClientProvider>
//       <ProjectProvider>
//         <div className="min-h-screen bg-gray-50">
//           <Sidebar />
//           <div className="ml-64">
//             {children}
//           </div>
//         </div>
//       </ProjectProvider>
//     </ClientProvider>
//   )
// }

'use client'
import { useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { ClientProvider } from '@/context/ClientContext'
import { ProjectProvider } from '@/context/ProjectContext'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const roleRedirects: Record<string, string> = useCallback(() => ({
    ADMIN: '/dashboard/admin',
    LOAN_OFFICER: '/dashboard/loan',
    PROJECT_OFFICER: '/dashboard/project',
    MANAGEMENT: '/dashboard/management',
    FINANCE_OFFICER: '/dashboard/finance',
  }), [])()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!loading && pathname === '/dashboard' && user?.role) {
      const targetPath = roleRedirects[user.role]
      if (targetPath) {
        router.push(targetPath)
      }
    }
  }, [pathname, user, loading, router, roleRedirects])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <ClientProvider>
      <ProjectProvider>
        <div className="min-h-screen bg-gray-50">
          <Sidebar />
          <div className="ml-64">
            {children}
          </div>
        </div>
      </ProjectProvider>
    </ClientProvider>
  )
} 