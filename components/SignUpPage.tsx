
import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, ArrowLeft, Eye, EyeOff, ShieldCheck, Divide } from 'lucide-react';
import { UserRole, Department } from '../types';

type DropdownOption<T> = {
  label: string;
  value: T;
};

function CustomDropdown<T>({
  label,
  value,
  options,
  onChange,
  disabled = false
}: {
  label: string;
  value: T | '';
  options: DropdownOption<T>[];
  onChange: (v: T) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3 rounded-xl bg-[#2a2a40] border border-slate-600 text-left text-white
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {value || label}
      </button>

      {open && !disabled && (
        <div className="absolute z-50 mt-2 w-full rounded-xl bg-[#1f1f2e] border border-slate-600 shadow-xl max-h-60 overflow-y-auto">
          {options.map(opt => (
            <div
              key={String(opt.value)}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-cyan-500/20 cursor-pointer text-white"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const SignUpPage: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    phoneNumber: '',
    password: '',
    role: '' as UserRole | '',
    department: '' as Department | '',
    year: 1,
    isPrincipal: false
  });

  const roles = Object.values(UserRole).sort();
  const academicDepts = [
    Department.AUTO,
    Department.CIVIL,
    Department.CSE,
    Department.ECE,
    Department.EEE,
    Department.IT,
    Department.MECH
  ].sort();

  const handleRoleChange = (role: UserRole) => {
    let dept: Department | '' = '';

    if (role === UserRole.OFFICE_STAFF || role === UserRole.PLACEMENT_CELL) {
      dept = Department.GENERAL;
    } else if (role === UserRole.ADMINISTRATION) {
      dept = Department.ADMIN;
    }

    setFormData({
      ...formData,
      role,
      department: dept,
      isPrincipal: false,
      rollNumber: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role || !formData.department) {
      setError("Please select your institutional role and department.");
      return;
    }
    if (formData.phoneNumber.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setError(null);

    const finalDept = formData.isPrincipal ? Department.SUPER_ADMIN : formData.department;

    try {
      await signUp({
        name: formData.name,
        email: formData.email,
        role: formData.role as UserRole,
        department: finalDept as Department,
        rollNumber: formData.role === UserRole.STUDENT ? formData.rollNumber.toUpperCase() : undefined,
        phoneNumber: formData.phoneNumber,
        year: formData.role === UserRole.STUDENT ? formData.year : undefined,
        isPrincipal: formData.isPrincipal
      }, formData.password);

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b1b2b] via-[#24243a] to-[#151522] relative px-4 pb-20">

    {/* Background glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-400 blur-[130px] opacity-40 animate-pulse" />
    </div>

    {/* Home link */}
    <Link
      to="/"
      className="absolute top-8 left-8 flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition font-semibold z-10"
    >
      <ArrowLeft size={20} />
      Home
    </Link>

    {/* Glowing border */}
    <div className="relative z-10 p-[3px] mt-8 rounded-3xl bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-400 animate-gradient">
      <div className="w-full max-w-xl bg-[#1f1f2e]/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl overflow-visible">
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg">
  <img
    src="/college-logos.png"
    alt="GCE Erode Logo"
    className="w-12 h-12 object-contain"
  />
</div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Register Institution Account
          </h2>
          <p className="text-slate-400 text-sm">
            Government College of Engineering, Erode
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3 animate-pulse">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#2a2a40] border border-slate-600 text-white"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Campus Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">
                Campus Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#2a2a40] border border-slate-600 text-white"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                autoComplete="email"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#2a2a40] border border-slate-600 text-white"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>

            {/* Institutional Role */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">
                Institutional Role
              </label>
              <CustomDropdown
                label="Select Role"
                value={formData.role}
                disabled={formData.isPrincipal}
                options={roles.map((r) => ({ label: r, value: r }))}
                onChange={(role) => handleRoleChange(role)}
              />
            </div>

            {/* Roll Number (Student) */}
              {formData.role === UserRole.STUDENT && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 ml-1">Roll Number</label>
                  <input type="text" required placeholder="e.g. 23CSE01" className="w-full px-4 py-3 rounded-xl bg-[#2a2a40] border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none transition uppercase" value={formData.rollNumber} onChange={(e) => setFormData({...formData, rollNumber: e.target.value})} />
                </div>
              )}
              {/* Department */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Department</label>
                <CustomDropdown
                   label="Select Department"
                   value={formData.department}
                   disabled={
                      formData.isPrincipal ||
                      [UserRole.OFFICE_STAFF, UserRole.PLACEMENT_CELL, UserRole.ADMINISTRATION]
                      .includes(formData.role as any)
                   }
                   options={
                      ([UserRole.STUDENT, UserRole.FACULTY, UserRole.HOD].includes(formData.role as any)
                      ? academicDepts
                      : formData.department
                      ? [formData.department]
                      : []
                      ).map(d => ({ label: d, value: d }))
                   }
                   onChange={(dept) =>
                   setFormData({ ...formData, department: dept })
               }
               />
               </div>

            {formData.role === UserRole.STUDENT && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Academic Year</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white" value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}>
                    {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
                  </select>
                </div>
              )}

              {formData.role === UserRole.ADMINISTRATION && (
                <div className="col-span-1 md:col-span-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500" checked={formData.isPrincipal} onChange={(e) => setFormData({ ...formData, isPrincipal: e.target.checked, department: e.target.checked ? Department.SUPER_ADMIN : Department.ADMIN })} />
                    <span className="text-sm font-bold text-slate-700">I am the Principal of GCE Erode</span>
                  </label>
                </div>
              )}

            {/* Password */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className=" text-slate-700 flex items-center justify-between ">
                <label className="text-sm font-bold text-slate-300 ml-1">Create Password</label>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  Secure Protocol Required
                </span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 pr-12"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
              <p className="text-[11px] flex items-center gap-1 text-white">
              <ShieldCheck size={12} /> 8+ Characters
              </p>
              <p className="text-[11px] flex items-center gap-1 text-white">
              <ShieldCheck size={12} /> Uppercase Letter
              </p>
              <p className="text-[11px] flex items-center gap-1 text-white">
              <ShieldCheck size={12} /> Lowercase Letter
              </p>
              <p className="text-[11px] flex items-center gap-1 text-white">
              <ShieldCheck size={12} /> Number & Special Char
              </p>
              </div>

            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-bold"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Register Official Account'}
          </button>
        </form>
      </div>
    </div>

    {/* Footer */}
    <p className="absolute bottom-8 text-slate-400 text-sm">
      Already registered?
      <Link to="/login" className="text-cyan-400 ml-1 hover:underline">
        Log in
      </Link>
    </p>
  </div>
);
};

export default SignUpPage;