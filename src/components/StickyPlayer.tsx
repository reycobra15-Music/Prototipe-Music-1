import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, ChevronDown, ChevronUp } from 'lucide-react';

interface Track {
  title: string;
  genre: string;
  url: string;
}

const PLAYLIST: Track[] = [
  {
    title: 'Veneno Letal (Sierreño Rap Beat)',
    genre: 'Rap / Corridos Tumbados',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    title: 'Noches de Guayaquil (Club Instrumental)',
    genre: 'Reggaetón Urbano',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    title: 'Cobra Imperial (Boombap Freestyle Beat)',
    genre: 'Hip Hop',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

export default function StickyPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(currentTrack.url);
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    const handleEnded = () => {
      handleNext();
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log('Audio playback blocked: ', err));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log('Audio playback blocked: ', err));
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setProgress(val);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div 
      id="sticky-music-player"
      className={`fixed bottom-0 left-0 w-full z-40 transition-all duration-300 ${
        isMinimized ? 'translate-y-[calc(100%-48px)]' : 'translate-y-0'
      }`}
    >
      {/* Control bar for toggling */}
      <div className="bg-[#121212] border-t border-white/10 flex justify-between items-center px-4 py-2 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <Music className={`w-3.5 h-3.5 text-cobra-red ${isPlaying ? 'animate-spin' : ''}`} />
          <span className="font-mono tracking-wider text-[10px] text-gold">REPRODUCTOR OFICIAL COBRASOUNDBEATS</span>
        </div>
        <button 
          onClick={() => setIsMinimized(!isMinimized)}
          className="hover:text-white transition-colors p-1"
          aria-label={isMinimized ? "Maximizar reproductor" : "Minimizar reproductor"}
        >
          {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Main player bar */}
      <div className="bg-[#0b0b0b]/95 backdrop-blur-xl border-t border-white/5 px-4 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 w-full md:w-1/4">
          <div className="relative group overflow-hidden rounded-md bg-zinc-800 w-12 h-12 flex-shrink-0 flex items-center justify-center border border-white/10">
            {isPlaying ? (
              <div className="flex gap-0.5 items-end h-5 w-6">
                <span className="w-1 bg-cobra-red animate-[bounce_0.8s_infinite_0.1s] h-3"></span>
                <span className="w-1 bg-gold animate-[bounce_0.8s_infinite_0.3s] h-5"></span>
                <span className="w-1 bg-cobra-red animate-[bounce_0.8s_infinite_0.2s] h-4"></span>
                <span className="w-1 bg-white animate-[bounce_0.8s_infinite_0.4s] h-2"></span>
              </div>
            ) : (
              <Music className="w-5 h-5 text-zinc-500" />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-white text-sm font-semibold truncate font-display">{currentTrack.title}</h4>
            <p className="text-xs text-gold/80 truncate font-mono">{currentTrack.genre}</p>
          </div>
        </div>

        {/* Center Controls & Timeline */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4">
          <div className="flex items-center gap-5">
            <button 
              onClick={handlePrev}
              className="text-gray-400 hover:text-white transition-colors"
              title="Anterior"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-cobra-red flex items-center justify-center text-white hover:scale-105 transition-transform shadow-lg shadow-cobra-red/20 hover:shadow-cobra-red/40"
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
            </button>
            <button 
              onClick={handleNext}
              className="text-gray-400 hover:text-white transition-colors"
              title="Siguiente"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Slider */}
          <div className="flex items-center gap-2.5 w-full text-[11px] text-gray-400 font-mono">
            <span>{formatTime(progress)}</span>
            <input 
              type="range"
              min={0}
              max={duration || 100}
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cobra-red hover:accent-gold transition-colors focus:outline-none"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Volume Controls */}
        <div className="hidden md:flex items-center justify-end gap-3 w-full md:w-1/4">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input 
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cobra-red hover:accent-gold focus:outline-none"
          />
          <span className="text-[10px] text-zinc-500 font-mono">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
