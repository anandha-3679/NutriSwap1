
import React, { useState } from 'react';
import { UserProfile, HealthGoal } from '../types';
import { FireBoyIcon } from '../App';

interface OnboardingProps {
  onComplete: (data: Partial<UserProfile>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    age: '',
    foodPrefs: '',
    allergies: '',
    password: '',
    confirmPassword: ''
  });

  const next = () => setStep(s => s + 1);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 text-center animate-in fade-in duration-500">
      <div className="mb-8">
        <FireBoyIcon size={80} />
      </div>
      
      <div className="max-w-xs w-full space-y-8">
        {step === 1 && (
          <div className="space-y-6">
            <h1 className="text-3xl font-black tracking-tight italic uppercase">Join the Squad</h1>
            <p className="text-slate-400 text-sm font-medium">Create your identity, no cap.</p>
            <div className="space-y-3">
              <Input placeholder="@username" value={formData.username} onChange={v => setFormData({...formData, username: v})} />
              <Input placeholder="Full Name" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
              <Input placeholder="Age" type="number" value={formData.age} onChange={v => setFormData({...formData, age: v})} />
            </div>
            <button onClick={next} className="w-full py-4 bg-black text-white rounded-xl font-black uppercase text-xs">Next Set</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h1 className="text-3xl font-black tracking-tight italic uppercase">Vibe Check</h1>
            <p className="text-slate-400 text-sm font-medium">What's your fuel protocol?</p>
            <div className="space-y-3">
              <Input placeholder="Food Preferences (e.g. Keto, Vegan)" value={formData.foodPrefs} onChange={v => setFormData({...formData, foodPrefs: v})} />
              <Input placeholder="Allergies (comma separated)" value={formData.allergies} onChange={v => setFormData({...formData, allergies: v})} />
            </div>
            <button onClick={next} className="w-full py-4 bg-black text-white rounded-xl font-black uppercase text-xs">Almost There</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h1 className="text-3xl font-black tracking-tight italic uppercase">Secure Your Aura</h1>
            <p className="text-slate-400 text-sm font-medium">Choose a password that's lowkey unhackable.</p>
            <div className="space-y-3">
              <Input type="password" placeholder="Password" value={formData.password} onChange={v => setFormData({...formData, password: v})} />
              <Input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={v => setFormData({...formData, confirmPassword: v})} />
            </div>
            <button 
              onClick={() => onComplete({...formData, age: parseInt(formData.age), allergies: formData.allergies.split(',')})} 
              className="w-full py-4 bg-black text-white rounded-xl font-black uppercase text-xs"
            >
              Lock In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Input = ({value, onChange, placeholder, type = "text"}: any) => (
  <input 
    type={type}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-black transition-all font-bold placeholder:text-slate-300 placeholder:font-bold"
  />
);

export default Onboarding;
