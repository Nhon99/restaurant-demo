import { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, LOCATIONS } from '../data';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface LocationsPageProps {
  language: Language;
}

export default function LocationsPage({ language }: LocationsPageProps) {
  const t = TRANSLATIONS[language];
  const [selectedLocId, setSelectedLocId] = useState(LOCATIONS[0].id);
  const [timeState, setTimeState] = useState({ hour: 12, day: 1 });

  // Update real-time German hours
  useEffect(() => {
    try {
      const updateGermanTime = () => {
        const berlinString = new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' });
        const parsed = new Date(berlinString);
        setTimeState({
          hour: parsed.getHours(),
          day: parsed.getDay()
        });
      };
      updateGermanTime();
      const interval = setInterval(updateGermanTime, 60000);
      return () => clearInterval(interval);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const isLocationOpen = (locId: string) => {
    const { hour, day } = timeState;
    if (locId === 'loc1') {
      return hour >= 10 && hour < 22;
    } else if (locId === 'loc2') {
      if (day === 0) return false;
      return hour >= 10 && hour < 20;
    } else {
      if (day === 0) {
        return hour >= 12 && hour < 21;
      }
      return hour >= 11 && (hour < 22 || (hour === 11 && parsedMinutes() >= 30));
    }
  };

  const parsedMinutes = () => {
    try {
      const berlinString = new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' });
      return new Date(berlinString).getMinutes();
    } catch {
      return 0;
    }
  };

  const activeLoc = LOCATIONS.find(l => l.id === selectedLocId)!;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 bg-[#0a0a0a] px-6 md:px-12 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 pt-6">
          <div className="w-12 h-[1px] bg-[#d4af37]"></div>
          <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-semibold">{language === 'vi' ? 'HỆ THỐNG CỬA HÀNG' : language === 'de' ? 'RESTAURANTS' : 'OUR BRANCHES'}</p>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-tight">
            {language === 'vi' ? 'Đến Gặp ' : 'Visit Our '}
            <span className="not-italic font-extrabold text-[#d4af37] uppercase tracking-wider font-sans">{language === 'vi' ? 'A BÉO' : 'RESTAURANTS'}</span>
          </h1>
          <p className="text-white/40 max-w-xl text-xs md:text-sm leading-relaxed">
            {language === 'vi' 
              ? 'Tìm chi nhánh A Béo gần nhất tại Hannover, kiểm tra giờ hoạt động trực tiếp và nhận bản đồ chỉ đường chi tiết.'
              : 'Our beautifully decorated store locations are waiting for you around central spots in Hannover. Experience rich Street Food Atmosphere.'}
          </p>
        </div>

        {/* Content Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Locations Selector cards */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {LOCATIONS.map((loc) => {
              const isOpen = isLocationOpen(loc.id);
              const isSelected = selectedLocId === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocId(loc.id)}
                  className={`p-5 rounded-none border text-left cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-black border-[#d4af37]/30 shadow-xl shadow-white/5'
                      : 'bg-[#111]/10 border-white/5 hover:border-white/20 hover:bg-[#111]/30'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">{loc.name}</h3>
                      {isOpen ? (
                        <span className="inline-flex items-center space-x-1 text-[9px] bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] font-bold px-2.5 py-1 rounded-none uppercase tracking-widest">
                          <CheckCircle2 className="w-3 h-3 text-[#d4af37] animate-pulse" />
                          <span>{t.statusOpen}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[9px] bg-red-950/20 border border-red-500/20 text-red-400 font-bold px-2.5 py-1 rounded-none uppercase tracking-widest">
                          <ShieldAlert className="w-3 h-3 text-red-400" />
                          <span>{t.statusClosed}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/50 flex items-start space-x-1.5 leading-normal font-light">
                      <MapPin className="w-4 h-4 text-[#d4af37]/50 shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-white/30 border-t border-white/5 pt-3 tracking-wider">
                    <span className="flex items-center space-x-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-white/20" />
                      <span>{loc.hours[language]}</span>
                    </span>
                    <span className="flex items-center space-x-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-white/20" />
                      <span>{loc.phone.replace('+49 (0) ', '0')}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Simulated Interactive Map and Route */}
          <div className="lg:col-span-7 bg-[#111]/40 border border-white/5 p-6 rounded-none flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em] block">INTERACTIVE MAP SIMULATION</span>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">{activeLoc.name}</h3>
              <p className="text-xs text-white/50 max-w-xl leading-relaxed font-light">
                We are strategically located around public squares and train stations in Hannover for lightning-fast street food access. Stop by or order online!
              </p>
            </div>

            {/* Simulated map frame using pure styled CSS elements */}
            <div className="relative w-full h-80 bg-black rounded-none border border-white/5 overflow-hidden my-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <div className="absolute top-1/3 left-0 right-0 h-4 bg-[#111] rotate-12" />
              <div className="absolute bottom-1/4 left-0 right-0 h-4 bg-[#111] -rotate-6" />
              <div className="absolute top-0 bottom-0 left-1/3 w-4 bg-[#111] -rotate-12" />
              <div className="absolute top-0 bottom-0 right-1/4 w-4 bg-[#111] rotate-12" />

              <div className="absolute top-10 right-20 w-32 h-20 bg-emerald-950/10 border border-emerald-900/10 rounded-none" />
              <div className="absolute bottom-6 left-12 w-48 h-8 bg-sky-950/5 border-t border-b border-sky-900/10 rounded-full blur-xs" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-none bg-[#d4af37]/10 border border-[#d4af37] flex items-center justify-center text-[#d4af37] shadow-xl shadow-black animate-bounce">
                  <MapPin className="w-6 h-6 animate-pulse" />
                </div>
                <div className="mt-2 bg-black border border-white/10 rounded-none px-3 py-1.5 shadow-2xl text-center">
                  <span className="text-[9px] font-bold text-white block uppercase tracking-wide leading-none">{activeLoc.name}</span>
                  <span className="text-[8px] text-[#d4af37] block font-mono mt-1">Hannover, DE</span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-black border border-white/5 p-2 rounded-none flex items-center space-x-1">
                <span className="text-[9px] text-white/30 font-mono">Map Zoom: 15x • Vector Layer</span>
              </div>
            </div>

            {/* Directions button */}
            <a
              href={activeLoc.gmapsLink}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-white hover:bg-white/90 text-black font-bold py-4 px-6 rounded-none text-[10px] uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all active:scale-98 shadow-lg shadow-white/5 cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-black" />
              <span>{t.getDirections} ({activeLoc.name.substring(7)})</span>
            </a>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
