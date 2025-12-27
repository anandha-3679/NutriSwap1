
import React, { useState, useRef } from 'react';
import { UserProfile, UserCategory, HealthGoal } from '../types';

interface ProfileSettingsProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  onSync: (email: string) => Promise<void>;
  onOpenAuth: () => void;
}

const AVATAR_OPTIONS = [
  '🥦', '🥑', '🍳', '🥗', '🍎', '🥕', '🥩', '🍋', '🥣', '🏋️', '🧘', '👨‍🍳'
];

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, onUpdate, onSync, onOpenAuth }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email || '');
  const [password, setPassword] = useState(profile.password || '');
  const [phone, setPhone] = useState(profile.phoneNumber || '');
  const [category, setCategory] = useState(profile.category);
  const [selectedGoals, setSelectedGoals] = useState<HealthGoal[]>(profile.goals);
  const [allergyInput, setAllergyInput] = useState('');
  const [allergies, setAllergies] = useState<string[]>(profile.allergies);
  const [avatar, setAvatar] = useState(profile.avatarUrl || '🥦');
  const [isSaving, setIsSaving] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleGoal = (goal: HealthGoal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setShowAvatarPicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate({
        ...profile,
        name,
        email,
        password,
        phoneNumber: phone,
        category,
        goals: selectedGoals,
        allergies,
        avatarUrl: avatar,
        isAuthenticated: true // Ensure they stay authenticated if they were
      });
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 border border-slate-100 space-y-12">
        
        {/* Profile Identity Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 border-b border-slate-50 pb-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] bg-emerald-50 border-4 border-white shadow-2xl flex items-center justify-center text-6xl overflow-hidden">
              {avatar.startsWith('data:') || avatar.startsWith('http') ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                avatar
              )}
            </div>
            <button 
              onClick={() => setShowAvatarPicker(true)}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </button>
          </div>
          
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-1">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Profile & Security</h2>
              <p className="text-slate-400 font-medium">Manage your visuals, password and connected providers.</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               {profile.isAuthenticated ? (
                 <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black border border-emerald-100 uppercase tracking-widest">
                   ✓ Securely Linked via {profile.provider || 'Email'}
                 </div>
               ) : (
                 <button onClick={onOpenAuth} className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-xl text-[10px] font-black border border-rose-100 uppercase tracking-widest hover:bg-rose-100 transition-colors">
                   ○ Not Authenticated - Link Now
                 </button>
               )}
               <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                  LVL {profile.level} Swapper
               </div>
            </div>
          </div>
        </div>

        {/* Avatar Picker Modal */}
        {showAvatarPicker && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
            <div className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl space-y-8 animate-in zoom-in-95">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black text-slate-900">Choose Avatar</h3>
                <button onClick={() => setShowAvatarPicker(false)} className="text-slate-400 hover:text-slate-900">✕</button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {AVATAR_OPTIONS.map(emoji => (
                  <button key={emoji} onClick={() => { setAvatar(emoji); setShowAvatarPicker(false); }} className="w-16 h-16 bg-slate-50 hover:bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl transition-all hover:scale-110">
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-6">
                <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                  Upload Photo
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </div>
            </div>
          </div>
        )}

        {/* Main Settings Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Account Display Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
             </div>

             <div className="space-y-4">
                <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Linked Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
             </div>

             <div className="space-y-4">
                <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" placeholder="+1 (555) 000-0000" />
             </div>

             <div className="space-y-4">
                <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Security Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" placeholder="Change Password" />
             </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Physiological Category</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(UserCategory).map(cat => (
                  <button key={cat} onClick={() => setCategory(cat)} className={`py-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${category === cat ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg scale-[1.05]' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Safety: Allergy Memory</label>
              <div className="flex gap-2">
                <input type="text" value={allergyInput} onChange={(e) => setAllergyInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), setAllergies([...allergies, allergyInput.trim()]), setAllergyInput(''))} placeholder="e.g., Peanuts..." className="flex-1 px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                <button onClick={() => { if(allergyInput.trim()){ setAllergies([...allergies, allergyInput.trim()]); setAllergyInput(''); } }} className="px-6 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] shadow-lg">Add</button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {allergies.map(a => (
                  <span key={a} className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-black border border-rose-100">
                    {a}
                    <button onClick={() => setAllergies(allergies.filter(item => item !== a))} className="text-rose-300 hover:text-rose-600 transition-colors">✕</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleSave} disabled={isSaving} className={`w-full py-6 rounded-[2rem] font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${isSaving ? 'bg-slate-100 text-slate-400 cursor-wait' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/30'}`}>
          {isSaving ? 'Saving Profile...' : 'Update & Secure Profile'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
