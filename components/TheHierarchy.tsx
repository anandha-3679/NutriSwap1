
import React from 'react';

const TheHierarchy: React.FC = () => {
  const rankings = [
    { rank: 1, name: 'PeakPerformer', aura: 12450, tier: 'Legend' },
    { rank: 2, name: 'IronWill', aura: 11200, tier: 'Legend' },
    { rank: 3, name: 'ConsistentKing', aura: 9800, tier: 'Elite' },
    { rank: 4, name: 'DailyGrinder', aura: 8500, tier: 'Elite' },
    { rank: 5, name: 'MorningStar', aura: 7200, tier: 'Rookie' },
  ];

  return (
    <div className="space-y-6">
      <div className="bento-card p-6 sage-gradient border-none">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">The Hierarchy</h2>
        <p className="text-sm text-slate-600 font-medium">Global leaderboard standings.</p>
      </div>

      <div className="bento-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Pos</th>
              <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Athlete</th>
              <th className="px-6 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Aura</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rankings.map((user) => (
              <tr key={user.rank} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className={`text-sm font-black ${user.rank <= 3 ? 'text-green-600' : 'text-slate-400'}`}>
                    #{user.rank}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">{user.name}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.tier}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-black text-slate-900">{user.aura.toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TheHierarchy;
