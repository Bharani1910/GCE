
import { Notification, Acknowledgment, UserRole, Department, NotificationCategory } from '../types';

const NOTIFICATIONS_KEY = 'gce_notifications';
const ACKNOWLEDGMENTS_KEY = 'gce_acknowledgments';

export const NotificationService = {
  getNotifications: (): Notification[] => {
    try {
      return JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
    } catch {
      return [];
    }
  },

  createNotification: async (notif: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> => {
    const notifications = NotificationService.getNotifications();
    const newNotif: Notification = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([newNotif, ...notifications]));

    // Auto-mark as read for sender
    NotificationService.acknowledge(newNotif.id, newNotif.senderId, 'VIEWED');

    // Sync with backend
    try {
      // Determine receiver IDs based on targeting
      const receiverIds: string[] = [];
      // This would need to be calculated based on targetDepartments, targetYears, etc.
      // For now, we'll send the notification data to backend

      await fetch('http://localhost:5005/api/notifications/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newNotif,
          receiverIds: receiverIds // This should be populated based on targeting rules
        })
      });
    } catch (error) {
      console.error('Failed to sync notification with backend:', error);
    }

    return newNotif;
  },

  getAcknowledgments: (): Acknowledgment[] => {
    try {
      return JSON.parse(localStorage.getItem(ACKNOWLEDGMENTS_KEY) || '[]');
    } catch {
      return [];
    }
  },

  acknowledge: (notificationId: string, userId: string, status: 'VIEWED' | 'ACKNOWLEDGED' = 'ACKNOWLEDGED') => {
    const acks = NotificationService.getAcknowledgments();
    const existing = acks.find(a => a.notificationId === notificationId && a.userId === userId);

    if (existing) {
      if (existing.status === 'ACKNOWLEDGED' && status === 'VIEWED') return;
      existing.status = status;
      existing.timestamp = Date.now();
    } else {
      acks.push({
        id: Math.random().toString(36).substr(2, 9),
        notificationId,
        userId,
        status,
        timestamp: Date.now()
      });
    }
    localStorage.setItem(ACKNOWLEDGMENTS_KEY, JSON.stringify(acks));
  },

  getNotificationStats: (notificationId: string) => {
    const acks = NotificationService.getAcknowledgments().filter(a => a.notificationId === notificationId);
    return {
      viewed: acks.filter(a => a.status === 'VIEWED' || a.status === 'ACKNOWLEDGED').length,
      acknowledged: acks.filter(a => a.status === 'ACKNOWLEDGED').length,
      list: acks
    };
  },

  getFilteredNotifications: (user: any): Notification[] => {
    const all = NotificationService.getNotifications();

    if (!user) return [];

    // Rule 11: Principal and Administration see EVERYTHING
    if (user.isPrincipal || user.role === UserRole.ADMINISTRATION) {
      return all;
    }

    return all.filter(n => {
      const deptMatch = n.targetDepartments.length === 0 ||
        n.targetDepartments.includes(user.department) ||
        n.targetDepartments.includes(Department.GENERAL);

      const yearMatch = !user.year ||
        n.targetYears.length === 0 ||
        n.targetYears.includes(user.year);

      return deptMatch && yearMatch;
    });
  }
};
