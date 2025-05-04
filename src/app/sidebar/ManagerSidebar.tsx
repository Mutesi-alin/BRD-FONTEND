'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/manager/dashboard', label: 'Dashboard' },
  { href: '/manager/LeaveApprovalPanel', label: 'Leave Approvals' },
  { href: '/login', label: 'Logout' },
];

const ManagerSidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="h-full w-full bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-6">Manager Panel</h2>
      <ul className="space-y-2">
        {links.map(({ href, label }) => {
          const isActive = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? 'bg-blue-500 text-white' : 'text-gray-800'
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ManagerSidebar;
