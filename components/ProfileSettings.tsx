
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
    onUpdate({
      name,
      category,
      goals: selectedGoals,
      allergies
    });
    alert("Profile settings synchronized!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 space-y-10 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-6">
        <h3 className="text-3xl font-black text-slate-900">User Identity</h3>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Your Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 transition-all font-bold"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {Object.values(UserCategory).map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`py-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${
                category === cat ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-black text-slate-900">Allergy Memory</h3>
        <form onSubmit={addAllergy} className="flex gap-2">
          <input 
            type="text" 
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            placeholder="e.g., Peanuts, Dairy..."
            className="flex-1 px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 transition-all font-bold"
          />
          <button type="submit" className="px-6 bg-slate-100 text-slate-800 rounded-2xl font-black uppercase text-[10px] hover:bg-slate-200 transition-all">Add</button>
        </form>
        <div className="flex flex-wrap gap-2">
          {allergies.map(a => (
            <span key={a} className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold border border-red-100">
              {a}
              <button onClick={() => removeAllergy(a)} className="text-red-300 hover:text-red-500">×</button>
            </span>
          ))}
          {allergies.length === 0 && <p className="text-xs text-slate-400 italic">No allergies recorded.</p>}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-black text-slate-900">Health Objectives</h3>
        <div className="flex flex-wrap gap-2">
          {Object.values(HealthGoal).map(goal => (
            <button
              key={goal}
              onClick={() => toggleGoal(goal)}
              className={`px-4 py-2 rounded-xl border-2 text-[10px] font-black uppercase transition-all ${
                selectedGoals.includes(goal) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={handleSave}
        className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all"
      >
        Synchronize Profile
      </button>
    </div>
  );
};

export default ProfileSettings;
