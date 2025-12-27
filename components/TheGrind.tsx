
import React from 'react';
import { Challenge } from '../types';

const TheGrind: React.FC = () => {
  const challenges: Challenge[] = [
    { id: '1', title: '7-Day No Sugar', duration: '7 Days', participants: 1240, image: '🍦' },
    { id: '2', title: 'Daily 10k Steps', duration: 'Ongoing', participants: 5600, image: '👟' },
    { id: '3', title: 'Protein Focused', duration: '30 Days', participants: 890, image: '🥩' },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="bento-card p-8 bg-slate-900 text-white text-center space-y-4">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">Daily Grind</h2>
        <p className="text-slate-400 text-sm font-medium">Verify your protocol for today.</p>
        <button className="w-full py-4 bg-green-400 text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:bg-green-300 active:scale-[0.98] transition-all shadow-lg shadow-green-400/20">
          Check In
        </button>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Resets in 14h 22m</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Squad Challenges</h3>
        <div className="flex overflow-x-auto gap-4 pb-4 px-2 no-scrollbar">
          {challenges.map(ch => (
            <div key={ch.id} className="flex-shrink-0 w-48 bento-card p-5 space-y-3">
              <div className="text-3xl">{ch.image}</div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">{ch.title}</h4>
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>{ch.duration}</span>
                <span className="text-green-600">{ch.participants} Join</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheGrind;
