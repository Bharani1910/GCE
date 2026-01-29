
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Mail,
    KeyRound,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    AlertCircle,
    CheckCircle,
    Loader2
} from 'lucide-react';

enum ResetStep {
    EMAIL = 'email',
    OTP = 'otp',
    NEW_PASSWORD = 'new_password',
    SUCCESS = 'success'
}

const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<ResetStep>(ResetStep.EMAIL);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [passwords, setPasswords] = useState({
        new: '',
        confirm: ''
    });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setError(null);
        try {
            const resp = await fetch('http://localhost:5005/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await resp.json();
            if (!resp.ok) throw new Error(data.message || 'Failed to send OTP');

            setStep(ResetStep.OTP);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp) return;

        setLoading(true);
        setError(null);
        try {
            const resp = await fetch('http://localhost:5005/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const data = await resp.json();
            if (!resp.ok) throw new Error(data.message || 'Invalid or expired code');

            setStep(ResetStep.NEW_PASSWORD);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordRegex.test(passwords.new)) {
            setError("Password does not meet security requirements.");
            return;
        }
        if (passwords.new !== passwords.confirm) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const resp = await fetch('http://localhost:5005/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    otp,
                    newPassword: passwords.new,
                    confirmPassword: passwords.confirm
                })
            });
            const data = await resp.json();
            if (!resp.ok) throw new Error(data.message || 'Reset failed');

            // Update local storage for simulation consistency
            const users = JSON.parse(localStorage.getItem('gce_users_db') || '[]');
            const userIndex = users.findIndex((u: any) => u.email.toLowerCase() === email.toLowerCase());
            if (userIndex !== -1) {
                users[userIndex].password = passwords.new;
                localStorage.setItem('gce_users_db', JSON.stringify(users));
            }

            setStep(ResetStep.SUCCESS);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b1b2b] via-[#24243a] to-[#151522] relative overflow-hidden px-4">

            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-400 blur-[130px] opacity-40 animate-pulse"></div>
            </div>

            {/* Back link */}
            <Link to="/login" className="absolute top-8 left-8 flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition font-semibold z-10">
                <ArrowLeft size={20} />
                Back to Login
            </Link>

            {/* Glowing border */}
            <div className="relative z-10 p-[3px] rounded-3xl bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-400 animate-gradient">
                <div className="w-full max-w-md bg-[#1f1f2e]/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

                    {/* Header */}
                    <div className="text-center space-y-2 mb-6">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
                            GE
                        </div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">
                            {step === ResetStep.EMAIL && 'Forgot Password?'}
                            {step === ResetStep.OTP && 'Verify Identity'}
                            {step === ResetStep.NEW_PASSWORD && 'New Password'}
                            {step === ResetStep.SUCCESS && 'Reset Successful'}
                        </h2>
                        <p className="text-slate-400">
                            {step === ResetStep.EMAIL && 'Enter your registered institutional email.'}
                            {step === ResetStep.OTP && `A 6-digit code has been sent to ${email}`}
                            {step === ResetStep.NEW_PASSWORD && 'Set a strong, new password for your account.'}
                            {step === ResetStep.SUCCESS && 'Your password has been updated successfully.'}
                        </p>
                    </div>

                    <div>
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3">
                                <AlertCircle size={20} />
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {step === ResetStep.EMAIL && (
                            <form onSubmit={handleSendOTP} className="space-y-6" noValidate>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">Institutional Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="email@gcerode.ac.in"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a2a40] border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none transition"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : 'Send Verification Code'}
                                </button>
                            </form>
                        )}

                        {step === ResetStep.OTP && (
                            <form onSubmit={handleVerifyOTP} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">6-Digit Code</label>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="text"
                                            maxLength={6}
                                            required
                                            placeholder="000000"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a2a40] border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none transition tracking-[0.5em] font-mono text-center text-lg"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        />
                                    </div>
                                    <p className="text-[11px] text-slate-400 text-center font-medium">Code expires in 5 minutes</p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : 'Verify Code'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(ResetStep.EMAIL)}
                                    className="w-full text-sm font-bold text-slate-400 hover:text-cyan-400 transition-colors"
                                    disabled={loading}
                                >
                                    Use a different email
                                </button>
                            </form>
                        )}

                        {step === ResetStep.NEW_PASSWORD && (
                            <form onSubmit={handleResetPassword} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1 flex items-center justify-between">
                                        New Password
                                        <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Security Grade 1</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#2a2a40] border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none transition"
                                            value={passwords.new}
                                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors">
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#2a2a40] border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none transition"
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                        />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors">
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <p className={`text-[11px] flex items-center gap-1 ${passwords.new.length >= 8 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        <ShieldCheck size={12} /> 8+ Characters
                                    </p>
                                    <p className={`text-[11px] flex items-center gap-1 ${/[A-Z]/.test(passwords.new) ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        <ShieldCheck size={12} /> Uppercase
                                    </p>
                                    <p className={`text-[11px] flex items-center gap-1 ${/[a-z]/.test(passwords.new) ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        <ShieldCheck size={12} /> Lowercase
                                    </p>
                                    <p className={`text-[11px] flex items-center gap-1 ${/\d/.test(passwords.new) && /[@$!%*?&]/.test(passwords.new) ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        <ShieldCheck size={12} /> Num & Symbol
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : 'Set New Password'}
                                </button>
                            </form>
                        )}

                        {step === ResetStep.SUCCESS && (
                            <div className="text-center space-y-6">
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <CheckCircle size={40} />
                                </div>
                                <p className="text-slate-400 font-medium">Password reset successful. Please login with your new credentials.</p>
                                <Link
                                    to="/login"
                                    className="block w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-bold hover:scale-[1.02] active:scale-95 transition"
                                >
                                    Go to Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <p className="absolute bottom-8 text-slate-400 text-sm">
                Need an account?
                <Link to="/signup" className="text-cyan-400 ml-1 hover:underline">
                    Register Official Account
                </Link>
            </p>
        </div>
    );
};

export default ForgotPasswordPage;
