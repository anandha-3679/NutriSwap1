
import React, { useState } from 'react';
import { HealthGoal, UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (data: Partial<UserProfile>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    age: 25,
    height: '',
    weight: '',
    goal: HealthGoal.GENERAL_FITNESS,
    allergies: []
  });

  const nextStep = () => setStep(s => s + 1);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8 animate-slide-up">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Setup Protocol</h1>
          <p className="text-slate-400 text-sm font-medium">Initialize your performance data.</p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <Input label="Full Name" placeholder="Athlete Name" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Age" type="number" value={formData.age?.toString()} onChange={v => setFormData({...formData, age: parseInt(v)})} />
                <Input label="Weight (kg)" placeholder="75" value={formData.weight} onChange={v => setFormData({...formData, weight: v})} />
              </div>
              <Input label="Height (cm)" placeholder="180" value={formData.height} onChange={v => setFormData({...formData, height: v})} />
            </div>
            <button onClick={nextStep} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Define Objective</h3>
            <div className="grid gap-4">
              {Object.values(HealthGoal).map(goal => (
                <button 
                  key={goal}
                  onClick={() => setFormData({...formData, goal})}
                  className={`p-6 rounded-2xl text-left border-2 transition-all ${formData.goal === goal ? 'border-green-400 bg-green-50' : 'border-slate-50 bg-white hover:border-slate-100'}`}
                >
                  <p className={`font-bold ${formData.goal === goal ? 'text-green-800' : 'text-slate-900'}`}>{goal}</p>
                </button>
              ))}
            </div>
            <button onClick={nextStep} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">Set Goal</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Dietary Weaknesses (Allergies)</label>
              <textarea 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-slate-300 min-h-[120px]"
                placeholder="Peanuts, Shellfish, etc. (Comma separated)"
                onChange={e => setFormData({...formData, allergies: e.target.value.split(',').map(s => s.trim())})}
              />
            </div>
            <button onClick={() => onComplete(formData)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">Complete Initialization</button>
          </div>
        )}

        <div className="flex justify-center gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${step === i ? 'w-8 bg-slate-900' : 'w-2 bg-slate-100'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Input = ({label, value, onChange, type = "text", placeholder = ""}: any) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-slate-300 transition-all font-medium"
    />
  </div>
);

export default Onboarding;
