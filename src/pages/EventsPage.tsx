import { Language, RestaurantEvent } from '../types';
import { motion } from 'motion/react';
import { Calendar, MapPin, Sparkles, AlertCircle } from 'lucide-react';

interface EventsPageProps {
  language: Language;
  events: RestaurantEvent[];
}

export default function EventsPage({ language, events }: EventsPageProps) {
  const isVi = language === 'vi';
  const isDe = language === 'de';

  const tTitle = isVi ? 'Sự Kiện & Khuyến Mãi' : isDe ? 'Events & Specials' : 'Events & Specials';
  const tSubtitle = isVi 
    ? 'Cập nhật những hoạt động văn hóa đặc sắc, tiệc buffet theo mùa và sự kiện giao lưu trực tiếp tại A Béo.'
    : isDe 
    ? 'Erleben Sie einzigartige kulturelle Aktivitäten, saisonale Buffets und Live-Aktionen in unseren Hannoveraner Restaurants.'
    : 'Join us for cultural festivities, culinary masterclasses, and seasonal street markets at our branches.';

  const activeEvents = events.filter(e => e.active);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : language === 'de' ? 'de-DE' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 bg-[#0a0a0a] px-6 md:px-12 border-b border-white/5 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 pt-6">
          <div className="w-12 h-[1px] bg-[#d4af37]"></div>
          <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-semibold">
            {isVi ? 'PHÁT HÀNH SỰ KIỆN' : isDe ? 'COMMUNITY & EVENTS' : 'SPECIAL MOMENTS'}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-tight">
            {isVi ? 'Sự Kiện Tại ' : 'Events at '}
            <span className="not-italic font-extrabold text-[#d4af37] uppercase tracking-wider font-sans">A BÉO</span>
          </h1>
          <p className="text-white/40 max-w-xl text-xs md:text-sm leading-relaxed">
            {tSubtitle}
          </p>
        </div>

        {activeEvents.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-white/5 p-12">
            <AlertCircle className="w-12 h-12 text-[#d4af37]/40 mx-auto mb-4 animate-bounce" />
            <p className="text-white/50 text-sm">
              {isVi 
                ? 'Hiện tại không có sự kiện nào sắp diễn ra. Quý khách vui lòng quay lại sau!' 
                : isDe 
                ? 'Derzeit sind keine geplanten Veranstaltungen verfügbar. Schauen Sie bald wieder vorbei!' 
                : 'No active events found. Please check back later!'}
            </p>
          </div>
        ) : (
          /* Events List Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-black border border-white/5 hover:border-[#d4af37]/30 transition-all group flex flex-col h-full overflow-hidden"
              >
                {/* Image Showcase */}
                <div className="relative w-full h-64 overflow-hidden bg-[#111]">
                  <img 
                    src={event.image} 
                    alt={event.title[language]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4 bg-black/90 border border-[#d4af37]/30 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">
                    {isVi ? 'SỰ KIỆN NỔI BẬT' : isDe ? 'HIGHLIGHT-EVENT' : 'FEATURED EVENT'}
                  </div>
                </div>

                {/* Event details content */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-white/40 text-[10px] font-mono uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]/60" />
                      <span>{formatDate(event.date)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white uppercase tracking-wider leading-snug group-hover:text-[#d4af37] transition-colors">
                      {event.title[language]}
                    </h3>

                    <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light line-clamp-3">
                      {event.description[language]}
                    </p>
                  </div>

                  {/* Actions reservation nudge */}
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[11px] text-[#d4af37] uppercase tracking-widest font-semibold">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{isVi ? 'Chi nhánh Lister Meile & Georgstraße' : isDe ? 'An allen Standorten' : 'All locations'}</span>
                    </span>
                    <span className="group-hover:translate-x-1.5 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
}
