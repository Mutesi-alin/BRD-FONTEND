
'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

type Role = 'ADMIN' | 'LOAN_OFFICER' | 'MANAGEMENT' | 'FINANCE_OFFICER' | 'PROJECT_OFFICER'

const NAV_ITEMS: Record<Role, { label: string; href: string; icon: string }[]> = {
  ADMIN: [
    { label: 'Overview', href: '/dashboard/admin', icon: '📊' },
    { label: 'User Management', href: '/dashboard/admin/users', icon: '👥' },
    { label: 'Reports', href: '/dashboard/admin/reports', icon: '📈' },
    { label: 'Activity Logs', href: '/dashboard/admin/logs', icon: '📋' },
    { label: 'Settings', href: '/dashboard/admin/settings', icon: '⚙️' },
  ],
  
  LOAN_OFFICER: [
    { label: 'Overview', href: '/dashboard/loan?tab=overview', icon: '📊' },
    { label: 'Clients', href: '/dashboard/loan?tab=clients', icon: '👥' },
    { label: 'Loans', href: '/dashboard/loan?tab=loans', icon: '💰' },
  ],
  
  PROJECT_OFFICER: [
    { label: 'Overview', href: '/dashboard/project?tab=overview', icon: '📊' },
    { label: 'Projects', href: '/dashboard/project?tab=projects', icon: '📁' },
  ],
  
  MANAGEMENT: [
    { label: 'Overview', href: '/dashboard/management?tab=overview', icon: '📊' },
    { label: 'Pending Loans', href: '/dashboard/management?tab=loans', icon: '💰' },
    { label: 'Pending Projects', href: '/dashboard/management?tab=projects', icon: '📁' },
  ],
  
  FINANCE_OFFICER: [
    { label: 'Overview', href: '/dashboard/finance?tab=overview', icon: '📊' },
    { label: 'Disbursements', href: '/dashboard/finance?tab=create', icon: '💳' },
  ],
}



export default function Sidebar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  if (!user) return null

  const navItems = NAV_ITEMS[user.role as Role] || []

  function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
      logout()
      router.push('/login')
    }
  }

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-700 flex items-center justify-center">
            <span className="text-white font-black text-xl">B</span>
          </div>
          <div>
            <p className="text-gray-900 font-bold text-sm">BRD Project</p>
            <p className="text-gray-500 text-xs capitalize">{user.role.replace(/_/g, ' ').toLowerCase()}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href.split('?')[0])
          return (
            <a
              key={index}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                isActive ? 'bg-green-700 text-white shadow-sm' : 'text-gray-600 hover:bg-green-50 hover:text-green-800'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-700 text-sm font-bold">{user.first_name?.[0]}{user.last_name?.[0]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 text-sm font-medium truncate">{user.first_name} {user.last_name}</p>
            <p className="text-gray-500 text-xs truncate">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium cursor-pointer"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}