
'use client'
import { useAuth } from '@/context/AuthContext'

interface TopbarProps {
  title: string
}

export default function Topbar({ title }: TopbarProps) {
  const { user } = useAuth()

  return (
    <div className="fixed top-0 right-0 left-64 z-30 flex items-center justify-between bg-white border-b border-gray-200 px-6 h-16 shadow-sm">
      <h2 className="text-green-900 font-semibold text-lg">{title}</h2>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-green-900 text-sm font-medium">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-gray-400 text-xs capitalize">
            {user?.role?.replace(/_/g, ' ')}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-700 text-sm font-bold">
            {user?.first_name?.[0] || 'U'}
          </span>
        </div>
      </div>
    </div>
  )
}