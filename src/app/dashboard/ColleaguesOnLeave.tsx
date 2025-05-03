'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from 'recharts';

type Colleague = {
  name: string;
  avatar: string;
  leaveUntil: string;
};

export default function ColleaguesOnLeave() {
  const [colleagues, setColleagues] = useState<Colleague[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('colleaguesOnLeave');
    if (stored) setColleagues(JSON.parse(stored));
  }, []);

  const today = new Date();

  const chartData = colleagues.map((c) => {
    const leaveEnd = new Date(c.leaveUntil);
    const remaining = Math.max(
      Math.ceil((leaveEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
      0
    );
    return {
      name: c.name,
      remaining,
    };
  });

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Colleagues on Leave</h2>

      {/* Avatar List */}
      <div className="flex flex-wrap gap-4 mb-6">
        {colleagues.map((c, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <img
              src={c.avatar || '/assets/defaultAvatar.png'}
              alt={c.name}
              className="w-10 h-10 rounded-full object-cover"
              title={`On leave until ${c.leaveUntil}`}
            />
            <span>{c.name}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="remaining" fill="#10b981" radius={[0, 4, 4, 0]}>
              <LabelList dataKey="remaining" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
