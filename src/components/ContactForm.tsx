import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';

const MUSIC_GENRES = [
  'Hip Hop', 'Rap', 'Reggaetón', 'Corridos', 'Cumbia', 'Música Urbana', 'Música Romántica'
];

const SERVICES_OFFERED = [
  'Producción Musical', 'Composición', 'Mezcla Analógica', 'Mastering Digital', 'Beats Instrumentales', 'Colaboración Artística'
];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [genre, setGenre] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleServiceToggle = (srv: string) => {
    setSelectedServices(prev => 
      prev.includes(srv) ? prev.filter(item => item !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          genre,
          services: selectedServices,
          message
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'No se pudo enviar el mensaje.');
      }

      setStatus('success');
      setResponseMessage(data.message || '¡Tu mensaje ha sido enviado!');
      
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setGenre('');
      setSelectedServices([]);
      setMessage('');
    } catch (err: any) {
      setStatus('error');
      setResponseMessage(err.message || 'Error de conexión con el estudio. Inténtalo más tarde.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
      {/* Contact Form Details */}
      <div className="lg:col-span-7 glass-card rounded-3xl p-6 md:p-10 border border-white/10 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 left-0 w-32 h-32 bg-cobra-red/5 rounded-full blur-2xl -z-10 pointer-events-none"></div>
        
        <div>
          <h3 className="text-2xl md:text-3xl font-bold font-display uppercase tracking-tight text-white mb-2">
            Iniciar Colaboración
          </h3>
          <p className="text-gray-400 text-sm mb-8">
            ¿Quieres grabar tu próximo éxito? Envíanos tu propuesta. El equipo de <span className="text-gold font-semibold">CobraSoundBeats</span> evaluará tu maqueta de inmediato.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {status === 'success' ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 rounded-2xl flex items-start gap-4 text-sm animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold font-display uppercase text-xs tracking-wider">¡RECIBIDO, PANA!</p>
                  <p className="mt-1 font-sans text-gray-300">{responseMessage}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-[10px] text-gray-400 font-mono uppercase tracking-wider pl-1">Nombre / Nombre Artístico</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Ej: Dark Cobra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-900/60 border border-white/10 hover:border-white/20 focus:border-cobra-red rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors"
                      required
                      disabled={status === 'loading'}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-[10px] text-gray-400 font-mono uppercase tracking-wider pl-1">Correo de Contacto</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="tu-email@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-900/60 border border-white/10 hover:border-white/20 focus:border-cobra-red rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors"
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-[10px] text-gray-400 font-mono uppercase tracking-wider pl-1">WhatsApp (Celular)</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+593 99 999 9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-900/60 border border-white/10 hover:border-white/20 focus:border-cobra-red rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors"
                      disabled={status === 'loading'}
                    />
                  </div>

                  {/* Genre selection */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-genre" className="text-[10px] text-gray-400 font-mono uppercase tracking-wider pl-1">Tu Género Principal</label>
                    <select
                      id="contact-genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="w-full bg-zinc-900/60 border border-white/10 hover:border-white/20 focus:border-cobra-red rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors"
                      disabled={status === 'loading'}
                    >
                      <option value="" className="bg-zinc-900">Seleccionar género...</option>
                      {MUSIC_GENRES.map((g, idx) => (
                        <option key={idx} value={g} className="bg-zinc-900">{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Services multi-select tags */}
                <div className="space-y-2">
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider pl-1 block">Servicios Requeridos de CobraSoundBeats:</span>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES_OFFERED.map((srv, idx) => {
                      const selected = selectedServices.includes(srv);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleServiceToggle(srv)}
                          disabled={status === 'loading'}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 border cursor-pointer ${
                            selected
                              ? 'bg-cobra-red/20 border-cobra-red text-white'
                              : 'bg-zinc-900/40 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-[10px] text-gray-400 font-mono uppercase tracking-wider pl-1">Háblanos de tu proyecto / propuesta</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Cuéntanos: ¿Tienes alguna maqueta grabada? ¿Buscas mezcla, master, instrumentales o una colaboración directa con Dark Cobra?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-white/10 hover:border-white/20 focus:border-cobra-red rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors resize-none"
                    required
                    disabled={status === 'loading'}
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="bg-cobra-red/10 border border-cobra-red/20 text-cobra-red p-4 rounded-xl flex items-center gap-2.5 text-xs font-mono animate-shake">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{responseMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-cobra-red to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold font-display uppercase text-xs tracking-widest py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cobra-red/20 hover:shadow-cobra-red/35"
                >
                  {status === 'loading' ? 'ENVIANDO PROPUESTA...' : 'Mandar Mensaje'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Dark Map Vector & Office Details */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
        {/* Office details card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 flex-1 flex flex-col justify-between">
          <div className="space-y-5">
            <h4 className="text-lg font-bold font-display uppercase tracking-wider text-gold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              Cuentas Oficiales
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cobra-red mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Guayaquil, Ecuador</p>
                  <p className="text-gray-400 mt-0.5">Estudios de Grabación CobraSoundBeats</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cobra-red mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Línea de Producción</p>
                  <p className="text-gray-400 mt-0.5">+593 99 999 9999 (Soporte WhatsApp)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cobra-red mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Booking & Negocios</p>
                  <p className="text-gray-400 mt-0.5">booking@darkcobramusic.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cobra-red mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Horario del Estudio</p>
                  <p className="text-gray-400 mt-0.5">Lunes a Sábado: 10:00 AM - 08:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <a
              href="https://wa.me/593999999999?text=Hola%20CobraSoundBeats,%20estoy%20interesado%20en%20produccion%20musical"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-black font-extrabold font-display uppercase text-[11px] tracking-widest py-3 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              Chatear por WhatsApp
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Premium Stylized Dark Map */}
        <div className="glass-card rounded-3xl p-4 border border-white/10 h-64 relative overflow-hidden flex items-center justify-center bg-zinc-950/40">
          {/* Custom Stylized vector grid background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          
          {/* Cyberpunk Map Design representing Guayaquil coast */}
          <svg className="w-full h-full absolute inset-0 text-zinc-800 opacity-20 pointer-events-none" viewBox="0 0 400 200">
            <path d="M 50 150 Q 150 180 250 140 T 350 160" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M 20 80 Q 180 30 290 90 T 380 40" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M 120 0 Q 150 100 130 200" fill="none" stroke="#C1121F" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Golden Pulse pin */}
          <div className="relative z-10 text-center space-y-2">
            <div className="relative inline-block">
              <span className="absolute -inset-2 bg-cobra-red/30 rounded-full animate-ping pointer-events-none"></span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cobra-red to-gold flex items-center justify-center shadow-lg border-2 border-black-pure">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-white text-xs font-bold font-display uppercase tracking-wide">CobraSoundBeats HQ</p>
              <p className="text-[10px] text-zinc-400 font-mono">Guayaquil, Ecuador (Zona Centro)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
