'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../sidebar/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      setAllowed(true);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!allowed) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-100">
        <AdminSidebar />
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
