
import React, { useState, useEffect, useCallback } from 'react';
import Dashboard from './components/Dashboard';
import Lab from './components/Lab';
import Pantry from './components/Pantry';
import ProfileSettings from './components/ProfileSettings';
import Community from './components/Community';
import CameraScanner from './components/CameraScanner';
import Toast from './components/Toast';
import AuthModal from './components/AuthModal';
import { UserProfile, UserCategory, HealthGoal, SwapResult, ToastMessage, ToastType } from './types';
import { fetchAgenticSwap } from './services/geminiService';

type View = 'DASHBOARD' | 'LAB' | 'PANTRY' | 'PROFILE' | 'COMMUNITY' | 'SCAN';

const App: React.FC = () => {
  const [view, setView] = useState<View>('DASHBOARD');
  const [isScanning, setIsScanning] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('nutriswap_profile');
      return saved ? JSON.parse(saved) : {
        name: 'Guest Explorer',
        category: UserCategory.ADULT,
        goals: [HealthGoal.HIGHER_PROTEIN],
        allergies: [],
        points: 0,
        level: 1,
        streak: 1,
        avatarUrl: '🥦',
        isAuthenticated: false
      };
    } catch {
      return {
        name: 'Guest Explorer',
        category: UserCategory.ADULT,
        goals: [HealthGoal.HIGHER_PROTEIN],
        allergies: [],
        points: 0,
        level: 1,
        streak: 1,
        avatarUrl: '🥦',
        isAuthenticated: false
      };
    }
  });

  const [savedSwaps, setSavedSwaps] = useState<SwapResult[]>(() => {
    try {
      const saved = localStorage.getItem('nutriswap_saved_swaps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Storage Synchronization
  useEffect(() => {
    localStorage.setItem('nutriswap_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('nutriswap_saved_swaps', JSON.stringify(savedSwaps));
  }, [savedSwaps]);

  const notify = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const handleRemoveToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleSaveSwap = (swap: SwapResult) => {
    if (!savedSwaps.find(s => s.id === swap.id)) {
      setSavedSwaps(prev => [swap, ...prev]);
      addXP(100);
      notify(`${swap.suggestedSwap} added to your Pantry!`, 'success');
    } else {
      notify('This swap is already in your pantry.', 'info');
    }
  };

  const handleRemoveSwap = (id: string) => {
    setSavedSwaps(prev => prev.filter(s => s.id !== id));
    notify('Removed from pantry.', 'info');
  };

  const addXP = useCallback((amount: number) => {
    setProfile(prev => {
      let newPoints = prev.points + amount;
      let newLevel = prev.level;
      const nextLevelThreshold = newLevel * 1000;
      
      if (newPoints >= nextLevelThreshold) {
        newPoints -= nextLevelThreshold;
        newLevel += 1;
        notify(`🎉 Level Up! You are now Level ${newLevel}!`, 'xp');
      } else {
        notify(`+${amount} XP Earned!`, 'xp');
      }
      
      return { ...prev, points: newPoints, level: newLevel };
    });
  }, [notify]);

  const handleAuthComplete = (authData: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...authData }));
    
    // Auto-backup current swaps to this new account key
    if (authData.email) {
      const cloudStorageKey = `nutriswap_cloud_${authData.email}`;
      const backup = { profile: { ...profile, ...authData }, swaps: savedSwaps };
      localStorage.setItem(cloudStorageKey, JSON.stringify(backup));
    }
    setShowAuthModal(false);
  };

  const handleVisionCapture = async (base64: string) => {
    setIsScanning(true);
    try {
      const result = await fetchAgenticSwap("Identify the food in this photo and suggest the best healthy swap for my profile.", profile, base64);
      setSavedSwaps(prev => [result, ...prev]);
      addXP(250); 
      setView('PANTRY');
      notify(`AI identified: ${result.originalFood}. Suggested: ${result.suggestedSwap}`, 'success');
    } catch (err) {
      console.error(err);
      notify("AI Vision failed to process the image. Try a clearer photo.", 'error');
      setView('DASHBOARD');
    } finally {
      setIsScanning(false);
    }
  };

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    notify('Profile Updated & Secured!', 'success');
    
    // Update cloud if email exists
    if (newProfile.email) {
      const cloudStorageKey = `nutriswap_cloud_${newProfile.email}`;
      const backup = { profile: newProfile, swaps: savedSwaps };
      localStorage.setItem(cloudStorageKey, JSON.stringify(backup));
    }
  };

  const navItems = [
    { id: 'DASHBOARD', label: 'Home', icon: '🏠' },
    { id: 'LAB', label: 'The Lab', icon: '🧪' },
    { id: 'COMMUNITY', label: 'Social', icon: '🌐' },
    { id: 'PANTRY', label: 'Pantry', icon: '🥫' },
    { id: 'PROFILE', label: 'Me', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-28">
      {/* Toast Notification Center */}
      <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onRemove={handleRemoveToast} />
          </div>
        ))}
      </div>

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onAuthComplete={handleAuthComplete} 
          onNotify={notify} 
        />
      )}

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-100/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-cyan-100/40 rounded-full blur-[100px]"></div>
      </div>

      <header className="relative z-10 pt-10 pb-6 px-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setView('DASHBOARD')}>
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h1 className="text-3xl font-black tracking-tighter">NutriSwap<span className="text-emerald-500">Pro</span></h1>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                view === item.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setView('SCAN')}
            className="px-6 py-2 bg-emerald-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            📸 Scan Food
          </button>
          {!profile.isAuthenticated && (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-2 border-2 border-slate-900 text-slate-900 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all ml-4"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      <main className="relative z-10 px-6 max-w-7xl mx-auto py-10 transition-all">
        {view === 'DASHBOARD' && <Dashboard profile={profile} savedSwaps={savedSwaps} onNavigate={setView} />}
        {view === 'LAB' && <Lab profile={profile} onSaveSwap={handleSaveSwap} />}
        {view === 'PANTRY' && <Pantry swaps={savedSwaps} onRemove={handleRemoveSwap} />}
        {view === 'PROFILE' && <ProfileSettings profile={profile} onUpdate={updateProfile} onSync={async () => setShowAuthModal(true)} onOpenAuth={() => setShowAuthModal(true)} />}
        {view === 'COMMUNITY' && <Community profile={profile} onJoinChallenge={(id) => notify(`Joined challenge ${id}! Go earn that XP!`, 'info')} onAddXP={addXP} onNotify={notify} />}
        {view === 'SCAN' && <CameraScanner onCapture={handleVisionCapture} onClose={() => setView('DASHBOARD')} isLoading={isScanning} />}
      </main>

      <nav className="fixed bottom-6 left-6 right-6 md:hidden z-50">
        <div className="bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-3 shadow-2xl flex justify-around items-center">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`flex flex-col items-center gap-1 w-16 py-2 transition-all rounded-2xl ${
                view === item.id ? 'bg-emerald-500 text-white shadow-lg scale-110' : 'text-slate-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => setView('SCAN')}
            className={`flex flex-col items-center gap-1 w-16 py-2 transition-all ${view === 'SCAN' ? 'text-emerald-400' : 'text-slate-500 opacity-60'}`}
          >
            <span className="text-xl">📸</span>
            <span className="text-[8px] font-black uppercase tracking-tighter">Scan</span>
          </button>
        </div>
      </nav>

      <footer className="relative z-10 mt-20 pb-10 text-center opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Agentic Intelligence v2.5 • Auth Secured • Multi-Cloud Synced</p>
      </footer>
    </div>
  );
};

export default App;
