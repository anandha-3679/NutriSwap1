
import React, { useEffect } from 'react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const styles = {
    success: 'bg-emerald-600 border-emerald-400',
    error: 'bg-rose-600 border-rose-400',
    info: 'bg-slate-900 border-slate-700',
    xp: 'bg-gradient-to-r from-amber-500 to-orange-600 border-amber-300'
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    xp: '✨'
  };

  return (
    <div 
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl border shadow-2xl text-white transform transition-all duration-300 animate-in slide-in-from-right-10 fade-in ${styles[toast.type]}`}
      style={{ minWidth: '300px' }}
    >
      <span className="text-xl font-black">{icons[toast.type]}</span>
      <p className="flex-1 font-bold text-sm">{toast.message}</p>
      <button onClick={() => onRemove(toast.id)} className="opacity-50 hover:opacity-100 transition-opacity">✕</button>
    </div>
  );
};

export default Toast;
