'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LeaveApprovalPanel from './LeaveApprovalPanel';

export default function ManagerPage() {
  const [isManager, setIsManager] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'manager') {
      setIsManager(true);
    } else {
      router.push('/login');
    }
  }, []);

  if (!isManager) return null;

  return (
    <main className="max-w-4xl mx-auto mt-8">
      <LeaveApprovalPanel />
    </main>
  );
}
