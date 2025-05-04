

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type LeaveApplication = {
  type: string;
  reason: string;
  from: string;
  to: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  document?: string;
  comment?: string;
};

export default function InnerLeaveApprovalPanel() {
  const [requests, setRequests] = useState<LeaveApplication[]>([]);
  const [comments, setComments] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const filterStatus = searchParams.get('status');

  useEffect(() => {
    const stored = localStorage.getItem('leaveHistory');
    const allRequests: LeaveApplication[] = stored ? JSON.parse(stored) : [];
    const filtered = filterStatus
      ? allRequests.filter(r => r.status === filterStatus)
      : allRequests;
    setRequests(filtered);
    setComments(new Array(filtered.length).fill(''));
  }, [filterStatus]);

  const handleAction = (index: number, newStatus: 'approved' | 'rejected') => {
    const updated = [...requests];
    updated[index].status = newStatus;
    if (comments[index]) updated[index].comment = comments[index];

    const all = JSON.parse(localStorage.getItem('leaveHistory') || '[]');
    const target = all.findIndex(
      (item: LeaveApplication) =>
        item.from === updated[index].from &&
        item.to === updated[index].to &&
        item.submittedBy === updated[index].submittedBy &&
        item.type === updated[index].type
    );
    if (target !== -1) all[target] = updated[index];
    localStorage.setItem('leaveHistory', JSON.stringify(all));

    setRequests(updated);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Leave Approval Panel</h1>
      {requests.length === 0 ? (
        <p className="text-gray-500">No leave requests found.</p>
      ) : (
        <ul className="space-y-6">
          {requests.map((req, index) => (
            <li
              key={index}
              className="border p-4 rounded-xl shadow-md bg-white flex flex-col gap-2"
            >
              <p><strong>Employee:</strong> {req.submittedBy}</p>
              <p><strong>Type:</strong> {req.type}</p>
              <p><strong>Dates:</strong> {req.from} → {req.to}</p>
              <p><strong>Reason:</strong> {req.reason}</p>
              {req.document && (
                <p><strong>Document:</strong> {req.document}</p>
              )}
              <p><strong>Status:</strong> 
                <span className={`capitalize font-semibold ml-2 ${
                  req.status === 'pending'
                    ? 'text-yellow-600'
                    : req.status === 'approved'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {req.status}
                </span>
              </p>

              {req.status === 'pending' && (
                <div className="mt-3 space-y-2">
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="Add a comment (optional)"
                    value={comments[index] || ''}
                    onChange={(e) => {
                      const updated = [...comments];
                      updated[index] = e.target.value;
                      setComments(updated);
                    }}
                  />
                  <div className="flex gap-4">
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => handleAction(index, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => handleAction(index, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}

              {req.comment && req.status !== 'pending' && (
                <p><strong>Comment:</strong> {req.comment}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
