'use client';

import { useState } from 'react';

type LeaveType = 'Annual' | 'Sick' | 'Maternity' | 'Unpaid' | 'Compassionate';

const leaveTypesWithRequiredDocs: LeaveType[] = ['Sick', 'Maternity', 'Compassionate'];

type LeaveApplication = {
  type: LeaveType;
  reason: string;
  from: string;
  to: string;
  document?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
};

export default function ApplyLeave() {
  const [type, setType] = useState<LeaveType>('Annual');
  const [reason, setReason] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [document, setDocument] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!type || !from || !to) {
      setError('Please fill all required fields.');
      return;
    }
    if (leaveTypesWithRequiredDocs.includes(type) && !reason) {
      setError('Reason is required for this leave type.');
      return;
    }

    const submittedBy = localStorage.getItem('loggedInUser') || 'anonymous';

    const newLeave: LeaveApplication = {
      type,
      reason,
      from,
      to,
      document: document?.name,
      status: 'pending',
      submittedBy,
    };

    const stored = localStorage.getItem('leaveHistory');
    const history = stored ? JSON.parse(stored) : [];
    history.push(newLeave);
    localStorage.setItem('leaveHistory', JSON.stringify(history));

    setType('Annual');
    setReason('');
    setFrom('');
    setTo('');
    setDocument(null);
    setError('');
    alert('Leave request submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">Apply for Leave</h2>

      {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
          <select
            value={type}
            onChange={e => setType(e.target.value as LeaveType)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option>Annual</option>
            <option>Sick</option>
            <option>Maternity</option>
            <option>Unpaid</option>
            <option>Compassionate</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">From</label>
            <input
              type="date"
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">To</label>
            <input
              type="date"
              value={to}
              onChange={e => setTo(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
        </div>

        {(leaveTypesWithRequiredDocs.includes(type) || type === 'Annual') && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">Reason</label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={3}
              placeholder="Optional or required depending on leave type"
              className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
            />
          </div>
        )}

        {leaveTypesWithRequiredDocs.includes(type) && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">Upload Supporting Document</label>
            <input
              type="file"
              onChange={e => setDocument(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-700 text-white font-semibold py-3 rounded hover:bg-blue-800 transition"
        >
          Submit Leave Application
        </button>
      </div>
    </div>
  );
}
