
import React, { useState } from 'react';
import { Challenge } from '../types';

interface ChallengesProps {
  onAction: (xp: number) => void;
}

const Challenges: React.FC<ChallengesProps> = ({ onAction }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: '1', title: 'Soda Switcher', description: 'Swap 1 sugary drink for sparkling water.', reward: 200, icon: '🥤', isJoined: false },
    { id: '2', title: 'Green Morning', description: 'Swap morning cereal for a green smoothie.', reward: 350, icon: '🥬', isJoined: true },
    { id: '3', title: 'Protein Pro', description: 'Make a swap that increases protein by 10g.', reward: 500, icon: '🍗', isJoined: false },
    { id: '4', title: 'Budget King', description: 'Find a swap cheaper than the original.', reward: 300, icon: '💰', isJoined: false },
  ]);

  const toggle = (id: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id) {
        if (c.isJoined) onAction(c.reward);
        return { ...c, isJoined: !c.isJoined };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-1">
        <h2 className="text-3xl font-black tracking-tight">Active Challenges</h2>
        <p className="text-slate-400 font-medium">Complete tasks to earn massive XP.</p>
      </div>

      <div className="grid gap-4">
        {challenges.map(c => (
          <div key={c.id} className={`p-6 rounded-[2.5rem] border-2 transition-all flex items-center justify-between ${c.isJoined ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl' : 'bg-emerald-50/50 border-emerald-50 text-slate-900'}`}>
            <div className="flex items-center gap-4">
              <div className="text-4xl">{c.icon}</div>
              <div>
                <h4 className="font-black text-lg">{c.title}</h4>
                <p className={`text-xs opacity-70 ${c.isJoined ? 'text-white' : 'text-slate-500'}`}>{c.description}</p>
                <div className="mt-2 text-[10px] font-black uppercase tracking-widest">+{c.reward} XP REWARD</div>
              </div>
            </div>
            <button
              onClick={() => toggle(c.id)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${c.isJoined ? 'bg-white text-emerald-600' : 'bg-emerald-600 text-white'}`}
            >
              {c.isJoined ? 'Check In' : 'Join'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
