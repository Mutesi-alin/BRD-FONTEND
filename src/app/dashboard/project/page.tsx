
// 'use client'
// import { useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { useAuth } from '@/context/AuthContext'
// import { useClients } from '@/context/ClientContext'
// import { useProjects } from '@/context/ProjectContext'

// const API = process.env.NEXT_PUBLIC_API_URL

// const getHeaders = () => ({
//   'Content-Type': 'application/json',
//   Authorization: `Token ${localStorage.getItem('token')}`,
// })

// export default function ProjectOfficerDashboard() {
//   const { user } = useAuth()
//   const { clients } = useClients() 
//   const { projects, refreshProjects } = useProjects() 
  
//   const searchParams = useSearchParams()
//   const tabFromUrl = searchParams.get('tab')
  
//   const [activeTab, setActiveTab] = useState<'overview' | 'projects'>(
//     (tabFromUrl as 'overview' | 'projects') || 'overview'
//   )
  
//   const [showProjectForm, setShowProjectForm] = useState(false)
//   const [projectForm, setProjectForm] = useState({
//     name: '',
//     description: '',
//     client: '',
//     budget: '',
//     start_date: '',
//     end_date: '',
//   })

//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')

//   const createProject = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     setSuccess('')

//     try {
//       const res = await fetch(`${API}/api/projects/`, {
//         method: 'POST',
//         headers: getHeaders(),
//         body: JSON.stringify({
//           ...projectForm,
//           budget: projectForm.budget ? Number(projectForm.budget) : null,
//         }),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         setSuccess('✅ Project created successfully! Status: PENDING')
//         setShowProjectForm(false)
//         setProjectForm({
//           name: '',
//           description: '',
//           client: '',
//           budget: '',
//           start_date: '',
//           end_date: '',
//         })
        
//         await refreshProjects()
        
//         setTimeout(() => setSuccess(''), 3000)
//       } else {
//         setError(data.name?.[0] || data.client?.[0] || data.detail || 'Failed to create project')
//       }
//     } catch (err) {
//       console.error('Error creating project:', err)
//       setError('Network error. Please check your connection.')
//     }
//   }

//   const projectStatusColor: Record<string, string> = {
//     PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//     APPROVED: 'bg-green-100 text-green-800 border-green-200',
//     ONGOING: 'bg-blue-100 text-blue-800 border-blue-200',
//     COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
//     REJECTED: 'bg-red-100 text-red-800 border-red-200',
//   }

//   return (
//     <main className="p-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Welcome, {user?.first_name} {user?.last_name}! 👋
//         </h1>
//         <p className="text-gray-500 mt-1">Project Officer Dashboard</p>
//       </div>

//       {success && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
//           <span className="text-green-600 text-xl">✅</span>
//           <p className="text-green-800 font-medium">{success}</p>
//         </div>
//       )}

//       <div className="flex gap-2 mb-6 border-b border-gray-200">
//         {[
//           { id: 'overview', label: 'Overview', icon: '📊' },
//           { id: 'projects', label: 'Projects', icon: '📁' },
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
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-blue-600 text-sm font-medium">Total Projects</p>
//               <span className="text-3xl">📁</span>
//             </div>
//             <p className="text-4xl font-bold text-gray-900">{projects.length}</p>
//           </div>
//           <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-yellow-600 text-sm font-medium">Pending</p>
//               <span className="text-3xl">⏳</span>
//             </div>
//             <p className="text-4xl font-bold text-gray-900">
//               {projects.filter(p => p.status === 'PENDING').length}
//             </p>
//           </div>
//           <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-green-600 text-sm font-medium">Approved</p>
//               <span className="text-3xl">✅</span>
//             </div>
//             <p className="text-4xl font-bold text-gray-900">
//               {projects.filter(p => p.status === 'APPROVED').length}
//             </p>
//           </div>
//           <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-purple-600 text-sm font-medium">Completed</p>
//               <span className="text-3xl">🎉</span>
//             </div>
//             <p className="text-4xl font-bold text-gray-900">
//               {projects.filter(p => p.status === 'COMPLETED').length}
//             </p>
//           </div>
//         </div>
//       )}

