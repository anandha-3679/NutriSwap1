
import React, { useState } from 'react';
import { UserProfile, UserCategory, HealthGoal } from '../types';

interface ProfileSetupProps {
  onComplete: (profile: Partial<UserProfile>) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<UserProfile>>({
    name: '',
    age: 25,
    gender: 'Other',
    avatar: '🥑',
    category: UserCategory.ADULT,
    goals: [],
    allergies: [],
    points: 0,
    level: 1,
    streak: 1
  });

  const avatars = ['🥑', '🥗', '🥦', '🏃‍♀️', '🏃', '💪', '🍎', '🥕'];

  return (
    <div className="min-h-screen bg-white p-8 animate-in fade-in duration-500">
      <div className="max-w-md mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Setup Profile</h2>
          <p className="text-slate-400 font-medium">Step {step + 1} of 3</p>
        </div>

        {step === 0 && (
          <div className="space-y-8">
            <div className="flex justify-center gap-4 flex-wrap">
              {avatars.map(a => (
                <button
                  key={a}
                  onClick={() => setData({ ...data, avatar: a })}
                  className={`text-4xl p-4 rounded-3xl transition-all ${data.avatar === a ? 'bg-emerald-600 scale-110 shadow-lg' : 'bg-emerald-50 opacity-60'}`}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-5 bg-emerald-50 border-2 border-emerald-100 rounded-2xl outline-none focus:border-emerald-500 font-bold"
                value={data.name}
                onChange={e => setData({ ...data, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Age"
                className="w-full p-5 bg-emerald-50 border-2 border-emerald-100 rounded-2xl outline-none focus:border-emerald-500 font-bold"
                value={data.age}
                onChange={e => setData({ ...data, age: parseInt(e.target.value) })}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="font-black text-center text-xl">Gender & Category</h3>
            <div className="grid grid-cols-3 gap-3">
              {['Male', 'Female', 'Other'].map(g => (
                <button
                  key={g}
                  onClick={() => setData({ ...data, gender: g })}
                  className={`py-4 rounded-2xl font-black text-xs uppercase ${data.gender === g ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {Object.values(UserCategory).map(c => (
                <button
                  key={c}
                  onClick={() => setData({ ...data, category: c })}
                  className={`py-4 rounded-2xl font-black text-xs uppercase ${data.category === c ? 'bg-slate-900 text-white' : 'bg-emerald-50 text-slate-500'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="font-black text-center text-xl">Health Objectives</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(HealthGoal).map(g => (
                <button
                  key={g}
                  onClick={() => {
                    const goals = data.goals || [];
                    setData({ ...data, goals: goals.includes(g) ? goals.filter(x => x !== g) : [...goals, g] });
                  }}
                  className={`p-4 rounded-2xl font-black text-[10px] uppercase text-center border-2 transition-all ${data.goals?.includes(g) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-emerald-50 text-emerald-400'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            if (step < 2) setStep(step + 1);
            else onComplete(data as UserProfile);
          }}
          disabled={step === 0 && !data.name}
          className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-emerald-600/20 disabled:opacity-50 transition-all"
        >
          {step === 2 ? 'Finish Setup' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
