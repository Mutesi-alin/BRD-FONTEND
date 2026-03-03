

// 'use client'
// import { useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { useAuth } from '@/context/AuthContext'

// const API = process.env.NEXT_PUBLIC_API_URL

// const getHeaders = () => ({
//   'Content-Type': 'application/json',
//   Authorization: `Token ${localStorage.getItem('token')}`,
// })

// export default function LoanOfficerDashboard() {
//   const { user } = useAuth()
//   const searchParams = useSearchParams()
//   const tabFromUrl = searchParams.get('tab')
  
//   const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'loans'>(
//     (tabFromUrl as 'overview' | 'clients' | 'loans') || 'overview'
//   )
  
//   const [clients, setClients] = useState<any[]>([])
//   const [loans, setLoans] = useState<any[]>([])
//   const [projects, setProjects] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
  
//   const [showClientForm, setShowClientForm] = useState(false)
//   const [showLoanForm, setShowLoanForm] = useState(false)
//   const [clientForm, setClientForm] = useState({
//     name: '',
//     client_type: 'INDIVIDUAL',
//     national_id: '',
//     email: '',
//     phone: '',
//     address: ''
//   })
//   const [loanForm, setLoanForm] = useState({
//     project: '',
//     loan_amount: '',
//     interest_rate: '',
//     tenure: ''
//   })

//   const [clientError, setClientError] = useState('')
//   const [loanError, setLoanError] = useState('')
//   const [clientSuccess, setClientSuccess] = useState('')
//   const [loanSuccess, setLoanSuccess] = useState('')

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     setLoading(true)
//     try {
//       const [clientsRes, loansRes, projectsRes] = await Promise.all([
//         fetch(`${API}/api/clients/`, { headers: getHeaders() }),
//         fetch(`${API}/api/loans/`, { headers: getHeaders() }),
//         fetch(`${API}/api/projects/`, { headers: getHeaders() }),
//       ])

//       const clientsData = await clientsRes.json().catch(() => [])
//       const loansData = await loansRes.json().catch(() => [])
//       const projectsData = await projectsRes.json().catch(() => [])

//       console.log('📋 Loans from API:', loansData)

//       setClients(Array.isArray(clientsData) ? clientsData : [])
//       setLoans(Array.isArray(loansData) ? loansData : [])
      
//       const approvedProjects = Array.isArray(projectsData) 
//         ? projectsData.filter((p: any) => p.status === 'APPROVED')
//         : []
//       setProjects(approvedProjects)

//     } catch (err) {
//       console.error('Error fetching data:', err)
//       setClientError('Failed to load data. Please refresh.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const createClient = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setClientError('')
//     setClientSuccess('')

//     if (clientForm.national_id.length !== 16) {
//       setClientError('National ID must be exactly 16 digits')
//       return
//     }
//     if (!/^\d+$/.test(clientForm.national_id)) {
//       setClientError('National ID must contain only digits')
//       return
//     }

//     try {
//       const res = await fetch(`${API}/api/clients/`, {
//         method: 'POST',
//         headers: getHeaders(),
//         body: JSON.stringify(clientForm),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         setClientSuccess('✅ Client created successfully!')
//         setShowClientForm(false)
//         setClientForm({
//           name: '',
//           client_type: 'INDIVIDUAL',
//           national_id: '',
//           email: '',
//           phone: '',
//           address: ''
//         })
//         fetchData()
//         setTimeout(() => setClientSuccess(''), 3000)
//       } else {
//         if (data.national_id) {
//           setClientError(data.national_id[0])
//         } else if (data.email) {
//           setClientError(data.email[0])
//         } else if (data.name) {
//           setClientError(data.name[0])
//         } else if (data.phone) {
//           setClientError(data.phone[0])
//         } else if (data.detail) {
//           setClientError(data.detail)
//         } else {
//           setClientError('Failed to create client. Please check all fields.')
//         }
//       }
//     } catch (err) {
//       console.error('Error creating client:', err)
//       setClientError('Network error. Please check your connection.')
//     }
//   }

//   const createLoan = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoanError('')
//     setLoanSuccess('')

//     const loanData = {
//       project: Number(loanForm.project),
//       loan_amount: Number(loanForm.loan_amount),
//       interest_rate: Number(loanForm.interest_rate),
//       tenure: Number(loanForm.tenure),
//     }

