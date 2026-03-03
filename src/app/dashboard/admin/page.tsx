

// 'use client'
// import { useEffect, useState } from 'react'
// import { useAuth } from '@/context/AuthContext'

// const API = process.env.NEXT_PUBLIC_API_URL

// const getHeaders = () => ({
//   'Content-Type': 'application/json',
//   Authorization: `Token ${localStorage.getItem('token')}`,
// })

// export default function AdminDashboard() {
//   const { user } = useAuth()
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalClients: 0,
//     totalProjects: 0,
//     totalLoans: 0,
//     totalDisbursements: 0,
//     approvedLoans: 0,
//     pendingLoans: 0,
//     rejectedLoans: 0,
//     totalDisbursed: 0,
//   })
//   const [users, setUsers] = useState<any[]>([])
//   const [recentProjects, setRecentProjects] = useState<any[]>([])
//   const [projects, setProjects] = useState<any[]>([])
//   const [loans, setLoans] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     setLoading(true)
    
//     try {
//       const headers = getHeaders()
      
//       const [usersRes, clientsRes, projectsRes, loansRes, disbursementsRes] = await Promise.all([
//         fetch(`${API}/api/users/list/`, { headers }),
//         fetch(`${API}/api/clients/`, { headers }),
//         fetch(`${API}/api/projects/`, { headers }),
//         fetch(`${API}/api/loans/`, { headers }),
//         fetch(`${API}/api/disbursements/`, { headers }),
//       ])

//       const usersData = await usersRes.json()
//       const clients = await clientsRes.json()
//       const projectsData = await projectsRes.json()
//       const loansData = await loansRes.json()
//       const disbursements = await disbursementsRes.json()

//       const loansList = Array.isArray(loansData) ? loansData : []
//       const projectsList = Array.isArray(projectsData) ? projectsData : []
//       const disbursementsList = Array.isArray(disbursements) ? disbursements : []
//       const usersList = Array.isArray(usersData) ? usersData : []

//       const totalDisbursed = disbursementsList.reduce((sum, d) => sum + Number(d.amount || 0), 0)

//       setStats({
//         totalUsers: usersList.length,
//         totalClients: Array.isArray(clients) ? clients.length : 0,
//         totalProjects: projectsList.length,
//         totalLoans: loansList.length,
//         totalDisbursements: disbursementsList.length,
//         approvedLoans: loansList.filter(l => l.status === 'APPROVED').length,
//         pendingLoans: loansList.filter(l => l.status === 'PENDING').length,
//         rejectedLoans: loansList.filter(l => l.status === 'REJECTED').length,
//         totalDisbursed: totalDisbursed,
//       })

//       setUsers(usersList)
//       setRecentProjects(projectsList.slice(-5).reverse())
//       setProjects(projectsList)
//       setLoans(loansList)

//     } catch (err: any) {
//       console.error('Error fetching dashboard data:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const projectStatusCounts = {
//     PENDING: projects.filter(p => p.status === 'PENDING').length,
//     APPROVED: projects.filter(p => p.status === 'APPROVED').length,
//     ONGOING: projects.filter(p => p.status === 'ONGOING').length,
//     COMPLETED: projects.filter(p => p.status === 'COMPLETED').length,
//     REJECTED: projects.filter(p => p.status === 'REJECTED').length,
//   }

//   const totalProjectStatuses = Object.values(projectStatusCounts).reduce((a, b) => a + b, 0)

//   const loanStatusData = [
//     { label: 'Pending', count: stats.pendingLoans, color: 'bg-yellow-400' },
//     { label: 'Approved', count: stats.approvedLoans, color: 'bg-green-400' },
//     { label: 'Rejected', count: stats.rejectedLoans, color: 'bg-red-400' },
//   ]

//   const maxLoanCount = Math.max(...loanStatusData.map(d => d.count), 1)

//   const projectStatusColor: Record<string, string> = {
//     PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//     APPROVED: 'bg-green-100 text-green-800 border-green-200',
//     ONGOING: 'bg-blue-100 text-blue-800 border-blue-200',
//     COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
//     REJECTED: 'bg-red-100 text-red-800 border-red-200',
//   }

//   const roleColor: Record<string, string> = {
//     ADMIN: 'bg-purple-100 text-purple-800 border-purple-200',
//     LOAN_OFFICER: 'bg-blue-100 text-blue-800 border-blue-200',
//     PROJECT_OFFICER: 'bg-green-100 text-green-800 border-green-200',
//     MANAGEMENT: 'bg-orange-100 text-orange-800 border-orange-200',
//     FINANCE_OFFICER: 'bg-pink-100 text-pink-800 border-pink-200',
//   }

