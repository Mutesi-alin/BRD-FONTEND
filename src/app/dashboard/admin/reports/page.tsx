
'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

const API = process.env.NEXT_PUBLIC_API_URL

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
})

interface Disbursement {
  amount: string | number
  disbursement_date?: string
}

interface Loan {
  status: string
  loan_amount: string | number
}

interface Project {
  status: string
}

export default function ReportsPage() {
  useAuth()
  const [loading, setLoading] = useState(true)
  const [reportData, setReportData] = useState({
    totalLoans: 0,
    totalDisbursed: 0,
    avgLoanAmount: 0,
    totalClients: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingApprovals: 0,
    monthlyDisbursements: [] as Disbursement[],
  })
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  useEffect(() => {
    fetchReportData()
  }, [])

  const fetchReportData = async () => {
    setLoading(true)
    try {
      const [loans, clients, projects, disbursements] = await Promise.all([
        fetch(`${API}/api/loans/`, { headers: getHeaders() }).then(r => r.json()),
        fetch(`${API}/api/clients/`, { headers: getHeaders() }).then(r => r.json()),
        fetch(`${API}/api/projects/`, { headers: getHeaders() }).then(r => r.json()),
        fetch(`${API}/api/disbursements/`, { headers: getHeaders() }).then(r => r.json()),
      ])

      const loansList: Loan[] = Array.isArray(loans) ? loans : []
      const projectsList: Project[] = Array.isArray(projects) ? projects : []
      const disbursementsList: Disbursement[] = Array.isArray(disbursements) ? disbursements : []

      const totalDisbursed = disbursementsList.reduce((sum, d) => sum + Number(d.amount || 0), 0)
      const avgLoanAmount = loansList.length > 0
        ? loansList.reduce((sum, l) => sum + Number(l.loan_amount || 0), 0) / loansList.length
        : 0

      setReportData({
        totalLoans: loansList.length,
        totalDisbursed,
        avgLoanAmount,
        totalClients: Array.isArray(clients) ? clients.length : 0,
        activeProjects: projectsList.filter(p => p.status === 'ONGOING').length,
        completedProjects: projectsList.filter(p => p.status === 'COMPLETED').length,
        pendingApprovals: loansList.filter(l => l.status === 'PENDING').length,
        monthlyDisbursements: disbursementsList,
      })
    } catch (err) {
      console.error('Error fetching report data:', err)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = (format: 'csv' | 'pdf') => {
    alert(`Exporting report as ${format.toUpperCase()}... (Feature coming soon)`)
  }

  if (loading) {
    return (
      <main className="p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Financial reports and business insights</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => exportReport('csv')}
            className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center gap-2"
          >
            <span>📄</span>
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => exportReport('pdf')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
          >
            <span>📑</span>
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Report Period:</span>
          <div className="flex gap-2">
            {['week', 'month', 'quarter', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedPeriod === period
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💰</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Loans</p>
          <p className="text-3xl font-bold text-gray-900">{reportData.totalLoans}</p>
          <p className="text-xs text-green-600 mt-2">↗ Active portfolio</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💳</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Disbursed</p>
          <p className="text-2xl font-bold text-gray-900">
            {(reportData.totalDisbursed / 1000000000).toFixed(2)}B RWF
          </p>
          <p className="text-xs text-blue-600 mt-2">All time</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">📊</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Avg Loan Amount</p>
          <p className="text-2xl font-bold text-gray-900">
            {(reportData.avgLoanAmount / 1000000).toFixed(1)}M RWF
          </p>
          <p className="text-xs text-purple-600 mt-2">Per loan</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl"></span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Pending Approvals</p>
          <p className="text-3xl font-bold text-gray-900">{reportData.pendingApprovals}</p>
          <p className="text-xs text-yellow-600 mt-2">Awaiting review</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Disbursed Loans</p>
                  <p className="text-xs text-gray-600">Successfully processed</p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {reportData.monthlyDisbursements.length}
              </p>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏳</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Pending Loans</p>
                  <p className="text-xs text-gray-600">Awaiting approval</p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">{reportData.pendingApprovals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Active Projects</p>
                  <p className="text-xs text-gray-600">Currently ongoing</p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">{reportData.activeProjects}</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Completed Projects</p>
                  <p className="text-xs text-gray-600">Successfully finished</p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">{reportData.completedProjects}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-4xl mb-2">👥</p>
            <p className="text-3xl font-bold text-gray-900">{reportData.totalClients}</p>
            <p className="text-sm text-gray-600 mt-1">Total Clients</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-4xl mb-2">📁</p>
            <p className="text-3xl font-bold text-gray-900">
              {reportData.activeProjects + reportData.completedProjects}
            </p>
            <p className="text-sm text-gray-600 mt-1">Total Projects</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-4xl mb-2">💼</p>
            <p className="text-3xl font-bold text-gray-900">
              {reportData.totalClients > 0
                ? (reportData.totalLoans / reportData.totalClients).toFixed(1)
                : 0}
            </p>
            <p className="text-sm text-gray-600 mt-1">Avg Loans per Client</p>
          </div>
        </div>
      </div>
    </main>
  )
}

