
import React, { useState } from 'react';
import { SocialPost, Challenge, UserProfile } from '../types';

interface CommunityProps {
  profile: UserProfile;
  onJoinChallenge: (id: string) => void;
  onAddXP: (amount: number) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'xp' | 'error') => void;
}

const Community: React.FC<CommunityProps> = ({ profile, onJoinChallenge, onAddXP, onNotify }) => {
  // Use username consistently with types.ts SocialPost interface
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: '1',
      username: 'Sarah Healthy',
      userLevel: 12,
      content: 'I replaced my afternoon potato chips with air-popped popcorn and nutritional yeast. 10/10 crunch!',
      swap: { from: 'Potato Chips', to: 'Popcorn' },
      likes: 24,
      timestamp: '2h ago'
    },
    {
      id: '2',
      username: 'Mike Gaines',
      userLevel: 8,
      content: 'Finally tried Greek Yogurt in my tacos instead of sour cream. Can barely tell the difference but the protein boost is real!',
      swap: { from: 'Sour Cream', to: 'Greek Yogurt' },
      likes: 15,
      timestamp: '4h ago'
    },
    {
      id: '3',
      username: 'NutritionExpert',
      userLevel: 45,
      content: 'Pro tip for the community: If you are craving sweets, try frozen grapes. Nature\'s candy!',
      likes: 142,
      timestamp: '1d ago'
    }
  ]);

  // Added mandatory Challenge fields for type safety
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: 'c1', title: '7-Day No Soda', description: 'Replace all sugary carbonated drinks with sparkling water.', reward: 500, daysTotal: 7, daysCompleted: 3, isActive: true, xp: 500, participants: 120, emoji: '🥤', checkedIn: false },
    { id: 'c2', title: 'High Protein Week', description: 'Log at least 3 high-protein swaps this week.', reward: 800, daysTotal: 7, daysCompleted: 0, isActive: false, xp: 800, participants: 45, emoji: '🥩', checkedIn: false },
    { id: 'c3', title: 'Budget Master', description: 'Find 5 swaps that cost less than the original food.', reward: 400, daysTotal: 5, daysCompleted: 0, isActive: false, xp: 400, participants: 89, emoji: '💰', checkedIn: false }
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  // Safely increment likes even if undefined initially
  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: (post.likes ?? 0) + 1 } : post
    ));
    onAddXP(5);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    
    setIsPosting(true);
    setTimeout(() => {
      // Use profile.name as username for new posts created in Community
      const newPost: SocialPost = {
        id: Math.random().toString(),
        username: profile.name,
        userLevel: profile.level,
        content: newPostContent,
        likes: 0,
        timestamp: 'Just now'
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setIsPosting(false);
      onAddXP(50);
      onNotify('Post shared with the community!', 'success');
    }, 600);
  };

  const handleChallengeAction = (challenge: Challenge) => {
    if (!challenge.isActive) {
      setChallenges(prev => prev.map(c => 
        c.id === challenge.id ? { ...c, isActive: true } : c
      ));
      onJoinChallenge(challenge.id);
    } else {
      // Daily Check-in logic
      if (challenge.daysCompleted < challenge.daysTotal) {
        setChallenges(prev => prev.map(c => 
          c.id === challenge.id ? { ...c, daysCompleted: c.daysCompleted + 1 } : c
        ));
        onAddXP(100);
        onNotify(`Check-in successful! +100 XP`, 'xp');
        
        if (challenge.daysCompleted + 1 === challenge.daysTotal) {
          onNotify(`🏆 Challenge Completed: ${challenge.title}!`, 'success');
          onAddXP(challenge.reward);
        }
      } else {
        onNotify('Challenge already completed!', 'info');
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex justify-between items-center px-2">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Social Lab</h2>
            <p className="text-slate-500 font-medium">Connect with other nutritional innovators.</p>
          </div>
        </div>

        {/* Create Post Area */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
          <form onSubmit={handleCreatePost} className="space-y-4">
            <textarea 
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What healthy swap did you discover today?"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-medium text-slate-700 h-28 resize-none"
            />
            <div className="flex justify-end">
              <button 
                type="submit"
                disabled={isPosting || !newPostContent.trim()}
                className="px-8 py-3 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 disabled:bg-slate-200 transition-all shadow-lg active:scale-95"
              >
                {isPosting ? 'Publishing...' : 'Share Success'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="group bg-white rounded-[2.5rem] p-8 shadow-md border border-slate-100 space-y-5 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                  {post.username.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 flex items-center gap-3 text-lg">
                    {post.username}
                    <span className="text-[10px] bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">LVL {post.userLevel}</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{post.timestamp}</p>
                </div>
              </div>
              
              <p className="text-slate-600 leading-relaxed font-semibold text-lg">{post.content}</p>
              
              {post.swap && (
                <div className="flex items-center gap-4 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 text-sm font-black">
                  <span className="text-slate-400 line-through decoration-slate-300">{post.swap.from}</span>
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </div>
                  <span className="text-emerald-700 uppercase tracking-tight">{post.swap.to}</span>
                </div>
              )}
              
              <div className="flex items-center gap-6 pt-2">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2.5 text-slate-400 hover:text-rose-500 transition-all group/like"
                >
                  <div className="p-2 rounded-full group-hover/like:bg-rose-50 transition-colors">
                    <svg className={`w-6 h-6 transition-transform ${(post.likes ?? 0) > 0 ? 'fill-rose-500 text-rose-500 scale-110' : 'fill-none'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  </div>
                  <span className="text-sm font-black">{post.likes ?? 0} Likes</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-500 transition-colors group/comment">
                  <div className="p-2 rounded-full group-hover/comment:bg-emerald-50 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  </div>
                  <span className="text-sm font-black">Comment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-2xl font-black text-slate-900 px-2 tracking-tight">Active Missions</h3>
        <div className="space-y-6">
          {challenges.map(challenge => (
            <div key={challenge.id} className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 transform hover:scale-[1.02] ${
              challenge.isActive 
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xl shadow-emerald-900/20' 
                : 'bg-white text-slate-900 border-slate-100 shadow-lg'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-black leading-tight max-w-[80%]">{challenge.title}</h4>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${challenge.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-50 text-slate-300'}`}>
                  {challenge.isActive ? '⚡' : '🔒'}
                </div>
              </div>
              <p className={`text-sm font-medium mb-6 leading-relaxed ${challenge.isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                {challenge.description}
              </p>
              
              {challenge.isActive ? (
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    <span>Mission Progress</span>
                    <span>{challenge.daysCompleted}/{challenge.daysTotal} Days</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                      style={{ width: `${(challenge.daysCompleted / challenge.daysTotal) * 100}%` }}
                    />
                  </div>
                  <button 
                    onClick={() => handleChallengeAction(challenge)}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest mt-2 hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
                  >
                    Confirm Daily Check-in
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => handleChallengeAction(challenge)}
                  className="w-full py-4 bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                >
                  Join Mission (+{challenge.reward} XP)
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10 space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200 block">Community Status</span>
             <h4 className="text-3xl font-black tracking-tight">Elite Explorer</h4>
             <p className="text-sm text-emerald-50 font-medium leading-relaxed">
               You are currently ranked in the <span className="font-black text-white">Top 5%</span> of explorers who prioritize protein density.
             </p>
             <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">
                  ✨ Global Rank #1,242
                </div>
             </div>
           </div>
           <div className="absolute -right-10 -bottom-10 opacity-10">
              <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45l8.15 14.1H3.85L12 5.45zM11 11v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
