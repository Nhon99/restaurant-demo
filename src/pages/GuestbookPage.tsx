import React, { useState } from 'react';
import { Language, GuestReview } from '../types';
import { TRANSLATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, CheckCircle2, User, Clock, Reply, Sparkles } from 'lucide-react';

interface GuestbookPageProps {
  language: Language;
  reviews: GuestReview[];
  onAddReview: (review: GuestReview) => void;
}

export default function GuestbookPage({ language, reviews, onAddReview }: GuestbookPageProps) {
  const t = TRANSLATIONS[language];
  const isVi = language === 'vi';
  const isDe = language === 'de';

  const [form, setForm] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Show approved reviews to the public
  const approvedReviews = reviews.filter(r => r.status === 'approved');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;

    const newReview: GuestReview = {
      id: `rev_${Date.now()}`,
      name: form.name,
      rating: form.rating,
      comment: form.comment,
      date: new Date().toISOString().split('T')[0],
      status: 'pending' // Moderated
    };

    onAddReview(newReview);
    setIsSuccess(true);
    setForm({ name: '', rating: 5, comment: '' });

    // Reset success banner after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  };

  const calculateAverageRating = (): string => {
    if (approvedReviews.length === 0) return "5.0";
    const sum = approvedReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / approvedReviews.length).toFixed(1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 bg-[#0a0a0a] px-6 md:px-12 border-b border-white/5 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 pt-6">
          <div className="w-12 h-[1px] bg-[#d4af37]"></div>
          <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-semibold">
            {isVi ? 'Ý KIẾN KHÁCH HÀNG' : isDe ? 'GÄSTEBUCH' : 'GUEST BOOK'}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-tight">
            {isVi ? 'Đánh Giá & ' : 'Guest '}
            <span className="not-italic font-extrabold text-[#d4af37] uppercase tracking-wider font-sans">{isVi ? 'LƯU BÚT' : 'BOOK'}</span>
          </h1>
          <p className="text-white/40 max-w-xl text-xs md:text-sm leading-relaxed">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* Content Splitting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT: Guest Review Form */}
          <div className="lg:col-span-5 bg-[#111]/40 border border-white/5 p-6 md:p-8 flex flex-col justify-between relative">
            <div className="space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em] block">SHARE YOUR EXPERIENCE</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">{t.writeReview}</h3>
              </div>

              {/* Success Feedback Display */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-[#d4af37]/10 border border-[#d4af37]/30 text-white space-y-2"
                  >
                    <div className="flex items-center space-x-2 text-[#d4af37] font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.reviewSuccess}</span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed font-light">
                      {t.reviewSuccessMsg}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">{t.yourName} *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-black border border-white/5 focus:border-[#d4af37] px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all"
                    placeholder={isVi ? 'Ví dụ: Anh Quân' : 'E.g., Anna S.'}
                  />
                </div>

                {/* Star rating selector */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">{t.rating} *</label>
                  <div className="flex items-center space-x-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive = hoveredStar !== null ? star <= hoveredStar : star <= form.rating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(null)}
                          onClick={() => setForm({ ...form, rating: star })}
                          className="text-white/20 hover:scale-110 active:scale-95 transition-all outline-none cursor-pointer"
                        >
                          <Star 
                            className={`w-6 h-6 stroke-1 ${
                              isActive 
                                ? 'text-[#d4af37] fill-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]' 
                                : 'text-white/10'
                            }`} 
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">{t.comment} *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    className="w-full bg-black border border-white/5 focus:border-[#d4af37] px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all resize-none"
                    placeholder={isVi ? 'Hãy chia sẻ cảm nghĩ của bạn về hương vị món ăn và dịch vụ...' : 'Write your feedback here...'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white hover:bg-[#d4af37] text-black font-bold py-3.5 px-6 rounded-none text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer"
                >
                  {t.submitReview}
                </button>
              </form>
            </div>

            {/* Average score overview */}
            <div className="border-t border-white/5 pt-6 mt-8 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-wider block">Average Guest Score</span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-3xl font-extrabold text-[#d4af37] font-serif leading-none">{calculateAverageRating()}</span>
                  <span className="text-xs text-white/40">/ 5.0</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    className={`w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37] ${
                      s <= Math.round(parseFloat(calculateAverageRating())) ? 'opacity-100' : 'opacity-20'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Display of approved reviews */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em]">VERIFIED REVIEWS ({approvedReviews.length})</span>
            
            {approvedReviews.length === 0 ? (
              <div className="py-16 text-center border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center p-6 flex-1">
                <MessageSquare className="w-10 h-10 text-[#d4af37]/30 mb-3" />
                <p className="text-xs text-white/40 leading-relaxed max-w-xs">
                  {t.noReviewsYet}
                </p>
              </div>
            ) : (
              <div className="space-y-5 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar flex-1">
                {approvedReviews.map((review) => (
                  <div 
                    key={review.id}
                    className="p-5 bg-black border border-white/5 space-y-4 shadow-xl relative"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-[#d4af37]" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block uppercase tracking-wide">{review.name}</span>
                          <span className="text-[8px] text-white/30 font-mono flex items-center space-x-1 mt-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{review.date}</span>
                          </span>
                        </div>
                      </div>

                      {/* Stars count */}
                      <div className="flex items-center space-x-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star 
                            key={s} 
                            className={`w-3 h-3 ${
                              s <= review.rating ? 'text-[#d4af37] fill-[#d4af37]' : 'text-white/5'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review text comment */}
                    <p className="text-xs text-white/70 leading-relaxed font-light pl-1">
                      "{review.comment}"
                    </p>

                    {/* Staff Reply */}
                    {review.reply && (
                      <div className="bg-[#d4af37]/5 border-l-2 border-[#d4af37]/40 p-4 mt-3 space-y-1 ml-1">
                        <div className="flex items-center space-x-1.5 text-[9px] font-bold text-[#d4af37] uppercase tracking-widest">
                          <Reply className="w-3.5 h-3.5 rotate-180" />
                          <span>{t.replyFromOwner}</span>
                        </div>
                        <p className="text-[11px] text-white/60 leading-relaxed font-light">
                          {review.reply}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </motion.div>
  );
}
