
import React from 'react';
import { SocialPost } from '../types';

const TheFloor: React.FC = () => {
  const posts: SocialPost[] = [
    {
      id: '1',
      userName: 'Athlete_Alpha',
      content: 'Morning protocol complete. 10km run at zone 2. Feeling the momentum build. W gains.',
      hypeCount: 142,
      squadCount: 8,
      timestamp: '2h',
      type: 'ACHIEVEMENT'
    },
    {
      id: '2',
      userName: 'ChefFit',
      content: 'Check out this protein bowl. Chicken breast, quinoa, roasted greens, and lemon tahini dressing.',
      hypeCount: 89,
      squadCount: 12,
      timestamp: '5h',
      type: 'MEAL'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-lg font-bold text-slate-900">The Floor</h2>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Activity</span>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bento-card p-5 space-y-4 animate-slide-up">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-900">
                  {post.userName[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{post.userName}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.timestamp} ago</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-tighter ${
                post.type === 'MEAL' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
              }`}>
                {post.type}
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{post.content}</p>

            <div className="flex items-center gap-6 pt-2">
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors group">
                <span className="group-active:scale-125 transition-transform">🔥</span>
                <span className="text-xs font-bold">{post.hypeCount} Hype</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors">
                <span>💬</span>
                <span className="text-xs font-bold">{post.squadCount} Squad</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheFloor;
