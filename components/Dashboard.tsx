
import React from 'react';
import { UserProfile, SwapResult } from '../types';

interface DashboardProps {
  profile: UserProfile;
  savedSwaps: SwapResult[];
  onNavigate: (view: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, savedSwaps, onNavigate }) => {
  // Calculate level progress
  const nextLevelXP = profile.level * 1000;
  const progressPercent = (profile.points / nextLevelXP) * 100;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Gamification Bar */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-500/30">⚡</div>
          <div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Current Streak</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">{profile.streak}</span>
              <span className="text-xs font-bold text-slate-400 uppercase">Days</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 bg-slate-900 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-[9px] font-black opacity-50 uppercase tracking-widest block">Experience Level</span>
              <span className="text-2xl font-black">Level {profile.level}</span>
            </div>
            <span className="text-[10px] font-bold opacity-50 uppercase">{profile.points} / {nextLevelXP} XP</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.8)]" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
        <div className="bg-emerald-600 text-white rounded-3xl p-6 shadow-xl flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-all" onClick={() => onNavigate('SCAN')}>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">📸</div>
          <div>
            <span className="text-[9px] font-black opacity-70 uppercase tracking-widest block">Quick Scan</span>
            <span className="text-lg font-black">Identify Food</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-[2.5rem] p-8 border border-white shadow-xl shadow-emerald-500/5">
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-2">Profile Status</span>
          <h2 className="text-3xl font-black text-slate-900 mb-4">{profile.name}</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-lg">{profile.category}</span>
            {profile.goals.map(g => (
              <span key={g} className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-lg">{g}</span>
            ))}
          </div>
          {profile.allergies.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100">
               <span className="text-[9px] font-bold text-red-500 uppercase block">Allergy Filter Active</span>
               <p className="text-xs text-red-700 font-medium">No: {profile.allergies.join(", ")}</p>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-110 transition-transform">
             <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45l8.15 14.1H3.85L12 5.45zM11 11v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-70 block mb-2">Saved Innovations</span>
          <div className="text-6xl font-black mb-2">{savedSwaps.length}</div>
          <p className="text-sm font-medium opacity-80">Swaps available in your pantry</p>
          <button 
            onClick={() => onNavigate('PANTRY')}
            className="mt-6 text-xs font-black uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-emerald-600 transition-all"
          >
            Open Pantry
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-[2.5rem] p-8 border border-white shadow-xl flex flex-col justify-center items-center text-center">
           <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
           </div>
           <h3 className="text-xl font-black text-slate-800 mb-2">Need a Boost?</h3>
           <p className="text-sm text-slate-500 mb-6 font-medium">Ask our agent to find a high-protein, low-cost meal for you.</p>
           <button 
            onClick={() => onNavigate('LAB')}
            className="w-full py-3 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all"
           >
            Enter The Lab
           </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Recent Discoveries</h4>
        {savedSwaps.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">No saved swaps yet. Head to the Lab to start experimenting!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {savedSwaps.slice(0, 4).map(swap => (
              <div key={swap.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer" onClick={() => onNavigate('PANTRY')}>
                <span className="text-[9px] font-black text-emerald-500 uppercase block mb-1">{swap.category}</span>
                <h5 className="font-bold text-slate-800 line-clamp-1">{swap.suggestedSwap}</h5>
                <p className="text-[10px] text-slate-400 mt-2 italic line-clamp-2">"{swap.explanation}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
