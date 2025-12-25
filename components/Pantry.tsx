
import React from 'react';
import { SwapResult } from '../types';

interface PantryProps {
  swaps: SwapResult[];
  onRemove: (id: string) => void;
}

const Pantry: React.FC<PantryProps> = ({ swaps, onRemove }) => {
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
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900">The Pantry</h2>
          <p className="text-slate-500 font-medium">Your curated collection of healthy upgrades.</p>
        </div>
        <div className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
          {swaps.length} Items Collected
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {swaps.map(swap => (
          <div key={swap.id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
                  🥗
                </div>
                <button 
                  onClick={() => onRemove(swap.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>

              <div>
                <span className="text-[10px] font-black text-slate-300 uppercase block mb-1 line-through">{swap.originalFood}</span>
                <h4 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                  {swap.suggestedSwap}
                </h4>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Key Ingredients</span>
                  <p className="text-xs text-slate-600 font-medium line-clamp-2">
                    {swap.recipe.ingredients.map(i => i.item).join(", ")}
                  </p>
                </div>

                <div className="flex gap-2">
                  {swap.goals.slice(0, 2).map(g => (
                    <span key={g} className="text-[9px] font-black uppercase bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md border border-emerald-100">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pantry;
