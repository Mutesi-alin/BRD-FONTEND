'use client';

import { useEffect, useState } from 'react';
import { differenceInBusinessDays, parseISO } from 'date-fns';

type LeaveType = 'Annual' | 'Sick' | 'Maternity' | 'Unpaid' | 'Compassionate';

type LeaveApplication = {
  type: LeaveType;
  from: string;
  to: string;
  status: 'pending' | 'approved' | 'rejected';
};

type LeaveBalance = {
  [key in LeaveType]: number;
};

const initialBalance: LeaveBalance = {
  Annual: 20,
  Sick: 10,
  Maternity: 90,
  Unpaid: 999, // unlimited
  Compassionate: 5,
};

export default function LeaveBalance() {
  const [balance, setBalance] = useState<LeaveBalance>(initialBalance);

  useEffect(() => {
    const stored = localStorage.getItem('leaveHistory');
    if (!stored) return;

    const history: LeaveApplication[] = JSON.parse(stored);

    const approved = history.filter(leave => leave.status === 'approved');

    const used: Partial<LeaveBalance> = {};

    approved.forEach(leave => {
      const days = differenceInBusinessDays(parseISO(leave.to), parseISO(leave.from)) + 1;

      if (leave.type in used) {
        used[leave.type]! += days;
      } else {
        used[leave.type] = days;
      }
    });

    const updated: LeaveBalance = { ...initialBalance };
    for (const type in used) {
      const leaveType = type as LeaveType;
      if (leaveType !== 'Unpaid') {
        updated[leaveType] -= used[leaveType]!;
      }
    }

    setBalance(updated);
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Leave Balance</h2>
      <ul>
        {Object.entries(balance).map(([type, days]) => (
          <li key={type} className="mb-2">
            <span className="font-medium">{type}:</span> {days} day{days !== 1 ? 's' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
