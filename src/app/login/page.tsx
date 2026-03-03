// 'use client'
// import { useState } from 'react'
// import { useAuth } from '@/context/AuthContext'

// export default function LoginPage() {
//   const { login } = useAuth()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)
//     const result = await login({ email, password })
//     if (!result.success) setError(result.error || 'Login failed')
//     setLoading(false)
//   }
// console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 mb-4">
//             <span className="text-2xl font-black text-white">B</span>
//           </div>
//           <h1 className="text-3xl font-bold text-white">BRD Project</h1>
//           <p className="text-slate-400 mt-1">Sign in to your account</p>
//         </div>
//         <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
//           {error && (
//             <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
//               {error}
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
//                 placeholder="you@example.com"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
//               <input
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
//                 placeholder="••••••••"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-semibold rounded-xl transition"
//             >
//               {loading ? 'Signing in...' : 'Sign In'}
//             </button>
//           </form>
//           <p className="mt-6 text-center text-slate-400 text-sm">
//             Don't have an account?{' '}
//             <a href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium">
//               Create one
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login({ email, password })
    if (!result.success) setError(result.error || 'Login failed')
    setLoading(false)
  }
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 mb-4">
            <span className="text-2xl font-black text-white">B</span>
          </div>
          <h1 className="text-3xl font-bold text-white">BRD Project</h1>
          <p className="text-slate-400 mt-1">Sign in to your account</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-semibold rounded-xl transition"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="mt-6 text-center text-slate-400 text-sm">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}