
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
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl opacity-30">
          🥫
        </div>
        <h2 className="text-3xl font-black text-slate-300">Your Pantry is Empty</h2>
        <p className="text-slate-400 mt-2 font-medium">Save swaps from The Lab to see them here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">The Pantry</h2>
          <p className="text-slate-500 font-medium">Your curated collection of nutritional upgrades.</p>
        </div>
        <div className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
          {swaps.length} Items Collected
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {swaps.map(swap => (
          <div key={swap.id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
            <div className="p-8 md:p-10 space-y-8">
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                    🥗
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-xs font-black text-slate-300 line-through uppercase tracking-wider">{swap.originalFood}</span>
                       <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                    <h4 className="text-3xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                      {swap.suggestedSwap}
                    </h4>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => setExpandedId(expandedId === swap.id ? null : swap.id)}
                    className="p-3 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all font-bold text-xs flex items-center gap-2"
                  >
                    {expandedId === swap.id ? 'Show Less' : 'Full Recipe'}
                    <svg className={`w-4 h-4 transition-transform ${expandedId === swap.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <button 
                    onClick={() => onRemove(swap.id)}
                    className="p-3 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Remove from Pantry"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>

              {/* reasoning Block */}
              <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45l8.15 14.1H3.85L12 5.45zM11 11v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-3 block">Expert Reasoning</span>
                <p className="text-emerald-900 font-medium leading-relaxed italic relative z-10">
                  "{swap.reasoning || swap.explanation}"
                </p>
              </div>

              {/* Preview Content (Always visible) */}
              <div className="flex flex-wrap gap-3">
                {swap.goals.map(g => (
                  <span key={g} className="text-[10px] font-black uppercase bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg border border-slate-200">
                    {g}
                  </span>
                ))}
                <span className="text-[10px] font-black uppercase bg-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-sm">
                  ⏱ {swap.recipe.prepTime}
                </span>
              </div>

              {/* Expanded Content (Recipe) */}
              {expandedId === swap.id && (
                <div className="pt-8 border-t border-slate-100 grid md:grid-cols-2 gap-10 animate-in slide-in-from-top-4">
                  <div className="space-y-4">
                    <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      Ingredients
                    </h5>
                    <ul className="space-y-3">
                      {swap.recipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-slate-700 font-bold text-sm">{ing.item}</span>
                          <span className="text-emerald-600 font-black text-xs bg-white px-2 py-1 rounded-md shadow-sm">{ing.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      Preparation Steps
                    </h5>
                    <div className="space-y-4">
                      {swap.recipe.steps.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[10px] font-black">
                            {i + 1}
                          </span>
                          <p className="text-slate-600 text-sm font-medium leading-relaxed">{step}</p>
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