//   if (loading) {
//     return (
//       <main className="p-8">
//         <div className="text-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <main className="p-8 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Admin Dashboard
//         </h1>
//         <p className="text-gray-500 mt-1">Welcome back, {user?.first_name} {user?.last_name}</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm mb-1">Total Users</p>
//               <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
//               <p className="text-xs text-green-600 mt-2">↗ Active</p>
//             </div>
//             <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
//               <span className="text-2xl">👥</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm mb-1">Total Projects</p>
//               <p className="text-3xl font-bold text-gray-900">{stats.totalProjects}</p>
//               <p className="text-xs text-blue-600 mt-2">↗ {projectStatusCounts.ONGOING} ongoing</p>
//             </div>
//             <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
//               <span className="text-2xl">📁</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm mb-1">Total Loans</p>
//               <p className="text-3xl font-bold text-gray-900">{stats.totalLoans}</p>
//               <p className="text-xs text-yellow-600 mt-2">⏳ {stats.pendingLoans} pending</p>
//             </div>
//             <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
//               <span className="text-2xl">💰</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm mb-1">Total Disbursed</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {stats.totalDisbursed > 0 ? `${(stats.totalDisbursed / 1000000000).toFixed(2)}B` : '0'}
//               </p>
//               <p className="text-xs text-gray-500 mt-2">RWF</p>
//             </div>
//             <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
//               <span className="text-2xl">💳</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Loans Status Bar Chart */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900">Loans by Status</h3>
//             <span className="text-sm text-gray-500">{stats.totalLoans} total</span>
//           </div>
          
//           {stats.totalLoans === 0 ? (
//             <div className="text-center py-12 text-gray-400">
//               <p className="text-5xl mb-3">📊</p>
//               <p className="text-sm">No loan data available</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {loanStatusData.map((item) => (
//                 <div key={item.label}>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm font-medium text-gray-700">{item.label}</span>
//                     <span className="text-sm font-bold text-gray-900">
//                       {item.count} ({stats.totalLoans > 0 ? Math.round((item.count / stats.totalLoans) * 100) : 0}%)
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
//                     <div 
//                       className={`h-3 rounded-full transition-all duration-500 ${item.color}`}
//                       style={{ width: `${(item.count / maxLoanCount) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Project Status Donut Chart */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900">Project Status Distribution</h3>
//             <span className="text-sm text-gray-500">{stats.totalProjects} total</span>
//           </div>
          
//           {stats.totalProjects === 0 ? (
//             <div className="text-center py-12 text-gray-400">
//               <p className="text-5xl mb-3">📁</p>
//               <p className="text-sm">No project data available</p>
//             </div>
//           ) : (
//             <div className="flex items-center justify-between">
//               {/* Donut Chart */}
//               <div className="relative w-48 h-48">
//                 <svg viewBox="0 0 100 100" className="transform -rotate-90">
//                   <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20" />
//                   {Object.entries(projectStatusCounts).map(([status, count], index) => {
//                     const percentage = totalProjectStatuses > 0 ? (count / totalProjectStatuses) : 0
//                     const previousPercentages = Object.values(projectStatusCounts)
//                       .slice(0, index)
//                       .reduce((sum, c) => sum + (totalProjectStatuses > 0 ? (c / totalProjectStatuses) : 0), 0)
//                     const strokeDasharray = `${percentage * 251.2} 251.2`
//                     const strokeDashoffset = -previousPercentages * 251.2
//                     const colors: Record<string, string> = {
//                       PENDING: '#facc15',
//                       APPROVED: '#4ade80',
//                       ONGOING: '#60a5fa',
//                       COMPLETED: '#c084fc',
//                       REJECTED: '#f87171'
//                     }
                    
