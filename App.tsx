
import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import SwapCard from './components/SwapCard';
import { HealthGoal, SwapResult, UserCategory } from './types';
import { fetchAiSwap } from './services/geminiService';

enum AppView {
  FORM,
  RESULT
}

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.FORM);
  const [result, setResult] = useState<SwapResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (food: string, goals: HealthGoal[], category: UserCategory) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Dynamic swaps for a personalized experience
      const aiResult = await fetchAiSwap(food, goals, category);
      setResult(aiResult);
      setView(AppView.RESULT);
    } catch (err) {
      console.error(err);
      setError("We had trouble finding a personalized swap. Please try a different food name.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setView(AppView.FORM);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Dynamic Header */}
      <header className={`pt-12 pb-8 px-6 text-center transition-all duration-500 ${view === AppView.RESULT ? 'scale-90 opacity-80' : ''}`}>
        <div className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-[1.5rem] mb-6 shadow-sm shadow-emerald-200/50">
          <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
          </svg>
        </div>
        <h1 className="text-6xl font-black text-emerald-950 mb-4 tracking-tighter">
          Nutri<span className="text-emerald-500">Swap</span><span className="text-emerald-300">Pro</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
          {view === AppView.FORM 
            ? "Tailored nutrition swaps for every stage of life." 
            : "Here is your personalized upgrade and recipe."}
        </p>
      </header>

      <main className="px-6">
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border-2 border-red-100 text-red-600 px-6 py-4 rounded-3xl text-center font-bold animate-bounce">
            ⚠️ {error}
          </div>
        )}

        {view === AppView.FORM ? (
          <div className="space-y-12">
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </section>

            <section className="max-w-2xl mx-auto text-center">
              <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em] mb-6">Popular Swaps</p>
              <div className="flex flex-wrap justify-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                {['Mac & Cheese', 'Sweet Soda', 'Fries', 'Candy Bar'].map(item => (
                  <button
                    key={item}
                    onClick={() => handleSearch(item, [HealthGoal.LOWER_CALORIE], UserCategory.ADULT)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-emerald-600 hover:border-emerald-500 transition-all font-bold text-xs"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {result && <SwapCard result={result} onReset={handleReset} />}
          </section>
        )}
      </main>

      <footer className="mt-20 py-10 text-center">
         <div className="flex justify-center gap-6 mb-4 opacity-20">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
         </div>
         <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest">
           Empowering Healthy Choices &copy; {new Date().getFullYear()} NutriSwap
         </p>
      </footer>
    </div>
  );
};

export default App;