//     console.log('🔍 Sending loan data:', loanData)

//     try {
//       const res = await fetch(`${API}/api/loans/`, {
//         method: 'POST',
//         headers: getHeaders(),
//         body: JSON.stringify(loanData),
//       })

//       console.log('🔍 Response status:', res.status)

//       const contentType = res.headers.get('content-type')
      
//       if (contentType && contentType.includes('application/json')) {
//         const data = await res.json()
//         console.log('🔍 Response data:', data)

//         if (res.ok) {
//           setLoanSuccess('✅ Loan created successfully! Status: PENDING (awaiting Management approval)')
//           setShowLoanForm(false)
//           setLoanForm({ project: '', loan_amount: '', interest_rate: '', tenure: '' })
//           fetchData()
//           setTimeout(() => setLoanSuccess(''), 5000)
//         } else {
//           // Extract error message
//           let errorMessage = 'Failed to create loan.'

//           if (data.project) {
//             errorMessage = Array.isArray(data.project) ? data.project[0] : data.project
//           } else if (data.loan_amount) {
//             errorMessage = Array.isArray(data.loan_amount) ? data.loan_amount[0] : data.loan_amount
//           } else if (data.interest_rate) {
//             errorMessage = Array.isArray(data.interest_rate) ? data.interest_rate[0] : data.interest_rate
//           } else if (data.tenure) {
//             errorMessage = Array.isArray(data.tenure) ? data.tenure[0] : data.tenure
//           } else if (data.status) {
//             errorMessage = Array.isArray(data.status) ? data.status[0] : data.status
//           } else if (data.detail) {
//             errorMessage = data.detail
//           } else if (data.non_field_errors) {
//             errorMessage = Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : data.non_field_errors
//           } else if (data.error) {
//             errorMessage = data.error
//           }

//           setLoanError(errorMessage)
//         }
//       } else {
//         const text = await res.text()
//         console.log(' returned HTML:', text.substring(0, 1000))
//         setLoanError(' Please ensure the project is approved before creating a loan.')
//       }
//     } catch (err: any) {
//       console.error('💥 Error:', err)
//       setLoanError('Network error. Please check your connection.')
//     }
//   }

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//       APPROVED: 'bg-green-100 text-green-800 border-green-200',
//       REJECTED: 'bg-red-100 text-red-800 border-red-200',
//       DISBURSED: 'bg-blue-100 text-blue-800 border-blue-200',
//     }
//     return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
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
//         <p className="text-gray-500 mt-1">Loan Officer Dashboard</p>
//       </div>

//       {clientSuccess && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
//           <span className="text-green-600 text-xl">✅</span>
//           <p className="text-green-800 font-medium">{clientSuccess}</p>
//         </div>
//       )}
//       {loanSuccess && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
//           <span className="text-green-600 text-xl">✅</span>
//           <p className="text-green-800 font-medium">{loanSuccess}</p>
//         </div>
//       )}

//       <div className="flex gap-2 mb-6 border-b border-gray-200">
//         {[
//           { id: 'overview', label: 'Overview', icon: '📊' },
//           { id: 'clients', label: 'Clients', icon: '👥' },
//           { id: 'loans', label: 'Loans', icon: '💰' },
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
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-blue-600 text-sm font-medium">Total Clients</p>
//               <span className="text-3xl">👥</span>
//             </div>
//             <p className="text-4xl font-bold text-gray-900">{clients.length}</p>
//           </div>
//           <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-purple-600 text-sm font-medium">Total Loans</p>
//               <span className="text-3xl">💰</span>
//             </div>
//             <p className="text-4xl font-bold text-gray-900">{loans.length}</p>
//           </div>
//           <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-yellow-600 text-sm font-medium">Pending Loans</p>
//               <span className="text-3xl">⏳</span>
//             </div>
//             <p className="text-4xl font-bold text-gray-900">
//               {loans.filter(l => l.status === 'PENDING').length}
//             </p>
//           </div>
//         </div>
//       )}

//       {activeTab === 'clients' && (
//         <div>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Clients ({clients.length})</h2>
//             <button
//               onClick={() => {
//                 setShowClientForm(!showClientForm)
//                 setClientError('')
//               }}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
//             >
//               {showClientForm ? 'Cancel' : '+ New Client'}
//             </button>
//           </div>

