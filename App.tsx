
import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import TheFloor from './components/TheFloor';
import TheHierarchy from './components/TheHierarchy';
import TheGrind from './components/TheGrind';
import RepBot from './components/RepBot';
import AuthModal from './components/AuthModal';
import { UserProfile, HealthGoal, UserRank, UserCategory } from './types';

type View = 'FLOOR' | 'HIERARCHY' | 'GRIND' | 'LAB';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('reps_profile');
    return saved ? JSON.parse(saved) : null;
  });
  const [view, setView] = useState<View>('FLOOR');
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('reps_profile', JSON.stringify(profile));
    }
  }, [profile]);

  const handleOnboardingComplete = (data: Partial<UserProfile>) => {
    // Initialize UserProfile with all required fields including defaults for missing ones
    const newProfile: UserProfile = {
      name: data.name || 'Athlete',
      age: data.age || 25,
      height: data.height || '',
      weight: data.weight || '',
      goal: data.goal || HealthGoal.GENERAL_FITNESS,
      goals: [data.goal || HealthGoal.GENERAL_FITNESS],
      category: UserCategory.ADULT,
      allergies: data.allergies || [],
      points: 0,
      aura: 100,
      streak: 0,
      rank: UserRank.NOVICE,
      level: 1,
      isAuthenticated: false
    };
    setProfile(newProfile);
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    if (profile) {
      setProfile({ ...profile, isAuthenticated: true });
    }
    setShowAuth(false);
  };

  if (!profile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (showAuth && !profile.isAuthenticated) {
    return <AuthModal onComplete={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 nav-blur border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tighter text-slate-900 uppercase italic">REPS</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-100">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-bold text-orange-700">{profile.streak}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{profile.rank}</span>
            <span className="text-xs font-black text-slate-900">{profile.aura} Aura</span>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto pt-6 px-4">
        {view === 'FLOOR' && <TheFloor />}
        {view === 'HIERARCHY' && <TheHierarchy />}
        {view === 'GRIND' && <TheGrind />}
      </main>

      {/* RepBot Toggle */}
      <button 
        onClick={() => setIsBotOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all z-50"
      >
        <span className="text-xl">✨</span>
      </button>

      <RepBot isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} profile={profile} />

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 nav-blur border-t border-slate-100 px-6 py-4">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <NavBtn 
            active={view === 'FLOOR'} 
            onClick={() => setView('FLOOR')} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>} 
            label="Floor" 
          />
          <NavBtn 
            active={view === 'HIERARCHY'} 
            onClick={() => setView('HIERARCHY')} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>} 
            label="Hierarchy" 
          />
          <NavBtn 
            active={view === 'GRIND'} 
            onClick={() => setView('GRIND')} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} 
            label="Grind" 
          />
        </div>
      </nav>
    </div>
  );
};

const NavBtn: React.FC<{active: boolean, onClick: () => void, icon: React.ReactNode, label: string}> = ({active, onClick, icon, label}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 ${active ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
  >
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
