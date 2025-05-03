'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

type LeaveBalance = {
  annual: number;
  sick: number;
  maternity: number;
  unpaid: number;
};

const defaultBalance: LeaveBalance = {
  annual: 14,
  sick: 10,
  maternity: 90,
  unpaid: 0,
};

const COLORS = ['#1e3a8a', '#0369a1', '#0f766e', '#78350f'];

export default function LeaveBalance() {
  const [balance, setBalance] = useState<LeaveBalance>(defaultBalance);

  useEffect(() => {
    const stored = localStorage.getItem('leaveBalance');
    if (stored) {
      setBalance(JSON.parse(stored));
    } else {
      localStorage.setItem('leaveBalance', JSON.stringify(defaultBalance));
    }
  }, []);

  const data = Object.entries(balance).map(([type, days]) => ({
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} Leave`,
    value: days,
  }));

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Leave Balance</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {data.map((item, index) => (
          <div key={index} className="bg-blue-100 p-4 rounded-md text-center">
            <p className="capitalize font-medium text-gray-700">{item.name}</p>
            <p className="text-2xl font-bold text-blue-800">{item.value} days</p>
          </div>
        ))}
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
