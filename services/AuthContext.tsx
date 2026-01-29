
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Department } from '../types';
import { validateMasterUser } from './MasterData';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signUp: (userData: Omit<User, 'id'>, password: string) => Promise<void>;
  updateProfile: (updates: Partial<User>, newPassword?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gce_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (id: string, pass: string) => {
    const users: (User & { password?: string })[] = JSON.parse(localStorage.getItem('gce_users_db') || '[]');
    const foundUser = users.find(u =>
      u.email.toLowerCase() === id.toLowerCase() ||
      (u.rollNumber && u.rollNumber.toUpperCase() === id.toUpperCase())
    );

    if (foundUser && foundUser.password === pass) {
      // Store previous login time before updating
      const previousLoginTime = foundUser.lastLoginTime || 0;

      // Update last login time
      const currentTime = Date.now();
      foundUser.lastLoginTime = currentTime;

      // Update in database
      const userIndex = users.findIndex(u => u.id === foundUser.id);
      if (userIndex !== -1) {
        users[userIndex] = foundUser;
        localStorage.setItem('gce_users_db', JSON.stringify(users));
      }

      const { password, ...userSessionData } = foundUser;

      // Store previous login time in session for popup check
      localStorage.setItem('gce_previous_login', previousLoginTime.toString());

      setUser(userSessionData as User);
      localStorage.setItem('gce_user', JSON.stringify(userSessionData));
    } else {
      throw new Error("Invalid credentials. Please register your institutional account first.");
    }
  };

  const signUp = async (userData: Omit<User, 'id'>, password: string) => {
    // Strong password regex: 8+ chars, upper, lower, digit, special
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error("Password Policy Violation: Must be 8+ characters with uppercase, lowercase, number, and special character.");
    }

    // Backend validation check (MANDATORY for OTP support)
    try {
      // 1. Validate password strength on backend
      const validateResp = await fetch('http://localhost:5005/api/validate-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!validateResp.ok) {
        const data = await validateResp.json();
        throw new Error(data.message || "Invalid password per backend security policy.");
      }

      // 2. Sync account with backend
      const signupResp = await fetch('http://localhost:5005/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email, password })
      });

      if (!signupResp.ok) {
        const data = await signupResp.json();
        // If user already exists on backend (400), we don't throw an error here.
        // We'll check local existence later to decide if we need to update/login.
        if (signupResp.status !== 400) {
          throw new Error(data.message || `Campus Sync Error`);
        }
      }
    } catch (err: any) {
      if (err.message.includes('Failed to fetch') || err.message.includes('unreachable')) {
        throw new Error("System Offline: Connection to Campus Backend failed. Please ensure the server is running.");
      }
      throw err;
    }

    const users: (User & { password?: string })[] = JSON.parse(localStorage.getItem('gce_users_db') || '[]');

    // STRICT VALIDATION AGAINST MASTER DATABASE
    const masterRecord = validateMasterUser(userData.email, userData.rollNumber, userData.phoneNumber);
    if (!masterRecord) {
      throw new Error("Access Denied: Your details do not match official institutional records.");
    }

    if (masterRecord.role !== userData.role || masterRecord.department !== userData.department) {
      throw new Error(`Credential Mismatch: Campus records identify you as ${masterRecord.role} of ${masterRecord.department}.`);
    }

    // Role constraints
    if (userData.isPrincipal && users.some(u => u.isPrincipal)) {
      throw new Error("Security Restriction: An official Principal account is already active.");
    }
    if (userData.role === UserRole.HOD && users.some(u => u.role === UserRole.HOD && u.department === userData.department)) {
      throw new Error(`Institutional Constraint: An HoD for ${userData.department} is already registered.`);
    }

    // Check if they are already in local storage
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === userData.email.toLowerCase());

    if (existingIndex !== -1) {
      // If they exist locally, we just update their session and log them in
      // This prevents the "already active" error if they are just re-syncing their account
      const updatedUser = { ...users[existingIndex], ...userData, password };
      users[existingIndex] = updatedUser;
      localStorage.setItem('gce_users_db', JSON.stringify(users));

      const { password: _, ...userSessionData } = updatedUser;
      setUser(userSessionData as User);
      localStorage.setItem('gce_user', JSON.stringify(userSessionData));
      return;
    }

    // New user registration
    const newUserRecord = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      password
    };

    users.push(newUserRecord);
    localStorage.setItem('gce_users_db', JSON.stringify(users));

    const { password: _, ...userSessionData } = newUserRecord;
    setUser(userSessionData as User);
    localStorage.setItem('gce_user', JSON.stringify(userSessionData));
  };

  const updateProfile = async (updates: Partial<User>, newPassword?: string) => {
    const users: (User & { password?: string })[] = JSON.parse(localStorage.getItem('gce_users_db') || '[]');
    const index = users.findIndex(u => u.id === user?.id);
    if (index === -1) throw new Error("Session timed out. Please login again.");

    const updatedUserRecord = {
      ...users[index],
      ...updates,
      password: newPassword || users[index].password
    };

    users[index] = updatedUserRecord;
    localStorage.setItem('gce_users_db', JSON.stringify(users));

    const { password: _, ...userSessionData } = updatedUserRecord;
    setUser(userSessionData as User);
    localStorage.setItem('gce_user', JSON.stringify(userSessionData));
  };

  const resetPassword = async (email: string) => {
    // SECURITY: We ALWAYS check the backend for Forgot Password
    // Local storage check is removed so institutional accounts can be recovered on any device
    try {
      const response = await fetch('http://localhost:5005/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Verification service unreachable.');
      }

      console.log('[Auth] OTP request successful');
    } catch (error: any) {
      console.error('Error in resetPassword:', error);
      throw new Error(error.message || 'Error connecting to the Campus Backend.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gce_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, updateProfile, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
