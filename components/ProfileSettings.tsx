
import React, { useState } from 'react';
import { UserProfile, UserCategory, HealthGoal } from '../types';

interface ProfileSettingsProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, onUpdate }) => {
  const [name, setName] = useState(profile.name);
  const [category, setCategory] = useState(profile.category);
  const [selectedGoals, setSelectedGoals] = useState<HealthGoal[]>(profile.goals);
  const [allergyInput, setAllergyInput] = useState('');
  const [allergies, setAllergies] = useState<string[]>(profile.allergies);
  const [isSaving, setIsSaving] = useState(false);

  const toggleGoal = (goal: HealthGoal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const addAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (allergyInput.trim() && !allergies.includes(allergyInput.trim())) {
      setAllergies([...allergies, allergyInput.trim()]);
      setAllergyInput('');
    }
  };

  const removeAllergy = (a: string) => {
    setAllergies(allergies.filter(item => item !== a));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate sync animation
    setTimeout(() => {
      onUpdate({
        ...profile,
        name,
        category,
        goals: selectedGoals,
        allergies
      });
      setIsSaving(false);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 border border-slate-100 space-y-12">
        <div className="flex justify-between items-center border-b border-slate-50 pb-8">
           <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">User Identity</h2>
              <p className="text-slate-400 font-medium">Configure how the agent perceives your needs.</p>
           </div>
           <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl">👤</div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Agent Greeting Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold text-lg"
                placeholder="How should we call you?"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Physiological Category</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(UserCategory).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`py-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${
                      category === cat 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-lg scale-[1.05]' 
                        : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Safety: Allergy Memory</label>
              <form onSubmit={addAllergy} className="flex gap-2">
                <input 
                  type="text" 
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  placeholder="e.g., Peanuts, Dairy..."
                  className="flex-1 px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 transition-all font-bold"
                />
                <button type="submit" className="px-6 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] hover:bg-emerald-700 transition-all shadow-lg active:scale-95">Add</button>
              </form>
              <div className="flex flex-wrap gap-2 pt-2">
                {allergies.map(a => (
                  <span key={a} className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-black border border-rose-100 animate-in zoom-in-50">
                    {a}
                    <button onClick={() => removeAllergy(a)} className="text-rose-300 hover:text-rose-600 font-bold transition-colors">✕</button>
                  </span>
                ))}
                {allergies.length === 0 && <p className="text-xs text-slate-400 italic py-2">No active dietary restrictions.</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Main Health Objectives</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {Object.values(HealthGoal).map(goal => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`px-4 py-4 rounded-2xl border-2 text-[9px] font-black uppercase transition-all flex flex-col items-center justify-center gap-2 ${
                  selectedGoals.includes(goal) 
                    ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                }`}
              >
                <span className="text-xs">{selectedGoals.includes(goal) ? '✓' : '+'}</span>
                <span className="text-center">{goal}</span>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`w-full py-6 rounded-[2rem] font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
            isSaving 
              ? 'bg-slate-100 text-slate-400 cursor-wait' 
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/30'
          }`}
        >
          {isSaving ? (
             <>
               <svg className="animate-spin h-6 w-6 text-slate-400" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Syncing...
             </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Synchronize Profile
            </>
          )}
        </button>
      </div>
      
      <div className="text-center px-10 py-6 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">All changes are saved locally to your device browser memory.</p>
      </div>
    </div>
  );
};

export default ProfileSettings;
