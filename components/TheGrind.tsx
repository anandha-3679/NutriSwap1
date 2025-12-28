
import React, { useState } from 'react';
import { Challenge } from '../types';

interface GrindProps {
  onXP: (amount: number) => void;
}

const TheGrind: React.FC<GrindProps> = ({ onXP }) => {
  // Fix: Added missing mandatory properties reward, daysTotal, daysCompleted, and isActive to satisfy the Challenge interface
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: '1', title: '7-Day No Sugar', xp: 500, participants: 124, emoji: '🍭', checkedIn: false, reward: 500, daysTotal: 7, daysCompleted: 0, isActive: true },
    { id: '2', title: 'Daily 10k Steps', xp: 200, participants: 3500, emoji: '👟', checkedIn: true, reward: 200, daysTotal: 1, daysCompleted: 1, isActive: true },
    { id: '3', title: 'Morning Pump', xp: 300, participants: 82, emoji: '💪', checkedIn: false, reward: 300, daysTotal: 1, daysCompleted: 0, isActive: true },
  ]);

  const handleCheckIn = (id: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id && !c.checkedIn) {
        onXP(50);
        return { ...c, checkedIn: true };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-lg font-black italic tracking-tighter uppercase">Daily Grind</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol Verification</p>
      </div>

      <div className="space-y-4">
        {challenges.map(ch => (
          <div key={ch.id} className="bento-card p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl border border-slate-100">
                  {ch.emoji}
               </div>
               <div>
                  <h4 className="font-black text-sm">{ch.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">+{ch.xp} XP Reward</p>
               </div>
            </div>
            <button 
              onClick={() => handleCheckIn(ch.id)}
              disabled={ch.checkedIn}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                ch.checkedIn 
                ? 'bg-slate-100 text-slate-300' 
                : 'bg-black text-white hover:scale-105 active:scale-95'
              }`}
            >
              {ch.checkedIn ? 'Locked In' : 'Check In'}
            </button>
          </div>
        ))}
      </div>

      <div className="bento-card p-8 bg-orange-600 text-white text-center space-y-4">
         <h3 className="text-2xl font-black italic uppercase italic">Aura Boost</h3>
         <p className="text-xs font-bold opacity-80">Complete all 3 missions for a massive XP multiplier. FR.</p>
         <div className="flex justify-center gap-2">
           {[1,2,3].map(i => (
             <div key={i} className={`w-3 h-3 rounded-full ${challenges[i-1]?.checkedIn ? 'bg-white' : 'bg-white/20'}`}></div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default TheGrind;
