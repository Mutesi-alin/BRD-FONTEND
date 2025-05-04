'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/leave-types', label: 'Leave Types' },
  { href: '/admin/balance-adjust', label: 'Adjust Balances' },
  { href: '/admin/calendars', label: 'Calendars' },
  { href: '/admin/reports', label: 'Reports' },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user'); // or any relevant auth key
    router.push('/login');
  };

  return (
    <nav className="h-full w-full bg-[#3089a1] p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6 text-gray-700">Admin Panel</h2>
        <ul className="space-y-2">
          {links.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-800 hover:bg-blue-100'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminSidebar;
