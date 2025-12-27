
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onAuthComplete: (profile: Partial<UserProfile>) => void;
  onNotify: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAuthComplete, onNotify }) => {
  const [method, setMethod] = useState<'CHOICE' | 'EMAIL' | 'PHONE'>('CHOICE');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const storedData = localStorage.getItem(`nutriswap_cloud_${email}`);
      if (storedData && !isRegistering) {
        const { profile } = JSON.parse(storedData);
        if (profile.password === password) {
          onAuthComplete({ ...profile, isAuthenticated: true, provider: 'email' });
          onNotify(`Welcome back, ${profile.name}!`, 'success');
        } else {
          onNotify("Incorrect password for this email.", "error");
        }
      } else {
        onAuthComplete({ email, password, isAuthenticated: true, provider: 'email' });
        onNotify("Account created successfully!", 'success');
      }
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleSocialAuth = (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setTimeout(() => {
      onAuthComplete({ 
        name: provider === 'google' ? 'Google Explorer' : 'Facebook Explorer',
        isAuthenticated: true, 
        provider,
        avatarUrl: provider === 'google' ? '🍎' : '🥗' 
      });
      onNotify(`Logged in via ${provider.charAt(0).toUpperCase() + provider.slice(1)}`, 'success');
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const renderChoice = () => (
    <div className="space-y-6 animate-in fade-in zoom-in-95">
      <div className="text-center space-y-2">
        <h3 className="text-3xl font-black text-slate-900">Secure Your Lab</h3>
        <p className="text-slate-500 font-medium">Choose your preferred login method to sync your data.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button onClick={() => setMethod('EMAIL')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          Email & Password
        </button>
        <button onClick={() => setMethod('PHONE')} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all active:scale-95">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          Phone Number
        </button>
      </div>

      <div className="flex items-center gap-4 py-2">
        <div className="h-px bg-slate-100 flex-1"></div>
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Or Social Login</span>
        <div className="h-px bg-slate-100 flex-1"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => handleSocialAuth('google')} className="py-4 border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95">
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="G" /> Google
        </button>
        <button onClick={() => handleSocialAuth('facebook')} className="py-4 border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95">
          <img src="https://www.svgrepo.com/show/512120/facebook-176.svg" className="w-4 h-4" alt="F" /> Facebook
        </button>
      </div>
    </div>
  );

  const renderEmailForm = () => (
    <form onSubmit={handleEmailAuth} className="space-y-6 animate-in slide-in-from-right-10">
      <div className="text-center space-y-2">
        <h3 className="text-3xl font-black text-slate-900">{isRegistering ? 'Create Account' : 'Welcome Back'}</h3>
        <p className="text-slate-500 font-medium">{isRegistering ? 'Enter your details to start syncing.' : 'Log in to restore your pantry.'}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 transition-all font-bold"
            placeholder="name@email.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 transition-all font-bold"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : isRegistering ? 'Register Now' : 'Log In'}
      </button>

      <div className="text-center">
        <button 
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
        >
          {isRegistering ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
        </button>
      </div>

      <button type="button" onClick={() => setMethod('CHOICE')} className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600">← Back to Options</button>
    </form>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl animate-in fade-in">
      <div className="bg-white rounded-[3rem] p-10 md:p-14 max-w-lg w-full shadow-[0_32px_120px_rgba(0,0,0,0.2)] relative">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        
        {method === 'CHOICE' && renderChoice()}
        {method === 'EMAIL' && renderEmailForm()}
        {method === 'PHONE' && (
           <div className="text-center space-y-6 animate-in slide-in-from-right-10">
             <h3 className="text-2xl font-black text-slate-900">Phone Verification</h3>
             <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-600 font-bold" />
             <button onClick={() => { onAuthComplete({ isAuthenticated: true, provider: 'phone' }); onClose(); }} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest">Send SMS Code</button>
             <button onClick={() => setMethod('CHOICE')} className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600">← Back</button>
           </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
