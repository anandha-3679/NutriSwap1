
import React, { useState } from 'react';
import { HealthGoal } from '../types';

interface SearchFormProps {
  onSearch: (food: string, goal: HealthGoal) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [food, setFood] = useState('');
  const [goal, setGoal] = useState<HealthGoal>(HealthGoal.LOWER_CALORIE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (food.trim()) {
      onSearch(food.trim(), goal);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      <div className="relative">
        <label htmlFor="food-input" className="block text-sm font-medium text-emerald-800 mb-2 ml-1">
          What are you eating?
        </label>
        <input
          id="food-input"
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="e.g., White Bread, Soda, Pasta..."
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-sm bg-white"
          required
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-emerald-800 mb-3 ml-1">
          Choose your nutrition goal
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.values(HealthGoal).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGoal(g)}
              className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                goal === g
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                  : 'bg-white border-emerald-50 text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !food.trim()}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Finding better swaps...
          </>
        ) : (
          'Get Healthier Swap'
        )}
      </button>
    </form>
  );
};

export default SearchForm;
