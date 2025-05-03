'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type Leave = {
  type: string;
  from: string;
  to: string;
  status: string;
};

export default function LeaveHistory() {
  const [history, setHistory] = useState<Leave[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('leaveHistory');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  // Count leaves by type
  const leaveTypeCounts = history.reduce<Record<string, number>>((acc, leave) => {
    acc[leave.type] = (acc[leave.type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(leaveTypeCounts).map(([type, count]) => ({
    type,
    count,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Leave History</h2>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((leave, index) => (
              <tr key={index} className="border-b">
                <td>{leave.type}</td>
                <td>{leave.from}</td>
                <td>{leave.to}</td>
                <td className="capitalize text-sm font-medium">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
