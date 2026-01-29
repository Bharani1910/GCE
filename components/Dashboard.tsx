import React from 'react';
import { useAuth } from '../services/AuthContext';
import { NotificationService } from '../services/NotificationService';
import { UserRole, Priority } from '../types';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Users, 
  Send, 
  Activity 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const notifications = NotificationService.getFilteredNotifications(user);
  const recentNotifs = notifications.slice(0, 4);
  const allAcks = NotificationService.getAcknowledgments();
  const userAcks = allAcks.filter(a => a.userId === user?.id);

  const getStats = () => {
    if (user?.role === UserRole.STUDENT) {
      const urgent = notifications.filter(n => n.priority === Priority.HIGH).length;
      const unread = notifications.filter(n => !userAcks.find(a => a.notificationId === n.id && (a.status === 'VIEWED' || a.status === 'ACKNOWLEDGED'))).length;
      const acknowledged = userAcks.filter(a => a.status === 'ACKNOWLEDGED').length;
      return [
        { label: 'Total Alerts', value: notifications.length, icon: <Bell className="text-indigo-600" />, color: 'bg-indigo-50' },
        { label: 'Unread', value: Math.max(0, unread), icon: <Clock className="text-amber-600" />, color: 'bg-amber-50' },
        { label: 'Acknowledged', value: acknowledged, icon: <CheckCircle className="text-emerald-600" />, color: 'bg-emerald-50' },
        { label: 'Urgent', value: urgent, icon: <AlertTriangle className="text-rose-600" />, color: 'bg-rose-50' },
      ];
    } else {
      const allNotifs = NotificationService.getNotifications();
      const sentCount = allNotifs.filter(n => n.senderId === user?.id).length;
      const totalNotifs = allNotifs.length;
      // Compute active users from senders + acknowledgers
      const ackUsers = allAcks.map(a => a.userId).filter(Boolean);
      const senders = allNotifs.map(n => n.senderId).filter(Boolean);
      const uniqueUsers = new Set<string>([...ackUsers, ...senders]);
      const usersActive = uniqueUsers.size;
      return [
        { label: 'Notices Sent', value: sentCount, icon: <Send className="text-indigo-600" />, color: 'bg-indigo-50' },
        { label: 'Total Campus Notices', value: totalNotifs, icon: <Activity className="text-blue-600" />, color: 'bg-blue-50' },
        { label: 'Users Active', value: usersActive, icon: <Users className="text-emerald-600" />, color: 'bg-emerald-50' },
        { label: 'High Priority', value: notifications.filter(n => n.priority === Priority.HIGH).length, icon: <AlertTriangle className="text-rose-600" />, color: 'bg-rose-50' },
      ];
    }
  };

  const getChartData = () => {
    // Build last 7 days slots (oldest -> newest)
    const slots: { name: string; start: number; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      const name = d.toLocaleDateString(undefined, { weekday: 'short' });
      slots.push({ name, start: dayStart, count: 0 });
    }

    notifications.forEach(n => {
      const created = new Date(n.createdAt);
      const createdStart = new Date(created.getFullYear(), created.getMonth(), created.getDate()).getTime();
      const slot = slots.find(s => s.start === createdStart);
      if (slot) slot.count += 1;
    });

    return slots.map(s => ({ name: s.name, count: s.count }));
  };
  const chartData = getChartData();


  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b1b2b] via-[#24243a] to-[#151522] relative overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-400 blur-[180px] opacity-40 animate-pulse"></div>
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-8 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">Welcome, {user.name.split(' ')[0]}</h1>
            <p className="text-slate-300 font-medium">Monitoring {user.department} communications.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs font-black px-4 py-2 bg-indigo-600 text-white rounded-full uppercase tracking-widest shadow-lg shadow-indigo-100">
              {user.isPrincipal ? 'Principal' : user.role}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {getStats().map((stat, i) => (
            <div key={i} className="bg-[#1f1f2e]/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-700 shadow-lg flex flex-col items-start gap-4 hover:border-indigo-400 transition-colors">
              <div className={`p-3 rounded-2xl ${stat.color}`}> 
                {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 24 })}
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-black text-white drop-shadow">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#1f1f2e]/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-lg h-full">
              <h3 className="text-lg font-extrabold text-white mb-8 flex items-center gap-2 drop-shadow">
                <Activity size={20} className="text-indigo-400" />
                Communication Analytics
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', background: '#1f1f2e', color: '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.2)' }}
                      cursor={{ fill: '#334155' }}
                    />
                    <Bar dataKey="count" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1f1f2e]/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-lg h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-extrabold text-white drop-shadow">Fresh Notices</h3>
                <Link to="/notifications" className="text-cyan-400 text-xs font-black uppercase tracking-widest hover:underline">View All</Link>
              </div>
              <div className="space-y-6">
                {recentNotifs.length > 0 ? recentNotifs.map((n) => (
                  <div key={n.id} className="group border-b border-slate-700 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                        n.priority === Priority.HIGH ? 'bg-rose-900 text-rose-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {n.priority}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-black text-white group-hover:text-cyan-400 transition-colors line-clamp-1 leading-tight drop-shadow">{n.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{n.content}</p>
                  </div>
                )) : (
                  <div className="text-center py-20 flex flex-col items-center gap-2">
                    <Bell className="text-slate-700" size={40} />
                    <p className="text-slate-500 text-xs font-bold italic">No active notices</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Welcome, {user.name.split(' ')[0]}</h1>
//           <p className="text-slate-500 font-medium">Monitoring {user.department} communications.</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="text-xs font-black px-4 py-2 bg-indigo-600 text-white rounded-full uppercase tracking-widest shadow-lg shadow-indigo-100">
//             {user.isPrincipal ? 'Principal' : user.role}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         {getStats().map((stat, i) => (
//           <div key={i} className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-start gap-4 hover:border-indigo-100 transition-colors">
//             <div className={`p-3 rounded-2xl ${stat.color}`}>
//               {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 24 })}
//             </div>
//             <div>
//               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{stat.label}</p>
//               <p className="text-2xl md:text-3xl font-black text-slate-800">{stat.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
//         <div className="lg:col-span-2 space-y-4">
//           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
//             <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-2">
//               <Activity size={20} className="text-indigo-600" />
//               Communication Analytics
//             </h3>
//             <div className="h-64 w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
//                   <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
//                   <Tooltip 
//                     contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
//                     cursor={{ fill: '#f8fafc' }}
//                   />
//                   <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={32} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
//             <div className="flex items-center justify-between mb-8">
//               <h3 className="text-lg font-black text-slate-800">Fresh Notices</h3>
//               <Link to="/notifications" className="text-indigo-600 text-xs font-black uppercase tracking-widest hover:underline">View All</Link>
//             </div>
//             <div className="space-y-6">
//               {recentNotifs.length > 0 ? recentNotifs.map((n) => (
//                 <div key={n.id} className="group border-b border-slate-50 last:border-0 pb-6 last:pb-0">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
//                       n.priority === Priority.HIGH ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
//                     }`}>
//                       {n.priority}
//                     </span>
//                     <span className="text-[10px] font-bold text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</span>
//                   </div>
//                   <h4 className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1 leading-tight">{n.title}</h4>
//                   <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">{n.content}</p>
//                 </div>
//               )) : (
//                 <div className="text-center py-20 flex flex-col items-center gap-2">
//                   <Bell className="text-slate-200" size={40} />
//                   <p className="text-slate-400 text-xs font-bold italic">No active notices</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;