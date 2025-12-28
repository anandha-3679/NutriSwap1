
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage, UserProfile } from '../types';

interface RepBotProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

const RepBot: React.FC<RepBotProps> = ({ isOpen, onClose, profile }) => {
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: `Wsg ${profile.name}! I'm RepBot. Ready to lock in? No cap, I can optimize your gains fr. What's the move today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are RepBot, a Gen Z high-energy gym-bro nutritionist and fitness coach. 
          Use aggressive slang: "No cap", "W gains", "L", "Mid", "God-tier", "Aura", "FR", "Skibidi" (rarely), "Locked in". 
          Context: User is ${profile.name}, age ${profile.age}. They prefer ${profile.foodPrefs}. 
          Allergies: ${profile.allergies.join(', ') || 'None'}. 
          Always avoid allergens. Be supportive but firm about health. W responses only.`
        }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Bruh, the signal is mid right now. Try again fr." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[60] shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="font-black italic uppercase text-black">RepBot Intel</h3>
          </div>
          <button onClick={onClose} className="text-xl font-bold">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[calc(100vh-160px)] no-scrollbar" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-bold leading-relaxed ${
                m.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-slate-50 text-black rounded-tl-none border border-slate-100'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-[10px] font-black text-slate-400 uppercase animate-pulse">Analyzing Gains...</div>}
        </div>
        <div className="p-6 border-t border-slate-50">
          <div className="relative">
            <input 
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask for a God-tier swap..."
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-black font-bold text-sm"
            />
            <button onClick={handleSend} className="absolute right-2 top-2 w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center">
              <span className="text-xs">🚀</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepBot;
