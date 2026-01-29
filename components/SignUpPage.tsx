
import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, ArrowLeft, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { UserRole, Department } from '../types';

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-12">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-semibold">
        <ArrowLeft size={20} />
        Back to Home
      </Link>

      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto shadow-xl shadow-indigo-200">GE</div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Register Institution Account</h2>
          <p className="text-slate-500">Government College of Engineering, Erode</p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl flex items-center gap-3 animate-pulse">
                <AlertCircle size={20} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Campus Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Phone Number</label>
                <input type="tel" required pattern="[0-9]{10}" placeholder="10-digit numeric" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Institutional Role</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white" value={formData.role} disabled={formData.isPrincipal} onChange={(e) => handleRoleChange(e.target.value as UserRole)}>
                  <option value="">Select Role</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {formData.role === UserRole.STUDENT && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Roll Number</label>
                  <input type="text" required placeholder="e.g. 23CSE01" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all uppercase" value={formData.rollNumber} onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })} />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Department</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white" value={formData.department} disabled={formData.isPrincipal || [UserRole.OFFICE_STAFF, UserRole.PLACEMENT_CELL, UserRole.ADMINISTRATION].includes(formData.role as any)} onChange={(e) => setFormData({ ...formData, department: e.target.value as Department })}>
                  <option value="">Select Department</option>
                  {([UserRole.STUDENT, UserRole.FACULTY, UserRole.HOD].includes(formData.role as any)) ?
                    academicDepts.map(d => <option key={d} value={d}>{d}</option>) :
                    formData.department && <option value={formData.department}>{formData.department}</option>
                  }
                </select>
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

              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  Create Password
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Secure Protocol Required</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all pr-12"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className={`text-[11px] flex items-center gap-1 ${formData.password.length >= 8 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <ShieldCheck size={12} /> 8+ Characters
                  </p>
                  <p className={`text-[11px] flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <ShieldCheck size={12} /> Uppercase Letter
                  </p>
                  <p className={`text-[11px] flex items-center gap-1 ${/[a-z]/.test(formData.password) ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <ShieldCheck size={12} /> Lowercase Letter
                  </p>
                  <p className={`text-[11px] flex items-center gap-1 ${/\d/.test(formData.password) && /[@$!%*?&]/.test(formData.password) ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <ShieldCheck size={12} /> Number & Special Char
                  </p>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : 'Register Official Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 font-medium">
          Already registered? <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
