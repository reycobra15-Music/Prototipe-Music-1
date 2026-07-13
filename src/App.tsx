import React, { useState, useEffect } from 'react';
import { 
  Youtube, Disc, TrendingUp, Music, Calendar, Search, Filter, Play, 
  ArrowUpRight, Share2, Clock, Users, Award, Headphones, Sliders, 
  Eye, ExternalLink, ChevronRight, Check, Heart, BookOpen, AlertCircle,
  HelpCircle, MessageCircle, MapPin
} from 'lucide-react';

import { 
  STATS, LATEST_RELEASE, VIDEOS, DISCOGRAPHY, UPCOMING_RELEASES, 
  GALLERY, BLOG_POSTS, TESTIMONIALS, TIMELINE, FAQS 
} from './data';

import StickyPlayer from './components/StickyPlayer';
import AIChatbot from './components/AIChatbot';
import NewsletterForm from './components/NewsletterForm';
import ContactForm from './components/ContactForm';

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState('all-videos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals and Active items
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);
  
  // Interactive lists states
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [discographyFilter, setDiscographyFilter] = useState('All');
  const [votedSongIds, setVotedSongIds] = useState<string[]>([]);
  const [subscribedPremieres, setSubscribedPremieres] = useState<string[]>([]);
  
  // Custom scroll counter animations
  const [countedStats, setCountedStats] = useState([0, 0, 0, 0]);

  // Countdown timer state
  const [countdown, setCountdown] = useState({ days: 18, hours: 5, minutes: 24, seconds: 42 });

  useEffect(() => {
    // Animate stats counter on mount
    const durations = [2000, 2000, 1500, 1000];
    const steps = 50;
    
    const intervals = STATS.map((stat, index) => {
      let current = 0;
      const stepValue = stat.target / steps;
      const intervalTime = durations[index] / steps;
      
      return setInterval(() => {
        current += stepValue;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(intervals[index]);
        }
        setCountedStats(prev => {
          const next = [...prev];
          next[index] = Math.round(current);
          return next;
        });
      }, intervalTime);
    });

    // Countdown timer interval
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => {
      intervals.forEach(int => clearInterval(int));
      clearInterval(countdownInterval);
    };
  }, []);

  // Format counter values nicely with points (e.g. 54.200)
  const formatStatValue = (val: number, idx: number) => {
    if (idx === 1) {
      // Millions for views
      return (val / 1000000).toFixed(1) + 'M';
    }
    return val.toLocaleString('es-ES');
  };

  // Filter video categories
  const filteredVideos = VIDEOS.filter(v => {
    if (activeTab === 'all-videos') return true;
    return v.category.toLowerCase() === activeTab.toLowerCase();
  });

  // Filter gallery items
  const filteredGallery = galleryFilter === 'All' 
    ? GALLERY 
    : GALLERY.filter(g => g.category === galleryFilter);

  // Filter discography items
  const filteredDiscography = DISCOGRAPHY.filter(song => {
    const matchesGenre = discographyFilter === 'All' || song.genre.includes(discographyFilter);
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          song.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const handleLoveSong = (id: string) => {
    if (votedSongIds.includes(id)) {
      setVotedSongIds(prev => prev.filter(item => item !== id));
    } else {
      setVotedSongIds(prev => [...prev, id]);
    }
  };

  const handleSubscribePremiere = (id: string) => {
    if (subscribedPremieres.includes(id)) {
      setSubscribedPremieres(prev => prev.filter(item => item !== id));
    } else {
      setSubscribedPremieres(prev => [...prev, id]);
    }
  };

  const handleShareWebsite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Dark Cobra Music',
        text: 'Escucha el universo musical premium de Dark Cobra y CobraSoundBeats.',
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace de la web copiado al portapapeles, compártelo con tus panas!');
    }
  };

  const selectedBlog = BLOG_POSTS.find(p => p.id === selectedBlogId);

  return (
    <div className="min-h-screen bg-black-pure text-white font-sans selection:bg-cobra-red selection:text-white pb-32">
      
      {/* TECHNICAL SEO SCHEMA.ORG */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          "name": "Dark Cobra Music",
          "description": "Canal oficial y productora de música urbana ecuatoriana. Hip Hop, Rap, Reggaetón y Corridos.",
          "slogan": "Donde cada canción cuenta una historia.",
          "originPlace": {
            "@type": "Place",
            "name": "Ecuador"
          },
          "genre": ["Hip Hop", "Rap", "Reggaetón", "Corridos", "Cumbia"],
          "musicBy": "CobraSoundBeats"
        })}
      </script>

      {/* HEADER / NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 w-full z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand Name */}
            <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
              <div className="relative">
                <span className="absolute -inset-1 rounded-full bg-cobra-red/30 group-hover:bg-cobra-red/50 blur-sm transition-all duration-300"></span>
                <span className="relative inline-block w-9 h-9 rounded-full bg-gradient-to-tr from-cobra-red to-gold flex items-center justify-center font-bold text-black font-display text-base shadow-inner select-none">
                  🐍
                </span>
              </div>
              <div className="text-left">
                <span className="block font-black text-white font-display text-sm md:text-base tracking-wider leading-none group-hover:text-cobra-red transition-colors">
                  DARK COBRA
                </span>
                <span className="block text-[9px] text-gold font-mono tracking-widest leading-none mt-1">
                  COBRASOUNDBEATS
                </span>
              </div>
            </a>

            {/* Main Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-xs font-mono font-medium tracking-wide">
              <a href="#videos" className="text-gray-300 hover:text-white transition-colors">Videos</a>
              <a href="#biografia" className="text-gray-300 hover:text-white transition-colors">Biografía</a>
              <a href="#estudio" className="text-gray-300 hover:text-white transition-colors">Productora</a>
              <a href="#discografia" className="text-gray-300 hover:text-white transition-colors">Discografía</a>
              <a href="#galeria" className="text-gray-300 hover:text-white transition-colors">Galería</a>
              <a href="#blog" className="text-gray-300 hover:text-white transition-colors">Blog</a>
              <a href="#contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</a>
            </div>

            {/* Quick CTAs */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShareWebsite}
                className="hidden sm:flex w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                title="Compartir Sitio Web"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <a 
                href="https://youtube.com/c/DarkCobraMusic?sub_confirmation=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group bg-cobra-red hover:bg-red-700 text-white font-bold font-display uppercase text-[10px] tracking-widest py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all duration-300 shadow-md shadow-cobra-red/15 hover:shadow-cobra-red/30 cursor-pointer"
              >
                <Youtube className="w-3.5 h-3.5 text-white" />
                <span>Suscribirse</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        {/* Cinematic Backdrop Image representing production studio lights */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&auto=format&fit=crop&q=80" 
            alt="Fondo de Estudio CobraSound" 
            className="w-full h-full object-cover object-center opacity-25 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black-pure via-transparent to-black-pure"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-12 flex flex-col items-center justify-center">
          
          {/* Logo Badge */}
          <div className="mb-6 inline-flex items-center gap-2 bg-cobra-red/10 border border-cobra-red/20 px-4 py-1.5 rounded-full text-xs font-mono text-gold tracking-widest uppercase animate-pulse">
            <span className="w-2 h-2 rounded-full bg-gold"></span>
            ECUADOR AL MUNDO
          </div>

          {/* Large Title */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-display tracking-tight text-white leading-none uppercase">
            BIENVENIDO AL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobra-red via-red-500 to-gold text-glow-red">
              UNIVERSO COBRA
            </span>
          </h1>

          {/* Slogan */}
          <p className="mt-4 text-gray-400 text-sm md:text-xl font-mono tracking-widest max-w-2xl mx-auto">
            "Donde cada canción cuenta una historia."
          </p>

          {/* Genre Badges */}
          <div className="mt-6 flex flex-wrap justify-content-center justify-items-center gap-1.5 max-w-xl mx-auto justify-center text-xs text-zinc-400 font-mono">
            <span className="bg-zinc-900 px-3 py-1 rounded-full border border-white/5">Hip Hop</span>
            <span className="bg-zinc-900 px-3 py-1 rounded-full border border-white/5">Rap</span>
            <span className="bg-zinc-900 px-3 py-1 rounded-full border border-white/5">Reggaetón</span>
            <span className="bg-zinc-900 px-3 py-1 rounded-full border border-white/5">Corridos</span>
            <span className="bg-zinc-900 px-3 py-1 rounded-full border border-white/5">Cumbia</span>
            <span className="bg-zinc-900 px-3 py-1 rounded-full border border-white/5">Música Urbana</span>
            <span className="bg-zinc-900 px-3 py-1 rounded-full border border-white/5">Romántica</span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md">
            <a 
              href="https://youtube.com/c/DarkCobraMusic?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-cobra-red hover:bg-red-700 text-white font-extrabold font-display uppercase text-xs tracking-widest py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-cobra-red/20 glow-box-red"
            >
              <Youtube className="w-4 h-4 text-white" />
              ▶ Suscribirse en YouTube
            </a>
            <a 
              href="#discografia"
              className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-850 text-gray-200 hover:text-white font-extrabold font-display uppercase text-xs tracking-widest py-4 px-8 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all duration-300"
            >
              <Music className="w-4 h-4 text-gold" />
              🎵 Escuchar Música
            </a>
            <a 
              href="#lanzamiento"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-gold hover:text-white font-extrabold font-display uppercase text-xs tracking-widest py-4 px-8 rounded-xl border border-gold/20 flex items-center justify-center gap-2 transition-all duration-300"
            >
              <Disc className="w-4 h-4 text-cobra-red" />
              📀 Último Lanzamiento
            </a>
          </div>

          {/* Counter Stats Container */}
          <div className="mt-16 pt-16 border-t border-white/5 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-3xl md:text-5xl font-black font-display text-white text-glow-gold flex items-center justify-center gap-1">
                    <span>{formatStatValue(countedStats[idx], idx)}</span>
                    <span className="text-cobra-red">{stat.suffix}</span>
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. ULTIMO LANZAMIENTO */}
      <section id="lanzamiento" className="py-24 bg-zinc-950/60 relative scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="mb-12 text-center">
            <span className="text-xs text-cobra-red font-mono uppercase tracking-widest block mb-2">LO MÁS NUEVO</span>
            <h2 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tight text-white">ÚLTIMO LANZAMIENTO</h2>
          </div>

          {/* Big Premium Showcase Card */}
          <div className="glass-card rounded-3xl p-6 md:p-10 border border-white/10 glow-box-red max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
            <div className="absolute top-2 right-2 bg-cobra-red/20 border border-cobra-red text-cobra-red font-mono text-[9px] tracking-widest uppercase rounded-lg px-2 py-1">
              ESTRENO MUNDIAL
            </div>

            {/* Cover image with hover effect */}
            <div className="md:col-span-5 relative group overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img 
                src={LATEST_RELEASE.coverImage} 
                alt={LATEST_RELEASE.title}
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => setActiveVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')}
                  className="w-14 h-14 rounded-full bg-cobra-red text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Release details */}
            <div className="md:col-span-7 space-y-5">
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="bg-zinc-900 border border-white/10 text-gold px-3 py-1 rounded-full">{LATEST_RELEASE.genre}</span>
                <span className="bg-zinc-900 border border-white/10 text-gray-400 px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cobra-red" />
                  {LATEST_RELEASE.duration}
                </span>
                <span className="bg-zinc-900 border border-white/10 text-gray-400 px-3 py-1 rounded-full">Estreno: {LATEST_RELEASE.releaseDate}</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-none uppercase">
                {LATEST_RELEASE.title}
              </h3>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {LATEST_RELEASE.description}
              </p>

              {/* Streaming Links Buttons */}
              <div className="pt-4 grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setActiveVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')}
                  className="bg-cobra-red hover:bg-red-700 text-white font-extrabold font-display uppercase text-[10px] tracking-widest py-3 px-5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Ver videoclip
                </button>
                <a 
                  href={LATEST_RELEASE.links.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-gray-200 hover:text-white font-extrabold font-display uppercase text-[10px] tracking-widest py-3 px-5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Music className="w-3.5 h-3.5 text-gold" />
                  Escuchar ahora
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. VIDEOS DESTACADOS */}
      <section id="videos" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-10">
        
        {/* Section title & filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-center md:text-left">
            <span className="text-xs text-cobra-red font-mono uppercase tracking-widest block mb-2">GALERÍA DE ESTRENOS</span>
            <h2 className="text-3xl md:text-4xl font-black font-display uppercase text-white">VIDEOS DESTACADOS</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-1.5 bg-zinc-900 p-1 rounded-2xl border border-white/5">
            {[
              { id: 'all-videos', label: 'Todos' },
              { id: 'rap', label: 'Rap' },
              { id: 'reggaetón', label: 'Reggaetón' },
              { id: 'corridos', label: 'Corridos' },
              { id: 'románticas', label: 'Románticas' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-cobra-red text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(vid => (
            <div 
              key={vid.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-cobra-red/30 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Thumbnail Area */}
              <div className="relative overflow-hidden aspect-video border-b border-white/5">
                <img 
                  src={vid.thumbnail} 
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => setActiveVideoUrl(vid.youtubeUrl)}
                    className="w-12 h-12 rounded-full bg-cobra-red text-white flex items-center justify-center shadow-lg cursor-pointer transform scale-90 group-hover:scale-100 transition-all duration-300"
                    title="Reproducir video"
                  >
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  </button>
                </div>
                {/* Duration Tag */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                  {vid.duration}
                </div>
              </div>

              {/* Text details */}
              <div className="p-4 space-y-3.5">
                <span className="text-[10px] font-mono uppercase bg-zinc-900 border border-white/10 text-gold px-2.5 py-0.5 rounded-full">
                  {vid.category}
                </span>
                <h3 className="text-white text-sm font-semibold leading-snug font-display line-clamp-2 group-hover:text-gold transition-colors">
                  {vid.title}
                </h3>
                
                <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {vid.views} vistas
                  </span>
                  <span>{vid.date}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => setActiveVideoUrl(vid.youtubeUrl)}
                  className="w-full bg-white/5 hover:bg-cobra-red/10 border border-white/10 hover:border-cobra-red/30 text-gray-300 hover:text-white font-bold font-display uppercase text-[10px] tracking-widest py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  ▶ Mira el Videoclip
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. SOBRE DARK COBRA MUSIC */}
      <section id="biografia" className="py-24 bg-zinc-950/60 relative scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Biography visual collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-96 lg:h-[450px]">
                <img 
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80" 
                  alt="Estudio Cobra"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs text-gold font-mono tracking-wider uppercase mb-1">CUNA DEL TALENTO</p>
                  <p className="text-lg font-bold font-display uppercase">Guayaquil, Ecuador</p>
                </div>
              </div>
              
              {/* Absolutes floating details */}
              <div className="absolute -bottom-6 -right-6 glass-card border border-white/10 p-5 rounded-2xl hidden sm:block max-w-xs shadow-xl">
                <p className="text-cobra-red font-display font-black text-2xl">MÚSICA CON ALMA</p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">Producción artística independiente guiada por la lealtad y la superación.</p>
              </div>
            </div>

            {/* Biography details content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs text-cobra-red font-mono uppercase tracking-widest block mb-2">LA HISTORIA</span>
                <h2 className="text-3xl md:text-5xl font-black font-display uppercase text-white leading-none">
                  SOBRE DARK COBRA MUSIC
                </h2>
              </div>

              <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <p>
                  Surgido en las entrañas de Guayaquil, Ecuador, **Dark Cobra Music** representa la vanguardia de la lírica independiente urbana de Sudamérica. Fundado por el vocalista y productor bajo el paraguas de **CobraSoundBeats**, el proyecto nació con un principio inquebrantable: <span className="text-gold font-semibold">"Donde cada canción cuenta una historia."</span>
                </p>
                <p>
                  Evitando clichés genéricos, nuestras producciones fusionan la garra callejera del Hip Hop andino, la cadencia bailable del Reggaetón de discoteca y la melancolía instrumental sierreña de los Corridos tumbados modernos. Una propuesta auténtica, rústica y cinematográfica.
                </p>
              </div>

              {/* Mission / Vision / Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
                <div className="p-4 bg-zinc-900/60 rounded-2xl border border-white/5 space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-cobra-red/10 text-cobra-red font-mono text-[9px] tracking-wider uppercase font-semibold">Misión</span>
                  <p className="text-gray-300 text-xs leading-relaxed">Inspirar y dar voz a las vivencias reales a través del arte urbano, rompiendo barreras internacionales.</p>
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-2xl border border-white/5 space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-gold/10 text-gold font-mono text-[9px] tracking-wider uppercase font-semibold">Visión</span>
                  <p className="text-gray-300 text-xs leading-relaxed">Consolidar a CobraSoundBeats como el sello de música independiente más respetado y escuchado de Ecuador.</p>
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-2xl border border-white/5 space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-white/10 text-white font-mono text-[9px] tracking-wider uppercase font-semibold">Valores</span>
                  <p className="text-gray-300 text-xs leading-relaxed">Lealtad artística, transparencia profesional, perseverancia de barrio y sonido de alta fidelidad.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Growth Timeline Chronology */}
          <div className="mt-20 pt-16 border-t border-white/5">
            <h3 className="text-xl md:text-2xl font-bold font-display uppercase tracking-wider text-center text-gold mb-12">
              Cronología de Crecimiento
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {TIMELINE.map((evt, idx) => (
                <div 
                  key={evt.id}
                  className="bg-zinc-900/40 border border-white/5 p-5 rounded-2xl relative space-y-3 hover:border-cobra-red/20 transition-all duration-300"
                >
                  <div className="text-xl font-black font-mono text-cobra-red">{evt.year}</div>
                  <h4 className="text-white text-sm font-bold font-display uppercase">{evt.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{evt.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. COBRASOUNDBEATS PRODUCTION DIVISION */}
      <section id="estudio" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs text-cobra-red font-mono uppercase tracking-widest block">EL LABORATORIO SONORO</span>
          <h2 className="text-3xl md:text-5xl font-black font-display uppercase text-white tracking-tight leading-none">
            COBRASOUNDBEATS
          </h2>
          <p className="text-gray-400 text-xs md:text-sm">
            Nuestra productora musical ofrece infraestructura técnica analógica de primera clase en Ecuador para artistas comprometidos con sonar a nivel competitivo mundial.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4 hover:border-cobra-red/30 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-cobra-red/10 border border-cobra-red/25 text-cobra-red flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-wider text-white">Producción Musical</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Arreglos estructurales, dirección de voces y beatmaking a la medida. Damos vida y cohesión a tus ideas primitivas en papel.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4 hover:border-cobra-red/30 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-gold/10 border border-gold/25 text-gold flex items-center justify-center">
              <Disc className="w-5 h-5 animate-spin" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-wider text-white">Composición Lírica</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Escritura creativa de barras de rap, coros de reggaetón y versos sierreños para enganchar con la fibra sensible de tu audiencia.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4 hover:border-cobra-red/30 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-wider text-white">Mezcla Analógica</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Voces al frente con brillo sedoso, compresión de hardware analógico de bulbos y limpieza espectral para nitidez total.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4 hover:border-cobra-red/30 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-wider text-white">Mastering Digital</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Maximizamos la presión sonora competitiva para lucir en Spotify, manteniendo el rango dinámico y evitando saturaciones.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4 hover:border-cobra-red/30 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-cobra-red/10 border border-cobra-red/25 text-cobra-red flex items-center justify-center">
              <Music className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-wider text-white">Beats Instrumentales</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Catálogo exclusivo y licencias personalizadas de instrumentales listos para grabar, optimizados estructuralmente para tus rimas.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4 hover:border-cobra-red/30 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-gold/10 border border-gold/25 text-gold flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-wider text-white">Colaboraciones</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Alianzas directas con artistas nacionales e internacionales para feat, lanzamientos en conjunto y distribución global compartida.
            </p>
          </div>

        </div>
      </section>

      {/* 6. DISCOGRAFÍA */}
      <section id="discografia" className="py-24 bg-zinc-950/60 relative scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Internal Search Engines */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="text-center md:text-left">
              <span className="text-xs text-cobra-red font-mono uppercase tracking-widest block mb-2">CATÁLOGO MUSICAL</span>
              <h2 className="text-3xl md:text-4xl font-black font-display uppercase text-white">EXPLORA LA DISCOGRAFÍA</h2>
            </div>

            {/* Internal Search and Filter Engine */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar canción o género..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cobra-red focus:ring-1 focus:ring-cobra-red transition-all"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto bg-zinc-900 border border-white/10 rounded-xl p-1">
                {['All', 'Rap', 'Reggaetón', 'Corridos', 'Urbana'].map(genreFilter => (
                  <button
                    key={genreFilter}
                    onClick={() => setDiscographyFilter(genreFilter)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                      discographyFilter === genreFilter 
                        ? 'bg-cobra-red text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {genreFilter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Discography Grid */}
          {filteredDiscography.length === 0 ? (
            <div className="text-center py-16 text-zinc-500 space-y-2">
              <AlertCircle className="w-10 h-10 mx-auto text-zinc-600" />
              <p className="font-mono text-sm">No encontramos ningún sencillo que coincida con tu búsqueda, pana.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDiscography.map(song => (
                <div 
                  key={song.id}
                  className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="p-4 flex items-start gap-4">
                    {/* Cover */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-800 border border-white/10 flex-shrink-0 group-hover:scale-102 transition-transform">
                      <img 
                        src={song.coverImage} 
                        alt={song.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meta */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-gold bg-gold/5 border border-gold/15 rounded px-1.5 py-0.5 uppercase tracking-wide">
                          {song.genre}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500">{song.releaseDate}</span>
                      </div>
                      <h4 className="text-white text-sm font-semibold truncate group-hover:text-gold transition-colors font-display uppercase">{song.title}</h4>
                      <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">{song.description}</p>
                    </div>
                  </div>

                  {/* Audio details & buttons */}
                  <div className="px-4 pb-4 space-y-3 pt-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 border-t border-white/5 pt-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cobra-red" />
                        {song.duration}
                      </span>
                      
                      {/* Heart Button */}
                      <button 
                        onClick={() => handleLoveSong(song.id)}
                        className="flex items-center gap-1 group/love cursor-pointer"
                        title="Me Gusta"
                      >
                        <Heart className={`w-4.5 h-4.5 transition-colors ${
                          votedSongIds.includes(song.id) 
                            ? 'text-cobra-red fill-cobra-red' 
                            : 'text-zinc-500 hover:text-cobra-red'
                        }`} />
                        <span className="text-[10px] text-zinc-500">{votedSongIds.includes(song.id) ? 'Liked' : 'Like'}</span>
                      </button>
                    </div>

                    {/* Platform Streaming Buttons */}
                    <div className="grid grid-cols-4 gap-1.5 text-center pt-1">
                      <a 
                        href={song.links.spotify || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-zinc-900 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-zinc-400 hover:text-emerald-400 text-[10px] font-mono py-1.5 rounded-lg transition-all"
                        title="Spotify"
                      >
                        Spotify
                      </a>
                      <a 
                        href={song.links.youtube || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-zinc-900 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 text-zinc-400 hover:text-red-400 text-[10px] font-mono py-1.5 rounded-lg transition-all"
                        title="YouTube"
                      >
                        YouTube
                      </a>
                      <a 
                        href={song.links.appleMusic || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-zinc-900 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 text-[10px] font-mono py-1.5 rounded-lg transition-all"
                        title="Apple Music"
                      >
                        Apple
                      </a>
                      <a 
                        href={song.links.amazonMusic || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-zinc-900 hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 text-zinc-400 hover:text-amber-400 text-[10px] font-mono py-1.5 rounded-lg transition-all"
                        title="Amazon Music"
                      >
                        Amazon
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Core Call to action */}
          <div className="mt-12 text-center">
            <a 
              href="https://youtube.com/c/DarkCobraMusic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold font-display uppercase tracking-wider text-gold hover:text-white border-b border-gold hover:border-white pb-1 transition-all"
            >
              💿 Explora la Discografía Completa en YouTube Music
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* 7. PRÓXIMOS ESTRENOS COUNTER CALENDAR */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs text-cobra-red font-mono uppercase tracking-widest block">CUENTA REGRESIVA</span>
          <h2 className="text-3xl md:text-4xl font-black font-display uppercase text-white leading-none">
            PRÓXIMOS ESTRENOS
          </h2>
          <p className="text-gray-400 text-xs md:text-sm">
            Activa los recordatorios para ser de los primeros en ingresar a la sala de estreno interactiva de YouTube.
          </p>
        </div>

        {/* Calendar and Countdown showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
          
          {/* Animated Countdown box */}
          <div className="glass-card rounded-3xl p-8 border border-white/10 glow-box-red text-center space-y-6">
            <span className="bg-cobra-red/10 border border-cobra-red/25 text-cobra-red text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full inline-block">
              PRÓXIMO HIT: DINASTÍA DE REYES
            </span>

            {/* Countdown Grid */}
            <div className="grid grid-cols-4 gap-4 max-w-xs mx-auto">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black font-mono text-white bg-zinc-900 border border-white/5 rounded-xl py-3 shadow-md">{countdown.days}</div>
                <div className="text-[9px] text-gray-500 font-mono uppercase">Días</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black font-mono text-white bg-zinc-900 border border-white/5 rounded-xl py-3 shadow-md">{countdown.hours}</div>
                <div className="text-[9px] text-gray-500 font-mono uppercase">Horas</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black font-mono text-white bg-zinc-900 border border-white/5 rounded-xl py-3 shadow-md">{countdown.minutes}</div>
                <div className="text-[9px] text-gray-500 font-mono uppercase">Minutos</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black font-mono text-cobra-red bg-zinc-900 border border-white/5 rounded-xl py-3 shadow-md animate-pulse">{countdown.seconds}</div>
                <div className="text-[9px] text-gray-500 font-mono uppercase">Segs</div>
              </div>
            </div>

            <p className="text-gray-300 text-xs max-w-sm mx-auto leading-relaxed">
              Fusión de rap latino clásico con vientos de bronce en vivo. Un himno de lealtad al barrio ecuatoriano producido en CobraSoundBeats.
            </p>

            <button
              onClick={() => handleSubscribePremiere('premiere-dynasty')}
              className={`w-full py-3 px-6 rounded-xl font-bold font-display uppercase text-xs tracking-widest transition-all duration-300 cursor-pointer ${
                subscribedPremieres.includes('premiere-dynasty')
                  ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                  : 'bg-cobra-red hover:bg-red-700 text-white shadow-lg shadow-cobra-red/10'
              }`}
            >
              {subscribedPremieres.includes('premiere-dynasty') 
                ? '🔔 ¡RECORDATORIO ACTIVADO!' 
                : '🔔 Activar Recordatorio'}
            </button>
          </div>

          {/* Lists calendar */}
          <div className="space-y-4">
            {UPCOMING_RELEASES.map(up => (
              <div 
                key={up.id}
                className="bg-zinc-900/40 border border-white/5 hover:border-white/10 p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-gold/10 border-l border-b border-gold/20 text-gold font-mono text-[9px] tracking-wider uppercase px-3 py-1">
                  {up.hype}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 block">Estreno en Agosto</span>
                  <h4 className="text-white text-base font-bold font-display uppercase tracking-tight">{up.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{up.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="text-xs text-gold font-mono">{up.genre}</span>
                  <button 
                    onClick={() => handleSubscribePremiere(up.id)}
                    className="text-[10px] font-mono text-white bg-white/5 hover:bg-cobra-red/10 border border-white/10 rounded-lg px-3 py-1.5 transition-all cursor-pointer"
                  >
                    {subscribedPremieres.includes(up.id) ? '✓ Guardado' : '+ Guardar'}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. GALERÍA PHOTO LIGHTBOX */}
      <section id="galeria" className="py-24 bg-zinc-950/60 relative scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="text-center md:text-left">
              <span className="text-xs text-cobra-red font-mono uppercase tracking-widest block mb-2">GALERÍA VISUAL</span>
              <h2 className="text-3xl md:text-4xl font-black font-display uppercase text-white">FOTOS Y BACKSTAGE</h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-1.5 bg-zinc-900 p-1 rounded-2xl border border-white/5">
              {['All', 'Estudio', 'Eventos', 'Backstage', 'Videoclips'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    galleryFilter === cat 
                      ? 'bg-cobra-red text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {cat === 'All' ? 'Todos' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredGallery.map(img => (
              <div 
                key={img.id}
                onClick={() => setLightboxImage({ url: img.url, title: img.title })}
                className="relative group aspect-square rounded-2xl overflow-hidden border border-white/5 cursor-zoom-in"
                title="Ampliar foto"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Overlay Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black-pure/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[9px] font-mono text-gold uppercase">{img.category}</span>
                  <h4 className="text-white text-xs font-bold font-display uppercase tracking-tight">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. BLOG NOTICIAS / DETRÁS DE CÁMARAS */}
      <section id="blog" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs text-cobra-red font-mono uppercase tracking-widest block">CONOCIMIENTO Y NOVEDADES</span>
          <h2 className="text-3xl md:text-5xl font-black font-display uppercase text-white leading-none">
            BLOG DE COBRA
          </h2>
          <p className="text-gray-400 text-xs md:text-sm">
            Noticias exclusivas, detrás de micrófonos, entrevistas sierreñas y consejos técnicos de producción.
          </p>
        </div>

        {/* Grid articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map(post => (
            <div 
              key={post.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Cover */}
              <div className="aspect-video relative overflow-hidden bg-zinc-950 border-b border-white/5">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-cobra-red text-white font-mono text-[9px] tracking-wider uppercase px-2.5 py-0.5 rounded-full">
                  {post.category}
                </div>
              </div>

              {/* Text */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] text-zinc-500 font-mono">{post.date} • {post.readTime}</span>
                  <h3 className="text-white text-base font-bold font-display line-clamp-2 uppercase group-hover:text-gold transition-colors">{post.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <button 
                    onClick={() => setSelectedBlogId(post.id)}
                    className="text-xs font-bold font-display text-gold group-hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Leer Artículo Completo
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 10. TESTIMONIOS CAROUSEL SLIDER */}
      <section className="py-24 bg-zinc-950/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs text-cobra-red font-mono uppercase tracking-widest block">LA FAMILIA COBRA</span>
            <h2 className="text-3xl md:text-4xl font-black font-display uppercase text-white leading-none">
              TESTIMONIOS DE LA COMUNIDAD
            </h2>
          </div>

          {/* Testimonial slider grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {TESTIMONIALS.map(test => (
              <div 
                key={test.id}
                className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between space-y-5 relative"
              >
                {/* Quotes visual accent */}
                <span className="absolute top-4 right-4 text-cobra-red/10 font-black font-display text-6xl pointer-events-none select-none">“</span>
                
                <p className="text-gray-300 text-xs italic leading-relaxed z-10">
                  "{test.comment}"
                </p>

                <div className="flex items-center gap-3">
                  <img 
                    src={test.avatar} 
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-white text-xs font-bold font-display uppercase">{test.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-wide">{test.role}</p>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-gold bg-gold/5 border border-gold/10 px-2 py-0.5 rounded-lg self-start">
                  via {test.platform}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. NEWSLETTER */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterForm />
      </section>

      {/* 12. CONTACTO / MAPA */}
      <section id="contacto" className="py-24 bg-zinc-950/60 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-black-pure border-t border-white/5 py-12 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1: Info and Slogan */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-tr from-cobra-red to-gold flex items-center justify-center font-bold text-black font-display text-xs shadow-inner">
                  🐍
                </span>
                <span className="font-black font-display text-white tracking-widest text-base">DARK COBRA</span>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">
                Sello artístico y estudio de grabación independiente desde Guayaquil, Ecuador. Llevamos tu lírica al frente con nitidez competitiva mundial.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-widest">Navegación</h4>
              <ul className="space-y-2 font-mono text-[11px]">
                <li><a href="#hero" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#videos" className="hover:text-white transition-colors">Videoclips</a></li>
                <li><a href="#estudio" className="hover:text-white transition-colors">CobraSoundBeats</a></li>
                <li><a href="#discografia" className="hover:text-white transition-colors">Discografía</a></li>
              </ul>
            </div>

            {/* Column 3: Legal Policy Links */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-widest">Legal</h4>
              <ul className="space-y-2 font-mono text-[11px]">
                <li><a href="#legal-privacidad" className="hover:text-white transition-colors">Políticas de Privacidad</a></li>
                <li><a href="#legal-terminos" className="hover:text-white transition-colors">Términos del Servicio</a></li>
                <li><a href="/sitemap.xml" target="_blank" className="hover:text-white transition-colors">Sitemap XML</a></li>
                <li><a href="/robots.txt" target="_blank" className="hover:text-white transition-colors">Robots TXT</a></li>
              </ul>
            </div>

            {/* Column 4: Social Accounts */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-widest">Siguenos</h4>
              <div className="flex flex-wrap gap-2 pt-1">
                <a 
                  href="https://youtube.com/c/DarkCobraMusic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cobra-red transition-all"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cobra-red transition-all"
                  title="Instagram"
                >
                  <Heart className="w-4 h-4" />
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cobra-red transition-all"
                  title="TikTok"
                >
                  <Music className="w-4 h-4" />
                </a>
                <a 
                  href="https://spotify.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cobra-red transition-all"
                  title="Spotify"
                >
                  <Disc className="w-4 h-4" />
                </a>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono mt-2">© 2026 CobraSoundBeats. Guayaquil, Ecuador.</p>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 text-center text-[10px] text-zinc-600 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>Hecho con pasión sierreña y flow urbano por Dark Cobra Music.</p>
            <p className="flex items-center gap-1 justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Lighthouse Score Optimizado &gt; 95 (Core Web Vitals)
            </p>
          </div>

        </div>
      </footer>

      {/* FLOAT ACTION WHATSAPP CHAT BUTTON */}
      <a 
        href="https://wa.me/593999999999?text=Hola%20CobraSoundBeats,%20quiero%20cotizar%20produccion%20musical"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] hover:bg-[#1ebd59] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
        title="Enviar WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
      </a>

      {/* ==================================== MODAL OVERLAYS ==================================== */}

      {/* 1. Video Player Modal overlay */}
      {activeVideoUrl && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-4xl w-full aspect-video bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <button 
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 bg-black/80 hover:bg-cobra-red text-white p-2 rounded-full transition-colors z-10 cursor-pointer"
              title="Cerrar video"
            >
              ✕
            </button>
            <iframe 
              src={activeVideoUrl} 
              title="YouTube video player" 
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* 2. Blog Reader Modal overlay */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300">
          <div className="bg-zinc-950 border border-white/10 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8">
            {/* Header / Cover image inside modal */}
            <div className="aspect-video relative overflow-hidden bg-zinc-900 border-b border-white/5">
              <img 
                src={selectedBlog.image} 
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
              <button 
                onClick={() => setSelectedBlogId(null)}
                className="absolute top-4 right-4 bg-black-pure/80 hover:bg-cobra-red text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                title="Cerrar artículo"
              >
                ✕
              </button>
            </div>

            {/* Reading Content */}
            <div className="p-6 md:p-10 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-gold bg-gold/5 border border-gold/15 rounded px-2.5 py-0.5 uppercase tracking-wide">
                  {selectedBlog.category}
                </span>
                <span className="text-zinc-500 font-mono text-xs block pt-1">{selectedBlog.date} • {selectedBlog.readTime}</span>
                <h3 className="text-white text-2xl md:text-3xl font-black font-display uppercase tracking-tight leading-tight">
                  {selectedBlog.title}
                </h3>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 bg-zinc-900/40 border border-white/5 p-3.5 rounded-xl">
                <span className="w-8 h-8 rounded-full bg-cobra-red flex items-center justify-center text-[10px] font-bold text-white select-none">🐍</span>
                <div>
                  <p className="text-white text-xs font-bold font-display uppercase">{selectedBlog.author}</p>
                  <p className="text-[9px] text-zinc-500 font-mono">Editor Oficial Dark Cobra Music</p>
                </div>
              </div>

              {/* HTML/Markdown Content parser */}
              <div className="text-gray-300 text-sm leading-relaxed space-y-4 font-sans border-t border-white/5 pt-6 whitespace-pre-wrap">
                {selectedBlog.content}
              </div>

              <div className="border-t border-white/5 pt-6 flex justify-between items-center text-xs text-zinc-500 font-mono">
                <span>¿Te gustó la historia? ¡Compártela!</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('¡Enlace de la web copiado, pana! Compártelo con tus amigos de la música.');
                  }}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl border border-white/10 transition-colors cursor-pointer"
                >
                  Copiar Enlace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Image Lightbox Modal overlay */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-250"
        >
          <div className="relative max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 bg-black/80 hover:bg-cobra-red text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              title="Cerrar imagen"
            >
              ✕
            </button>
            <img 
              src={lightboxImage.url} 
              alt={lightboxImage.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
          <p className="text-white text-sm font-semibold font-display tracking-wide uppercase mt-4 text-center">{lightboxImage.title}</p>
          <p className="text-zinc-400 text-xs font-mono mt-1">Haga clic en cualquier lado para cerrar</p>
        </div>
      )}

      {/* ==================================== FLOATING ASSETS INTERACTION ==================================== */}
      
      {/* 1. Immersive Audio Player Sticky docking */}
      <StickyPlayer />

      {/* 2. Intelligent AI Assistant Chatbot */}
      <AIChatbot />

    </div>
  );
}
