import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { NotificationService } from '../services/NotificationService';
import { UserRole, NotificationCategory, Priority, Department, Frequency } from '../types';
import { useNavigate } from 'react-router-dom';
import { Send, AlertCircle, Info, FileText } from 'lucide-react';

const NotificationComposer: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: NotificationCategory.ADMINISTRATIVE,
    priority: Priority.MEDIUM,
    frequency: Frequency.ONE_TIME,
    targetDepartments: [] as Department[],
    targetYears: [] as number[],
    requiresAcknowledgment: false,
    expiryDays: 7
  });

  const getAvailableCategories = () => {
    switch (user?.role) {
      case UserRole.FACULTY:
        return [NotificationCategory.ACADEMIC, NotificationCategory.EVENTS];
      case UserRole.OFFICE_STAFF:
        return [NotificationCategory.ADMINISTRATIVE, NotificationCategory.EVENTS, NotificationCategory.EMERGENCY];
      case UserRole.PLACEMENT_CELL:
        return [NotificationCategory.PLACEMENT, NotificationCategory.EVENTS];
      case UserRole.HOD:
        return [NotificationCategory.ACADEMIC, NotificationCategory.ADMINISTRATIVE, NotificationCategory.EVENTS];
      case UserRole.ADMINISTRATION:
        return Object.values(NotificationCategory);
      default:
        return [];
    }
  };

  const academicDepts = Object.values(Department).filter(d => 
    ![Department.ADMIN, Department.SUPER_ADMIN, Department.GENERAL].includes(d)
  );

  const toggleSelectAllDepts = () => {
    if (formData.targetDepartments.length === academicDepts.length) {
      setFormData({...formData, targetDepartments: []});
    } else {
      setFormData({...formData, targetDepartments: [...academicDepts]});
    }
  };

  const toggleSelectAllYears = () => {
    if (formData.targetYears.length === 4) {
      setFormData({...formData, targetYears: []});
    } else {
      setFormData({...formData, targetYears: [1, 2, 3, 4]});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      NotificationService.createNotification({
        senderId: user!.id,
        senderName: user!.name,
        senderRole: user!.role,
        senderDepartment: user!.department,
        title: formData.title,
        content: formData.content,
        category: formData.category,
        priority: formData.priority,
        frequency: formData.frequency,
        targetDepartments: formData.targetDepartments,
        targetYears: formData.targetYears,
        requiresAcknowledgment: formData.requiresAcknowledgment,
        expiresAt: Date.now() + (formData.expiryDays * 24 * 60 * 60 * 1000)
      });
      navigate('/notifications');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><FileText size={24}/></div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Compose Notice</h2>
            <p className="text-slate-500 text-sm">Create and broadcast institutional messages.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {error && (
            <div className="p-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl flex items-center gap-3"><AlertCircle size={20}/><p className="text-sm font-medium">{error}</p></div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Notice Title</label>
                <input type="text" placeholder="E.g., Semester Exam Schedule" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Category & Frequency</label>
                <div className="grid grid-cols-2 gap-3">
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value as NotificationCategory})}>
                    {getAvailableCategories().map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white" value={formData.frequency} onChange={(e) => setFormData({...formData, frequency: e.target.value as Frequency})}>
                    {Object.values(Frequency).map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Priority</label>
                <div className="flex gap-2">
                  {Object.values(Priority).map(p => (
                    <button key={p} type="button" onClick={() => setFormData({...formData, priority: p})} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${formData.priority === p ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-500 border-slate-200'}`}>{p}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Target Depts</label>
                  <button type="button" onClick={toggleSelectAllDepts} className="text-[10px] font-bold text-indigo-600 hover:underline">
                    {formData.targetDepartments.length === academicDepts.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                  {academicDepts.map(dept => (
                    <button key={dept} type="button" onClick={() => setFormData({...formData, targetDepartments: formData.targetDepartments.includes(dept) ? formData.targetDepartments.filter(d => d !== dept) : [...formData.targetDepartments, dept]})} className={`text-left px-3 py-2 rounded-lg text-[10px] font-bold border transition-all ${formData.targetDepartments.includes(dept) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white text-slate-500 border-slate-200'}`}>
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Target Years</label>
                  <button type="button" onClick={toggleSelectAllYears} className="text-[10px] font-bold text-indigo-600 hover:underline">
                    {formData.targetYears.length === 4 ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(y => (
                    <button key={y} type="button" onClick={() => setFormData({...formData, targetYears: formData.targetYears.includes(y) ? formData.targetYears.filter(year => year !== y) : [...formData.targetYears, y]})} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${formData.targetYears.includes(y) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white text-slate-500 border-slate-200'}`}>Yr {y}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Message Content</label>
            <textarea rows={5} placeholder="Message body..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />
          </div>

          <div className="p-4 bg-indigo-50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="ack-req" className="w-5 h-5 rounded text-indigo-600" checked={formData.requiresAcknowledgment} onChange={(e) => setFormData({...formData, requiresAcknowledgment: e.target.checked})} />
              <label htmlFor="ack-req" className="text-sm font-bold text-indigo-900 cursor-pointer flex items-center gap-1">Require Mandatory Acknowledgment</label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button type="button" onClick={() => navigate('/notifications')} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all">Cancel</button>
            <button type="submit" disabled={loading} className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-50 transition-all">{loading ? 'Posting...' : 'Post Notice'}<Send size={18}/></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationComposer;