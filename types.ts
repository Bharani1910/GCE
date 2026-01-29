
export enum UserRole {
  ADMINISTRATION = 'Administration',
  FACULTY = 'Faculty',
  HOD = 'HoD',
  OFFICE_STAFF = 'Office Staff',
  PLACEMENT_CELL = 'Placement Cell',
  STUDENT = 'Student'
}

export enum Department {
  AUTO = 'Automobile Engineering',
  CIVIL = 'Civil Engineering',
  CSE = 'Computer Science and Engineering',
  ECE = 'Electronics and Communication Engineering',
  EEE = 'Electrical and Electronics Engineering',
  IT = 'Information Technology',
  MECH = 'Mechanical Engineering',
  GENERAL = 'GENERAL',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum NotificationCategory {
  ACADEMIC = 'Academic',
  EXAM = 'Exam',
  PLACEMENT = 'Placement',
  EVENTS = 'Events',
  ADMINISTRATIVE = 'Administrative',
  EMERGENCY = 'Emergency'
}

export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum Frequency {
  ONE_TIME = 'One-time',
  SCHEDULED = 'Scheduled',
  REPEATED = 'Repeated'
}

export interface User {
  id: string;
  name: string;
  email: string;
  rollNumber?: string;
  phoneNumber: string; // Mandatory for all users
  role: UserRole;
  department: Department;
  year?: number;
  isPrincipal?: boolean;
  lastLoginTime?: number; // Track last login for new notification detection
}

export interface Notification {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderDepartment: Department;
  title: string;
  content: string;
  category: NotificationCategory;
  priority: Priority;
  frequency: Frequency;
  targetDepartments: Department[];
  targetYears: number[];
  createdAt: number;
  expiresAt: number;
  requiresAcknowledgment: boolean;
}

export interface Acknowledgment {
  id: string;
  notificationId: string;
  userId: string;
  status: 'VIEWED' | 'ACKNOWLEDGED';
  timestamp: number;
}
