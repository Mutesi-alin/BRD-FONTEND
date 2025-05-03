// utils/notifications.ts
export function addNotification(type: string, message: string) {
    const existing = JSON.parse(localStorage.getItem('notifications') || '[]');
    const newNotification = {
      id: Date.now().toString(), // unique id
      type,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    };
    const updated = [newNotification, ...existing];
    localStorage.setItem('notifications', JSON.stringify(updated));
  }
  