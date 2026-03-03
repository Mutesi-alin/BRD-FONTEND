

// 'use client'

// import { useEffect, useState } from 'react'
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from 'recharts'

// const API = process.env.NEXT_PUBLIC_API_URL

// const getHeaders = () => ({
//   'Content-Type': 'application/json',
//   Authorization: `Token ${localStorage.getItem('token')}`,
// })

// interface Loan {
//   id: number
//   loan_amount: string
//   status: string
//   project: string
// }

// interface LoanSummary {
//   loan_amount: string
//   total_disbursed: string
//   remaining: string
//   disbursement_count: number
// }

// interface Disbursement {
//   id: number
//   loan: number
//   amount: string
//   disbursement_date: string
//   method: string
//   reference_number: string
//   notes: string
// }

// export default function FinanceDisbursementPage() {
//   const [activeTab, setActiveTab] = useState<'overview' | 'database'>('overview')

//   const [loans, setLoans] = useState<Loan[]>([])
//   const [disbursements, setDisbursements] = useState<Disbursement[]>([])
//   const [loanSummary, setLoanSummary] = useState<LoanSummary | null>(null)

//   const [form, setForm] = useState({
//     loan: '',
//     amount: '',
//     disbursement_date: '',
//     payment_method: 'BANK_TRANSFER',
//     reference_number: '',
//     notes: '',
//   })

