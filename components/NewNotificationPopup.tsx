import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, X } from 'lucide-react';

interface NewNotificationPopupProps {
    count: number;
    onDismiss: () => void;
    onViewNotifications: () => void;
}

const NewNotificationPopup: React.FC<NewNotificationPopupProps> = ({
    count,
    onDismiss,
    onViewNotifications
}) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 relative">
                    <button
                        onClick={onDismiss}
                        className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={20} className="text-white" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                            <Bell size={28} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">New Notifications</h3>
                            <p className="text-indigo-100 text-sm">You have updates waiting</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                            <span className="text-3xl font-bold text-indigo-600">{count}</span>
                        </div>
                        <p className="text-lg text-slate-700">
                            You have <span className="font-bold text-indigo-600">{count}</span> new notification{count !== 1 ? 's' : ''} since your last login.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onDismiss}
                            className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
                        >
                            Dismiss
                        </button>
                        <button
                            onClick={onViewNotifications}
                            className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
                        >
                            View Notifications
                        </button>
                    </div>

                    <p className="text-xs text-center text-slate-400">
                        This popup will not appear again until your next login
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewNotificationPopup;
