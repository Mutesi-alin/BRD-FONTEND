

// 'use client'
// import { useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { useAuth } from '@/context/AuthContext'

// const API = process.env.NEXT_PUBLIC_API_URL

// const getHeaders = () => ({
//   'Content-Type': 'application/json',
//   Authorization: `Token ${localStorage.getItem('token')}`,
// })

// export default function ManagementDashboard() {
//   const { user } = useAuth()
//   const searchParams = useSearchParams()
//   const tabFromUrl = searchParams.get('tab')
  
//   const [activeTab, setActiveTab] = useState<'overview' | 'loans' | 'projects'>(
//     (tabFromUrl as 'overview' | 'loans' | 'projects') || 'overview'
//   )
  
//   const [loans, setLoans] = useState<any[]>([])
//   const [projects, setProjects] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [actionLoading, setActionLoading] = useState<number | null>(null)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const [loansRes, projectsRes] = await Promise.all([
//         fetch(`${API}/api/loans/`, { headers: getHeaders() }),
//         fetch(`${API}/api/projects/`, { headers: getHeaders() }),
//       ])

//       if (!loansRes.ok) {
//         throw new Error(`Failed to fetch loans: ${loansRes.status}`)
//       }
//       if (!projectsRes.ok) {
//         throw new Error(`Failed to fetch projects: ${projectsRes.status}`)
//       }

//       const loansData = await loansRes.json()
//       const projectsData = await projectsRes.json()

//       setLoans(Array.isArray(loansData) ? loansData : [])
//       setProjects(Array.isArray(projectsData) ? projectsData : [])
//     } catch (err: any) {
//       console.error('Error fetching data:', err)
//       setError(err.message || 'Failed to load data. Please refresh the page.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const approveLoan = async (loanId: number) => {
//     if (!confirm('Are you sure you want to APPROVE this loan?\n\nThis will auto-fill approved_by and approval_date.')) return
    
//     setActionLoading(loanId)
//     setSuccess('')
//     setError('')

