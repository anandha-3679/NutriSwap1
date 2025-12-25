
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Lab from './components/Lab';
import Pantry from './components/Pantry';
import ProfileSettings from './components/ProfileSettings';
import Community from './components/Community';
import CameraScanner from './components/CameraScanner';
import { UserProfile, UserCategory, HealthGoal, SwapResult } from './types';
import { fetchAgenticSwap } from './services/geminiService';

type View = 'DASHBOARD' | 'LAB' | 'PANTRY' | 'PROFILE' | 'COMMUNITY' | 'SCAN';

const App: React.FC = () => {
  const [view, setView] = useState<View>('DASHBOARD');
  const [isScanning, setIsScanning] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nutriswap_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Guest Explorer',
      category: UserCategory.ADULT,
      goals: [HealthGoal.HIGHER_PROTEIN],
      allergies: [],
      points: 1250,
      level: 2,
      streak: 5
    };
  });

  const [savedSwaps, setSavedSwaps] = useState<SwapResult[]>(() => {
    const saved = localStorage.getItem('nutriswap_saved_swaps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nutriswap_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('nutriswap_saved_swaps', JSON.stringify(savedSwaps));
  }, [savedSwaps]);

  const handleSaveSwap = (swap: SwapResult) => {
    if (!savedSwaps.find(s => s.id === swap.id)) {
      setSavedSwaps([swap, ...savedSwaps]);
      addXP(100);
      alert(`${swap.suggestedSwap} added to your Pantry! +100 XP`);
    }
  };

  const handleRemoveSwap = (id: string) => {
    setSavedSwaps(savedSwaps.filter(s => s.id !== id));
  };

  const addXP = (amount: number) => {
    setProfile(prev => {
      let newPoints = prev.points + amount;
      let newLevel = prev.level;
      const nextLevelThreshold = newLevel * 1000;
      
      if (newPoints >= nextLevelThreshold) {
        newPoints -= nextLevelThreshold;
        newLevel += 1;
        alert(`🎉 CONGRATS! You reached Level ${newLevel}!`);
      }
      
      return { ...prev, points: newPoints, level: newLevel };
    });
  };

  const handleVisionCapture = async (base64: string) => {
    setIsScanning(true);
    try {
      const result = await fetchAgenticSwap("Identify the food in this photo and suggest the best healthy swap for my profile.", profile, base64);
      setSavedSwaps([result, ...savedSwaps]);
      addXP(250); // Vision bonus
      setView('PANTRY');
      alert(`AI identified your food and found a perfect swap: ${result.suggestedSwap}. Saved to Pantry!`);
    } catch (err) {
      console.error(err);
      alert("AI Vision was unable to identify this food clearly. Try a better angle!");
    } finally {
      setIsScanning(false);
      setView('DASHBOARD');
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
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-100/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-cyan-100/40 rounded-full blur-[100px]"></div>
      </div>

      <header className="relative z-10 pt-10 pb-6 px-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h1 className="text-3xl font-black tracking-tighter">NutriSwap<span className="text-emerald-500">Pro</span></h1>
        </div>
        <div className="hidden md:flex gap-4">
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
            className="px-6 py-2 bg-emerald-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
          >
            📸 Scan Food
          </button>
        </div>
      </header>

      <main className="relative z-10 px-6 max-w-7xl mx-auto py-10">
        {view === 'DASHBOARD' && <Dashboard profile={profile} savedSwaps={savedSwaps} onNavigate={setView} />}
        {view === 'LAB' && <Lab profile={profile} onSaveSwap={handleSaveSwap} />}
        {view === 'PANTRY' && <Pantry swaps={savedSwaps} onRemove={handleRemoveSwap} />}
        {view === 'PROFILE' && <ProfileSettings profile={profile} onUpdate={setProfile} />}
        {view === 'COMMUNITY' && <Community profile={profile} onJoinChallenge={(id) => alert(`Joined challenge ${id}! Go earn that XP!`)} />}
        {view === 'SCAN' && <CameraScanner onCapture={handleVisionCapture} onClose={() => setView('DASHBOARD')} isLoading={isScanning} />}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 md:hidden z-50">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-3 shadow-2xl flex justify-around items-center">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`flex flex-col items-center gap-1 w-16 py-2 transition-all rounded-2xl ${
                view === item.id ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => setView('SCAN')}
            className="flex flex-col items-center gap-1 w-16 py-2 text-emerald-400"
          >
            <span className="text-xl">📸</span>
            <span className="text-[8px] font-black uppercase tracking-tighter">Scan</span>
          </button>
        </div>
      </nav>

      <footer className="relative z-10 mt-20 pb-10 text-center opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Agentic Intelligence v2.0 • NutriSwap</p>
      </footer>
    </div>
  );
};

export default App;
