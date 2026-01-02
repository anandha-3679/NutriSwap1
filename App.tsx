
import React, { useState, useEffect, useCallback } from 'react';
import Welcome from './components/Welcome';
import Onboarding from './components/Onboarding';
import ProfileSetup from './components/ProfileSetup';
import Pantry from './components/Pantry';
import Lab from './components/Lab';
import Challenges from './components/Challenges';
import Leaderboard from './components/Leaderboard';
import ProfileSettings from './components/ProfileSettings';
import CameraScanner from './components/CameraScanner';
import Toast from './components/Toast';
import { UserProfile, UserCategory, HealthGoal, SwapResult, ToastMessage, ToastType } from './types';
import { fetchAgenticSwap } from './services/geminiService';

type Flow = 'WELCOME' | 'ONBOARDING' | 'SETUP' | 'MAIN';
type Tab = 'PANTRY' | 'LAB' | 'CHALLENGES' | 'LEADERBOARD' | 'ME' | 'SCAN';

const App: React.FC = () => {
  const [flow, setFlow] = useState<Flow>(() => {
    const saved = localStorage.getItem('chia_profile');
    if (!saved) return 'WELCOME';
    const profile = JSON.parse(saved);
    return profile.isNewUser ? 'WELCOME' : 'MAIN';
  });
  
  const [activeTab, setActiveTab] = useState<Tab>('PANTRY');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('chia_profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      age: 25,
      gender: 'Other',
      avatar: '🥑',
      category: UserCategory.ADULT,
      goals: [HealthGoal.HIGHER_PROTEIN],
      allergies: [],
      points: 450,
      level: 1,
      streak: 3,
      isNewUser: true
    };
  });

  const [savedSwaps, setSavedSwaps] = useState<SwapResult[]>(() => {
    const saved = localStorage.getItem('chia_saved_swaps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chia_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('chia_saved_swaps', JSON.stringify(savedSwaps));
  }, [savedSwaps]);

  const notify = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const handleRemoveToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const addXP = (amount: number) => {
    setProfile(prev => {
      let newPoints = prev.points + amount;
      let newLevel = prev.level;
      if (newPoints >= newLevel * 1000) {
        newPoints -= newLevel * 1000;
        newLevel++;
        notify(`🎉 Level Up! You are now Level ${newLevel}!`, 'xp');
      } else {
        notify(`+${amount} XP Earned!`, 'xp');
      }
      return { ...prev, points: newPoints, level: newLevel };
    });
  };

  const handleSaveSwap = (swap: SwapResult) => {
    if (!savedSwaps.find(s => s.id === swap.id)) {
      setSavedSwaps(prev => [swap, ...prev]);
      addXP(150);
      notify(`${swap.suggestedSwap} saved to Pantry!`, 'success');
    }
  };

  const handleVisionCapture = async (base64: string) => {
    setIsScanning(true);
    try {
      const result = await fetchAgenticSwap("Identify this food and suggest a swap.", profile, base64);
      handleSaveSwap(result);
      setActiveTab('PANTRY');
    } catch (err) {
      notify("Vision analysis failed. Try a clearer photo.", 'error');
    } finally {
      setIsScanning(false);
    }
  };

  if (flow === 'WELCOME') return <Welcome onStart={() => setFlow('ONBOARDING')} />;
  if (flow === 'ONBOARDING') return <Onboarding onFinish={() => setFlow('SETUP')} />;
  if (flow === 'SETUP') return <ProfileSetup onComplete={(p) => { 
    setProfile({...p, isNewUser: false} as UserProfile); 
    setFlow('MAIN'); 
    notify("Welcome to Chía!", "success");
  }} />;

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-24">
      <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map(t => <div key={t.id} className="pointer-events-auto"><Toast toast={t} onRemove={handleRemoveToast} /></div>)}
      </div>

      {activeTab === 'SCAN' ? (
        <CameraScanner 
          onCapture={handleVisionCapture} 
          onClose={() => setActiveTab('LAB')} 
          isLoading={isScanning} 
        />
      ) : (
        <>
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-emerald-50">
            <div className="flex items-center gap-2">
              <ChiaLogo size={32} />
              <ChiaName size="text-2xl" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                 <span className="text-sm">🔥</span>
                 <span className="text-xs font-black text-emerald-700">{profile.streak}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-600 px-3 py-1.5 rounded-full shadow-lg shadow-emerald-600/20">
                 <span className="text-[10px] text-white font-black uppercase tracking-tighter">XP</span>
                 <span className="text-xs font-black text-white">{profile.points}</span>
              </div>
            </div>
          </header>

          <main className="px-6 py-8 max-w-4xl mx-auto">
            {activeTab === 'PANTRY' && <Pantry swaps={savedSwaps} onRemove={(id) => setSavedSwaps(s => s.filter(x => x.id !== id))} />}
            {activeTab === 'LAB' && <Lab profile={profile} onSaveSwap={handleSaveSwap} onOpenScanner={() => setActiveTab('SCAN')} />}
            {activeTab === 'CHALLENGES' && <Challenges onAction={(xp) => addXP(xp)} />}
            {activeTab === 'LEADERBOARD' && <Leaderboard myXP={profile.points} />}
            {activeTab === 'ME' && <ProfileSettings profile={profile} onUpdate={setProfile} />}
          </main>

          {/* Navigation Dock */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 z-50">
            <div className="max-w-md mx-auto flex justify-between items-center">
              <NavButton 
                active={activeTab === 'PANTRY'} 
                onClick={() => setActiveTab('PANTRY')} 
                label="Home"
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
              />
              <NavButton 
                active={activeTab === 'LAB'} 
                onClick={() => setActiveTab('LAB')} 
                label="The Lab"
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.5M14 2v7.5M8.5 2h7M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v4z"/><path d="m9 11 3 6 3-6"/></svg>}
              />
              <NavButton 
                active={activeTab === 'CHALLENGES'} 
                onClick={() => setActiveTab('CHALLENGES')} 
                label="Goal"
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>}
              />
              <NavButton 
                active={activeTab === 'LEADERBOARD'} 
                onClick={() => setActiveTab('LEADERBOARD')} 
                label="Rank"
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>}
              />
              <NavButton 
                active={activeTab === 'ME'} 
                onClick={() => setActiveTab('ME')} 
                label="Me"
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              />
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-emerald-600 scale-105' : 'text-slate-900'}`}>
    <div className={`w-6 h-6 flex items-center justify-center ${active ? 'text-emerald-600' : 'text-slate-900'}`}>
      {icon}
    </div>
    <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
  </button>
);

export const ChiaLogo = ({ size = 40 }) => (
  <div style={{ width: size, height: size }} className="bg-emerald-500 rounded-full flex items-center justify-center border border-slate-900 shadow-sm">
  </div>
);

export const ChiaName = ({ size = "text-3xl", color = "text-slate-900" }) => (
  <h1 className={`${size} font-black ${color} tracking-tighter`}>
    Chía
  </h1>
);

export default App;
