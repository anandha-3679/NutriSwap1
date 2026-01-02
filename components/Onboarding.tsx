
import React, { useState } from 'react';

interface OnboardingProps {
  onFinish: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      icon: '🧪',
      title: 'AI Lab & Scanner',
      desc: 'Upload a photo or chat with our AI to instantly find healthy alternatives for any food.'
    },
    {
      icon: '🔥',
      title: 'Streaks & Daily Habits',
      desc: 'Keep your streak alive by making at least one healthy swap every single day.'
    },
    {
      icon: '🏆',
      title: 'XP & Leaderboard',
      desc: 'Earn XP for every swap and climb the global ranks to become a Nutrition Master.'
    }
  ];

  const next = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else onFinish();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-8 animate-in slide-in-from-right duration-500">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div className="w-32 h-32 bg-emerald-50 rounded-[3rem] flex items-center justify-center text-6xl shadow-inner">
          {slides[step].icon}
        </div>
        <div className="space-y-4 max-w-xs">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{slides[step].title}</h2>
          <p className="text-slate-500 font-medium leading-relaxed">{slides[step].desc}</p>
        </div>
      </div>

      <div className="space-y-8 pb-10">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${step === i ? 'w-8 bg-emerald-600' : 'w-2 bg-emerald-100'}`} />
          ))}
        </div>
        
        <button
          onClick={next}
          className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-emerald-600/20 active:scale-95 transition-all"
        >
          {step === slides.length - 1 ? 'Log In / Sign Up' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
