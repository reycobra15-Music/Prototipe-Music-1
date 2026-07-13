import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const QUICK_QUESTIONS = [
  '¿Cómo puedo colaborar con CobraSoundBeats?',
  '¿Dónde está ubicado el estudio?',
  '¿Qué géneros musicales producen?',
  '¿Cuál es el último estreno de Dark Cobra?'
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: '¡Qué bacán tenerte por aquí, pana! Soy el asistente inteligente oficial de Dark Cobra Music y CobraSoundBeats. ¿Quieres grabar un tema, comprar beats o enterarte de los estrenos? ¡Ponle play y hablemos!'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setErrorMsg('');
    const userMsgId = `msg-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: textToSend
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Keep only last 6 messages as context for token efficiency
      const historyContext = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyContext
        })
      });

      if (!res.ok) {
        throw new Error('No se pudo establecer conexión con el servidor.');
      }

      const data = await res.json();
      const modelMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'model',
        text: data.text || 'Tuvimos un pequeño problema de conexión, pana. Intenta de nuevo.'
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error('Chatbot error:', err);
      setErrorMsg('Error de conexión con el estudio. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-chatbot-widget" className="fixed bottom-24 right-6 z-50">
      {/* Floating neon button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group w-14 h-14 rounded-full bg-cobra-red flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none glow-box-red cursor-pointer"
          aria-label="Abrir Chat de IA"
        >
          {/* Pulsing ring around button */}
          <span className="absolute -inset-1 rounded-full bg-cobra-red/30 pulse-ring pointer-events-none"></span>
          <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute right-0 top-0 w-3.5 h-3.5 rounded-full bg-gold border-2 border-black-pure flex items-center justify-center animate-bounce">
            <span className="w-1.5 h-1.5 rounded-full bg-black-pure"></span>
          </span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[340px] md:w-[380px] h-[500px] rounded-2xl glass-card flex flex-col overflow-hidden border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#0f0f0f] border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cobra-red to-gold flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-white text-sm font-bold font-display tracking-wide flex items-center gap-1.5">
                  CobraSound IA 
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h3>
                <p className="text-[11px] text-gray-400 font-mono">Asistente Oficial de Dark Cobra</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4 bg-black-pure/70">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-cobra-red text-white rounded-tr-none'
                      : 'bg-zinc-900/90 text-gray-100 border border-white/5 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900/90 border border-white/5 text-gray-400 rounded-2xl rounded-tl-none p-3 text-sm flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-cobra-red rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                  </span>
                  <span className="font-mono text-xs">Escribiendo...</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="flex items-center gap-1.5 justify-center bg-cobra-red/10 border border-cobra-red/20 text-cobra-red text-xs p-2.5 rounded-lg font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions suggestion */}
          {messages.length === 1 && (
            <div className="p-3 bg-zinc-950 border-t border-white/5 space-y-1.5">
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider px-1">Preguntas Frecuentes:</p>
              <div className="flex flex-wrap gap-1">
                {QUICK_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="text-[11px] bg-white/5 hover:bg-cobra-red/15 text-gray-300 hover:text-white border border-white/10 hover:border-cobra-red/30 rounded-full px-2.5 py-1 text-left transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 bg-zinc-950 border-t border-white/10 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pregúntame lo que quieras, pana..."
              className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cobra-red transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-xl bg-cobra-red hover:bg-red-700 text-white flex items-center justify-center transition-all focus:outline-none active:scale-95 cursor-pointer"
              disabled={isLoading || !inputText.trim()}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