//                     return count > 0 ? (
//                       <circle
//                         key={status}
//                         cx="50"
//                         cy="50"
//                         r="40"
//                         fill="none"
//                         stroke={colors[status]}
//                         strokeWidth="20"
//                         strokeDasharray={strokeDasharray}
//                         strokeDashoffset={strokeDashoffset}
//                         className="transition-all duration-300"
//                       />
//                     ) : null
//                   })}
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <p className="text-3xl font-bold text-gray-900">{stats.totalProjects}</p>
//                     <p className="text-xs text-gray-500">Projects</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Legend */}
//               <div className="space-y-3 flex-1 ml-6">
//                 {Object.entries(projectStatusCounts).map(([status, count]) => {
//                   const percentage = totalProjectStatuses > 0 ? Math.round((count / totalProjectStatuses) * 100) : 0
//                   const colors: Record<string, string> = {
//                     PENDING: 'bg-yellow-400',
//                     APPROVED: 'bg-green-400',
//                     ONGOING: 'bg-blue-400',
//                     COMPLETED: 'bg-purple-400',
//                     REJECTED: 'bg-red-400'
//                   }
//                   return (
//                     <div key={status} className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className={`w-3 h-3 rounded-full ${colors[status]}`}></div>
//                         <span className="text-sm text-gray-700 capitalize">{status.toLowerCase()}</span>
//                       </div>
//                       <span className="text-sm font-semibold text-gray-900">{count} ({percentage}%)</span>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">System Users</h3>
//           <p className="text-sm text-gray-500 mt-1">{users.length} registered users</p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
//                     <p className="text-4xl mb-2">👥</p>
//                     <p>No users found</p>
//                   </td>
//                 </tr>
//               ) : (
//                 users.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//                           <span className="text-green-700 font-semibold text-sm">
//                             {user.first_name?.[0]}{user.last_name?.[0]}
//                           </span>
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">
//                             {user.first_name} {user.last_name}
//                           </p>
//                           <p className="text-xs text-gray-500">ID: {user.id}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
//                     <td className="px-6 py-4">
//                       <span className={`text-xs px-3 py-1 rounded-full font-medium border ${roleColor[user.role] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
//                         {user.role?.replace(/_/g, ' ')}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="text-xs px-3 py-1 rounded-full font-medium border bg-green-100 text-green-800 border-green-200">
//                         Active
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : '—'}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Recent Projects Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
//           <p className="text-sm text-gray-500 mt-1">{recentProjects.length} latest projects</p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {recentProjects.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
//                     <p className="text-4xl mb-2">📁</p>
//                     <p>No projects yet</p>
//                   </td>
//                 </tr>
//               ) : (
//                 recentProjects.map((project) => (
//                   <tr key={project.id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">#{project.id}</td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.name}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">Client #{project.client}</td>
//                     <td className="px-6 py-4 text-sm font-semibold text-gray-900">
//                       {project.budget ? `${(Number(project.budget) / 1000000).toFixed(1)}M RWF` : '—'}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`text-xs px-3 py-1 rounded-full font-medium border ${projectStatusColor[project.status]}`}>
//                         {project.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </main>
//   )
// }






'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

const API = process.env.NEXT_PUBLIC_API_URL

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
})

interface SystemUser {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  date_joined: string
}

interface Project {
  id: number
  name: string
  client: number
  budget: string | number
  status: string
  created_at: string
}

