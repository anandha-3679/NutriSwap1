
import React, { useState } from 'react';

const Messaging: React.FC = () => {
  const [messages] = useState([
    { id: '1', name: 'AlphaGym', msg: 'Yo, you hitting chest today?', time: '10m' },
    { id: '2', name: 'FitQueen_22', msg: 'That protein bowl was fire fr.', time: '1h' },
    { id: '3', name: 'CoachLock', msg: 'Don\'t miss your check-in king.', time: '2h' },
  ]);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-black italic uppercase tracking-tighter">Messages</h2>
        <button className="text-xl">✍️</button>
      </div>

      <div className="space-y-2">
        {messages.map(m => (
          <div key={m.id} className="bento-card p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black">
              {m.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                 <h4 className="text-sm font-black italic">@{m.name}</h4>
                 <span className="text-[10px] font-bold text-slate-400">{m.time}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate">{m.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messaging;
