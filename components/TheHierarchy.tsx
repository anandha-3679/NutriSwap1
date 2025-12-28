
import React from 'react';
import { UserProfile } from '../types';

interface HierarchyProps {
  profile: UserProfile;
}

const TheHierarchy: React.FC<HierarchyProps> = ({ profile }) => {
  const leaders = [
    { rank: 1, name: 'PeakPerformer', xp: 12450, aura: 1200 },
    { rank: 2, name: 'IronWill', xp: 11200, aura: 980 },
    { rank: 3, name: 'GymRat_44', xp: 9800, aura: 850 },
    { rank: 4, name: 'LockedIn_99', xp: 8500, aura: 720 },
    { rank: 5, name: profile.username, xp: profile.points, aura: profile.aura, isMe: true },
  ];

  return (
    <div className="space-y-6">
      <div className="bento-card p-6 bg-black text-white space-y-2">
        <h2 className="text-2xl font-black italic tracking-tighter uppercase">The Hierarchy</h2>
        <p className="text-xs font-bold text-slate-400">Only the elite lock in this hard. FR.</p>
      </div>

      <div className="bento-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-[9px] font-black uppercase text-slate-400">Pos</th>
              <th className="px-5 py-3 text-[9px] font-black uppercase text-slate-400">Athlete</th>
              <th className="px-5 py-3 text-[9px] font-black uppercase text-slate-400 text-right">Aura</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {leaders.map(l => (
              <tr key={l.name} className={`hover:bg-slate-50/50 transition-all ${l.isMe ? 'bg-orange-50/50' : ''}`}>
                <td className="px-5 py-4">
                  <span className={`text-xs font-black ${l.rank <= 3 ? 'text-orange-600' : 'text-slate-400'}`}>#{l.rank}</span>
                </td>
                <td className="px-5 py-4">
                   <div className="text-sm font-black italic">@{l.name} {l.isMe && '(You)'}</div>
                   <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{l.xp} XP</div>
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="text-xs font-black">+{l.aura}</span>
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