//   const [message, setMessage] = useState({ type: '', text: '' })

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     try {
//       const loansRes = await fetch(`${API}/api/loans/`, { headers: getHeaders() })
//       const loansData = await loansRes.json()
//       setLoans(loansData)

//       const disbRes = await fetch(`${API}/api/disbursements/`, {
//         headers: getHeaders(),
//       })
//       const disbData = await disbRes.json()
//       setDisbursements(disbData)
//     } catch (error) {
//       console.error('Failed to fetch data')
//     }
//   }


//   const totalLoanAmount = loans.reduce(
//     (sum, loan) => sum + Number(loan.loan_amount),
//     0
//   )

//   const totalDisbursed = disbursements.reduce(
//     (sum, d) => sum + Number(d.amount),
//     0
//   )

//   const remainingAmount = totalLoanAmount - totalDisbursed

//   const approvedCount = loans.filter(l => l.status === 'APPROVED').length
//   const pendingCount = loans.filter(l => l.status === 'PENDING').length
//   const rejectedCount = loans.filter(l => l.status === 'REJECTED').length

//   const utilizationRate =
//     totalLoanAmount > 0
//       ? ((totalDisbursed / totalLoanAmount) * 100).toFixed(1)
//       : 0

//   const financialData = [
//     { name: 'Total Loan', value: totalLoanAmount },
//     { name: 'Disbursed', value: totalDisbursed },
//     { name: 'Remaining', value: remainingAmount },
//   ]

//   const statusData = [
//     { name: 'Approved', value: approvedCount },
//     { name: 'Pending', value: pendingCount },
//     { name: 'Rejected', value: rejectedCount },
//   ]

//   const COLORS = ['#16a34a', '#f59e0b', '#dc2626']

  

//   const fetchLoanSummary = async (loanId: string) => {
//     if (!loanId) {
//       setLoanSummary(null)
//       return
//     }

//     try {
//       const res = await fetch(`${API}/api/disbursements/loan-summary/?loan_id=${loanId}`, {
//         headers: getHeaders(),
//       })

//       if (res.ok) {
//         const data = await res.json()
//         setLoanSummary(data)
//       }
//     } catch (error) {
//       console.error('Failed to fetch loan summary')
//     }
//   }


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const response = await fetch(`${API}/api/disbursements/`, {
//       method: 'POST',
//       headers: getHeaders(),
//       body: JSON.stringify({
//         loan: Number(form.loan),
//         amount: Number(form.amount),
//         disbursement_date: form.disbursement_date,
//         method: form.payment_method,
//         reference_number: form.reference_number,
//         notes: form.notes,
//       }),
//     })

//     const data = await response.json()

//     if (response.ok) {
//       setMessage({ type: 'success', text: 'Disbursement created successfully!' })

//       setForm({
//         loan: '',
//         amount: '',
//         disbursement_date: '',
//         payment_method: 'BANK_TRANSFER',
//         reference_number: '',
//         notes: '',
//       })

//       setLoanSummary(null)
//       fetchData()
//     } else {
//       setMessage({
//         type: 'error',
//         text: data.amount?.[0] || data.loan?.[0] || 'Failed to create disbursement',
//       })
//     }
//   }

//   return (
//     <div className="p-8 space-y-8">

//       <div className="flex gap-4 border-b pb-3">
//         <button
//           onClick={() => setActiveTab('overview')}
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === 'overview'
//               ? 'bg-blue-600 text-white'
//               : 'bg-gray-200'
//           }`}
//         >
//           Overview
//         </button>

//         <button
//           onClick={() => setActiveTab('database')}
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === 'database'
//               ? 'bg-blue-600 text-white'
//               : 'bg-gray-200'
//           }`}
//         >
//           Disbursement 
//         </button>
//       </div>

//       {activeTab === 'overview' && (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

//             <div className="bg-white p-6 rounded-2xl shadow-lg">
//               <h3 className="text-sm text-gray-500">Total Loan Portfolio</h3>
//               <p className="text-2xl font-bold mt-2">
//                 {totalLoanAmount.toLocaleString()} RWF
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-lg">
//               <h3 className="text-sm text-gray-500">Total Disbursed</h3>
//               <p className="text-2xl font-bold mt-2 text-green-600">
//                 {totalDisbursed.toLocaleString()} RWF
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-lg">
//               <h3 className="text-sm text-gray-500">Remaining Exposure</h3>
//               <p className="text-2xl font-bold mt-2 text-orange-500">
//                 {remainingAmount.toLocaleString()} RWF
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-lg">
//               <h3 className="text-sm text-gray-500">Utilization Rate</h3>
//               <p className="text-2xl font-bold mt-2 text-blue-600">
//                 {utilizationRate}%
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

//             <div className="bg-white p-6 rounded-2xl shadow-lg">
//               <h3 className="font-semibold mb-4">Financial Distribution</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={financialData}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-lg">
//               <h3 className="font-semibold mb-4">Loan Status Overview</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={statusData}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius={100}
//                     label
//                   >
//                     {statusData.map((entry, index) => (
//                       <Cell key={index} fill={COLORS[index]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//           </div>
//         </>
//       )}

//       {activeTab === 'database' && (
//         <>
//           <div className="bg-white p-6 rounded-2xl shadow-lg">
//             <h2 className="text-xl font-semibold mb-4">
//               Create Disbursement
//             </h2>

//             {message.text && (
//               <div
//                 className={`mb-4 p-3 rounded ${
//                   message.type === 'success'
//                     ? 'bg-green-100 text-green-700'
//                     : 'bg-red-100 text-red-700'
//                 }`}
//               >
//                 {message.text}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">

//               <select
//                 value={form.loan}
//                 onChange={async (e) => {
//                   const loanId = e.target.value
//                   setForm({ ...form, loan: loanId })

//                   if (loanId) {
//                     const res = await fetch(`${API}/api/disbursements/loan-summary/?loan_id=${loanId}`, {
//                       headers: getHeaders(),
//                     })
//                     const data = await res.json()
//                     setLoanSummary(data)
//                   }
//                 }}
//                 required
//                 className="w-full border p-3 rounded-lg"
//               >
//                 <option value="">Select Approved Loan</option>
//                 {loans.filter(l => l.status === 'APPROVED').map(loan => (
//                   <option key={loan.id} value={loan.id}>
//                     {loan.project} — {Number(loan.loan_amount).toLocaleString()} RWF
//                   </option>
//                 ))}
//               </select>

//               {/* LOAN SUMMARY */}
//               {loanSummary && (
//                 <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
//                   <h4 className="font-semibold text-blue-900 mb-2">
//                     📊 Loan Summary
//                   </h4>

//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div>
//                       <span className="text-gray-600">Loan Amount:</span>
//                       <p className="font-semibold">
//                         {Number(loanSummary.loan_amount).toLocaleString()} RWF
//                       </p>
//                     </div>

//                     <div>
//                       <span className="text-orange-600">Total Disbursed:</span>
//                       <p className="font-semibold text-orange-700">
//                         {Number(loanSummary.total_disbursed).toLocaleString()} RWF
//                       </p>
//                     </div>

//                     <div>
//                       <span className="text-green-600">Remaining:</span>
//                       <p className="font-semibold text-green-700">
//                         {Number(loanSummary.remaining).toLocaleString()} RWF
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <input
//                 type="number"
//                 placeholder="Amount (RWF)"
//                 value={form.amount}
//                 onChange={(e) => setForm({ ...form, amount: e.target.value })}
//                 max={loanSummary ? loanSummary.remaining : undefined}
//                 required
//                 className="w-full border p-3 rounded-lg"
//               />

//               <input
//                 type="date"
//                 value={form.disbursement_date}
//                 onChange={(e) =>
//                   setForm({ ...form, disbursement_date: e.target.value })
//                 }
//                 required
//                 className="w-full border p-3 rounded-lg"
//               />

//               <select
//                 value={form.payment_method}
//                 onChange={(e) =>
//                   setForm({ ...form, payment_method: e.target.value })
//                 }
//                 className="w-full border p-3 rounded-lg"
//               >
//                 <option value="BANK_TRANSFER">Bank Transfer</option>
//                 <option value="CASH">Cash</option>
//                 <option value="MOBILE_MONEY">Mobile Money</option>
//               </select>

//               <input
//                 type="text"
//                 placeholder="Reference Number"
//                 value={form.reference_number}
//                 onChange={(e) =>
//                   setForm({ ...form, reference_number: e.target.value })
//                 }
//                 className="w-full border p-3 rounded-lg"
//               />

//               <textarea
//                 placeholder="Notes"
//                 value={form.notes}
//                 onChange={(e) =>
//                   setForm({ ...form, notes: e.target.value })
//                 }
//                 className="w-full border p-3 rounded-lg"
//               />

//               <button
//                 type="submit"
//                 disabled={loanSummary && Number(loanSummary.remaining) <= 0}
//                 className="w-full bg-green-600 text-white py-3 rounded-lg disabled:bg-gray-300"
//               >
//                 {loanSummary && Number(loanSummary.remaining) <= 0
//                   ? 'Loan Fully Disbursed'
//                   : 'Create Disbursement'}
//               </button>
//             </form>
//           </div>

//           {/* TABLE */}
//           <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
//             <h2 className="text-xl font-semibold mb-4">
//               All Disbursements
//             </h2>

//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-left">
//                   <th className="p-3">Loan</th>
//                   <th className="p-3">Amount</th>
//                   <th className="p-3">Date</th>
//                   <th className="p-3">Method</th>
//                   <th className="p-3">Reference</th>
//                   <th className="p-3">Notes</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {disbursements.map((d) => (
//                   <tr key={d.id} className="border-t">
//                     <td className="p-3">{d.loan}</td>
//                     <td className="p-3">
//                       {Number(d.amount).toLocaleString()} RWF
//                     </td>
//                     <td className="p-3">{d.disbursement_date}</td>
//                     <td className="p-3">{d.method}</td>
//                     <td className="p-3">{d.reference_number}</td>
//                     <td className="p-3">{d.notes}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

const API = process.env.NEXT_PUBLIC_API_URL

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
})

interface Loan {
  id: number
  loan_amount: string
  status: string
  project: string
}

interface LoanSummary {
  loan_amount: string
  total_disbursed: string
  remaining: string
  disbursement_count: number
}

interface Disbursement {
  id: number
  loan: number
  amount: string
  disbursement_date: string
  method: string
  reference_number: string
  notes: string
}

export default function FinanceDisbursementPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'database'>('overview')

  const [loans, setLoans] = useState<Loan[]>([])
  const [disbursements, setDisbursements] = useState<Disbursement[]>([])
  const [loanSummary, setLoanSummary] = useState<LoanSummary | null>(null)

  const [form, setForm] = useState({
    loan: '',
    amount: '',
    disbursement_date: '',
    payment_method: 'BANK_TRANSFER',
    reference_number: '',
    notes: '',
  })

  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const loansRes = await fetch(`${API}/api/loans/`, { headers: getHeaders() })
      const loansData = await loansRes.json()
      setLoans(loansData)

      const disbRes = await fetch(`${API}/api/disbursements/`, {
        headers: getHeaders(),
      })
      const disbData = await disbRes.json()
      setDisbursements(disbData)
} catch {
        console.error('Failed to fetch data')
    }
  }

  const totalLoanAmount = loans.reduce(
    (sum, loan) => sum + Number(loan.loan_amount),
    0
  )

  const totalDisbursed = disbursements.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )

  const remainingAmount = totalLoanAmount - totalDisbursed

  const approvedCount = loans.filter(l => l.status === 'APPROVED').length
  const pendingCount = loans.filter(l => l.status === 'PENDING').length
  const rejectedCount = loans.filter(l => l.status === 'REJECTED').length

  const utilizationRate =
    totalLoanAmount > 0
      ? ((totalDisbursed / totalLoanAmount) * 100).toFixed(1)
      : 0

  const financialData = [
    { name: 'Total Loan', value: totalLoanAmount },
    { name: 'Disbursed', value: totalDisbursed },
    { name: 'Remaining', value: remainingAmount },
  ]

  const statusData = [
    { name: 'Approved', value: approvedCount },
    { name: 'Pending', value: pendingCount },
    { name: 'Rejected', value: rejectedCount },
  ]

  const COLORS = ['#16a34a', '#f59e0b', '#dc2626']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch(`${API}/api/disbursements/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        loan: Number(form.loan),
        amount: Number(form.amount),
        disbursement_date: form.disbursement_date,
        method: form.payment_method,
        reference_number: form.reference_number,
        notes: form.notes,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      setMessage({ type: 'success', text: 'Disbursement created successfully!' })

      setForm({
        loan: '',
        amount: '',
        disbursement_date: '',
        payment_method: 'BANK_TRANSFER',
        reference_number: '',
        notes: '',
      })

      setLoanSummary(null)
      fetchData()
    } else {
      setMessage({
        type: 'error',
        text: data.amount?.[0] || data.loan?.[0] || 'Failed to create disbursement',
      })
    }
  }

  return (
    <div className="p-8 space-y-8">

      <div className="flex gap-4 border-b pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'database'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
        >
          Disbursement
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-sm text-gray-500">Total Loan Portfolio</h3>
              <p className="text-2xl font-bold mt-2">
                {totalLoanAmount.toLocaleString()} RWF
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-sm text-gray-500">Total Disbursed</h3>
              <p className="text-2xl font-bold mt-2 text-green-600">
                {totalDisbursed.toLocaleString()} RWF
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-sm text-gray-500">Remaining Exposure</h3>
              <p className="text-2xl font-bold mt-2 text-orange-500">
                {remainingAmount.toLocaleString()} RWF
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-sm text-gray-500">Utilization Rate</h3>
              <p className="text-2xl font-bold mt-2 text-blue-600">
                {utilizationRate}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold mb-4">Financial Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold mb-4">Loan Status Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </>
      )}

      {activeTab === 'database' && (
        <>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Create Disbursement
            </h2>

            {message.text && (
              <div
                className={`mb-4 p-3 rounded ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <select
                value={form.loan}
                onChange={async (e) => {
                  const loanId = e.target.value
                  setForm({ ...form, loan: loanId })

                  if (loanId) {
                    const res = await fetch(`${API}/api/disbursements/loan-summary/?loan_id=${loanId}`, {
                      headers: getHeaders(),
                    })
                    const data = await res.json()
                    setLoanSummary(data)
                  }
                }}
                required
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select Approved Loan</option>
                {loans.filter(l => l.status === 'APPROVED').map(loan => (
                  <option key={loan.id} value={loan.id}>
                    {loan.project} — {Number(loan.loan_amount).toLocaleString()} RWF
                  </option>
                ))}
              </select>

              {loanSummary && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    📊 Loan Summary
                  </h4>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Loan Amount:</span>
                      <p className="font-semibold">
                        {Number(loanSummary.loan_amount).toLocaleString()} RWF
                      </p>
                    </div>

                    <div>
                      <span className="text-orange-600">Total Disbursed:</span>
                      <p className="font-semibold text-orange-700">
                        {Number(loanSummary.total_disbursed).toLocaleString()} RWF
                      </p>
                    </div>

                    <div>
                      <span className="text-green-600">Remaining:</span>
                      <p className="font-semibold text-green-700">
                        {Number(loanSummary.remaining).toLocaleString()} RWF
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <input
                type="number"
                placeholder="Amount (RWF)"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                max={loanSummary ? loanSummary.remaining : undefined}
                required
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="date"
                value={form.disbursement_date}
                onChange={(e) =>
                  setForm({ ...form, disbursement_date: e.target.value })
                }
                required
                className="w-full border p-3 rounded-lg"
              />

              <select
                value={form.payment_method}
                onChange={(e) =>
                  setForm({ ...form, payment_method: e.target.value })
                }
                className="w-full border p-3 rounded-lg"
              >
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="CASH">Cash</option>
                <option value="MOBILE_MONEY">Mobile Money</option>
              </select>

              <input
                type="text"
                placeholder="Reference Number"
                value={form.reference_number}
                onChange={(e) =>
                  setForm({ ...form, reference_number: e.target.value })
                }
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                placeholder="Notes"
                value={form.notes}
                onChange={(e) =>
                  setForm({ ...form, notes: e.target.value })
                }
                className="w-full border p-3 rounded-lg"
              />

              <button
                type="submit"
                disabled={loanSummary !== null && Number(loanSummary.remaining) <= 0}
                className="w-full bg-green-600 text-white py-3 rounded-lg disabled:bg-gray-300"
              >
                {loanSummary && Number(loanSummary.remaining) <= 0
                  ? 'Loan Fully Disbursed'
                  : 'Create Disbursement'}
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
            <h2 className="text-xl font-semibold mb-4">
              All Disbursements
            </h2>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Loan</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {disbursements.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="p-3">{d.loan}</td>
                    <td className="p-3">
                      {Number(d.amount).toLocaleString()} RWF
                    </td>
                    <td className="p-3">{d.disbursement_date}</td>
                    <td className="p-3">{d.method}</td>
                    <td className="p-3">{d.reference_number}</td>
                    <td className="p-3">{d.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
