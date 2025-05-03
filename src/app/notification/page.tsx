'use client';

import { useEffect } from 'react';

export default function NotificationsPage() {
  useEffect(() => {
    if (!localStorage.getItem('notifications')) {
      localStorage.setItem(
        'notifications',
        JSON.stringify([
          {
            id: '1',
            type: 'submission',
            message: 'Your leave request was submitted.',
            timestamp: new Date().toISOString(),
            read: false,
          },
          {
            id: '2',
            type: 'approval',
            message: 'Your leave request was approved.',
            timestamp: new Date().toISOString(),
            read: false,
          },
          {
            id: '3',
            type: 'upcoming',
            message: 'You have an upcoming leave starting tomorrow.',
            timestamp: new Date().toISOString(),
            read: true,
          },
        ])
      );
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Notifications</h1>
      {/* Render notifications list here */}
    </div>
  );
}
