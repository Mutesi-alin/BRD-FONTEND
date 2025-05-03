'use client';

import LeaveBalance from './LeaveBalance';
import LeaveHistory from './LeaveHistory';
import ColleaguesOnLeave from './ColleaguesOnLeave';
import Sidebar from '../sidebar';

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Employee Dashboard</h1>
        <LeaveBalance />
        <LeaveHistory />
        <ColleaguesOnLeave />
      </main>
    </div>
  );
}