//       {activeTab === 'projects' && (
//         <div>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Projects ({projects.length})</h2>
//             <button
//               onClick={() => {
//                 setShowProjectForm(!showProjectForm)
//                 setError('')
//               }}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
//             >
//               {showProjectForm ? 'Cancel' : '+ New Project'}
//             </button>
//           </div>

//           {showProjectForm && (
//             <form onSubmit={createProject} className="bg-white p-6 rounded-xl border-2 border-green-200 mb-6">
//               <h3 className="font-semibold text-gray-900 mb-4">Create New Project</h3>
              
//               {error && (
//                 <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-red-800 text-sm font-medium">❌ {error}</p>
//                 </div>
//               )}

//               {clients.length === 0 ? (
//                 <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <p className="text-yellow-800 text-sm font-medium">
//                     ⚠️ No clients available. Waiting for Loan Officer to create clients...
//                   </p>
//                   <p className="text-yellow-700 text-xs mt-2">
//                     Note: Due to backend permissions, clients are created by Loan Officers and automatically appear here.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//                   <p className="text-blue-800 text-sm font-medium">
//                     ✅ {clients.length} client{clients.length !== 1 ? 's' : ''} available from Loan Officer
//                   </p>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <input
//                   type="text"
//                   placeholder="Project Name *"
//                   required
//                   value={projectForm.name}
//                   onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />

//                 <select
//                   required
//                   value={projectForm.client}
//                   onChange={(e) => setProjectForm({...projectForm, client: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   disabled={clients.length === 0}
//                 >
//                   <option value="">Select Client *</option>
//                   {clients.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name} (ID: {c.national_id})
//                     </option>
//                   ))}
//                 </select>

//                 <input
//                   type="number"
//                   placeholder="Budget (RWF, optional)"
//                   value={projectForm.budget}
//                   onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />

//                 <input
//                   type="date"
//                   placeholder="Start Date"
//                   value={projectForm.start_date}
//                   onChange={(e) => setProjectForm({...projectForm, start_date: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />

//                 <input
//                   type="date"
//                   placeholder="End Date"
//                   value={projectForm.end_date}
//                   onChange={(e) => setProjectForm({...projectForm, end_date: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />

//                 <textarea
//                   placeholder="Description (optional)"
//                   value={projectForm.description}
//                   onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   rows={3}
//                 />
//               </div>
              
//               <button 
//                 type="submit" 
//                 disabled={clients.length === 0}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
//               >
//                 {clients.length === 0 ? 'Waiting for Clients...' : 'Create Project'}
//               </button>
//             </form>
//           )}

//           {projects.length === 0 ? (
//             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-gray-200">
//               <div className="text-6xl mb-4">📁</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
//               <p className="text-gray-500 mb-4">Create your first project</p>
//               {clients.length > 0 ? (
//                 <button
//                   onClick={() => setShowProjectForm(true)}
//                   className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
//                 >
//                   Create First Project
//                 </button>
//               ) : (
//                 <p className="text-yellow-600 text-sm">Waiting for Loan Officer to create clients first...</p>
//               )}
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {projects.map((project) => {
//                     const client = clients.find(c => c.id === project.client)
//                     return (
//                       <tr key={project.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{project.id}</td>
//                         <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.name}</td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {client ? client.name : `Client #${project.client}`}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {project.budget ? `${Number(project.budget).toLocaleString()} RWF` : '—'}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`text-xs px-3 py-1 rounded-full font-medium border ${projectStatusColor[project.status]}`}>
//                             {project.status}
//                           </span>
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
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useClients } from '@/context/ClientContext'
import { useProjects } from '@/context/ProjectContext'

const API = process.env.NEXT_PUBLIC_API_URL

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
})

