'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Apply Leave', href: '/leaves/apply' },
  { name: 'Leave History', href: '/leaves/history' },
  { name: 'Team Calendar', href: '/calender' },
  { name: 'Notifications', href: '/notifications' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = () => {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      const notifications = JSON.parse(stored);
      const unread = notifications.filter((n: any) => !n.read).length;
      setUnreadCount(unread);
    } else {
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    fetchUnreadCount(); // initial load
    const interval = setInterval(fetchUnreadCount, 3000); // poll every 3s

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <aside className="w-64 h-screen bg-blue-700 text-white p-4 fixed top-0 left-0 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-6">Leave System</h1>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded flex justify-between items-center ${
                pathname === item.href ? 'bg-blue-900' : 'hover:bg-blue-800'
              }`}
            >
              <span>{item.name}</span>
              {item.name === 'Notifications' && unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {unreadCount}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white"
      >
        Logout
      </button>
    </aside>
  );
}
