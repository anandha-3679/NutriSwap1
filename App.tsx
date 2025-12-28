
import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import TheFloor from './components/TheFloor';
import TheHierarchy from './components/TheHierarchy';
import TheGrind from './components/TheGrind';
import ProfilePage from './components/ProfilePage';
import RepBot from './components/RepBot';
import Messaging from './components/Messaging';
import { UserProfile, UserRank, SocialPost, HealthGoal, UserCategory } from './types';

type View = 'FLOOR' | 'HIERARCHY' | 'GRIND' | 'PROFILE' | 'CHAT';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('reps_profile_v2');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [view, setView] = useState<View>('FLOOR');
  const [isBotOpen, setIsBotOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('reps_profile_v2', JSON.stringify(profile));
    }
  }, [profile]);

  // Update handleAuth to include missing UserProfile fields
  const handleAuth = (data: Partial<UserProfile>) => {
    const fullProfile: UserProfile = {
      username: data.username || 'user',
      name: data.name || 'Anonymous',
      age: data.age || 18,
      foodPrefs: data.foodPrefs || '',
      allergies: data.allergies || [],
      points: 0,
      aura: 100,
      streak: 0,
      rank: UserRank.ROOKIE,
      followers: 42,
      following: 12,
      bio: 'Just locking in, no cap. 🦍',
      isAuthenticated: true,
      posts: [],
      /* Initialize mandatory health tracking fields */
      goals: [HealthGoal.LOWER_CALORIE],
      category: UserCategory.ADULT,
      level: 1
    };
    setProfile(fullProfile);
    setView('FLOOR');
  };

  if (!profile) {
    return <Onboarding onComplete={handleAuth} />;
  }

  return (
    <div className="min-h-screen bg-white pb-24 max-w-md mx-auto relative border-x border-slate-50 shadow-sm">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 nav-blur border-b border-slate-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FireBoyIcon size={32} />
          <h1 className="text-xl font-black tracking-tighter text-black uppercase italic">REPS</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-lg border border-orange-100">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-black text-orange-600">{profile.streak}</span>
          </div>
          <div className="text-right">
             <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{profile.rank}</div>
             <div className="text-xs font-black text-black">+{profile.aura} Aura</div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {view === 'FLOOR' && <TheFloor />}
        {view === 'HIERARCHY' && <TheHierarchy profile={profile} />}
        {view === 'GRIND' && <TheGrind onXP={(xp) => setProfile(p => p ? {...p, points: p.points + xp, aura: p.aura + (xp/10)} : p)} />}
        {view === 'PROFILE' && <ProfilePage profile={profile} />}
        {view === 'CHAT' && <Messaging />}
      </main>

      {/* RepBot FAB */}
      <button 
        onClick={() => setIsBotOpen(true)}
        className="fixed bottom-28 right-6 w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/10 hover:scale-105 active:scale-95 transition-all z-50 orange-glow"
      >
        <span className="text-xl">✨</span>
      </button>

      <RepBot isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} profile={profile} />

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 nav-blur border-t border-slate-50 px-6 py-4 flex justify-around items-center max-w-md mx-auto">
        <NavBtn active={view === 'FLOOR'} onClick={() => setView('FLOOR')} icon="🏠" label="Floor" />
        <NavBtn active={view === 'HIERARCHY'} onClick={() => setView('HIERARCHY')} icon="🏆" label="Hierarchy" />
        <NavBtn active={view === 'GRIND'} onClick={() => setView('GRIND')} icon="⚡" label="Grind" />
        <NavBtn active={view === 'CHAT'} onClick={() => setView('CHAT')} icon="💬" label="Chat" />
        <NavBtn active={view === 'PROFILE'} onClick={() => setView('PROFILE')} icon="👤" label="Me" />
      </nav>
    </div>
  );
};

const NavBtn: React.FC<{active: boolean, onClick: () => void, icon: string, label: string}> = ({active, onClick, icon, label}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export const FireBoyIcon = ({size = 40}) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2C16 8 8 10 8 20C8 28 14 34 20 34C26 34 32 28 32 20C32 10 24 8 20 2Z" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="20" r="1.5" fill="black"/>
    <circle cx="24" cy="20" r="1.5" fill="black"/>
    <path d="M17 26C18 27.5 22 27.5 23 26" stroke="black" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default App;
