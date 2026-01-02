
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UserProfile, SwapResult } from '../types';
import { fetchAgenticSwap } from '../services/geminiService';
import MacroVisualizer from './MacroVisualizer';

interface LabProps {
  profile: UserProfile;
  onSaveSwap: (swap: SwapResult) => void;
  onOpenScanner: () => void;
}

const Lab: React.FC<LabProps> = ({ profile, onSaveSwap, onOpenScanner }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: `Hello ${profile.name}! I'm your NutriSwap Agent. Tell me what you're craving or what food you want to replace, and I'll find the perfect match for your ${profile.goals[0].toLowerCase()} goal.` }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsThinking(true);

    try {
      const result = await fetchAgenticSwap(userMsg, profile);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: result.explanation, 
        swapResult: result 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered a processing error. Could you try rephrasing your request?" }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-4xl mx-auto glass-container overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-[2rem] p-6 shadow-xl ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-tr-none' 
                : 'bg-white/90 backdrop-blur-md text-slate-800 rounded-tl-none border border-emerald-100'
            }`}>
              <p className="text-lg leading-relaxed font-medium">{msg.content}</p>
              
              {msg.swapResult && (
                <div className="mt-6 pt-6 border-t border-slate-200/50 space-y-6">
                  {/* Reasoning Block */}
                  <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2 block">Agent Reasoning</span>
                    <p className="text-sm text-emerald-800 italic leading-snug">{msg.swapResult.reasoning}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                         <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Swap Recommendation</span>
                         <h4 className="text-2xl font-black text-emerald-900">{msg.swapResult.suggestedSwap}</h4>
                         {msg.swapResult.estimatedPrice && <span className="text-xs text-emerald-600 font-bold">Est: {msg.swapResult.estimatedPrice}</span>}
                      </div>
                      
                      <button 
                        onClick={() => onSaveSwap(msg.swapResult!)}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
                      >
                        Save to Pantry
                      </button>
                    </div>

                    <div className="bg-slate-900 rounded-2xl overflow-hidden p-1 shadow-2xl">
                       <MacroVisualizer original={msg.swapResult.macros.original} swap={msg.swapResult.macros.swap} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] rounded-tl-none border border-emerald-100 shadow-xl flex items-center gap-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Thinking & Reasoning...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white/50 backdrop-blur-xl border-t border-white/20 flex gap-3">
        <button
          onClick={onOpenScanner}
          className="w-16 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm active:scale-95 text-slate-700"
          title="Scan Food"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </button>
        
        <form onSubmit={handleSend} className="flex-1 relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 'A high protein swap for Pizza...'"
            className="w-full bg-white border-2 border-slate-100 rounded-full py-5 px-8 pr-16 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-lg"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="absolute right-3 top-3 bottom-3 w-12 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 disabled:bg-slate-200 transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9-7-9-7V19z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lab;