//     try {
//       const res = await fetch(`${API}/api/loans/${loanId}/`, {
//         method: 'PATCH',
//         headers: getHeaders(),
//         body: JSON.stringify({ status: 'APPROVED' }),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         setSuccess(`✅ Loan #${loanId} approved successfully!`)
//         fetchData()
//         setTimeout(() => setSuccess(''), 3000)
//       } else {
//         console.error('Approval failed:', data)
//         setError(data.status?.[0] || data.detail || JSON.stringify(data))
//       }
//     } catch (err) {
//       console.error('Network error:', err)
//       setError('Network error. Please check your connection.')
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const rejectLoan = async (loanId: number) => {
//     if (!confirm('Are you sure you want to REJECT this loan?')) return
    
//     setActionLoading(loanId)
//     setSuccess('')
//     setError('')

//     try {
//       const res = await fetch(`${API}/api/loans/${loanId}/`, {
//         method: 'PATCH',
//         headers: getHeaders(),
//         body: JSON.stringify({ status: 'REJECTED' }),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         setSuccess(`✅ Loan #${loanId} rejected`)
//         fetchData()
//         setTimeout(() => setSuccess(''), 3000)
//       } else {
//         console.error('Rejection failed:', data)
//         setError(data.status?.[0] || data.detail || JSON.stringify(data))
//       }
//     } catch (err) {
//       console.error('Network error:', err)
//       setError('Network error. Please check your connection.')
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const approveProject = async (projectId: number) => {
//     if (!confirm('Are you sure you want to APPROVE this project?')) return
    
//     setActionLoading(projectId)
//     setSuccess('')
//     setError('')

//     try {
//       const res = await fetch(`${API}/api/projects/${projectId}/`, {
//         method: 'PATCH',
//         headers: getHeaders(),
//         body: JSON.stringify({ status: 'APPROVED' }),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         setSuccess(`✅ Project #${projectId} approved successfully!`)
//         fetchData()
//         setTimeout(() => setSuccess(''), 3000)
//       } else {
//         console.error('Approval failed:', data)
//         setError(data.status?.[0] || data.detail || JSON.stringify(data))
//       }
//     } catch (err) {
//       console.error('Network error:', err)
//       setError('Network error. Please check your connection.')
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const rejectProject = async (projectId: number) => {
//     if (!confirm('Are you sure you want to REJECT this project?')) return
    
//     setActionLoading(projectId)
//     setSuccess('')
//     setError('')

//     try {
//       const res = await fetch(`${API}/api/projects/${projectId}/`, {
//         method: 'PATCH',
//         headers: getHeaders(),
//         body: JSON.stringify({ status: 'REJECTED' }),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         setSuccess(`✅ Project #${projectId} rejected`)
//         fetchData()
//         setTimeout(() => setSuccess(''), 3000)
//       } else {
//         console.error('Rejection failed:', data)
//         setError(data.status?.[0] || data.detail || JSON.stringify(data))
//       }
//     } catch (err) {
//       console.error('Network error:', err)
//       setError('Network error. Please check your connection.')
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const pendingLoans = loans.filter(l => l.status === 'PENDING')
//   const approvedLoans = loans.filter(l => l.status === 'APPROVED')
//   const rejectedLoans = loans.filter(l => l.status === 'REJECTED')
  
//   const pendingProjects = projects.filter(p => p.status === 'PENDING')
//   const approvedProjects = projects.filter(p => p.status === 'APPROVED')
//   const rejectedProjects = projects.filter(p => p.status === 'REJECTED')

//   const loanStatusColor: Record<string, string> = {
//     PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//     APPROVED: 'bg-green-100 text-green-800 border-green-200',
//     REJECTED: 'bg-red-100 text-red-800 border-red-200',
//   }

//   const projectStatusColor: Record<string, string> = {
//     PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//     APPROVED: 'bg-green-100 text-green-800 border-green-200',
//     ONGOING: 'bg-blue-100 text-blue-800 border-blue-200',
//     COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
//     REJECTED: 'bg-red-100 text-red-800 border-red-200',
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
//     <main className="p-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Welcome, {user?.first_name} {user?.last_name}! 👋
//         </h1>
//         <p className="text-gray-500 mt-1">Management Dashboard - Approve Loans & Projects</p>
//       </div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
//           <span className="text-red-600 text-xl">❌</span>
//           <div className="flex-1">
//             <p className="text-red-800 font-medium">{error}</p>
//           </div>
//           <button 
//             onClick={() => setError('')}
//             className="text-red-600 hover:text-red-800"
//           >
//             ✕
//           </button>
//         </div>
//       )}
      
//       {success && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
//           <span className="text-green-600 text-xl">✅</span>
//           <p className="text-green-800 font-medium">{success}</p>
//         </div>
//       )}

//       <div className="flex gap-2 mb-6 border-b border-gray-200">
//         {[
//           { id: 'overview', label: 'Overview', icon: '📊' },
//           { id: 'loans', label: `Pending Loans (${pendingLoans.length})`, icon: '💰' },
//           { id: 'projects', label: `Pending Projects (${pendingProjects.length})`, icon: '📁' },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id as any)}
//             className={`px-6 py-3 font-medium transition ${
//               activeTab === tab.id
//                 ? 'text-green-700 border-b-2 border-green-700'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             {tab.icon} {tab.label}
//           </button>
//         ))}
//       </div>

//       {activeTab === 'overview' && (
//         <div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
//               <div className="flex items-center justify-between mb-2">
//                 <p className="text-yellow-600 text-sm font-medium">Pending Loans</p>
//                 <span className="text-3xl">⏳</span>
//               </div>
//               <p className="text-4xl font-bold text-gray-900">{pendingLoans.length}</p>
//               <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
//             </div>
//             <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
//               <div className="flex items-center justify-between mb-2">
//                 <p className="text-green-600 text-sm font-medium">Approved Loans</p>
//                 <span className="text-3xl">✅</span>
//               </div>
//               <p className="text-4xl font-bold text-gray-900">{approvedLoans.length}</p>
//               <p className="text-xs text-gray-500 mt-2">Successfully approved</p>
//             </div>
//             <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
//               <div className="flex items-center justify-between mb-2">
//                 <p className="text-yellow-600 text-sm font-medium">Pending Projects</p>
//                 <span className="text-3xl">⏳</span>
//               </div>
//               <p className="text-4xl font-bold text-gray-900">{pendingProjects.length}</p>
//               <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
//             </div>
//             <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
//               <div className="flex items-center justify-between mb-2">
//                 <p className="text-green-600 text-sm font-medium">Approved Projects</p>
//                 <span className="text-3xl">✅</span>
//               </div>
//               <p className="text-4xl font-bold text-gray-900">{approvedProjects.length}</p>
//               <p className="text-xs text-gray-500 mt-2">Successfully approved</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Pending Loans</h3>
//                 <span className="text-3xl">💰</span>
//               </div>
//               {pendingLoans.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">No pending loans ✅</p>
//               ) : (
//                 <>
//                   <p className="text-gray-600 mb-4">
//                     {pendingLoans.length} loan{pendingLoans.length > 1 ? 's' : ''} waiting for approval
//                   </p>
//                   <button
//                     onClick={() => setActiveTab('loans')}
//                     className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
//                   >
//                     Review Loans →
//                   </button>
//                 </>
//               )}
//             </div>

//             <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Pending Projects</h3>
//                 <span className="text-3xl">📁</span>
//               </div>
//               {pendingProjects.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">No pending projects ✅</p>
//               ) : (
//                 <>
//                   <p className="text-gray-600 mb-4">
//                     {pendingProjects.length} project{pendingProjects.length > 1 ? 's' : ''} waiting for approval
//                   </p>
//                   <button
//                     onClick={() => setActiveTab('projects')}
//                     className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
//                   >
//                     Review Projects →
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {activeTab === 'loans' && (
//         <div>
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Approve Loans</h2>
//             <p className="text-gray-600">Review and approve/reject loan applications</p>
//           </div>

//           {pendingLoans.length === 0 ? (
//             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-gray-200">
//               <div className="text-6xl mb-4">✅</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
//               <p className="text-gray-500">No pending loans to review</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {pendingLoans.map((loan) => (
//                 <div key={loan.id} className="bg-white rounded-xl shadow-sm border-2 border-yellow-200 p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-3">
//                         <h3 className="text-xl font-bold text-gray-900">Loan #{loan.id}</h3>
//                         <span className={`text-xs px-3 py-1 rounded-full font-medium border ${loanStatusColor[loan.status]}`}>
//                           {loan.status}
//                         </span>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//                         <div>
//                           <p className="text-xs text-gray-500 mb-1">Loan Amount</p>
//                           <p className="text-lg font-bold text-gray-900">
//                             {Number(loan.loan_amount || 0).toLocaleString()} RWF
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
//                           <p className="text-lg font-semibold text-gray-900">{loan.interest_rate}%</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500 mb-1">Tenure</p>
//                           <p className="text-lg font-semibold text-gray-900">{loan.tenure} months</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500 mb-1">Project ID</p>
//                           <p className="text-lg font-semibold text-gray-900">#{loan.project}</p>
//                         </div>
//                       </div>

//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => approveLoan(loan.id)}
//                           disabled={actionLoading === loan.id}
//                           className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
//                         >
//                           {actionLoading === loan.id ? '⏳ Processing...' : '✅ Approve Loan'}
//                         </button>
//                         <button
//                           onClick={() => rejectLoan(loan.id)}
//                           disabled={actionLoading === loan.id}
//                           className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
//                         >
//                           {actionLoading === loan.id ? '⏳ Processing...' : '❌ Reject Loan'}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Status Summary</h3>
//             <div className="grid grid-cols-3 gap-4 text-center">
//               <div>
//                 <p className="text-yellow-600 font-medium text-sm mb-1">Pending</p>
//                 <p className="text-3xl font-bold text-gray-900">{pendingLoans.length}</p>
//               </div>
//               <div>
//                 <p className="text-green-600 font-medium text-sm mb-1">Approved</p>
//                 <p className="text-3xl font-bold text-gray-900">{approvedLoans.length}</p>
//               </div>
//               <div>
//                 <p className="text-red-600 font-medium text-sm mb-1">Rejected</p>
//                 <p className="text-3xl font-bold text-gray-900">{rejectedLoans.length}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {activeTab === 'projects' && (
//         <div>
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Approve Projects</h2>
//             <p className="text-gray-600">Review and approve/reject project applications</p>
//           </div>

//           {pendingProjects.length === 0 ? (
//             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-gray-200">
//               <div className="text-6xl mb-4">✅</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
//               <p className="text-gray-500">No pending projects to review</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {pendingProjects.map((project) => (
//                 <div key={project.id} className="bg-white rounded-xl shadow-sm border-2 border-yellow-200 p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-3">
//                         <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
//                         <span className={`text-xs px-3 py-1 rounded-full font-medium border ${projectStatusColor[project.status]}`}>
//                           {project.status}
//                         </span>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                         <div>
//                           <p className="text-xs text-gray-500 mb-1">Project ID</p>
//                           <p className="text-lg font-semibold text-gray-900">#{project.id}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500 mb-1">Client ID</p>
//                           <p className="text-lg font-semibold text-gray-900">#{project.client}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500 mb-1">Budget</p>
//                           <p className="text-lg font-semibold text-gray-900">
//                             {project.budget ? `${Number(project.budget).toLocaleString()} RWF` : 'N/A'}
//                           </p>
//                         </div>
//                       </div>

//                       {project.description && (
//                         <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                           <p className="text-xs text-gray-500 mb-1">Description</p>
//                           <p className="text-sm text-gray-700">{project.description}</p>
//                         </div>
//                       )}

//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => approveProject(project.id)}
//                           disabled={actionLoading === project.id}
//                           className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
//                         >
//                           {actionLoading === project.id ? '⏳ Processing...' : '✅ Approve Project'}
//                         </button>
//                         <button
//                           onClick={() => rejectProject(project.id)}
//                           disabled={actionLoading === project.id}
//                           className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
//                         >
//                           {actionLoading === project.id ? '⏳ Processing...' : '❌ Reject Project'}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status Summary</h3>
//             <div className="grid grid-cols-3 gap-4 text-center">
//               <div>
//                 <p className="text-yellow-600 font-medium text-sm mb-1">Pending</p>
//                 <p className="text-3xl font-bold text-gray-900">{pendingProjects.length}</p>
//               </div>
//               <div>
//                 <p className="text-green-600 font-medium text-sm mb-1">Approved</p>
//                 <p className="text-3xl font-bold text-gray-900">{approvedProjects.length}</p>
//               </div>
//               <div>
//                 <p className="text-red-600 font-medium text-sm mb-1">Rejected</p>
//                 <p className="text-3xl font-bold text-gray-900">{rejectedProjects.length}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   )
// }
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const API = process.env.NEXT_PUBLIC_API_URL

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
})

interface Loan {
  id: number
  loan_amount: string | number
  interest_rate: string | number
  tenure: number
  status: string
  project: number
}

interface Project {
  id: number
  name: string
  client: number
  budget: string | number
  status: string
  description?: string
}

export default function ManagementDashboard() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab')
  
  const [activeTab, setActiveTab] = useState<'overview' | 'loans' | 'projects'>(
    (tabFromUrl as 'overview' | 'loans' | 'projects') || 'overview'
  )
  
  const [loans, setLoans] = useState<Loan[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const [loansRes, projectsRes] = await Promise.all([
        fetch(`${API}/api/loans/`, { headers: getHeaders() }),
        fetch(`${API}/api/projects/`, { headers: getHeaders() }),
      ])

      if (!loansRes.ok) {
        throw new Error(`Failed to fetch loans: ${loansRes.status}`)
      }
      if (!projectsRes.ok) {
        throw new Error(`Failed to fetch projects: ${projectsRes.status}`)
      }

      const loansData = await loansRes.json()
      const projectsData = await projectsRes.json()

      setLoans(Array.isArray(loansData) ? loansData : [])
      setProjects(Array.isArray(projectsData) ? projectsData : [])
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load data. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const approveLoan = async (loanId: number) => {
    if (!confirm('Are you sure you want to APPROVE this loan?\n\nThis will auto-fill approved_by and approval_date.')) return
    
    setActionLoading(loanId)
    setSuccess('')
    setError('')

    try {
      const res = await fetch(`${API}/api/loans/${loanId}/`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status: 'APPROVED' }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(`✅ Loan #${loanId} approved successfully!`)
        fetchData()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        console.error('Approval failed:', data)
        setError(data.status?.[0] || data.detail || JSON.stringify(data))
      }
    } catch (err) {
      console.error('Network error:', err)
      setError('Network error. Please check your connection.')
    } finally {
      setActionLoading(null)
    }
  }

  const rejectLoan = async (loanId: number) => {
    if (!confirm('Are you sure you want to REJECT this loan?')) return
    
    setActionLoading(loanId)
    setSuccess('')
    setError('')

    try {
      const res = await fetch(`${API}/api/loans/${loanId}/`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status: 'REJECTED' }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(`✅ Loan #${loanId} rejected`)
        fetchData()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        console.error('Rejection failed:', data)
        setError(data.status?.[0] || data.detail || JSON.stringify(data))
      }
    } catch (err) {
      console.error('Network error:', err)
      setError('Network error. Please check your connection.')
    } finally {
      setActionLoading(null)
    }
  }

  const approveProject = async (projectId: number) => {
    if (!confirm('Are you sure you want to APPROVE this project?')) return
    
    setActionLoading(projectId)
    setSuccess('')
    setError('')

    try {
      const res = await fetch(`${API}/api/projects/${projectId}/`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status: 'APPROVED' }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(`✅ Project #${projectId} approved successfully!`)
        fetchData()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        console.error('Approval failed:', data)
        setError(data.status?.[0] || data.detail || JSON.stringify(data))
      }
    } catch (err) {
      console.error('Network error:', err)
      setError('Network error. Please check your connection.')
    } finally {
      setActionLoading(null)
    }
  }

  const rejectProject = async (projectId: number) => {
    if (!confirm('Are you sure you want to REJECT this project?')) return
    
    setActionLoading(projectId)
    setSuccess('')
    setError('')

    try {
      const res = await fetch(`${API}/api/projects/${projectId}/`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status: 'REJECTED' }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(`✅ Project #${projectId} rejected`)
        fetchData()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        console.error('Rejection failed:', data)
        setError(data.status?.[0] || data.detail || JSON.stringify(data))
      }
    } catch (err) {
      console.error('Network error:', err)
      setError('Network error. Please check your connection.')
    } finally {
      setActionLoading(null)
    }
  }

  const pendingLoans = loans.filter(l => l.status === 'PENDING')
  const approvedLoans = loans.filter(l => l.status === 'APPROVED')
  const rejectedLoans = loans.filter(l => l.status === 'REJECTED')
  
  const pendingProjects = projects.filter(p => p.status === 'PENDING')
  const approvedProjects = projects.filter(p => p.status === 'APPROVED')
  const rejectedProjects = projects.filter(p => p.status === 'REJECTED')

  const loanStatusColor: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    APPROVED: 'bg-green-100 text-green-800 border-green-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
  }

  const projectStatusColor: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    APPROVED: 'bg-green-100 text-green-800 border-green-200',
    ONGOING: 'bg-blue-100 text-blue-800 border-blue-200',
    COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
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
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.first_name} {user?.last_name}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Management Dashboard - Approve Loans & Projects</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <span className="text-red-600 text-xl">❌</span>
          <div className="flex-1">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
          <button 
            onClick={() => setError('')}
            className="text-red-600 hover:text-red-800"
          >
            ✕
          </button>
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <span className="text-green-600 text-xl">✅</span>
          <p className="text-green-800 font-medium">{success}</p>
        </div>
      )}

      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'loans', label: `Pending Loans (${pendingLoans.length})`, icon: '💰' },
          { id: 'projects', label: `Pending Projects (${pendingProjects.length})`, icon: '📁' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'overview' | 'loans' | 'projects')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === tab.id
                ? 'text-green-700 border-b-2 border-green-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-600 text-sm font-medium">Pending Loans</p>
                <span className="text-3xl">⏳</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">{pendingLoans.length}</p>
              <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-green-600 text-sm font-medium">Approved Loans</p>
                <span className="text-3xl">✅</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">{approvedLoans.length}</p>
              <p className="text-xs text-gray-500 mt-2">Successfully approved</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-600 text-sm font-medium">Pending Projects</p>
                <span className="text-3xl">⏳</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">{pendingProjects.length}</p>
              <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-green-600 text-sm font-medium">Approved Projects</p>
                <span className="text-3xl">✅</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">{approvedProjects.length}</p>
              <p className="text-xs text-gray-500 mt-2">Successfully approved</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Loans</h3>
                <span className="text-3xl">💰</span>
              </div>
              {pendingLoans.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No pending loans ✅</p>
              ) : (
                <>
                  <p className="text-gray-600 mb-4">
                    {pendingLoans.length} loan{pendingLoans.length > 1 ? 's' : ''} waiting for approval
                  </p>
                  <button
                    onClick={() => setActiveTab('loans')}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Review Loans →
                  </button>
                </>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Projects</h3>
                <span className="text-3xl">📁</span>
              </div>
              {pendingProjects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No pending projects ✅</p>
              ) : (
                <>
                  <p className="text-gray-600 mb-4">
                    {pendingProjects.length} project{pendingProjects.length > 1 ? 's' : ''} waiting for approval
                  </p>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Review Projects →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'loans' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Approve Loans</h2>
            <p className="text-gray-600">Review and approve/reject loan applications</p>
          </div>

          {pendingLoans.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-500">No pending loans to review</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingLoans.map((loan) => (
                <div key={loan.id} className="bg-white rounded-xl shadow-sm border-2 border-yellow-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">Loan #{loan.id}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium border ${loanStatusColor[loan.status]}`}>
                          {loan.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Loan Amount</p>
                          <p className="text-lg font-bold text-gray-900">
                            {Number(loan.loan_amount || 0).toLocaleString()} RWF
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                          <p className="text-lg font-semibold text-gray-900">{loan.interest_rate}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Tenure</p>
                          <p className="text-lg font-semibold text-gray-900">{loan.tenure} months</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Project ID</p>
                          <p className="text-lg font-semibold text-gray-900">#{loan.project}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => approveLoan(loan.id)}
                          disabled={actionLoading === loan.id}
                          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          {actionLoading === loan.id ? '⏳ Processing...' : '✅ Approve Loan'}
                        </button>
                        <button
                          onClick={() => rejectLoan(loan.id)}
                          disabled={actionLoading === loan.id}
                          className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          {actionLoading === loan.id ? '⏳ Processing...' : '❌ Reject Loan'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Status Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-yellow-600 font-medium text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{pendingLoans.length}</p>
              </div>
              <div>
                <p className="text-green-600 font-medium text-sm mb-1">Approved</p>
                <p className="text-3xl font-bold text-gray-900">{approvedLoans.length}</p>
              </div>
              <div>
                <p className="text-red-600 font-medium text-sm mb-1">Rejected</p>
                <p className="text-3xl font-bold text-gray-900">{rejectedLoans.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Approve Projects</h2>
            <p className="text-gray-600">Review and approve/reject project applications</p>
          </div>

          {pendingProjects.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-500">No pending projects to review</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm border-2 border-yellow-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium border ${projectStatusColor[project.status]}`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Project ID</p>
                          <p className="text-lg font-semibold text-gray-900">#{project.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Client ID</p>
                          <p className="text-lg font-semibold text-gray-900">#{project.client}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Budget</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {project.budget ? `${Number(project.budget).toLocaleString()} RWF` : 'N/A'}
                          </p>
                        </div>
                      </div>

                      {project.description && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Description</p>
                          <p className="text-sm text-gray-700">{project.description}</p>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={() => approveProject(project.id)}
                          disabled={actionLoading === project.id}
                          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          {actionLoading === project.id ? '⏳ Processing...' : '✅ Approve Project'}
                        </button>
                        <button
                          onClick={() => rejectProject(project.id)}
                          disabled={actionLoading === project.id}
                          className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          {actionLoading === project.id ? '⏳ Processing...' : '❌ Reject Project'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-yellow-600 font-medium text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{pendingProjects.length}</p>
              </div>
              <div>
                <p className="text-green-600 font-medium text-sm mb-1">Approved</p>
                <p className="text-3xl font-bold text-gray-900">{approvedProjects.length}</p>
              </div>
              <div>
                <p className="text-red-600 font-medium text-sm mb-1">Rejected</p>
                <p className="text-3xl font-bold text-gray.900">{rejectedProjects.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
} 