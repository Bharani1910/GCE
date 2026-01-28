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
  const acks = NotificationService.getAcknowledgments().filter(a => a.userId === user?.id);

  const getStats = () => {
    if (user?.role === UserRole.STUDENT) {
      const urgent = notifications.filter(n => n.priority === Priority.HIGH).length;
      const unread = notifications.length - acks.length;
      const acknowledged = acks.filter(a => a.status === 'ACKNOWLEDGED').length;
      return [
        { label: 'Total Alerts', value: notifications.length, icon: <Bell className="text-indigo-600" />, color: 'bg-indigo-50' },
        { label: 'Unread', value: Math.max(0, unread), icon: <Clock className="text-amber-600" />, color: 'bg-amber-50' },
        { label: 'Acknowledged', value: acknowledged, icon: <CheckCircle className="text-emerald-600" />, color: 'bg-emerald-50' },
        { label: 'Urgent', value: urgent, icon: <AlertTriangle className="text-rose-600" />, color: 'bg-rose-50' },
      ];
    } else {
      const sentCount = NotificationService.getNotifications().filter(n => n.senderId === user?.id).length;
      const totalNotifs = NotificationService.getNotifications().length;
      return [
        { label: 'Notices Sent', value: sentCount, icon: <Send className="text-indigo-600" />, color: 'bg-indigo-50' },
        { label: 'Total Campus Notices', value: totalNotifs, icon: <Activity className="text-blue-600" />, color: 'bg-blue-50' },
        { label: 'Users Active', value: 1420, icon: <Users className="text-emerald-600" />, color: 'bg-emerald-50' },
        { label: 'High Priority', value: notifications.filter(n => n.priority === Priority.HIGH).length, icon: <AlertTriangle className="text-rose-600" />, color: 'bg-rose-50' },
      ];
    }
  };

  const chartData = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 19 },
    { name: 'Wed', count: 32 },
    { name: 'Thu', count: 25 },
    { name: 'Fri', count: 18 },
    { name: 'Sat', count: 5 },
    { name: 'Sun', count: 2 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Welcome, {user.name.split(' ')[0]}</h1>
          <p className="text-slate-500 font-medium">Monitoring {user.department} communications.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-black px-4 py-2 bg-indigo-600 text-white rounded-full uppercase tracking-widest shadow-lg shadow-indigo-100">
            {user.isPrincipal ? 'Principal' : user.role}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {getStats().map((stat, i) => (
          <div key={i} className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-start gap-4 hover:border-indigo-100 transition-colors">
            <div className={`p-3 rounded-2xl ${stat.color}`}>
              {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 24 })}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-black text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
            <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-2">
              <Activity size={20} className="text-indigo-600" />
              Communication Analytics
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-800">Fresh Notices</h3>
              <Link to="/notifications" className="text-indigo-600 text-xs font-black uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="space-y-6">
              {recentNotifs.length > 0 ? recentNotifs.map((n) => (
                <div key={n.id} className="group border-b border-slate-50 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                      n.priority === Priority.HIGH ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {n.priority}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1 leading-tight">{n.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">{n.content}</p>
                </div>
              )) : (
                <div className="text-center py-20 flex flex-col items-center gap-2">
                  <Bell className="text-slate-200" size={40} />
                  <p className="text-slate-400 text-xs font-bold italic">No active notices</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;