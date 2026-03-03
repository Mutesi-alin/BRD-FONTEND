// 'use client'
// import { useEffect, useState } from 'react'
// import { useAuth } from '@/context/AuthContext'

// const API = process.env.NEXT_PUBLIC_API_URL

// const getHeaders = () => ({
//   'Content-Type': 'application/json',
//   Authorization: `Token ${localStorage.getItem('token')}`,
// })

// export default function ActivityLogsPage() {
//   const { user } = useAuth()
//   const [loading, setLoading] = useState(true)
//   const [activities, setActivities] = useState<any[]>([])
//   const [filter, setFilter] = useState('all')

//   useEffect(() => {
//     fetchActivityLogs()
//   }, [])

//   const fetchActivityLogs = async () => {
//     setLoading(true)
//     try {
//       // Fetch all data to generate activity logs
//       const [loans, projects, disbursements, clients] = await Promise.all([
//         fetch(`${API}/api/loans/`, { headers: getHeaders() }).then(r => r.json()),
//         fetch(`${API}/api/projects/`, { headers: getHeaders() }).then(r => r.json()),
//         fetch(`${API}/api/disbursements/`, { headers: getHeaders() }).then(r => r.json()),
//         fetch(`${API}/api/clients/`, { headers: getHeaders() }).then(r => r.json()),
//       ])

//       // Generate activity logs from the data
//       const activityList: any[] = []

//       // Loans activities
//       if (Array.isArray(loans)) {
//         loans.forEach(loan => {
//           activityList.push({
//             id: `loan-${loan.id}`,
//             type: 'loan',
//             action: `Loan #${loan.id} ${loan.status.toLowerCase()}`,
//             user: 'Loan Officer',
//             timestamp: loan.created_at || new Date().toISOString(),
//             status: loan.status,
//             icon: '💰',
//           })
//         })
//       }

//       // Projects activities
//       if (Array.isArray(projects)) {
//         projects.forEach(project => {
//           activityList.push({
//             id: `project-${project.id}`,
//             type: 'project',
//             action: `Project "${project.name}" ${project.status.toLowerCase()}`,
//             user: 'Project Officer',
//             timestamp: project.created_at || new Date().toISOString(),
//             status: project.status,
//             icon: '📁',
//           })
//         })
//       }

//       // Disbursements activities
//       if (Array.isArray(disbursements)) {
//         disbursements.forEach(disbursement => {
//           activityList.push({
//             id: `disbursement-${disbursement.id}`,
//             type: 'disbursement',
//             action: `Disbursement of ${Number(disbursement.amount || 0).toLocaleString()} RWF`,
//             user: 'Finance Officer',
//             timestamp: disbursement.disbursement_date || new Date().toISOString(),
//             status: 'COMPLETED',
//             icon: '💳',
//           })
//         })
//       }

//       // Clients activities
//       if (Array.isArray(clients)) {
//         clients.forEach(client => {
//           activityList.push({
//             id: `client-${client.id}`,
//             type: 'client',
//             action: `New client "${client.name}" registered`,
//             user: 'Loan Officer',
//             timestamp: client.created_at || new Date().toISOString(),
//             status: 'ACTIVE',
//             icon: '👤',
//           })
//         })
//       }

//       // Sort by timestamp (newest first)
//       activityList.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

//       setActivities(activityList)
//     } catch (err) {
//       console.error('Error fetching activity logs:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const filteredActivities = filter === 'all' 
//     ? activities 
//     : activities.filter(a => a.type === filter)

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//       APPROVED: 'bg-green-100 text-green-800 border-green-200',
//       REJECTED: 'bg-red-100 text-red-800 border-red-200',
//       ONGOING: 'bg-blue-100 text-blue-800 border-blue-200',
//       COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
//       ACTIVE: 'bg-emerald-100 text-emerald-800 border-emerald-200',
//     }
//     return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
//   }

