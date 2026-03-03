'use client'
import { useAuth } from '@/context/AuthContext'

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage system settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <p className="text-gray-900">{user?.first_name} {user?.last_name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <p className="text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <p className="text-gray-900">{user?.role?.replace(/_/g, ' ')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
              <p className="text-gray-900">1.0.0</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
              <p className="text-gray-900">Production</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🚧</span>
          <div>
            <h4 className="text-yellow-900 font-semibold mb-1">Under Development</h4>
            <p className="text-sm text-yellow-800">
              More settings options will be available in future updates.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}