
import React, { useState, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import SwapCard from './components/SwapCard';
import { HealthGoal, SwapResult } from './types';
import { COMMON_SWAPS } from './constants';
import { fetchAiSwap } from './services/geminiService';

const App: React.FC = () => {
  const [result, setResult] = useState<SwapResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (food: string, goal: HealthGoal) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // 1. Check local dictionary first (case insensitive)
      const foundItem = COMMON_SWAPS.find(item => 
        item.food.toLowerCase() === food.toLowerCase()
      );

      if (foundItem && foundItem.swaps[goal]) {
        const swap = foundItem.swaps[goal]!;
        setResult({
          originalFood: foundItem.food,
          suggestedSwap: swap.suggested,
          explanation: swap.explanation,
          goal
        });
        setIsLoading(false);
        return;
      }

      // 2. Fallback to Gemini AI for dynamic swaps
      const aiResult = await fetchAiSwap(food, goal);
      setResult(aiResult);
    } catch (err) {
      console.error(err);
      setError("We couldn't find a swap for that food right now. Please try something else!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Header */}
      <header className="pt-12 pb-16 px-6 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-emerald-900 mb-4 tracking-tight">
          Nutri<span className="text-emerald-600">Swap</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
          The simple way to find healthier alternatives for your favorite cravings.
        </p>
      </header>

      <main className="px-6 space-y-12">
        {/* Search Section */}
        <section>
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {/* Results Section */}
        <section className="min-h-[300px] flex items-start justify-center">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl max-w-lg text-center font-medium">
              {error}
            </div>
          )}

          {!isLoading && !result && !error && (
            <div className="text-center space-y-4 opacity-40">
              <div className="flex justify-center gap-4">
                <span className="px-3 py-1 rounded-full bg-slate-200 text-xs font-bold text-slate-500">LOW CARB</span>
                <span className="px-3 py-1 rounded-full bg-slate-200 text-xs font-bold text-slate-500">PROTEIN</span>
                <span className="px-3 py-1 rounded-full bg-slate-200 text-xs font-bold text-slate-500">LOW CAL</span>
              </div>
              <p className="text-slate-400 font-medium">Enter a food above to get started</p>
            </div>
          )}

          {result && !isLoading && (
            <SwapCard key={`${result.originalFood}-${result.goal}`} result={result} />
          )}
        </section>

        {/* Popular Section */}
        {!result && !isLoading && (
          <section className="max-w-4xl mx-auto pt-10">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mb-8">
              Commonly Swapped
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['White Rice', 'Pasta', 'Mayo', 'Soda', 'Potato Chips', 'Ice Cream'].map(item => (
                <button
                  key={item}
                  onClick={() => handleSearch(item, HealthGoal.LOWER_CALORIE)}
                  className="px-5 py-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all font-medium text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} NutriSwap Engine. Your health, your choice.</p>
      </footer>
    </div>
  );
};

export default App;