//   if (loading) {
//     return (
//       <main className="p-8">
//         <div className="text-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading activity logs...</p>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <main className="p-8 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
//         <p className="text-gray-500 mt-1">Track all system activities and changes</p>
//       </div>

//       {/* Filters */}
//       <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
//         <div className="flex items-center gap-4 flex-wrap">
//           <span className="text-sm font-medium text-gray-700">Filter by:</span>
//           <div className="flex gap-2">
//             {[
//               { value: 'all', label: 'All Activities', icon: '📋' },
//               { value: 'loan', label: 'Loans', icon: '💰' },
//               { value: 'project', label: 'Projects', icon: '📁' },
//               { value: 'disbursement', label: 'Disbursements', icon: '💳' },
//               { value: 'client', label: 'Clients', icon: '👤' },
//             ].map((f) => (
//               <button
//                 key={f.value}
//                 onClick={() => setFilter(f.value)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
//                   filter === f.value
//                     ? 'bg-green-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 <span>{f.icon}</span>
//                 <span>{f.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Activity Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//           <p className="text-gray-600 text-sm mb-1">Total Activities</p>
//           <p className="text-3xl font-bold text-gray-900">{activities.length}</p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//           <p className="text-gray-600 text-sm mb-1">Today</p>
//           <p className="text-3xl font-bold text-gray-900">
//             {activities.filter(a => {
//               const today = new Date().toDateString()
//               return new Date(a.timestamp).toDateString() === today
//             }).length}
//           </p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//           <p className="text-gray-600 text-sm mb-1">This Week</p>
//           <p className="text-3xl font-bold text-gray-900">
//             {activities.filter(a => {
//               const weekAgo = new Date()
//               weekAgo.setDate(weekAgo.getDate() - 7)
//               return new Date(a.timestamp) >= weekAgo
//             }).length}
//           </p>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//           <p className="text-gray-600 text-sm mb-1">This Month</p>
//           <p className="text-3xl font-bold text-gray-900">
//             {activities.filter(a => {
//               const monthAgo = new Date()
//               monthAgo.setMonth(monthAgo.getMonth() - 1)
//               return new Date(a.timestamp) >= monthAgo
//             }).length}
//           </p>
//         </div>
//       </div>

//       {/* Activity Timeline */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
//           <p className="text-sm text-gray-500 mt-1">{filteredActivities.length} activities</p>
//         </div>

//         <div className="divide-y divide-gray-200">
//           {filteredActivities.length === 0 ? (
//             <div className="p-12 text-center text-gray-500">
//               <p className="text-4xl mb-2">📋</p>
//               <p>No activities found</p>
//             </div>
//           ) : (
//             filteredActivities.map((activity) => (
//               <div key={activity.id} className="p-6 hover:bg-gray-50 transition">
//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
//                     <span className="text-2xl">{activity.icon}</span>
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{activity.action}</p>
//                         <p className="text-xs text-gray-500 mt-1">
//                           by {activity.user} • {new Date(activity.timestamp).toLocaleString()}
//                         </p>
//                       </div>
//                       <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(activity.status)}`}>
//                         {activity.status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
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

interface Activity {
  id: string
  type: string
  action: string
  user: string
  timestamp: string
  status: string
  icon: string
}

