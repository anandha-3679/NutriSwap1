
import React, { useState } from 'react';
import { SocialPost, Challenge, UserProfile } from '../types';

interface CommunityProps {
  profile: UserProfile;
  onJoinChallenge: (id: string) => void;
}

const Community: React.FC<CommunityProps> = ({ profile, onJoinChallenge }) => {
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: '1',
      userName: 'Sarah Healthy',
      userLevel: 12,
      content: 'I replaced my afternoon potato chips with air-popped popcorn and nutritional yeast. 10/10 crunch!',
      swap: { from: 'Potato Chips', to: 'Popcorn' },
      likes: 24,
      timestamp: '2h ago'
    },
    {
      id: '2',
      userName: 'Mike Gaines',
      userLevel: 8,
      content: 'Finally tried Greek Yogurt in my tacos instead of sour cream. Can barely tell the difference but the protein boost is real!',
      swap: { from: 'Sour Cream', to: 'Greek Yogurt' },
      likes: 15,
      timestamp: '4h ago'
    },
    {
      id: '3',
      userName: 'NutritionExpert',
      userLevel: 45,
      content: 'Pro tip for the community: If you are craving sweets, try frozen grapes. Nature\'s candy!',
      likes: 142,
      timestamp: '1d ago'
    }
  ]);

  const [challenges] = useState<Challenge[]>([
    { id: 'c1', title: '7-Day No Soda', description: 'Replace all sugary carbonated drinks with sparkling water.', reward: 500, daysTotal: 7, daysCompleted: 3, isActive: true },
    { id: 'c2', title: 'High Protein Week', description: 'Log at least 3 high-protein swaps this week.', reward: 800, daysTotal: 7, daysCompleted: 0, isActive: false },
    { id: 'c3', title: 'Budget Master', description: 'Find 5 swaps that cost less than the original food.', reward: 400, daysTotal: 5, daysCompleted: 0, isActive: false }
  ]);

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-black text-slate-900">Global Swaps</h2>
          <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase">Post My Success</button>
        </div>
        
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-4 hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black">
                {post.userName.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  {post.userName}
                  <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded uppercase">LVL {post.userLevel}</span>
                </h4>
                <p className="text-xs text-slate-400">{post.timestamp}</p>
              </div>
            </div>
            
            <p className="text-slate-600 leading-relaxed font-medium">{post.content}</p>
            
            {post.swap && (
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs font-bold">
                <span className="text-slate-400 line-through">{post.swap.from}</span>
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                <span className="text-emerald-600">{post.swap.to}</span>
              </div>
            )}
            
            <div className="flex items-center gap-4 pt-2">
              <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                <span className="text-xs font-black">{post.likes}</span>
              </button>
              <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-black text-slate-900">Active Challenges</h3>
        {challenges.map(challenge => (
          <div key={challenge.id} className={`p-6 rounded-[2rem] border-2 transition-all ${
            challenge.isActive ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl' : 'bg-white text-slate-900 border-slate-100'
          }`}>
            <h4 className="text-lg font-black mb-1">{challenge.title}</h4>
            <p className={`text-xs font-medium mb-4 ${challenge.isActive ? 'text-emerald-100' : 'text-slate-500'}`}>
              {challenge.description}
            </p>
            
            {challenge.isActive ? (
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span>Progress</span>
                  <span>{challenge.daysCompleted}/{challenge.daysTotal} Days</span>
                </div>
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all duration-1000" style={{ width: `${(challenge.daysCompleted / challenge.daysTotal) * 100}%` }}></div>
                </div>
                <button className="w-full py-2 bg-white text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest mt-2">
                  Daily Check-in
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onJoinChallenge(challenge.id)}
                className="w-full py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
              >
                Join Challenge (+{challenge.reward} XP)
              </button>
            )}
          </div>
        ))}
        
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
           <div className="relative z-10">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 block mb-2">Social Rank</span>
             <h4 className="text-xl font-black mb-4">Elite Swapper</h4>
             <p className="text-xs text-slate-400 leading-relaxed font-medium">You are in the top 5% of healthy swappers this month. Keep it up!</p>
           </div>
           <div className="absolute -right-4 -bottom-4 opacity-10">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45l8.15 14.1H3.85L12 5.45zM11 11v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
