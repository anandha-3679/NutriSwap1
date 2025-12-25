
import React from 'react';
import { SwapResult } from '../types';

interface SwapCardProps {
  result: SwapResult;
  onReset: () => void;
}

const SwapCard: React.FC<SwapCardProps> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-swap-reveal">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-emerald-50">
        <div className="bg-emerald-600 p-8 text-white relative">
          <button 
            onClick={onReset}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            title="Start Over"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <div className="flex items-center gap-3 mb-2 opacity-90">
             <span className="px-3 py-1 bg-emerald-500/50 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
               {result.category} Optimized
             </span>
          </div>
          <h3 className="text-3xl font-black">Your Nutrition Upgrade</h3>
        </div>
        
        <div className="p-8 md:p-10 space-y-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
            <div className="text-center md:text-left flex-1 group">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] block mb-3">Instead of</span>
              <h4 className="text-3xl font-bold text-slate-300 line-through decoration-emerald-100 decoration-8 underline-offset-4">
                {result.originalFood}
              </h4>
            </div>

            <div className="flex items-center justify-center p-4 bg-emerald-50 rounded-full shadow-inner ring-8 ring-emerald-50/50">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            <div className="text-center md:text-right flex-1">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em] block mb-3">Enjoy this</span>
              <h4 className="text-4xl font-black text-emerald-900 leading-tight">
                {result.suggestedSwap}
              </h4>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
            <div className="space-y-4">
              <h5 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Why it works
              </h5>
              <p className="text-slate-600 text-lg leading-relaxed font-medium italic bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50">
                "{result.explanation}"
              </p>
              <div className="flex flex-wrap gap-2">
                {result.goals.map(g => (
                  <span key={g} className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-lg border border-slate-200">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                The 1-Portion Recipe
              </h5>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">Ingredients</span>
                    <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500 uppercase">
                      ⏱ {result.recipe.prepTime}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {result.recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex justify-between text-sm border-b border-slate-200/50 pb-1">
                        <span className="text-slate-700 font-medium">{ing.item}</span>
                        <span className="text-emerald-600 font-bold">{ing.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block mb-3">Steps</span>
                  <ol className="space-y-3">
                    {result.recipe.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-snug text-slate-600">
                        <span className="shrink-0 w-5 h-5 bg-white border border-slate-200 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-black">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onReset}
        className="w-full py-4 text-slate-400 font-bold hover:text-emerald-600 transition-colors flex items-center justify-center gap-2"
      >
        Search another food
      </button>
    </div>
  );
};

export default SwapCard;
