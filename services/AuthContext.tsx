
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
      const { password, ...userSessionData } = foundUser;
      setUser(userSessionData as User);
      localStorage.setItem('gce_user', JSON.stringify(userSessionData));
    } else {
      throw new Error("Invalid credentials. Please register your institutional account first.");
    }
  };

  const signUp = async (userData: Omit<User, 'id'>, password: string) => {
    const users: (User & { password?: string })[] = JSON.parse(localStorage.getItem('gce_users_db') || '[]');
    
    // STRICT VALIDATION AGAINST MASTER DATABASE (Email, Phone, and Roll Number if applicable)
    const masterRecord = validateMasterUser(userData.email, userData.rollNumber, userData.phoneNumber);
    if (!masterRecord) {
      throw new Error("Access Denied: Your details (Email/Phone/Roll Number) do not match official institutional records.");
    }

    // Role and Department must match master data exactly
    if (masterRecord.role !== userData.role || masterRecord.department !== userData.department) {
       throw new Error(`Credential Mismatch: Campus records identify you as ${masterRecord.role} of ${masterRecord.department}.`);
    }

    // Exactly one Principal account
    if (userData.isPrincipal) {
      const existingPrincipal = users.find(u => u.isPrincipal);
      if (existingPrincipal) throw new Error("Security Restriction: An official Principal account is already active.");
    }

    // Exactly one HoD per department
    if (userData.role === UserRole.HOD) {
      const existingHod = users.find(u => u.role === UserRole.HOD && u.department === userData.department);
      if (existingHod) throw new Error(`Institutional Constraint: An HoD for ${userData.department} is already registered.`);
    }

    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error("Account already active. Please proceed to login.");
    }

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
      name: updates.name || users[index].name,
      phoneNumber: updates.phoneNumber || users[index].phoneNumber,
      password: newPassword || users[index].password
    };

    users[index] = updatedUserRecord;
    localStorage.setItem('gce_users_db', JSON.stringify(users));

    const { password: _, ...userSessionData } = updatedUserRecord;
    setUser(userSessionData as User);
    localStorage.setItem('gce_user', JSON.stringify(userSessionData));
  };

  const resetPassword = async (email: string) => {
    const users: (User & { password?: string })[] = JSON.parse(localStorage.getItem('gce_users_db') || '[]');
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!found) {
        throw new Error("Email not found. Please ensure you have registered your account.");
    }

    const tempPass = 'GCE123';
    found.password = tempPass;
    localStorage.setItem('gce_users_db', JSON.stringify(users));
    
    // SMTP LOGGING FOR SIMULATION
    console.log(`
      -----------------------------------------------
      [GCE Erode Notification System] SMTP OUTBOX
      -----------------------------------------------
      From: gcenotification@gmail.com
      To: ${email}
      Subject: Automated Password Reset
      
      Your temporary password is: ${tempPass}
      
      Please login and update your password immediately.
      This is an automated email. Please do not reply.
      -----------------------------------------------
    `);
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
