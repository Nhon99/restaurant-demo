import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { Flame, Calendar, ChefHat, Sparkles } from 'lucide-react';

interface HeroProps {
  language: Language;
  setActiveSection: (section: string) => void;
}

export default function Hero({ language, setActiveSection }: HeroProps) {
  const t = TRANSLATIONS[language];

  const handleScrollTo = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative overflow-hidden bg-[#0a0a0a] py-20 md:py-28 border-b border-white/5" id="hero">
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/2 rounded-full blur-[120px]" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8">
          <div className="inline-flex items-center space-x-2 bg-gold-500/5 border border-gold-500/15 px-3.5 py-1.5 rounded-none text-gold-500 text-[10px] uppercase tracking-[0.3em] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Vietnamesische Küche & Sushi</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-light italic text-white leading-[1.1] tracking-tight">
            {language === 'en' ? (
              <>
                Where Heritage <br />
                <span className="not-italic font-sans font-black text-[#d4af37] uppercase text-4xl sm:text-5xl md:text-6xl tracking-widest block mt-2">
                  Meets Modernity.
                </span>
              </>
            ) : language === 'de' ? (
              <>
                Wo Tradition <br />
                <span className="not-italic font-sans font-black text-[#d4af37] uppercase text-4xl sm:text-5xl md:text-6xl tracking-widest block mt-2">
                  Moderne Trifft.
                </span>
              </>
            ) : (
              <>
                Nơi Truyền Thống <br />
                <span className="not-italic font-sans font-black text-[#d4af37] uppercase text-4xl sm:text-5xl md:text-6xl tracking-widest block mt-2">
                  Gặp Hiện Đại.
                </span>
              </>
            )}
          </h1>

          <p className="text-white/40 text-sm md:text-base max-w-md leading-relaxed">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={() => handleScrollTo('menu')}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 bg-white hover:bg-white/90 text-black font-bold px-8 py-4 text-[11px] uppercase tracking-[0.2em] transition-all"
            >
              <Flame className="w-4 h-4 text-black" />
              <span>{t.exploreMenu}</span>
            </button>

            <button
              onClick={() => handleScrollTo('bowl')}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold px-8 py-4 text-[11px] uppercase tracking-[0.2em] transition-all"
            >
              <ChefHat className="w-4 h-4" />
              <span>{t.buildBowl}</span>
            </button>

            <button
              onClick={() => handleScrollTo('reservation')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 border border-white/20 hover:bg-white/5 text-white font-bold px-8 py-4 text-[11px] uppercase tracking-[0.2em] transition-all"
            >
              <Calendar className="w-4 h-4 text-[#d4af37]" />
              <span>{t.bookTable}</span>
            </button>
          </div>

          {/* Core Commitments / Badges */}
          <div className="grid grid-cols-3 gap-6 pt-8 w-full border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white tracking-wider">100%</span>
              <span className="text-[10px] text-white/40 font-medium uppercase tracking-[0.15em] mt-1">No MSG Added</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#d4af37] tracking-wider">WOK</span>
              <span className="text-[10px] text-white/40 font-medium uppercase tracking-[0.15em] mt-1">High Heat Seared</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-emerald-500/90 tracking-wider">BIO</span>
              <span className="text-[10px] text-white/40 font-medium uppercase tracking-[0.15em] mt-1">Locally Sourced</span>
            </div>
          </div>
        </div>

        {/* Hero Right Media */}
        <div className="lg:col-span-5 relative w-full h-[380px] md:h-[480px] flex items-center justify-center">
          {/* Main frame */}
          <div className="relative w-full h-full border border-white/5 bg-[#111] p-4 shadow-2xl overflow-hidden flex items-center justify-center">
            <div className="relative w-full h-full bg-[#1a1a1a] shadow-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1552611052-33e04de0813de?auto=format&fit=crop&q=80&w=1024"
                alt="Signature Truffle Ramen"
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

              {/* Float ticket overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/90 border border-white/10 p-4 rounded-none flex items-center justify-between backdrop-blur-md z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                    <Flame className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-bold text-[#d4af37] uppercase tracking-[0.2em] leading-none">TODAY'S SPECIAL</h4>
                    <p className="text-xs font-semibold text-white tracking-wide mt-1.5">Asiatische Knusperente in Red Curry</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/30 line-through">€18.50</p>
                  <p className="text-xs font-bold text-[#d4af37]">€14.90</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Circle Badge from Design HTML */}
          <div className="absolute top-1/2 -left-8 w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center -translate-y-1/2 z-30 shadow-xl">
            <div className="text-black text-center leading-tight">
              <p className="text-[9px] uppercase font-bold tracking-widest">Best</p>
              <p className="text-base font-serif italic font-bold">2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
