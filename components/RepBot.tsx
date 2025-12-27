
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage, UserProfile } from '../types';

interface RepBotProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

const RepBot: React.FC<RepBotProps> = ({ isOpen, onClose, profile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: `Wsg ${profile.name}! I'm RepBot. Ready to optimize your gains? No cap, let's turn that "mid" meal into a god-tier swap. What we looking at?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Initialize GoogleGenAI with named apiKey parameter as per coding guidelines.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are RepBot, a high-energy Gen Z gym-bro nutritionist. 
          Personality traits: Uses slang like "No cap", "W gains", "L", "Mid", "God-tier", "King/Queen", "Glow up". 
          Context: User goal is ${profile.goal}. They are ${profile.age} years old. 
          STRICT SAFETY: They are allergic to: ${profile.allergies.join(', ') || 'Nothing'}. 
          If they ask for a food swap, suggest something healthier that fits their goal and DOES NOT contain their allergens. 
          Be aggressive about health but supportive about gains. Keep responses punchy and fun.`
        }
      });

      // Extract text output using the .text property on the GenerateContentResponse object.
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "Bro, the signal dropped. Try again." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "RepBot is hitting a PR right now. Come back in a second, king." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[60] shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="font-black italic uppercase tracking-tighter text-slate-900">RepBot Intel</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 text-xl font-bold">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-slate-50 text-slate-600 rounded-tl-none border border-slate-100'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask RepBot for a swap..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-slate-300 font-medium text-sm"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-2 w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9-7-9-7V19z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepBot;