//           {showClientForm && (
//             <form onSubmit={createClient} className="bg-white p-6 rounded-xl border-2 border-green-200 mb-6">
//               <h3 className="font-semibold text-gray-900 mb-4">Create New Client</h3>
              
//               {clientError && (
//                 <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-red-800 text-sm font-medium">❌ {clientError}</p>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <input
//                   type="text"
//                   placeholder="Full Name *"
//                   required
//                   value={clientForm.name}
//                   onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />

//                 <select
//                   required
//                   value={clientForm.client_type}
//                   onChange={(e) => setClientForm({...clientForm, client_type: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 >
//                   <option value="INDIVIDUAL">Individual</option>
//                   <option value="ORGANIZATION">Organization</option>
//                 </select>

//                 <input
//                   type="text"
//                   placeholder="National ID (16 digits) *"
//                   required
//                   maxLength={16}
//                   value={clientForm.national_id}
//                   onChange={(e) => setClientForm({...clientForm, national_id: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />

//                 <input
//                   type="email"
//                   placeholder="Email (optional)"
//                   value={clientForm.email}
//                   onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />

//                 <input
//                   type="tel"
//                   placeholder="Phone Number *"
//                   required
//                   value={clientForm.phone}
//                   onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />

//                 <textarea
//                   placeholder="Address *"
//                   required
//                   value={clientForm.address}
//                   onChange={(e) => setClientForm({...clientForm, address: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   rows={2}
//                 />
//               </div>
//               <button 
//                 type="submit" 
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
//               >
//                 Create Client
//               </button>
//             </form>
//           )}

//           {clients.length === 0 ? (
//             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-gray-200">
//               <div className="text-6xl mb-4">👥</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No clients yet</h3>
//               <p className="text-gray-500 mb-4">Create your first client to get started</p>
//               <button
//                 onClick={() => setShowClientForm(true)}
//                 className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
//               >
//                 Create First Client
//               </button>
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">National ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {clients.map((client) => (
//                     <tr key={client.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{client.id}</td>
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{client.name}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                           {client.client_type}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600 font-mono">{client.national_id}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{client.phone}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{client.email || '—'}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === 'loans' && (
//         <div>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Loans ({loans.length})</h2>
//             <button
//               onClick={() => {
//                 setShowLoanForm(!showLoanForm)
//                 setLoanError('')
//               }}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
//             >
//               {showLoanForm ? 'Cancel' : '+ New Loan'}
//             </button>
//           </div>

//           {showLoanForm && (
//             <form onSubmit={createLoan} className="bg-white p-6 rounded-xl border-2 border-green-200 mb-6">
//               <h3 className="font-semibold text-gray-900 mb-4">Create New Loan</h3>
              
//               {loanError && (
//                 <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-red-800 text-sm font-medium whitespace-pre-line">❌ {loanError}</p>
//                 </div>
//               )}

//               {projects.length === 0 && (
//                 <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <p className="text-yellow-800 text-sm font-medium">
//                     ⚠️ No approved projects available. Projects must be approved by Management before creating loans.
//                   </p>
//                   <p className="text-yellow-700 text-xs mt-2">
//                     Please wait for Management to approve existing projects, or contact them directly.
//                   </p>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <select
//                   required
//                   value={loanForm.project}
//                   onChange={(e) => setLoanForm({...loanForm, project: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   disabled={projects.length === 0}
//                 >
//                   <option value="">
//                     {projects.length === 0 
//                       ? 'No approved projects available' 
//                       : 'Select Approved Project *'}
//                   </option>
//                   {projects.map((p) => (
//                     <option key={p.id} value={p.id}>
//                       {p.name} (Project #{p.id})
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="number"
//                   placeholder="Loan Amount (RWF) *"
//                   required
//                   min="1"
//                   value={loanForm.loan_amount}
//                   onChange={(e) => setLoanForm({...loanForm, loan_amount: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Interest Rate (%) *"
//                   required
//                   min="0"
//                   step="0.1"
//                   value={loanForm.interest_rate}
//                   onChange={(e) => setLoanForm({...loanForm, interest_rate: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Tenure (months) *"
//                   required
//                   min="1"
//                   value={loanForm.tenure}
//                   onChange={(e) => setLoanForm({...loanForm, tenure: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//               </div>
//               <button 
//                 type="submit" 
//                 disabled={projects.length === 0}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
//               >
//                 Create Loan
//               </button>
//             </form>
//           )}

