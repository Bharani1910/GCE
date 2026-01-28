
import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { UserRole, NotificationCategory, Department } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Download, FileSpreadsheet, FileText, AlertCircle, Info, Send } from 'lucide-react';
import { NotificationService } from '../services/NotificationService';

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [exporting, setExporting] = useState<string | null>(null);

  // Role Visibility Filter
  const hasFullAccess = user?.isPrincipal || user?.role === UserRole.ADMINISTRATION;
  const isPlacement = user?.role === UserRole.PLACEMENT_CELL;
  const isHod = user?.role === UserRole.HOD;
  const isStaff = user?.role === UserRole.FACULTY || user?.role === UserRole.OFFICE_STAFF;

  if (user?.role === UserRole.STUDENT) {
    return (
      <div className="p-12 text-center space-y-4 max-w-lg mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm animate-in zoom-in duration-300">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300 mb-2"><Info size={32}/></div>
        <h3 className="text-xl font-bold text-slate-800">Analytics Restricted</h3>
        <p className="text-slate-500 font-medium leading-relaxed">Engagement reports are restricted to staff and administration. Please contact your HoD for department statistics.</p>
      </div>
    );
  }

  const handleExport = (type: 'EXCEL' | 'PDF') => {
    setExporting(type);
    setTimeout(() => {
      const data = `Report Type: Campus Engagement\nGenerated: ${new Date().toLocaleString()}\nRole: ${user?.role}\nDept: ${user?.department}\nStatus: Simulation Complete`;
      const blob = new Blob([data], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `GCE_Analytics_Report_${type.toLowerCase()}_${Date.now()}.${type === 'EXCEL' ? 'csv' : 'pdf'}`;
      a.click();
      setExporting(null);
    }, 1500);
  };

  const engagementData = [
    { name: 'Acknowledged', value: 720 },
    { name: 'Viewed only', value: 450 },
    { name: 'Pending', value: 250 },
  ];

  const deptParticipation = [
    { name: 'CSE', score: 88 },
    { name: 'ECE', score: 75 },
    { name: 'EEE', score: 92 },
    { name: 'IT', score: 95 },
    { name: 'AUTO', score: 55 },
    { name: 'MECH', score: 64 },
    { name: 'CIVIL', score: 70 },
  ];

  const COLORS = ['#10b981', '#6366f1', '#f43f5e'];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Engagement Intelligence</h2>
          <p className="text-slate-500 font-medium">{hasFullAccess ? "Institution-wide statistics and monitoring." : isHod ? `Departmental analytics for ${user?.department}.` : "Engagement tracking for your notices."}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleExport('EXCEL')} disabled={!!exporting} className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all active:scale-95 disabled:opacity-50">
            <FileSpreadsheet size={16} className="text-emerald-600" />
            {exporting === 'EXCEL' ? 'Exporting...' : 'Export CSV'}
          </button>
          <button onClick={() => handleExport('PDF')} disabled={!!exporting} className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all active:scale-95 disabled:opacity-50">
            <FileText size={16} className="text-rose-600" />
            {exporting === 'PDF' ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
      </div>

      {(hasFullAccess || isHod || isPlacement) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">Acknowledgment Distribution</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={engagementData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {engagementData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">Departmental Response Rates</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptParticipation} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="score" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={24}>
                    {deptParticipation.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.score > 80 ? '#10b981' : entry.score > 60 ? '#6366f1' : '#f43f5e'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Send size={20} className="text-indigo-600"/> Notice Performance Tracking</h3>
        <div className="overflow-x-auto -mx-8">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-y border-slate-100">
              <tr>
                <th className="px-8 py-4 text-left">Notice Detail</th>
                <th className="px-8 py-4 text-left">Author</th>
                <th className="px-8 py-4 text-center">Engagement</th>
                <th className="px-8 py-4 text-center">Target Group</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { type: 'Exam Schedule', sender: 'Office Staff', target: 'ALL Depts', rate: '98%', status: 'Active' },
                { type: 'Placement Drive', sender: 'Placement Cell', target: 'Final Years', rate: '85%', status: 'Active' },
                { type: 'HoD Meeting', sender: 'Principal', target: 'HoDs', rate: '100%', status: 'Complete' },
                { type: 'Workshop Invite', sender: 'Faculty (CSE)', target: 'CSE Students', rate: '42%', status: 'Active' },
              ].filter(row => hasFullAccess || (isStaff && row.sender.includes(user?.role)) || (isHod && row.target.includes(user?.department?.split(' ')[0] || ''))).map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-bold text-slate-800 leading-tight">{row.type}</p>
                    <p className="text-[10px] font-bold text-indigo-500 uppercase mt-1">GCE-24-0{i+1}</p>
                  </td>
                  <td className="px-8 py-5 font-medium text-slate-600">{row.sender}</td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${parseInt(row.rate) > 90 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{row.rate}</span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{width: row.rate}}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center text-slate-500 font-bold text-[10px] uppercase tracking-wider">{row.target}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-tighter ${row.status === 'Active' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Empty state simulation */}
          {(!hasFullAccess && !isHod && !isStaff && !isPlacement) && (
            <div className="py-20 text-center text-slate-400 font-bold italic uppercase tracking-widest text-[10px]">No notification data to monitor</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
