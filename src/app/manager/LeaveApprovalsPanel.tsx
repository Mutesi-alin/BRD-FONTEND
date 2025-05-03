'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type LeaveRequest = {
  id: number;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
};

export default function LeaveApprovalPanel() {
  const router = useRouter();
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setRole(role);
    if (role !== 'manager' && role !== 'admin') {
      router.push('/login');
    }

    const stored = localStorage.getItem('leaveRequests');
    if (stored) {
      setRequests(JSON.parse(stored));
    }
  }, [router]);

  const updateRequest = (id: number, status: 'approved' | 'rejected', comment: string) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, status, comment } : req
    );
    setRequests(updated);
    localStorage.setItem('leaveRequests', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6">Leave Approval Panel</h2>

      {requests.length === 0 ? (
        <p>No leave requests.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req.id}
              className="border p-4 rounded shadow flex flex-col gap-2"
            >
              <div>
                <strong>{req.employee}</strong> requested <strong>{req.type}</strong> from{' '}
                <strong>{req.startDate}</strong> to <strong>{req.endDate}</strong>
              </div>
              <div>Status: <span className="font-medium">{req.status}</span></div>

              {req.status === 'pending' && (
                <div className="flex flex-col gap-2">
                  <textarea
                    placeholder="Add a comment"
                    className="border rounded p-2"
                    onChange={(e) => req.comment = e.target.value}
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 text-white px-4 py-1 rounded"
                      onClick={() => updateRequest(req.id, 'approved', req.comment || '')}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-1 rounded"
                      onClick={() => updateRequest(req.id, 'rejected', req.comment || '')}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}

              {req.status !== 'pending' && (
                <p className="text-sm text-gray-600">Comment: {req.comment || '—'}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
