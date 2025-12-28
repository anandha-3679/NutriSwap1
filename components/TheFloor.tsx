
import React from 'react';
import { SocialPost } from '../types';

const TheFloor: React.FC = () => {
  const posts: SocialPost[] = [
    {
      id: '1',
      username: 'IronLover',
      content: 'Just smashed a new PR on squats. 140kg x 3. We move. 🦍 #no-cap #gains',
      hypeCount: 842,
      squadCount: 12,
      timestamp: '2h',
      type: 'LOCK_IN'
    },
    {
      id: '2',
      username: 'HealthyChef',
      content: 'This protein bowl is elite. High volume, low cal. W in the chat. 🥗',
      hypeCount: 156,
      squadCount: 3,
      timestamp: '5h',
      type: 'MEAL'
    }
  ];

  return (
    <div className="space-y-6 pb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-black italic tracking-tighter uppercase">The Floor</h2>
        <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Following</button>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bento-card p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black">
                  {post.username[0]}
                </div>
                <div>
                  <h4 className="text-sm font-black italic">@{post.username}</h4>
                  <p className="text-[10px] text-slate-400 font-bold">{post.timestamp} ago</p>
                </div>
              </div>
              <span className="text-[9px] font-black bg-black text-white px-2 py-1 rounded italic uppercase">{post.type}</span>
            </div>

            <p className="text-sm font-medium leading-relaxed">{post.content}</p>

            <div className="flex items-center gap-8 pt-2">
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-orange-600 transition-colors group">
                <span className="group-active:scale-150 transition-transform">🔥</span>
                <span className="text-[10px] font-black">{post.hypeCount} Hype</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-black transition-colors">
                <span>💬</span>
                <span className="text-[10px] font-black">{post.squadCount} Squad</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheFloor;
