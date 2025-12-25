
import React from 'react';
import { SwapResult } from '../types';

interface SwapCardProps {
  result: SwapResult;
}

const SwapCard: React.FC<SwapCardProps> = ({ result }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-50 animate-swap-reveal">
      <div className="bg-emerald-600 p-6 text-white text-center">
        <h3 className="text-xl font-bold opacity-90 uppercase tracking-wider text-emerald-100 text-sm mb-1">
          Your Smart Swap
        </h3>
        <p className="text-2xl font-semibold">Better Choice Found!</p>
      </div>
      
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center md:text-left flex-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Original</span>
            <h4 className="text-2xl font-bold text-gray-400 line-through decoration-emerald-200 decoration-4">
              {result.originalFood}
            </h4>
          </div>

          <div className="flex items-center justify-center p-3 bg-emerald-50 rounded-full shadow-inner animate-pulse">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

          <div className="text-center md:text-right flex-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">Swap to</span>
            <h4 className="text-3xl font-bold text-emerald-900 leading-tight">
              {result.suggestedSwap}
            </h4>
          </div>
        </div>

        <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 transform transition-transform hover:scale-[1.01]">
          <div className="flex items-start gap-4">
            <div className="bg-emerald-600 text-white p-2 rounded-lg mt-1 shrink-0 shadow-lg shadow-emerald-600/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed text-lg italic">
                "{result.explanation}"
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wide">
                  Goal: {result.goal}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
