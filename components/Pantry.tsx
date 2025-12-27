
import React, { useState } from 'react';
import { SwapResult } from '../types';

interface PantryProps {
  swaps: SwapResult[];
  onRemove: (id: string) => void;
}

const Pantry: React.FC<PantryProps> = ({ swaps, onRemove }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (swaps.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center animate-in fade-in zoom-in-95">
        <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-6xl shadow-inner border border-slate-200/50">
          🥫
        </div>
        <h2 className="text-4xl font-black text-slate-300 tracking-tighter">Your Pantry is Empty</h2>
        <p className="text-slate-400 mt-4 font-medium text-lg max-w-md mx-auto leading-relaxed">
          Start experimenting in <span className="text-emerald-500 font-bold">The Lab</span> or use the <span className="text-emerald-500 font-bold">Scanner</span> to discover and save smart swaps.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end px-4 gap-6">
        <div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-2">The Pantry</h2>
          <p className="text-slate-500 font-medium text-lg">Your curated vault of nutritional innovations.</p>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-xl shadow-emerald-500/5">
           <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Active Inventory</span>
           <span className="text-3xl font-black text-slate-900">{swaps.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {swaps.map(swap => (
          <div key={swap.id} className="group bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-emerald-500/10 transition-all duration-700 overflow-hidden relative">
            <div className="p-10 md:p-14 space-y-10">
              {/* Card Header */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex gap-6 items-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner border border-emerald-100/50 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                    🥗
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-xs font-black text-slate-300 line-through uppercase tracking-wider">{swap.originalFood}</span>
                       <svg className="w-4 h-4 text-emerald-400 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                    <h4 className="text-4xl font-black text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                      {swap.suggestedSwap}
                    </h4>
                  </div>
                </div>
                
                <div className="flex gap-3 self-stretch md:self-start">
                   <button 
                    onClick={() => setExpandedId(expandedId === swap.id ? null : swap.id)}
                    className={`flex-1 md:flex-none px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 ${
                      expandedId === swap.id 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    {expandedId === swap.id ? 'Close Details' : 'View Full Recipe'}
                    <svg className={`w-4 h-4 transition-transform duration-500 ${expandedId === swap.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <button 
                    onClick={() => onRemove(swap.id)}
                    className="p-4 bg-slate-50 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all shadow-sm active:scale-90"
                    title="Remove from Pantry"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>

              {/* Expert Reasoning Section */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-emerald-50/40 p-8 rounded-[2.5rem] border border-emerald-100 relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute -top-6 -right-6 p-4 opacity-[0.03] rotate-12">
                     <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45l8.15 14.1H3.85L12 5.45zM11 11v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-4 block">Agent Logic & Rationalization</span>
                  <p className="text-emerald-900 font-semibold text-lg leading-relaxed italic relative z-10">
                    "{swap.reasoning || swap.explanation}"
                  </p>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-center gap-6 shadow-2xl shadow-emerald-900/10">
                   <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-[10px] font-black uppercase opacity-60">Prep Time</span>
                      <span className="font-black text-xl">⏱ {swap.recipe.prepTime}</span>
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {swap.goals.map(g => (
                        <span key={g} className="text-[9px] font-black uppercase bg-white/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-white/5">
                          {g}
                        </span>
                      ))}
                   </div>
                </div>
              </div>

              {/* Collapsible Content */}
              {expandedId === swap.id && (
                <div className="pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-16 animate-in slide-in-from-top-8 duration-500">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-2">
                       <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                       <h5 className="font-black text-slate-900 uppercase tracking-[0.2em] text-xs">Essential Ingredients</h5>
                    </div>
                    <ul className="grid gap-4">
                      {swap.recipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors group/ing">
                          <span className="text-slate-700 font-bold group-hover/ing:text-emerald-700 transition-colors">{ing.item}</span>
                          <span className="text-emerald-600 font-black text-xs bg-white px-3 py-1.5 rounded-xl shadow-sm border border-emerald-50">{ing.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-2">
                       <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                       <h5 className="font-black text-slate-900 uppercase tracking-[0.2em] text-xs">The Methodology</h5>
                    </div>
                    <div className="space-y-6">
                      {swap.recipe.steps.map((step, i) => (
                        <div key={i} className="flex gap-6 group/step">
                          <span className="flex-shrink-0 w-8 h-8 bg-slate-100 group-hover/step:bg-emerald-600 group-hover/step:text-white transition-all duration-300 text-slate-900 rounded-xl flex items-center justify-center text-xs font-black shadow-inner">
                            {i + 1}
                          </span>
                          <p className="text-slate-600 text-base font-medium leading-relaxed pt-1 group-hover/step:text-slate-900 transition-colors">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pantry;
