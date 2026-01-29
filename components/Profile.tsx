import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { UserRole } from '../types';
import { Mail, Building2, ShieldCheck, User, Phone, Lock, Save, AlertCircle, CheckCircle, Hash } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    password: '',
  });

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (formData.phoneNumber.length < 10) throw new Error("Valid 10-digit phone number is required.");
      
      await updateProfile({
        name: formData.name,
        phoneNumber: formData.phoneNumber
      }, formData.password || undefined);
      setSuccess("Profile updated successfully!");
      setEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b1b2b] via-[#24243a] to-[#151522] relative overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-400 blur-[130px] opacity-40 animate-pulse"></div>
      </div>
      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-8 pb-10">
        <div className="bg-[#1f1f2e]/90 backdrop-blur-xl rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="h-32 bg-gradient-to-r from-indigo-600 to-cyan-400"></div>
          <div className="px-8 pb-8 -mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-[#23233a] p-1 shadow-xl">
                  <div className="w-full h-full rounded-xl bg-cyan-950 flex items-center justify-center text-3xl font-black text-cyan-400 border border-cyan-900">
                    {user?.name.charAt(0)}
                  </div>
                </div>
                {user?.isPrincipal && (
                  <div className="absolute -bottom-2 -right-2 bg-amber-400 text-amber-950 p-1.5 rounded-lg border-2 border-white shadow-lg"><ShieldCheck size={16}/></div>
                )}
              </div>
              <div className="flex-1 pb-1">
                <h2 className="text-2xl font-bold text-white drop-shadow">{user?.name}</h2>
                <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest">{user?.role} {user?.isPrincipal && '(Principal)'}</p>
              </div>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="px-6 py-2.5 bg-cyan-400 text-white font-bold rounded-xl text-sm hover:bg-cyan-500 shadow-md transition-all active:scale-95">Edit Profile</button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setEditing(false)} className="px-6 py-2.5 bg-[#23233a] text-slate-300 font-bold rounded-xl text-sm hover:bg-slate-800 transition-all">Cancel</button>
                  <button onClick={handleSave} disabled={loading} className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm hover:bg-emerald-700 shadow-md transition-all flex items-center gap-2"><Save size={16}/> {loading ? 'Saving...' : 'Save'}</button>
                </div>
              )}
            </div>

            {(error || success) && (
              <div className={`mt-8 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in duration-300 ${error ? 'bg-rose-900 border-rose-800 text-rose-300' : 'bg-emerald-900 border-emerald-800 text-emerald-300'}`}>
                {error ? <AlertCircle size={20}/> : <CheckCircle size={20}/>} 
                <p className="text-sm font-bold">{error || success}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</p>
                  {editing ? (
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-800 bg-[#23233a] text-white focus:ring-2 focus:ring-cyan-400 outline-none transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                  ) : (
                    <div className="flex items-center gap-3 text-slate-200 font-bold"><User size={18} className="text-slate-400"/> {user?.name}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                  {editing ? (
                    <input type="tel" className="w-full px-4 py-2 rounded-lg border border-slate-800 bg-[#23233a] text-white focus:ring-2 focus:ring-cyan-400 outline-none transition-all" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}/>
                  ) : (
                    <div className="flex items-center gap-3 text-slate-200 font-bold"><Phone size={18} className="text-slate-400"/> {user?.phoneNumber}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institutional Email</p>
                  <div className="flex items-center gap-3 text-slate-400 font-bold"><Mail size={18}/> {user?.email}</div>
                </div>
              </div>

              <div className="space-y-6">
                {editing && (
                  <div className="space-y-2 p-4 bg-[#23233a] rounded-2xl border border-slate-800">
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1 flex items-center gap-1"><Lock size={12}/> Security Update</p>
                    <input type="password" placeholder="New Password (optional)" className="w-full px-4 py-2 rounded-lg border border-slate-800 bg-[#23233a] text-white focus:ring-2 focus:ring-cyan-400 outline-none transition-all text-sm" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                  </div>
                )}
                {user?.role === UserRole.STUDENT && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Roll Number</p>
                    <div className="flex items-center gap-3 text-slate-400 font-bold"><Hash size={18}/> {user?.rollNumber}</div>
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</p>
                  <div className="flex items-center gap-3 text-slate-400 font-bold"><ShieldCheck size={18}/> {user?.role}</div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</p>
                  <div className="flex items-center gap-3 text-slate-400 font-bold"><Building2 size={18}/> {user?.department}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


//   return (
//     <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
//       <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
//         <div className="h-32 bg-gradient-to-r from-indigo-600 to-indigo-800"></div>
//         <div className="px-8 pb-8 -mt-12">
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//             <div className="relative">
//               <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-xl">
//                 <div className="w-full h-full rounded-xl bg-indigo-50 flex items-center justify-center text-3xl font-black text-indigo-600 border border-indigo-100">
//                   {user?.name.charAt(0)}
//                 </div>
//               </div>
//               {user?.isPrincipal && (
//                 <div className="absolute -bottom-2 -right-2 bg-amber-400 text-amber-950 p-1.5 rounded-lg border-2 border-white shadow-lg"><ShieldCheck size={16}/></div>
//               )}
//             </div>
//             <div className="flex-1 pb-1">
//               <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
//               <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest">{user?.role} {user?.isPrincipal && '(Principal)'}</p>
//             </div>
//             {!editing ? (
//               <button onClick={() => setEditing(true)} className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm hover:bg-indigo-700 shadow-md transition-all active:scale-95">Edit Profile</button>
//             ) : (
//               <div className="flex gap-2">
//                 <button onClick={() => setEditing(false)} className="px-6 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-all">Cancel</button>
//                 <button onClick={handleSave} disabled={loading} className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm hover:bg-emerald-700 shadow-md transition-all flex items-center gap-2"><Save size={16}/> {loading ? 'Saving...' : 'Save'}</button>
//               </div>
//             )}
//           </div>

//           {(error || success) && (
//             <div className={`mt-8 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in duration-300 ${error ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
//               {error ? <AlertCircle size={20}/> : <CheckCircle size={20}/>}
//               <p className="text-sm font-bold">{error || success}</p>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</p>
//                 {editing ? (
//                   <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
//                 ) : (
//                   <div className="flex items-center gap-3 text-slate-700 font-bold"><User size={18} className="text-slate-400"/> {user?.name}</div>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
//                 {editing ? (
//                   <input type="tel" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}/>
//                 ) : (
//                   <div className="flex items-center gap-3 text-slate-700 font-bold"><Phone size={18} className="text-slate-400"/> {user?.phoneNumber}</div>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institutional Email</p>
//                 <div className="flex items-center gap-3 text-slate-400 font-bold"><Mail size={18}/> {user?.email}</div>
//               </div>
//             </div>

//             <div className="space-y-6">
//               {editing && (
//                 <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
//                   <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-1 flex items-center gap-1"><Lock size={12}/> Security Update</p>
//                   <input type="password" placeholder="New Password (optional)" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white text-sm" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
//                 </div>
//               )}
//               {user?.role === UserRole.STUDENT && (
//                 <div className="space-y-2">
//                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Roll Number</p>
//                   <div className="flex items-center gap-3 text-slate-400 font-bold"><Hash size={18}/> {user?.rollNumber}</div>
//                 </div>
//               )}
//               <div className="space-y-2">
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</p>
//                 <div className="flex items-center gap-3 text-slate-400 font-bold"><ShieldCheck size={18}/> {user?.role}</div>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</p>
//                 <div className="flex items-center gap-3 text-slate-400 font-bold"><Building2 size={18}/> {user?.department}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