export default function ActivityLogsPage() {
  useAuth()
  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState<Activity[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchActivityLogs()
  }, [])

  const fetchActivityLogs = async () => {
    setLoading(true)
    try {
      // Fetch all data to generate activity logs
      const [loans, projects, disbursements, clients] = await Promise.all([
        fetch(`${API}/api/loans/`, { headers: getHeaders() }).then(r => r.json()),
        fetch(`${API}/api/projects/`, { headers: getHeaders() }).then(r => r.json()),
        fetch(`${API}/api/disbursements/`, { headers: getHeaders() }).then(r => r.json()),
        fetch(`${API}/api/clients/`, { headers: getHeaders() }).then(r => r.json()),
      ])

      // Generate activity logs from the data
      const activityList: Activity[] = []

      // Loans activities
      if (Array.isArray(loans)) {
        loans.forEach((loan: Record<string, unknown>) => {
          activityList.push({
            id: `loan-${loan.id}`,
            type: 'loan',
            action: `Loan #${loan.id} ${String(loan.status).toLowerCase()}`,
            user: 'Loan Officer',
            timestamp: String(loan.created_at || new Date().toISOString()),
            status: String(loan.status),
            icon: '💰',
          })
        })
      }

      // Projects activities
      if (Array.isArray(projects)) {
        projects.forEach((project: Record<string, unknown>) => {
          activityList.push({
            id: `project-${project.id}`,
            type: 'project',
            action: `Project "${project.name}" ${String(project.status).toLowerCase()}`,
            user: 'Project Officer',
            timestamp: String(project.created_at || new Date().toISOString()),
            status: String(project.status),
            icon: '📁',
          })
        })
      }

      // Disbursements activities
      if (Array.isArray(disbursements)) {
        disbursements.forEach((disbursement: Record<string, unknown>) => {
          activityList.push({
            id: `disbursement-${disbursement.id}`,
            type: 'disbursement',
            action: `Disbursement of ${Number(disbursement.amount || 0).toLocaleString()} RWF`,
            user: 'Finance Officer',
            timestamp: String(disbursement.disbursement_date || new Date().toISOString()),
            status: 'COMPLETED',
            icon: '💳',
          })
        })
      }

      // Clients activities
      if (Array.isArray(clients)) {
        clients.forEach((client: Record<string, unknown>) => {
          activityList.push({
            id: `client-${client.id}`,
            type: 'client',
            action: `New client "${client.name}" registered`,
            user: 'Loan Officer',
            timestamp: String(client.created_at || new Date().toISOString()),
            status: 'ACTIVE',
            icon: '👤',
          })
        })
      }

      // Sort by timestamp (newest first)
      activityList.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

      setActivities(activityList)
    } catch (err) {
      console.error('Error fetching activity logs:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter)

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      APPROVED: 'bg-green-100 text-green-800 border-green-200',
      REJECTED: 'bg-red-100 text-red-800 border-red-200',
      ONGOING: 'bg-blue-100 text-blue-800 border-blue-200',
      COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
      ACTIVE: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  if (loading) {
    return (
      <main className="p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading activity logs...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
        <p className="text-gray-500 mt-1">Track all system activities and changes</p>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All Activities', icon: '📋' },
              { value: 'loan', label: 'Loans', icon: '💰' },
              { value: 'project', label: 'Projects', icon: '📁' },
              { value: 'disbursement', label: 'Disbursements', icon: '💳' },
              { value: 'client', label: 'Clients', icon: '👤' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                  filter === f.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Total Activities</p>
          <p className="text-3xl font-bold text-gray-900">{activities.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Today</p>
          <p className="text-3xl font-bold text-gray-900">
            {activities.filter(a => {
              const today = new Date().toDateString()
              return new Date(a.timestamp).toDateString() === today
            }).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">This Week</p>
          <p className="text-3xl font-bold text-gray-900">
            {activities.filter(a => {
              const weekAgo = new Date()
              weekAgo.setDate(weekAgo.getDate() - 7)
              return new Date(a.timestamp) >= weekAgo
            }).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">This Month</p>
          <p className="text-3xl font-bold text-gray-900">
            {activities.filter(a => {
              const monthAgo = new Date()
              monthAgo.setMonth(monthAgo.getMonth() - 1)
              return new Date(a.timestamp) >= monthAgo
            }).length}
          </p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
          <p className="text-sm text-gray-500 mt-1">{filteredActivities.length} activities</p>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredActivities.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-4xl mb-2">📋</p>
              <p>No activities found</p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          by {activity.user} • {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
