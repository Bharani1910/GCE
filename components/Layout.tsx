import React, { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { NAV_ITEMS } from '../constants';
import { LogOut, Bell, Menu, X, PlusCircle } from 'lucide-react';
import { UserRole } from '../types';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const canCreateNotification = user?.role !== UserRole.STUDENT;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pb-20 md:pb-0">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-xs">GE</div>
          <span className="font-bold text-slate-800">GCE Erode</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-800 p-2">
            {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] bg-slate-900 text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 md:flex-shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="hidden md:flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">GE</div>
            <div>
              <h1 className="font-bold text-lg leading-tight">GCE Erode</h1>
              <p className="text-xs text-slate-400">Digital Framework</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === `/${item.id}`;
              return (
                <Link
                  key={item.id}
                  to={`/${item.id}`}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                    ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                  `}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            {canCreateNotification && (
              <Link
                to="/create-notification"
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                  ${location.pathname === '/create-notification' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <PlusCircle size={20} />
                <span className="font-medium">Post Notice</span>
              </Link>
            )}
          </nav>

          <div className="pt-6 mt-6 border-t border-slate-800">
            <div className="flex items-center gap-3 px-4 py-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-indigo-900 font-bold border-2 border-slate-800">
                {user?.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 px-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === `/${item.id}`;
          return (
            <Link key={item.id} to={`/${item.id}`} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
        {canCreateNotification && (
          <Link to="/create-notification" className={`flex flex-col items-center gap-1 p-2 transition-all ${location.pathname === '/create-notification' ? 'text-indigo-600' : 'text-slate-400'}`}>
            <PlusCircle size={20} />
            <span className="text-[10px] font-bold">Post</span>
          </Link>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="hidden md:flex bg-white border-b px-8 py-4 items-center justify-between shadow-sm sticky top-0 z-40">
          <div>
            <h2 className="text-xl font-bold text-slate-800 capitalize leading-tight">
              {location.pathname.replace('/', '').replace('-', ' ') || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{user?.department}</p>
              <p className="text-sm font-medium text-slate-600">{user?.role}</p>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <button className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;