
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
    const saved = localStorage.getItem('reps_profile_v3');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [view, setView] = useState<View>('FLOOR');
  const [isBotOpen, setIsBotOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('reps_profile_v3', JSON.stringify(profile));
    }
  }, [profile]);

  const handleAuth = (data: Partial<UserProfile>) => {
    const fullProfile: UserProfile = {
      username: data.username || 'user',
      name: data.name || 'Athlete',
      age: data.age || 18,
      foodPrefs: data.foodPrefs || '',
      allergies: data.allergies || [],
      points: 0,
      aura: 100,
      streak: 0,
      rank: UserRank.ROOKIE,
      followers: 128,
      following: 84,
      bio: 'Locking in. No cap. 🦍',
      isAuthenticated: true,
      posts: [],
      goals: [HealthGoal.BULK],
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
    <div className="min-h-screen bg-white max-w-md mx-auto relative flex flex-col border-x border-slate-50">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FireBoyIcon size={36} />
          <h1 className="text-2xl font-black italic tracking-tighter text-black uppercase">REPS</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{profile.rank}</div>
             <div className="text-sm font-black text-black">+{profile.aura} Aura</div>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-black text-xs">
            {profile.name[0]}
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 pt-2 pb-32">
        {view === 'FLOOR' && <TheFloor />}
        {view === 'HIERARCHY' && <TheHierarchy profile={profile} />}
        {view === 'GRIND' && <TheGrind onXP={(xp) => setProfile(p => p ? {...p, points: p.points + xp, aura: p.aura + (xp/10)} : p)} />}
        {view === 'PROFILE' && <ProfilePage profile={profile} />}
        {view === 'CHAT' && <Messaging />}
      </main>

      {/* RepBot Toggle (Minimalist FAB) */}
      <button 
        onClick={() => setIsBotOpen(true)}
        className="fixed bottom-28 right-8 w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all z-50"
      >
        <span className="text-xl">✨</span>
      </button>

      <RepBot isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} profile={profile} />

      {/* Dock Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 nav-blur px-8 pt-4 pb-8 flex justify-between items-center max-w-md mx-auto">
        <NavBtn active={view === 'FLOOR'} onClick={() => setView('FLOOR')} icon={<HomeIcon />} label="Floor" />
        <NavBtn active={view === 'HIERARCHY'} onClick={() => setView('HIERARCHY')} icon={<RankIcon />} label="Rank" />
        <NavBtn active={view === 'GRIND'} onClick={() => setView('GRIND')} icon={<GrindIcon />} label="Grind" />
        <NavBtn active={view === 'CHAT'} onClick={() => setView('CHAT')} icon={<ChatIcon />} label="Chat" />
        <NavBtn active={view === 'PROFILE'} onClick={() => setView('PROFILE')} icon={<UserIcon />} label="Me" />
      </nav>
    </div>
  );
};

const NavBtn = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-black scale-110' : 'text-slate-300'}`}
  >
    <div className="w-6 h-6 flex items-center justify-center">
      {React.cloneElement(icon, { color: 'currentColor' })}
    </div>
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const HomeIcon = ({ color = 'currentColor' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const RankIcon = ({ color = 'currentColor' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);
const GrindIcon = ({ color = 'currentColor' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3.34 19a10 10 0 1 1 17.32 0"/><path d="m12 14 4-4"/></svg>
);
const ChatIcon = ({ color = 'currentColor' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
);
const UserIcon = ({ color = 'currentColor' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

/**
 * FireBoyIcon - Sleek flame design
 */
export const FireBoyIcon = ({ size = 40, color = 'black' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.55 12c-.46-4.57-2.9-7.38-5.32-9.75a.5.5 0 00-.76.06c-.84 1.15-2.06 2.5-2.9 4.31-.8 1.71-.97 3.51-.51 5.37.05.2-.23.32-.34.15a6.012 6.012 0 00-4.04-2.81c-.34-.05-.51.37-.24.58 2.05 1.63 2.92 4.47 3.01 6.55.08 1.98 1.57 3.54 3.55 3.54 2 0 3.61-1.61 3.61-3.61 0-1.42-.82-2.65-2.03-3.26a.498.498 0 01-.13-.82c.44-.45 1.05-.72 1.72-.72 1.32 0 2.39 1.07 2.39 2.39 0 1.25-.97 2.27-2.2 2.38-.2.02-.34.22-.27.41.42 1.05 1.45 1.8 2.65 1.8 1.58 0 2.86-1.28 2.86-2.86 0-1.57-1.29-2.84-2.86-3.32z" />
  </svg>
);

export default App;
