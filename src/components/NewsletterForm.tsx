import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function NewsletterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Ocurrió un error en la suscripción');
      }

      setStatus('success');
      setMessage(data.message || '¡Te has unido con éxito a la dinastía Cobra!');
      setName('');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'No se pudo conectar con el servidor. Inténtalo más tarde.');
    }
  };

  return (
    <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 glow-box-red max-w-3xl mx-auto overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cobra-red/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="text-center max-w-xl mx-auto space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cobra-red/10 border border-cobra-red/25 text-cobra-red mb-2">
          <Mail className="w-5 h-5" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
          Boletín VIP Cobra
        </h2>
        <p className="text-gray-300 text-sm md:text-base">
          Suscríbete para recibir demos exclusivas de <span className="text-gold font-semibold">CobraSoundBeats</span>, noticias detrás de cámaras y acceso anticipado 24 horas antes a cada estreno mundial de <span className="text-cobra-red font-semibold">Dark Cobra Music</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto space-y-4">
        {status === 'success' ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-5 rounded-2xl flex items-start gap-3.5 text-sm animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold font-display uppercase text-xs tracking-wider">¡ÉXITO ROTUNDO, PANA!</p>
              <p className="mt-1 font-sans">{message}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="newsletter-name" className="text-[10px] text-gray-400 font-mono uppercase tracking-wider pl-1">Tu Nombre / A.k.a.</label>
                <input
                  id="newsletter-name"
                  type="text"
                  placeholder="Ej: MC Cobra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  disabled={status === 'loading'}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="newsletter-email" className="text-[10px] text-gray-400 font-mono uppercase tracking-wider pl-1">Tu Correo Electrónico</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="tu-correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-white/10 hover:border-white/20 focus:border-cobra-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  required
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="bg-cobra-red/10 border border-cobra-red/20 text-cobra-red p-4 rounded-xl flex items-center gap-2.5 text-xs font-mono">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-gradient-to-r from-cobra-red to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold font-display uppercase text-xs tracking-widest py-4 px-6 rounded-xl hover:shadow-xl hover:shadow-cobra-red/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  UNIDO AL ESTUDIO...
                </span>
              ) : (
                <>
                  Quiero recibir novedades
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