export default function ProjectOfficerDashboard() {
  const { user } = useAuth()
  const { clients } = useClients() 
  const { projects, refreshProjects } = useProjects() 
  
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab')
  
  const [activeTab, setActiveTab] = useState<'overview' | 'projects'>(
    (tabFromUrl as 'overview' | 'projects') || 'overview'
  )
  
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    client: '',
    budget: '',
    start_date: '',
    end_date: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`${API}/api/projects/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          ...projectForm,
          budget: projectForm.budget ? Number(projectForm.budget) : null,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess('✅ Project created successfully! Status: PENDING')
        setShowProjectForm(false)
        setProjectForm({
          name: '',
          description: '',
          client: '',
          budget: '',
          start_date: '',
          end_date: '',
        })
        
        await refreshProjects()
        
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(data.name?.[0] || data.client?.[0] || data.detail || 'Failed to create project')
      }
    } catch (err) {
      console.error('Error creating project:', err)
      setError('Network error. Please check your connection.')
    }
  }

  const projectStatusColor: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    APPROVED: 'bg-green-100 text-green-800 border-green-200',
    ONGOING: 'bg-blue-100 text-blue-800 border-blue-200',
    COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
  }

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.first_name} {user?.last_name}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Project Officer Dashboard</p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <span className="text-green-600 text-xl">✅</span>
          <p className="text-green-800 font-medium">{success}</p>
        </div>
      )}

      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'projects', label: 'Projects', icon: '📁' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'overview' | 'projects')}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-600 text-sm font-medium">Total Projects</p>
              <span className="text-3xl">📁</span>
            </div>
            <p className="text-4xl font-bold text-gray-900">{projects.length}</p>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-yellow-600 text-sm font-medium">Pending</p>
              <span className="text-3xl">⏳</span>
            </div>
            <p className="text-4xl font-bold text-gray-900">
              {projects.filter(p => p.status === 'PENDING').length}
            </p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-600 text-sm font-medium">Approved</p>
              <span className="text-3xl">✅</span>
            </div>
            <p className="text-4xl font-bold text-gray-900">
              {projects.filter(p => p.status === 'APPROVED').length}
            </p>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-purple-600 text-sm font-medium">Completed</p>
              <span className="text-3xl">🎉</span>
            </div>
            <p className="text-4xl font-bold text-gray-900">
              {projects.filter(p => p.status === 'COMPLETED').length}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Projects ({projects.length})</h2>
            <button
              onClick={() => {
                setShowProjectForm(!showProjectForm)
                setError('')
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              {showProjectForm ? 'Cancel' : '+ New Project'}
            </button>
          </div>

          {showProjectForm && (
            <form onSubmit={createProject} className="bg-white p-6 rounded-xl border-2 border-green-200 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Create New Project</h3>
              
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm font-medium">❌ {error}</p>
                </div>
              )}

              {clients.length === 0 ? (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm font-medium">
                    ⚠️ No clients available. Waiting for Loan Officer to create clients...
                  </p>
                  <p className="text-yellow-700 text-xs mt-2">
                    Note: Due to backend permissions, clients are created by Loan Officers and automatically appear here.
                  </p>
                </div>
              ) : (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm font-medium">
                    ✅ {clients.length} client{clients.length !== 1 ? 's' : ''} available from Loan Officer
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Project Name *"
                  required
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <select
                  required
                  value={projectForm.client}
                  onChange={(e) => setProjectForm({...projectForm, client: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={clients.length === 0}
                >
                  <option value="">Select Client *</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (ID: {c.national_id})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Budget (RWF, optional)"
                  value={projectForm.budget}
                  onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <input
                  type="date"
                  placeholder="Start Date"
                  value={projectForm.start_date}
                  onChange={(e) => setProjectForm({...projectForm, start_date: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <input
                  type="date"
                  placeholder="End Date"
                  value={projectForm.end_date}
                  onChange={(e) => setProjectForm({...projectForm, end_date: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <textarea
                  placeholder="Description (optional)"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={clients.length === 0}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {clients.length === 0 ? 'Waiting for Clients...' : 'Create Project'}
              </button>
            </form>
          )}

          {projects.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-4">Create your first project</p>
              {clients.length > 0 ? (
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Create First Project
                </button>
              ) : (
                <p className="text-yellow-600 text-sm">Waiting for Loan Officer to create clients first...</p>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects.map((project) => {
                    const client = clients.find(c => c.id === project.client)
                    return (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{project.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {client ? client.name : `Client #${project.client}`}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {project.budget ? `${Number(project.budget).toLocaleString()} RWF` : '—'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium border ${projectStatusColor[project.status]}`}>
                            {project.status}
                          </span>
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