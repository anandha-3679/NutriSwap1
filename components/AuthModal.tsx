
import React from 'react';

interface AuthProps {
  onComplete: () => void;
}

const AuthModal: React.FC<AuthProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-sm w-full space-y-8 animate-slide-up">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-slate-100">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Identity Access</h1>
            <p className="text-slate-400 text-sm font-medium">Link your performance cloud.</p>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={onComplete}
            className="w-full flex items-center justify-center gap-3 py-4 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
            <span className="text-sm font-bold text-slate-900">Continue with Google</span>
          </button>
          
          <button 
            onClick={onComplete}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Sign in with Email
          </button>

          <div className="text-center">
             <button onClick={onComplete} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900">
               Enter as Guest Protocol
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
