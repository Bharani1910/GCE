
import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Loader2, AlertCircle, ArrowLeft, CheckCircle, UserCircle, Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || "Credential error.");
    } finally {
      setLoading(false);
    }
  };

  
  // const handleForgot = async () => {
  //   if (!email) {
  //     setError('Email required: Enter your institutional email to proceed.');
  //     return;
  //   }
  //   setResetting(true);
  //   setError(null);
  //   try {
  //     await resetPassword(email);
  //     setSuccess(
  //       'Alert: Reset instructions with a temporary password have been simulated for ' +
  //         email +
  //         '. Check your console.'
  //     );
  //   } catch (err: any) {
  //     setError(err.message);
  //   } finally {
  //     setResetting(false);
  //   }
  // };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b1b2b] via-[#24243a] to-[#151522] relative overflow-hidden px-4">

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-400 blur-[130px] opacity-40 animate-pulse"></div>
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
      <div className="relative z-10 p-[3px] rounded-3xl bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-400 animate-gradient">
        <div className="w-full max-w-md bg-[#1f1f2e]/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

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
              Campus Login
            </h2>
            <p className="text-slate-400 text-sm">
              GCE Erode Notification Framework
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3">
                <AlertCircle size={20} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3">
                <CheckCircle size={20} />
                <p className="text-sm font-medium">{success}</p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">
                Institutional ID / Roll Number
              </label>
              <div className="relative">
                <UserCircle
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="email"
                  required
                  placeholder="Email or 23CSE01"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a2a40] border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1 flex justify-between items-center">
                Account Password
                <Link to="/forgot-password" title="Recover institutional account" className="text-xs text-indigo-600 hover:underline font-bold">
                  Forgot Password?
                </Link>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
                {/* <button
                  type="button"
                  onClick={handleForgot}
                  disabled={resetting}
                  className="text-xs text-cyan-400 hover:underline font-semibold"
                >
                  {resetting ? 'Simulating...' : 'Forgot Password?'}
                </button>
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a2a40] border border-slate-600 text-white focus:ring-2 focus:ring-pink-400 outline-none transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div> */}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Log In'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-8 text-slate-400 text-sm">
        New to the framework?
        <Link to="/signup" className="text-cyan-400 ml-1 hover:underline">
          Register Official Account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

  // Removed simulated forgot password logic

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
//       <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-semibold">
//         <ArrowLeft size={20} />
//         Home
//       </Link>

//       <div className="w-full max-w-md space-y-8">
//         <div className="text-center space-y-2">
//           <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto shadow-xl shadow-indigo-100">GE</div>
//           <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Campus Login</h2>
//           <p className="text-slate-500">GCE Erode Notification Framework</p>
//         </div>

//         <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50">
//           <form onSubmit={handleSubmit} className="space-y-6" noValidate>
//             {error && (
//               <div className="p-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl flex items-center gap-3">
//                 <AlertCircle size={20} />
//                 <p className="text-sm font-medium">{error}</p>
//               </div>
//             )}
//             {success && (
//               <div className="p-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl flex items-center gap-3">
//                 <CheckCircle size={20} />
//                 <p className="text-sm font-medium">{success}</p>
//               </div>
//             )}

//             <div className="space-y-2">
//               <label className="text-sm font-bold text-slate-700 ml-1">Institutional ID / Roll Number</label>
//               <div className="relative">
//                 <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                 <input
//                   type="email"
//                   required
//                   placeholder="Email or 23CSE01"
//                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   autoCapitalize="none"
//                   autoCorrect="off"
//                   spellCheck="false"
//                   autoComplete="email"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-bold text-slate-700 ml-1 flex items-center justify-between">
//                 Account Password
//                 <Link to="/forgot-password" title="Recover institutional account" className="text-xs text-indigo-600 hover:underline font-bold">
//                   Forgot Password?
//                 </Link>
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                 <input type="password" required placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={password} onChange={(e) => setPassword(e.target.value)} />
//               </div>
//             </div>

//             <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
//               {loading ? <Loader2 className="animate-spin" /> : 'Log In'}
//             </button>
//           </form>
//         </div>

//         <p className="text-center text-slate-500 font-medium">
//           New to the framework? <Link to="/signup" className="text-indigo-600 hover:underline">Register Official Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
