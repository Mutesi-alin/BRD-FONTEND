// 'use client'
// import { useEffect, useState } from 'react'
// import { useAuth } from '@/context/AuthContext'

// const API = process.env.NEXT_PUBLIC_API_URL

// const getHeaders = () => ({
//   'Content-Type': 'application/json',
//   Authorization: `Token ${localStorage.getItem('token')}`,
// })

// const ROLES = [
//   { value: 'ADMIN', label: 'Admin', color: 'bg-purple-100 text-purple-800 border-purple-200' },
//   { value: 'LOAN_OFFICER', label: 'Loan Officer', color: 'bg-blue-100 text-blue-800 border-blue-200' },
//   { value: 'PROJECT_OFFICER', label: 'Project Officer', color: 'bg-green-100 text-green-800 border-green-200' },
//   { value: 'MANAGEMENT', label: 'Management', color: 'bg-orange-100 text-orange-800 border-orange-200' },
//   { value: 'FINANCE_OFFICER', label: 'Finance Officer', color: 'bg-pink-100 text-pink-800 border-pink-200' },
// ]

// export default function UserManagementPage() {
//   const { user: currentUser } = useAuth()
//   const [users, setUsers] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [editingUser, setEditingUser] = useState<number | null>(null)
//   const [selectedRole, setSelectedRole] = useState('')
//   const [success, setSuccess] = useState('')
//   const [error, setError] = useState('')

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   const fetchUsers = async () => {
//     setLoading(true)
//     try {
//       const res = await fetch(`${API}/api/users/list/`, { headers: getHeaders() })
//       const data = await res.json()
//       setUsers(Array.isArray(data) ? data : [])
//     } catch (err) {
//       console.error('Error fetching users:', err)
//       setError('Failed to load users')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleRoleChange = async (userId: number, newRole: string) => {
//     setError('')
//     setSuccess('')

//     try {
//       const res = await fetch(`${API}/api/users/role/update/`, {
//         method: 'PATCH',
//         headers: getHeaders(),
//         body: JSON.stringify({
//           user_id: userId,
//           role: newRole,
//         }),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         setSuccess(`✅ User role updated to ${newRole.replace(/_/g, ' ')}`)
//         setEditingUser(null)
//         fetchUsers()
//         setTimeout(() => setSuccess(''), 3000)
//       } else {
//         setError(data.detail || 'Failed to update role')
//       }
//     } catch (err) {
//       console.error('Error updating role:', err)
//       setError('Network error. Please try again.')
//     }
//   }

//   const getRoleColor = (role: string) => {
//     const roleData = ROLES.find(r => r.value === role)
//     return roleData?.color || 'bg-gray-100 text-gray-800 border-gray-200'
//   }

//   if (loading) {
//     return (
//       <main className="p-8">
//         <div className="text-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading users...</p>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <main className="p-8 bg-gray-50 min-h-screen">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
//         <p className="text-gray-500 mt-1">Manage user roles and permissions</p>
//       </div>

//       {success && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
//           <span className="text-green-600 text-xl">✅</span>
//           <p className="text-green-800 font-medium">{success}</p>
//         </div>
//       )}

//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
//           <span className="text-red-600 text-xl">❌</span>
//           <div className="flex-1">
//             <p className="text-red-800 font-medium">{error}</p>
//           </div>
//           <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">✕</button>
//         </div>
//       )}

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
//           <p className="text-sm text-gray-500 mt-1">{users.length} total users</p>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Role</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
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
//                 users.map((u) => (
//                   <tr key={u.id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//                           <span className="text-green-700 font-semibold text-sm">
//                             {u.first_name?.[0]}{u.last_name?.[0]}
//                           </span>
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">
//                             {u.first_name} {u.last_name}
//                           </p>
//                           <p className="text-xs text-gray-500">ID: {u.id}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
//                     <td className="px-6 py-4">
//                       {editingUser === u.id ? (
//                         <select
//                           value={selectedRole}
//                           onChange={(e) => setSelectedRole(e.target.value)}
//                           className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                         >
//                           <option value="">Select role...</option>
//                           {ROLES.map((role) => (
//                             <option key={role.value} value={role.value}>
//                               {role.label}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getRoleColor(u.role)}`}>
//                           {u.role?.replace(/_/g, ' ')}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="text-xs px-3 py-1 rounded-full font-medium border bg-green-100 text-green-800 border-green-200">
//                         Active
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       {editingUser === u.id ? (
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => {
//                               if (selectedRole) {
//                                 handleRoleChange(u.id, selectedRole)
//                               }
//                             }}
//                             disabled={!selectedRole}
//                             className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
//                           >
//                             Save
//                           </button>
//                           <button
//                             onClick={() => {
//                               setEditingUser(null)
//                               setSelectedRole('')
//                             }}
//                             className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       ) : (
//                         <button
//                           onClick={() => {
//                             setEditingUser(u.id)
//                             setSelectedRole(u.role)
//                           }}
//                           disabled={u.id === currentUser?.id}
//                           className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
//                         >
//                           {u.id === currentUser?.id ? 'You' : 'Change Role'}
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
//         <div className="flex items-start gap-3">
//           <span className="text-2xl">ℹ️</span>
//           <div>
//             <h4 className="text-blue-900 font-semibold mb-1">Role Management Info</h4>
//             <ul className="text-sm text-blue-800 space-y-1">
//               <li>• <strong>Admin:</strong> Full system access and user management</li>
//               <li>• <strong>Loan Officer:</strong> Create clients and loan applications</li>
//               <li>• <strong>Project Officer:</strong> Create and manage projects</li>
//               <li>• <strong>Management:</strong> Approve loans and projects</li>
//               <li>• <strong>Finance Officer:</strong> Process loan disbursements</li>
//             </ul>
//           </div>
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

const ROLES = [
  { value: 'ADMIN', label: 'Admin', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { value: 'LOAN_OFFICER', label: 'Loan Officer', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'PROJECT_OFFICER', label: 'Project Officer', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'MANAGEMENT', label: 'Management', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { value: 'FINANCE_OFFICER', label: 'Finance Officer', color: 'bg-pink-100 text-pink-800 border-pink-200' },
]

interface SystemUser {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  date_joined?: string
}

export default function UserManagementPage() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<SystemUser[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<number | null>(null)
  const [selectedRole, setSelectedRole] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/users/list/`, { headers: getHeaders() })
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching users:', err)
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: number, newRole: string) => {
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`${API}/api/users/role/update/`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
          user_id: userId,
          role: newRole,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(`✅ User role updated to ${newRole.replace(/_/g, ' ')}`)
        setEditingUser(null)
        fetchUsers()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(data.detail || 'Failed to update role')
      }
    } catch (err) {
      console.error('Error updating role:', err)
      setError('Network error. Please try again.')
    }
  }

  const getRoleColor = (role: string) => {
    const roleData = ROLES.find(r => r.value === role)
    return roleData?.color || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  if (loading) {
    return (
      <main className="p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500 mt-1">Manage user roles and permissions</p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <span className="text-green-600 text-xl">✅</span>
          <p className="text-green-800 font-medium">{success}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <span className="text-red-600 text-xl">❌</span>
          <div className="flex-1">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
          <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">✕</button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
          <p className="text-sm text-gray-500 mt-1">{users.length} total users</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
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
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-700 font-semibold text-sm">
                            {u.first_name?.[0]}{u.last_name?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {u.first_name} {u.last_name}
                          </p>
                          <p className="text-xs text-gray-500">ID: {u.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                    <td className="px-6 py-4">
                      {editingUser === u.id ? (
                        <select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select role...</option>
                          {ROLES.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getRoleColor(u.role)}`}>
                          {u.role?.replace(/_/g, ' ')}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-3 py-1 rounded-full font-medium border bg-green-100 text-green-800 border-green-200">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {editingUser === u.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (selectedRole) {
                                handleRoleChange(u.id, selectedRole)
                              }
                            }}
                            disabled={!selectedRole}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingUser(null)
                              setSelectedRole('')
                            }}
                            className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingUser(u.id)
                            setSelectedRole(u.role)
                          }}
                          disabled={u.id === currentUser?.id}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          {u.id === currentUser?.id ? 'You' : 'Change Role'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h4 className="text-blue-900 font-semibold mb-1">Role Management Info</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Admin:</strong> Full system access and user management</li>
              <li>• <strong>Loan Officer:</strong> Create clients and loan applications</li>
              <li>• <strong>Project Officer:</strong> Create and manage projects</li>
              <li>• <strong>Management:</strong> Approve loans and projects</li>
              <li>• <strong>Finance Officer:</strong> Process loan disbursements</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
} 