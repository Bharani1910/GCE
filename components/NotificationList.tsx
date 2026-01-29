
import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import { NotificationService } from '../services/NotificationService';
import { Notification, NotificationCategory, Priority, UserRole } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { Search, CheckCircle2, Eye, Calendar, User as UserIcon, Bell, XCircle, Users } from 'lucide-react';
import { MASTER_USERS } from '../services/MasterData';

const NotificationList: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<NotificationCategory | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [acks, setAcks] = useState<any[]>([]);
  const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null);

  useEffect(() => {
    const list = NotificationService.getFilteredNotifications(user);
    setNotifications(list);
    setAcks(NotificationService.getAcknowledgments().filter(a => a.userId === user?.id));

    // Mark all unread notifications as read when page opens
    markAllAsRead(list);
  }, [user]);

  const markAllAsRead = async (notifList: Notification[]) => {
    if (!user?.id) return;

    const unreadIds = notifList
      .filter(n => {
        const userAck = acks.find(a => a.notificationId === n.id);
        return !userAck && n.senderId !== user.id;
      })
      .map(n => n.id);

    if (unreadIds.length === 0) return;

    try {
      const response = await fetch('http://localhost:5005/api/notifications/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, notificationIds: unreadIds })
      });

      if (response.ok) {
        console.log('Marked notifications as read');
        // Also mark locally
        unreadIds.forEach(id => {
          NotificationService.acknowledge(id, user.id, 'VIEWED');
        });
        setAcks([...NotificationService.getAcknowledgments().filter(a => a.userId === user?.id)]);
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleAcknowledge = (id: string) => {
    NotificationService.acknowledge(id, user!.id, 'ACKNOWLEDGED');
    setAcks([...NotificationService.getAcknowledgments().filter(a => a.userId === user?.id)]);
  };

  const markAsViewed = (id: string) => {
    NotificationService.acknowledge(id, user!.id, 'VIEWED');
    setAcks([...NotificationService.getAcknowledgments().filter(a => a.userId === user?.id)]);
  };

  const filtered = notifications.filter(n => {
    const catMatch = filter === 'ALL' || n.category === filter;
    const s = search.toLowerCase();
    const searchMatch =
      n.title.toLowerCase().includes(s) ||
      n.content.toLowerCase().includes(s) ||
      n.senderName.toLowerCase().includes(s) ||
      new Date(n.createdAt).toLocaleDateString().includes(s);
    return catMatch && searchMatch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search notifications..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto scrollbar-hide">
          {['ALL', ...Object.values(NotificationCategory)].map((cat) => (
            <button key={cat} onClick={() => setFilter(cat as any)} className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${filter === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200'}`}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.length > 0 ? filtered.map((notif) => {
          const userAck = acks.find(a => a.notificationId === notif.id);
          const isAcked = userAck?.status === 'ACKNOWLEDGED';
          const isViewed = !!userAck;
          const isOwn = notif.senderId === user?.id;
          const stats = NotificationService.getNotificationStats(notif.id);

          return (
            <div key={notif.id} className={`bg-white rounded-2xl border transition-all ${!isViewed && !isOwn && !user?.isPrincipal ? 'ring-2 ring-indigo-500 border-transparent shadow-lg' : 'border-slate-200 hover:border-indigo-200'}`}>
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${CATEGORY_COLORS[notif.category]}`}>{notif.category}</span>
                      {notif.priority === Priority.HIGH && <span className="bg-rose-500 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider animate-pulse">Critical</span>}
                      {!isViewed && !isOwn && <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => { setSelectedNotif(notif); if (!isViewed && !isOwn) markAsViewed(notif.id); }}>{notif.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1"><UserIcon size={14} /> {notif.senderName}</span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(notif.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-56 flex flex-col justify-center">
                    {isOwn ? (
                      <button onClick={() => setSelectedNotif(notif)} className="w-full py-3 bg-slate-50 text-indigo-700 border border-indigo-100 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all">
                        <Users size={18} /> Tracking ({stats.viewed} Viewed)
                      </button>
                    ) : (
                      notif.requiresAcknowledgment ? (
                        <button onClick={() => handleAcknowledge(notif.id)} disabled={isAcked} className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${isAcked ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md active:scale-95'}`}>
                          {isAcked ? <CheckCircle2 size={18} /> : null}
                          {isAcked ? 'Acknowledged' : 'Acknowledge Notice'}
                        </button>
                      ) : (
                        <div className="text-center py-2 px-3 rounded-xl border border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">Information Notification</div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-20 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400"><Bell size={32} /></div>
            <h3 className="text-lg font-bold text-slate-900">Framework empty</h3>
            <p className="text-slate-500">Official updates from GCE Erode will appear here.</p>
          </div>
        )}
      </div>

      {selectedNotif && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b flex justify-between items-start bg-slate-50">
              <div className="space-y-1">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${CATEGORY_COLORS[selectedNotif.category]}`}>{selectedNotif.category}</span>
                <h2 className="text-2xl font-bold text-slate-900">{selectedNotif.title}</h2>
              </div>
              <button onClick={() => setSelectedNotif(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><XCircle size={24} className="text-slate-400" /></button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 space-y-6">
              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">{selectedNotif.senderName.charAt(0)}</div>
                <div>
                  <p className="font-bold text-indigo-900">{selectedNotif.senderName}</p>
                  <p className="text-xs font-bold text-indigo-500 uppercase">{selectedNotif.senderRole} • {selectedNotif.senderDepartment}</p>
                </div>
              </div>
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-lg">{selectedNotif.content}</p>

              {selectedNotif.senderId === user?.id && (
                <div className="pt-6 border-t space-y-4">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2"><Eye size={18} /> Delivery Tracking Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Viewed</p>
                      <p className="text-xl font-bold text-indigo-600">{NotificationService.getNotificationStats(selectedNotif.id).viewed}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Acknowledged</p>
                      <p className="text-xl font-bold text-emerald-600">{NotificationService.getNotificationStats(selectedNotif.id).acknowledged}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active User Engagement</p>
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {NotificationService.getNotificationStats(selectedNotif.id).list.map((ack, i) => {
                        const master = MASTER_USERS.find(mu => mu.email === ack.userId);
                        const identity = master?.role === UserRole.STUDENT ? master.rollNumber : master?.name;
                        return (
                          <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs font-bold border border-slate-100">
                            <span className="text-slate-700">{identity || ack.userId}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] uppercase ${ack.status === 'ACKNOWLEDGED' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>{ack.status}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
