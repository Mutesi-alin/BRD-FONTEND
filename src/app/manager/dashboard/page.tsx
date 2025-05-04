'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type LeaveApplication = {
  type: string;
  reason: string;
  from: string;
  to: string;
  document?: string;
  status: 'pending' | 'approved' | 'rejected';
};

export default function ManagerDashboard() {
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });

  useEffect(() => {
    const stored = localStorage.getItem('leaveHistory');
    const requests: LeaveApplication[] = stored ? JSON.parse(stored) : [];

    const pending = requests.filter(r => r.status === 'pending').length;
    const approved = requests.filter(r => r.status === 'approved').length;
    const rejected = requests.filter(r => r.status === 'rejected').length;

    setStats({ pending, approved, rejected });
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Pending Requests" count={stats.pending} color="bg-yellow-100 text-yellow-800" status="pending" />
        <StatCard title="Approved Requests" count={stats.approved} color="bg-green-100 text-green-800" status="approved" />
        <StatCard title="Rejected Requests" count={stats.rejected} color="bg-red-100 text-red-800" status="rejected" />
      </div>
    </div>
  );
}

function StatCard({ title, count, color, status }: { title: string; count: number; color: string; status: string }) {
  return (
    <Link href={`/manager/LeaveApprovalPanel?status=${status}`}>
      <div className={`p-6 rounded-xl shadow border cursor-pointer hover:shadow-lg transition duration-300 ${color}`}>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-4xl font-bold">{count}</p>
      </div>
    </Link>
  );
}
