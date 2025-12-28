
import React from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
}

const ProfilePage: React.FC<ProfileProps> = ({ profile }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-4xl shadow-sm">
          {profile.avatarUrl ? <img src={profile.avatarUrl} alt="pfp" /> : '🦍'}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
             <div>
                <h2 className="text-2xl font-black tracking-tight">{profile.name}</h2>
                <p className="text-sm text-slate-400 font-bold italic">@{profile.username}</p>
             </div>
             <button className="p-2 border border-slate-100 rounded-lg">⚙️</button>
          </div>
          <p className="text-xs font-medium leading-relaxed text-slate-500">{profile.bio}</p>
        </div>
      </div>

      <div className="flex justify-between bento-card p-4 text-center">
        <div>
          <div className="text-sm font-black">{profile.followers}</div>
          <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Followers</div>
        </div>
        <div className="border-x border-slate-50 flex-1">
          <div className="text-sm font-black">{profile.following}</div>
          <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Following</div>
        </div>
        <div>
          <div className="text-sm font-black">{profile.aura}</div>
          <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Aura</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 border-b border-slate-50 pb-2">
           <button className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1">Lock-ins</button>
           <button className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tagged</button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-square bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-300 font-black italic">
               POST
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
