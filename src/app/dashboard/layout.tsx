// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import EmployeeSidebar from '@/app/sidebar'; // because index.tsx is default

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [allowed, setAllowed] = useState(false);

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     if (role === 'employee') {
//       setAllowed(true);
//     } else {
//       router.push('/login'); // or wherever your login page is
//     }
//   }, []);

//   if (!allowed) return null;

//   return (
//     <div className="flex min-h-screen">
//       <aside className="w-64 border-r bg-gray-100">
//         <EmployeeSidebar />
//       </aside>
//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EmployeeSidebar from '@/app/sidebar'; // because index.tsx is default

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'employee') {
      setAllowed(true);
    } else {
      router.push('/login'); // or wherever your login page is
    }
  }, [router]); // ✅ include router

  if (!allowed) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-100">
        <EmployeeSidebar />
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
