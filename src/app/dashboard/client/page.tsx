


'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

const API = process.env.NEXT_PUBLIC_API_URL

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
})

interface Loan {
  id: number
  loan_amount?: string | number
  amount?: string | number
  tenure: number
  status: string
}

interface Project {
  id: number
  name: string
  status: string
}

export default function ClientDashboard() {
  const { user } = useAuth()
  const [loans, setLoans] = useState<Loan[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [loansData, projectsData] = await Promise.all([
          fetch(`${API}/api/loans/`, { headers: getHeaders() }).then(r => r.json()),
          fetch(`${API}/api/projects/`, { headers: getHeaders() }).then(r => r.json()),
        ])
        setLoans(Array.isArray(loansData) ? loansData : [])
        setProjects(Array.isArray(projectsData) ? projectsData : [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const statusColor: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
    DISBURSED: 'bg-blue-100 text-blue-700',
    ACTIVE: 'bg-green-100 text-green-700',
    COMPLETED: 'bg-teal-100 text-teal-700',
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-900">Welcome, {user?.first_name} {user?.last_name} </h1>
        <p className="text-gray-500 text-sm mt-1">Your loans and projects overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'My Loans', value: loans.length, icon: '💰', color: 'bg-green-700' },
          { title: 'Approved Loans', value: loans.filter(l => l.status === 'APPROVED').length, icon: '✅', color: 'bg-teal-600' },
          { title: 'My Projects', value: projects.length, icon: '📁', color: 'bg-green-800' },
          { title: 'Pending Loans', value: loans.filter(l => l.status === 'PENDING').length, icon: '⏳', color: 'bg-yellow-500' },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0`}>
              {card.icon}
            </div>
            <div>
              <p className="text-gray-500 text-xs">{card.title}</p>
              {loading ? (
                <div className="h-6 w-12 bg-gray-100 rounded animate-pulse mt-1" />
              ) : (
                <p className="text-2xl font-bold text-green-900">{card.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-green-900 font-semibold mb-4">My Loans</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-xs border-b border-gray-100">
                <th className="pb-2 font-medium">Loan </th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Tenure</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i}><td colSpan={4} className="py-2">
                    <div className="h-8 bg-gray-50 rounded animate-pulse" />
                  </td></tr>
                ))
              ) : loans.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400 text-sm">No loans found</td></tr>
              ) : loans.map((loan) => (
                <tr key={loan.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-3 text-gray-700 text-sm">#{loan.id}</td>
                  <td className="py-3 text-gray-700 text-sm">
                    {loan.loan_amount ? Number(loan.loan_amount).toLocaleString() : loan.amount ? Number(loan.amount).toLocaleString() : '—'} RWF
                  </td>
                  <td className="py-3 text-gray-700 text-sm">{loan.tenure} mo</td>
                  <td className="py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[loan.status] || 'bg-gray-100 text-gray-600'}`}>
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-green-900 font-semibold mb-4">My Projects</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-xs border-b border-gray-100">
                <th className="pb-2 font-medium">Project</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i}><td colSpan={2} className="py-2">
                    <div className="h-8 bg-gray-50 rounded animate-pulse" />
                  </td></tr>
                ))
              ) : projects.length === 0 ? (
                <tr><td colSpan={2} className="text-center py-8 text-gray-400 text-sm">No projects found</td></tr>
              ) : projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-3">
                    <p className="text-gray-700 text-sm font-medium">{project.name}</p>
                    <p className="text-gray-400 text-xs">#{project.id}</p>
                  </td>
                  <td className="py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[project.status] || 'bg-gray-100 text-gray-600'}`}>
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}