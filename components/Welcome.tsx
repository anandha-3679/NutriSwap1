
import React from 'react';
import { ChiaLogo, ChiaName } from '../App';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
      <div className="mb-8 scale-150">
        <ChiaLogo size={100} />
      </div>
      
      <div className="space-y-2 mb-12">
        <ChiaName size="text-6xl" />
        <p className="text-slate-400 font-medium text-lg tracking-tight">
          Smarter swaps for a better you.
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full max-w-xs py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
      >
        Get Started
      </button>
      
      <div className="mt-10 opacity-20">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Powered by Gemini Agentic AI</p>
      </div>
    </div>
  );
};

export default Welcome;
