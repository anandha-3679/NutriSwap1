
import React, { useState } from 'react';
import { HealthGoal, UserCategory } from '../types';

interface SearchFormProps {
  onSearch: (food: string, goals: HealthGoal[], category: UserCategory) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [food, setFood] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<HealthGoal[]>([HealthGoal.LOWER_CALORIE]);
  const [category, setCategory] = useState<UserCategory>(UserCategory.ADULT);

  const toggleGoal = (goal: HealthGoal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal) 
        : [...prev, goal]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (food.trim() && selectedGoals.length > 0) {
      onSearch(food.trim(), selectedGoals, category);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-10 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-emerald-50">
      <div className="space-y-4">
        <label className="block text-sm font-bold text-emerald-900 uppercase tracking-widest ml-1">
          1. Who is this for?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {Object.values(UserCategory).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`py-3 rounded-2xl border-2 font-semibold transition-all flex flex-col items-center gap-1 ${
                category === cat
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg scale-[1.02]'
                  : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-emerald-200'
              }`}
            >
              <span className="text-xl">
                {cat === UserCategory.KID ? '🧒' : cat === UserCategory.ADULT ? '🧑' : '👵'}
              </span>
              <span className="text-xs uppercase">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label htmlFor="food-input" className="block text-sm font-bold text-emerald-900 uppercase tracking-widest ml-1">
          2. What are we swapping?
        </label>
        <input
          id="food-input"
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="e.g., Chicken Nuggets, Mac & Cheese..."
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-slate-50/50"
          required
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-emerald-900 uppercase tracking-widest ml-1">
          3. Select your health goals
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.values(HealthGoal).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => toggleGoal(g)}
              className={`py-2 px-4 rounded-full border-2 text-sm font-bold transition-all ${
                selectedGoals.includes(g)
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
              }`}
            >
              {selectedGoals.includes(g) && <span className="mr-1">✓</span>}
              {g}
            </button>
          ))}
        </div>
        {selectedGoals.length === 0 && <p className="text-xs text-red-500 font-medium">Please select at least one goal.</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading || !food.trim() || selectedGoals.length === 0}
        className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-xl rounded-2xl shadow-xl shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all flex items-center justify-center gap-3 transform active:scale-[0.98]"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Personalizing your swap...
          </>
        ) : (
          'Find My Perfect Swap'
        )}
      </button>
    </form>
  );
};

export default SearchForm;
