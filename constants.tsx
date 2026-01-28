
import React from 'react';
import { 
  Bell, 
  LayoutDashboard, 
  User, 
  LogOut, 
  FileText, 
  Briefcase, 
  ShieldAlert, 
  GraduationCap, 
  Megaphone,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { NotificationCategory, Priority } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { id: 'profile', label: 'Profile', icon: <User size={20} /> },
];

export const CATEGORY_COLORS: Record<NotificationCategory, string> = {
  [NotificationCategory.ACADEMIC]: 'bg-blue-100 text-blue-700 border-blue-200',
  [NotificationCategory.EXAM]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  [NotificationCategory.PLACEMENT]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  [NotificationCategory.EVENTS]: 'bg-purple-100 text-purple-700 border-purple-200',
  [NotificationCategory.ADMINISTRATIVE]: 'bg-slate-100 text-slate-700 border-slate-200',
  [NotificationCategory.EMERGENCY]: 'bg-rose-100 text-rose-700 border-rose-200',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  [Priority.HIGH]: 'bg-red-500',
  [Priority.MEDIUM]: 'bg-amber-500',
  [Priority.LOW]: 'bg-sky-500',
};

export const CATEGORY_ICONS: Record<NotificationCategory, React.ReactNode> = {
  [NotificationCategory.ACADEMIC]: <GraduationCap size={16} />,
  [NotificationCategory.EXAM]: <FileText size={16} />,
  [NotificationCategory.PLACEMENT]: <Briefcase size={16} />,
  [NotificationCategory.EVENTS]: <Megaphone size={16} />,
  [NotificationCategory.ADMINISTRATIVE]: <CheckCircle size={16} />,
  [NotificationCategory.EMERGENCY]: <ShieldAlert size={16} />,
};
