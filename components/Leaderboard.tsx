
import React from 'react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  myXP: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ myXP }) => {
  const users: LeaderboardEntry[] = [
    { name: 'HealthySam', avatar: '🏃', xp: 12500 },
    { name: 'VeggieQueen', avatar: '🥬', xp: 11200 },
    { name: 'ProteinKing', avatar: '💪', xp: 9800 },
    { name: 'You', avatar: '🥑', xp: myXP, isMe: true },
    { name: 'ChiaLover', avatar: '🌱', xp: 8400 },
    { name: 'NutriNinja', avatar: '🥷', xp: 7600 },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center bg-emerald-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Global Standings</span>
        <h2 className="text-4xl font-black mt-2">Nutrition Masters</h2>
        <p className="text-emerald-100 text-sm mt-2">The top swappers of Chía this week.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-emerald-50 overflow-hidden shadow-sm">
        {users.map((user, i) => (
          <div key={user.name} className={`flex items-center justify-between p-6 border-b border-emerald-50 last:border-0 ${user.isMe ? 'bg-emerald-50/50' : ''}`}>
            <div className="flex items-center gap-5">
              <span className={`w-8 h-8 flex items-center justify-center font-black rounded-full text-xs ${i < 3 ? 'bg-amber-100 text-amber-600' : 'text-slate-300'}`}>
                {i + 1}
              </span>
              <div className="text-3xl">{user.avatar}</div>
              <div>
                <h4 className={`font-black ${user.isMe ? 'text-emerald-700' : 'text-slate-900'}`}>{user.name}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.xp} Total XP</p>
              </div>
            </div>
            {i === 0 && <span className="text-xl">👑</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
