// src/app/manager/layout.tsx
'use client';

import ManagerSidebar from '@/app/sidebar/ManagerSidebar';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-1/4 min-h-screen border-r">
        <ManagerSidebar />
      </aside>
      <main className="w-3/4 p-4">{children}</main>
    </div>
  );
}
