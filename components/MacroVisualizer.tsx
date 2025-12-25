
import React from 'react';
import { MacroData } from '../types';

interface MacroVisualizerProps {
  original: MacroData;
  swap: MacroData;
}

const MacroVisualizer: React.FC<MacroVisualizerProps> = ({ original, swap }) => {
  const categories: { key: keyof MacroData; label: string; unit: string; color: string }[] = [
    { key: 'calories', label: 'Calories', unit: 'kcal', color: 'bg-orange-400' },
    { key: 'protein', label: 'Protein', unit: 'g', color: 'bg-emerald-400' },
    { key: 'carbs', label: 'Carbs', unit: 'g', color: 'bg-cyan-400' },
    { key: 'fats', label: 'Fats', unit: 'g', color: 'bg-rose-400' },
  ];

  return (
    <div className="space-y-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
      <h5 className="text-xs font-black uppercase tracking-widest text-white/70 mb-4">Macro Comparison</h5>
      <div className="grid grid-cols-1 gap-6">
        {categories.map((cat) => {
          const origVal = original[cat.key];
          const swapVal = swap[cat.key];
          const maxVal = Math.max(origVal, swapVal, 1);
          
          return (
            <div key={cat.key} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-white/80 uppercase">
                <span>{cat.label}</span>
                <span className="flex gap-4">
                  <span className="opacity-50">Old: {origVal}{cat.unit}</span>
                  <span className="text-white">New: {swapVal}{cat.unit}</span>
                </span>
              </div>
              <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden flex flex-col gap-[2px] p-[2px]">
                <div 
                  className="h-full bg-white/20 rounded-full transition-all duration-1000" 
                  style={{ width: `${(origVal / maxVal) * 100}%` }}
                />
                <div 
                  className={`h-full ${cat.color} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.3)]`} 
                  style={{ width: `${(swapVal / maxVal) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-2 justify-center">
        <div className="flex items-center gap-1.5 text-[10px] text-white/60">
          <div className="w-2 h-2 bg-white/20 rounded-full"></div> Original
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/60">
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div> NutriSwap
        </div>
      </div>
    </div>
  );
};

export default MacroVisualizer;