//           {loans.length === 0 ? (
//             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-gray-200">
//               <div className="text-6xl mb-4">💰</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No loans yet</h3>
//               <p className="text-gray-500 mb-4">Create your first loan application</p>
//               <button
//                 onClick={() => setShowLoanForm(true)}
//                 className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
//               >
//                 Create First Loan
//               </button>
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tenure</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {loans.map((loan) => {
//                     console.log('Rendering loan:', loan.id, 'Status:', loan.status) // Debug log
//                     return (
//                       <tr key={loan.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{loan.id}</td>
//                         <td className="px-6 py-4 text-sm text-gray-600">Project #{loan.project}</td>
//                         <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
//                           {Number(loan.loan_amount || 0).toLocaleString()} RWF
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">{loan.interest_rate}%</td>
//                         <td className="px-6 py-4 text-sm text-gray-600">{loan.tenure} months</td>
//                         <td className="px-6 py-4">
//                           {loan.status ? (
//                             <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(loan.status)}`}>
//                               {loan.status}
//                             </span>
//                           ) : (
//                             <span className="text-xs px-3 py-1 rounded-full font-medium border bg-gray-100 text-gray-800 border-gray-200">
//                               NO STATUS
//                             </span>
//                           )}
//                         </td>
//                       </tr>
//                     )
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
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

interface Client {
  id: number
  name: string
  client_type: string
  national_id: string
  phone: string
  email: string
}

interface Loan {
  id: number
  project: number
  loan_amount: string | number
  interest_rate: string | number
  tenure: number
  status: string
}

interface Project {
  id: number
  name: string
  status: string
}

export default function LoanOfficerDashboard() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab')
  
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'loans'>(
    (tabFromUrl as 'overview' | 'clients' | 'loans') || 'overview'
  )
  
  const [clients, setClients] = useState<Client[]>([])
  const [loans, setLoans] = useState<Loan[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  
  const [showClientForm, setShowClientForm] = useState(false)
  const [showLoanForm, setShowLoanForm] = useState(false)
  const [clientForm, setClientForm] = useState({
    name: '',
    client_type: 'INDIVIDUAL',
    national_id: '',
    email: '',
    phone: '',
    address: ''
  })
  const [loanForm, setLoanForm] = useState({
    project: '',
    loan_amount: '',
    interest_rate: '',
    tenure: ''
  })

  const [clientError, setClientError] = useState('')
  const [loanError, setLoanError] = useState('')
  const [clientSuccess, setClientSuccess] = useState('')
  const [loanSuccess, setLoanSuccess] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [clientsRes, loansRes, projectsRes] = await Promise.all([
        fetch(`${API}/api/clients/`, { headers: getHeaders() }),
        fetch(`${API}/api/loans/`, { headers: getHeaders() }),
        fetch(`${API}/api/projects/`, { headers: getHeaders() }),
      ])

      const clientsData = await clientsRes.json().catch(() => [])
      const loansData = await loansRes.json().catch(() => [])
      const projectsData = await projectsRes.json().catch(() => [])

      console.log('📋 Loans from API:', loansData)

      setClients(Array.isArray(clientsData) ? clientsData : [])
      setLoans(Array.isArray(loansData) ? loansData : [])
      
      const approvedProjects: Project[] = Array.isArray(projectsData) 
        ? projectsData.filter((p: Project) => p.status === 'APPROVED')
        : []
      setProjects(approvedProjects)

    } catch (err) {
      console.error('Error fetching data:', err)
      setClientError('Failed to load data. Please refresh.')
    } finally {
      setLoading(false)
    }
  }

  const createClient = async (e: React.FormEvent) => {
    e.preventDefault()
    setClientError('')
    setClientSuccess('')

    if (clientForm.national_id.length !== 16) {
      setClientError('National ID must be exactly 16 digits')
      return
    }
    if (!/^\d+$/.test(clientForm.national_id)) {
      setClientError('National ID must contain only digits')
      return
    }

    try {
      const res = await fetch(`${API}/api/clients/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(clientForm),
      })

      const data = await res.json()

      if (res.ok) {
        setClientSuccess('✅ Client created successfully!')
        setShowClientForm(false)
        setClientForm({
          name: '',
          client_type: 'INDIVIDUAL',
          national_id: '',
          email: '',
          phone: '',
          address: ''
        })
        fetchData()
        setTimeout(() => setClientSuccess(''), 3000)
      } else {
        if (data.national_id) {
          setClientError(data.national_id[0])
        } else if (data.email) {
          setClientError(data.email[0])
        } else if (data.name) {
          setClientError(data.name[0])
        } else if (data.phone) {
          setClientError(data.phone[0])
        } else if (data.detail) {
          setClientError(data.detail)
        } else {
          setClientError('Failed to create client. Please check all fields.')
        }
      }
    } catch (err) {
      console.error('Error creating client:', err)
      setClientError('Network error. Please check your connection.')
    }
  }

  const createLoan = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoanError('')
    setLoanSuccess('')

    const loanData = {
      project: Number(loanForm.project),
      loan_amount: Number(loanForm.loan_amount),
      interest_rate: Number(loanForm.interest_rate),
      tenure: Number(loanForm.tenure),
    }

    console.log('🔍 Sending loan data:', loanData)

    try {
      const res = await fetch(`${API}/api/loans/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(loanData),
      })

      console.log('🔍 Response status:', res.status)

      const contentType = res.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json()
        console.log('🔍 Response data:', data)

        if (res.ok) {
          setLoanSuccess('✅ Loan created successfully! Status: PENDING (awaiting Management approval)')
          setShowLoanForm(false)
          setLoanForm({ project: '', loan_amount: '', interest_rate: '', tenure: '' })
          fetchData()
          setTimeout(() => setLoanSuccess(''), 5000)
        } else {
          let errorMessage = 'Failed to create loan.'

          if (data.project) {
            errorMessage = Array.isArray(data.project) ? data.project[0] : data.project
          } else if (data.loan_amount) {
            errorMessage = Array.isArray(data.loan_amount) ? data.loan_amount[0] : data.loan_amount
          } else if (data.interest_rate) {
            errorMessage = Array.isArray(data.interest_rate) ? data.interest_rate[0] : data.interest_rate
          } else if (data.tenure) {
            errorMessage = Array.isArray(data.tenure) ? data.tenure[0] : data.tenure
          } else if (data.status) {
            errorMessage = Array.isArray(data.status) ? data.status[0] : data.status
          } else if (data.detail) {
            errorMessage = data.detail
          } else if (data.non_field_errors) {
            errorMessage = Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : data.non_field_errors
          } else if (data.error) {
            errorMessage = data.error
          }

          setLoanError(errorMessage)
        }
      } else {
        const text = await res.text()
        console.log('returned HTML:', text.substring(0, 1000))
        setLoanError('Please ensure the project is approved before creating a loan.')
      }
    } catch (err) {
      console.error('💥 Error:', err)
      setLoanError('Network error. Please check your connection.')
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      APPROVED: 'bg-green-100 text-green-800 border-green-200',
      REJECTED: 'bg-red-100 text-red-800 border-red-200',
      DISBURSED: 'bg-blue-100 text-blue-800 border-blue-200',
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
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
        <p className="text-gray-500 mt-1">Loan Officer Dashboard</p>
      </div>

      {clientSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <span className="text-green-600 text-xl">✅</span>
          <p className="text-green-800 font-medium">{clientSuccess}</p>
        </div>
      )}
      {loanSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <span className="text-green-600 text-xl">✅</span>
          <p className="text-green-800 font-medium">{loanSuccess}</p>
        </div>
      )}

      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'clients', label: 'Clients', icon: '👥' },
          { id: 'loans', label: 'Loans', icon: '💰' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'overview' | 'clients' | 'loans')}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-600 text-sm font-medium">Total Clients</p>
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-4xl font-bold text-gray-900">{clients.length}</p>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-purple-600 text-sm font-medium">Total Loans</p>
              <span className="text-3xl">💰</span>
            </div>
            <p className="text-4xl font-bold text-gray-900">{loans.length}</p>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-yellow-600 text-sm font-medium">Pending Loans</p>
              <span className="text-3xl">⏳</span>
            </div>
            <p className="text-4xl font-bold text-gray-900">
              {loans.filter(l => l.status === 'PENDING').length}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'clients' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Clients ({clients.length})</h2>
            <button
              onClick={() => {
                setShowClientForm(!showClientForm)
                setClientError('')
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              {showClientForm ? 'Cancel' : '+ New Client'}
            </button>
          </div>

          {showClientForm && (
            <form onSubmit={createClient} className="bg-white p-6 rounded-xl border-2 border-green-200 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Create New Client</h3>
              
              {clientError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm font-medium">❌ {clientError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={clientForm.name}
                  onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <select
                  required
                  value={clientForm.client_type}
                  onChange={(e) => setClientForm({...clientForm, client_type: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="INDIVIDUAL">Individual</option>
                  <option value="ORGANIZATION">Organization</option>
                </select>

                <input
                  type="text"
                  placeholder="National ID (16 digits) *"
                  required
                  maxLength={16}
                  value={clientForm.national_id}
                  onChange={(e) => setClientForm({...clientForm, national_id: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  value={clientForm.phone}
                  onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <textarea
                  placeholder="Address *"
                  required
                  value={clientForm.address}
                  onChange={(e) => setClientForm({...clientForm, address: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={2}
                />
              </div>
              <button 
                type="submit" 
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Create Client
              </button>
            </form>
          )}

          {clients.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No clients yet</h3>
              <p className="text-gray-500 mb-4">Create your first client to get started</p>
              <button
                onClick={() => setShowClientForm(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Create First Client
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">National ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{client.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{client.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {client.client_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{client.national_id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{client.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{client.email || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'loans' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Loans ({loans.length})</h2>
            <button
              onClick={() => {
                setShowLoanForm(!showLoanForm)
                setLoanError('')
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              {showLoanForm ? 'Cancel' : '+ New Loan'}
            </button>
          </div>

          {showLoanForm && (
            <form onSubmit={createLoan} className="bg-white p-6 rounded-xl border-2 border-green-200 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Create New Loan</h3>
              
              {loanError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm font-medium whitespace-pre-line">❌ {loanError}</p>
                </div>
              )}

              {projects.length === 0 && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm font-medium">
                    ⚠️ No approved projects available. Projects must be approved by Management before creating loans.
                  </p>
                  <p className="text-yellow-700 text-xs mt-2">
                    Please wait for Management to approve existing projects, or contact them directly.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select
                  required
                  value={loanForm.project}
                  onChange={(e) => setLoanForm({...loanForm, project: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={projects.length === 0}
                >
                  <option value="">
                    {projects.length === 0 
                      ? 'No approved projects available' 
                      : 'Select Approved Project *'}
                  </option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Project #{p.id})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Loan Amount (RWF) *"
                  required
                  min="1"
                  value={loanForm.loan_amount}
                  onChange={(e) => setLoanForm({...loanForm, loan_amount: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Interest Rate (%) *"
                  required
                  min="0"
                  step="0.1"
                  value={loanForm.interest_rate}
                  onChange={(e) => setLoanForm({...loanForm, interest_rate: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Tenure (months) *"
                  required
                  min="1"
                  value={loanForm.tenure}
                  onChange={(e) => setLoanForm({...loanForm, tenure: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button 
                type="submit" 
                disabled={projects.length === 0}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Loan
              </button>
            </form>
          )}

          {loans.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No loans yet</h3>
              <p className="text-gray-500 mb-4">Create your first loan application</p>
              <button
                onClick={() => setShowLoanForm(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Create First Loan
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tenure</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loans.map((loan) => {
                    console.log('Rendering loan:', loan.id, 'Status:', loan.status)
                    return (
                      <tr key={loan.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{loan.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Project #{loan.project}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                          {Number(loan.loan_amount || 0).toLocaleString()} RWF
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{loan.interest_rate}%</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{loan.tenure} months</td>
                        <td className="px-6 py-4">
                          {loan.status ? (
                            <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(loan.status)}`}>
                              {loan.status}
                            </span>
                          ) : (
                            <span className="text-xs px-3 py-1 rounded-full font-medium border bg-gray-100 text-gray-800 border-gray-200">
                              NO STATUS
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </main>
  )
}