interface Loan {
  status: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClients: 0,
    totalProjects: 0,
    totalLoans: 0,
    totalDisbursements: 0,
    approvedLoans: 0,
    pendingLoans: 0,
    rejectedLoans: 0,
    totalDisbursed: 0,
  })
  const [users, setUsers] = useState<SystemUser[]>([])
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const headers = getHeaders()
      const [usersRes, clientsRes, projectsRes, loansRes, disbursementsRes] = await Promise.all([
        fetch(`${API}/api/users/list/`, { headers }),
        fetch(`${API}/api/clients/`, { headers }),
        fetch(`${API}/api/projects/`, { headers }),
        fetch(`${API}/api/loans/`, { headers }),
        fetch(`${API}/api/disbursements/`, { headers }),
      ])

      const usersData = await usersRes.json()
      const clients = await clientsRes.json()
      const projectsData = await projectsRes.json()
      const loansData = await loansRes.json()
      const disbursements = await disbursementsRes.json()

      const loansList: Loan[] = Array.isArray(loansData) ? loansData : []
      const projectsList: Project[] = Array.isArray(projectsData) ? projectsData : []
      const disbursementsList: Record<string, unknown>[] = Array.isArray(disbursements) ? disbursements : []
      const usersList: SystemUser[] = Array.isArray(usersData) ? usersData : []

      const totalDisbursed = disbursementsList.reduce((sum, d) => sum + Number(d.amount || 0), 0)

      setStats({
        totalUsers: usersList.length,
        totalClients: Array.isArray(clients) ? clients.length : 0,
        totalProjects: projectsList.length,
        totalLoans: loansList.length,
        totalDisbursements: disbursementsList.length,
        approvedLoans: loansList.filter(l => l.status === 'APPROVED').length,
        pendingLoans: loansList.filter(l => l.status === 'PENDING').length,
        rejectedLoans: loansList.filter(l => l.status === 'REJECTED').length,
        totalDisbursed: totalDisbursed,
      })

      setUsers(usersList)
      setRecentProjects(projectsList.slice(-5).reverse())
      setProjects(projectsList)
      setLoans(loansList)

    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  void loans

  const projectStatusCounts = {
    PENDING: projects.filter(p => p.status === 'PENDING').length,
    APPROVED: projects.filter(p => p.status === 'APPROVED').length,
    ONGOING: projects.filter(p => p.status === 'ONGOING').length,
    COMPLETED: projects.filter(p => p.status === 'COMPLETED').length,
    REJECTED: projects.filter(p => p.status === 'REJECTED').length,
  }

  const totalProjectStatuses = Object.values(projectStatusCounts).reduce((a, b) => a + b, 0)

  const loanStatusData = [
    { label: 'Pending', count: stats.pendingLoans, color: 'bg-yellow-400' },
    { label: 'Approved', count: stats.approvedLoans, color: 'bg-green-400' },
    { label: 'Rejected', count: stats.rejectedLoans, color: 'bg-red-400' },
  ]

  const maxLoanCount = Math.max(...loanStatusData.map(d => d.count), 1)

  const projectStatusColor: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    APPROVED: 'bg-green-100 text-green-800 border-green-200',
    ONGOING: 'bg-blue-100 text-blue-800 border-blue-200',
    COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
  }

  const roleColor: Record<string, string> = {
    ADMIN: 'bg-purple-100 text-purple-800 border-purple-200',
    LOAN_OFFICER: 'bg-blue-100 text-blue-800 border-blue-200',
    PROJECT_OFFICER: 'bg-green-100 text-green-800 border-green-200',
    MANAGEMENT: 'bg-orange-100 text-orange-800 border-orange-200',
    FINANCE_OFFICER: 'bg-pink-100 text-pink-800 border-pink-200',
  }

  if (loading) {
    return (
      <main className="p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, {user?.first_name} {user?.last_name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              <p className="text-xs text-green-600 mt-2">↗ Active</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProjects}</p>
              <p className="text-xs text-blue-600 mt-2">↗ {projectStatusCounts.ONGOING} ongoing</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Loans</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalLoans}</p>
              <p className="text-xs text-yellow-600 mt-2">⏳ {stats.pendingLoans} pending</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Disbursed</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalDisbursed > 0 ? `${(stats.totalDisbursed / 1000000000).toFixed(2)}B` : '0'}
              </p>
              <p className="text-xs text-gray-500 mt-2">RWF</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Loans by Status</h3>
            <span className="text-sm text-gray-500">{stats.totalLoans} total</span>
          </div>
          {stats.totalLoans === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-5xl mb-3">📊</p>
              <p className="text-sm">No loan data available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {loanStatusData.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {item.count} ({stats.totalLoans > 0 ? Math.round((item.count / stats.totalLoans) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${(item.count / maxLoanCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Project Status Distribution</h3>
            <span className="text-sm text-gray-500">{stats.totalProjects} total</span>
          </div>
          {stats.totalProjects === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-5xl mb-3">📁</p>
              <p className="text-sm">No project data available</p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                  {Object.entries(projectStatusCounts).map(([status, count], index) => {
                    const percentage = totalProjectStatuses > 0 ? (count / totalProjectStatuses) : 0
                    const previousPercentages = Object.values(projectStatusCounts)
                      .slice(0, index)
                      .reduce((sum, c) => sum + (totalProjectStatuses > 0 ? (c / totalProjectStatuses) : 0), 0)
                    const strokeDasharray = `${percentage * 251.2} 251.2`
                    const strokeDashoffset = -previousPercentages * 251.2
                    const colors: Record<string, string> = {
                      PENDING: '#facc15',
                      APPROVED: '#4ade80',
                      ONGOING: '#60a5fa',
                      COMPLETED: '#c084fc',
                      REJECTED: '#f87171'
                    }
                    return count > 0 ? (
                      <circle
                        key={status}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={colors[status]}
                        strokeWidth="20"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300"
                      />
                    ) : null
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{stats.totalProjects}</p>
                    <p className="text-xs text-gray-500">Projects</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 flex-1 ml-6">
                {Object.entries(projectStatusCounts).map(([status, count]) => {
                  const percentage = totalProjectStatuses > 0 ? Math.round((count / totalProjectStatuses) * 100) : 0
                  const colors: Record<string, string> = {
                    PENDING: 'bg-yellow-400',
                    APPROVED: 'bg-green-400',
                    ONGOING: 'bg-blue-400',
                    COMPLETED: 'bg-purple-400',
                    REJECTED: 'bg-red-400'
                  }
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${colors[status]}`}></div>
                        <span className="text-sm text-gray-700 capitalize">{status.toLowerCase()}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{count} ({percentage}%)</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">System Users</h3>
          <p className="text-sm text-gray-500 mt-1">{users.length} registered users</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <p className="text-4xl mb-2">👥</p>
                    <p>No users found</p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-700 font-semibold text-sm">
                            {user.first_name?.[0]}{user.last_name?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-xs text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium border ${roleColor[user.role] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                        {user.role?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-3 py-1 rounded-full font-medium border bg-green-100 text-green-800 border-green-200">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
          <p className="text-sm text-gray-500 mt-1">{recentProjects.length} latest projects</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <p className="text-4xl mb-2">📁</p>
                    <p>No projects yet</p>
                  </td>
                </tr>
              ) : (
                recentProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">#{project.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Client #{project.client}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {project.budget ? `${(Number(project.budget) / 1000000).toFixed(1)}M RWF` : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium border ${projectStatusColor[project.status]}`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}