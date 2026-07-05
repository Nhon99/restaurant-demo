import { motion } from 'motion/react';
import { TRANSLATIONS, MENU_ITEMS } from '../data';
import { Language, RestaurantEvent, GuestReview, CareerOpportunity } from '../types';
import { Sparkles, ArrowRight, Calendar, Heart, Star, BookOpen, Briefcase, MessageSquare, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeProps {
  language: Language;
  events: RestaurantEvent[];
  reviews: GuestReview[];
  careers: CareerOpportunity[];
}

export default function Home({ language, events, reviews, careers }: HomeProps) {
  const t = TRANSLATIONS[language];
  const isVi = language === 'vi';
  const isDe = language === 'de';
  
  // Handpicked signature items to showcase on Home Page (no buying actions)
  const featuredIds = ['40', '41', '140', '170']; // Flying Noodles, Pho, Green Dragon, Sushi Schiff
  const featuredItems = MENU_ITEMS.filter(item => featuredIds.includes(item.id));

  const activeEvents = events.filter(e => e.active).slice(0, 2);
  const activeJobs = careers.filter(c => c.active).slice(0, 1);
  const approvedReviews = reviews.filter(r => r.status === 'approved').slice(0, 3);

  return (
    <div className="bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* MAJESTIC PARALLAX HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-6 md:px-12 py-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d2a1d] via-[#050b07] to-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1920&q=80')" }}></div>
        
        {/* Ambient background glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0e271a]/40 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 flex flex-col items-start space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-[#d4af37]/10 border border-[#d4af37]/25 px-3.5 py-1.5 rounded-full text-[#d4af37] text-[10px] uppercase tracking-[0.3em] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin-slow" />
              <span>{isVi ? 'Tinh hoa ẩm thực truyền thống' : isDe ? 'Vietnamesische Tradition & Sushi-Meisterwerke' : 'Tradition meets Modern Sushi Masterpieces'}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-light leading-[1.05] tracking-tight">
              {isVi ? (
                <>
                  Hương vị <br />
                  <span className="not-italic font-extrabold text-[#d4af37] tracking-wider uppercase font-sans text-4xl sm:text-5xl md:text-7xl">Gia Đình</span> <br />
                  Ấm áp & Chân thật
                </>
              ) : isDe ? (
                <>
                  Tradition trifft <br />
                  <span className="not-italic font-extrabold text-[#d4af37] tracking-wider uppercase font-sans text-4xl sm:text-5xl md:text-7xl">MEISTERWERK</span> <br />
                  Frisch & Herzlich
                </>
              ) : (
                <>
                  Family Tradition <br />
                  <span className="not-italic font-extrabold text-[#d4af37] tracking-wider uppercase font-sans text-4xl sm:text-5xl md:text-7xl">MEETS ARTISTRY</span> <br />
                  Fresh & Soulful
                </>
              )}
            </h1>

            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl font-sans font-light">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
              <Link
                to="/menu"
                className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#b59223] transition-all flex items-center justify-center space-x-3.5 group rounded-none shadow-xl cursor-pointer"
              >
                <span>{t.exploreMenu}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              
              <Link
                to="/reservation"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 hover:border-[#d4af37]/50 text-white hover:text-[#d4af37] font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2 rounded-none cursor-pointer"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{t.bookTable}</span>
              </Link>
            </div>
          </motion.div>

          {/* Majestic Circular Hero Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full p-2.5 border border-white/5 bg-gradient-to-tr from-[#0a0d0b] to-[#12281e] flex items-center justify-center shadow-3xl">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-[#d4af37]/20 animate-pulse pointer-events-none"></div>
              
              {/* Main image inside crop circular */}
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80" 
                  alt="A Béo Sizzling wok dishes" 
                  className="w-full h-full object-cover grayscale-[15%] hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </div>

              {/* Floating Recommendation badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-black border border-[#d4af37]/35 p-4 flex items-center space-x-3.5 shadow-2xl rounded-none max-w-[210px] z-20 backdrop-blur-md"
              >
                <div className="w-8 h-8 bg-[#0e271a] flex items-center justify-center text-[#d4af37] border border-[#d4af37]/20 rounded-full shrink-0">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-[9px] font-extrabold text-[#d4af37] uppercase tracking-widest leading-none">SIGNATURE DISH</h4>
                  <p className="text-[11px] font-semibold text-white tracking-wide mt-1.5 leading-tight">{isVi ? 'Phở Bò Thố Đá Nóng' : 'Steaming Stone Bowl Pho'}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* CHÀO MỪNG / STORY SECTION - BRIEF ABOUT */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <div className="relative">
            <div className="border border-white/5 p-2 bg-[#0e0e0e] max-w-[85%] aspect-square shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80" 
                alt="Traditional Spring rolls" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-[-15%] right-0 border border-[#d4af37]/30 p-2 bg-[#101412] max-w-[55%] aspect-square shadow-2xl z-20">
              <img 
                src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80" 
                alt="Sushi Maki rolls" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
          <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-semibold">
            {isVi ? 'HỒN CỐT PHONG VỊ GIA ĐÌNH' : isDe ? 'KULINARISCHES ERBE' : 'OUR HERITAGE'}
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-light leading-tight">
            {isVi ? (
              <>Nhà Hàng <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">A Béo</span><br />Vị Ngon Khởi Nguồn Từ Tình Yêu</>
            ) : isDe ? (
              <>Das Herzstück von <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">A Béo</span><br />Liebe geht durch den Magen</>
            ) : (
              <>The Soul of <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">A Béo</span><br />Flavor Born From Love</>
            )}
          </h2>
          <div className="h-0.5 w-16 bg-[#d4af37]"></div>
          
          <p className="text-white/60 text-xs md:text-sm leading-relaxed font-light">
            {isVi 
              ? "Chúng tôi đem lòng yêu những chiếc chảo Wok rực lửa nóng, những thanh sushi Na Uy tươi lành mọng nước và công thức phở gia truyền từ thố đá bốc khói ngập đầy thảo mộc thơm ngon. Khởi nguồn từ biệt danh thân thương \"A Béo\" - biểu trưng của sự sung túc và lòng mến khách xởi lởi..."
              : isDe
              ? "Wir lieben das Spiel mit den heißen Woks, die Präzision der frischen Sushi-Meisterwerke und das intensive Aroma unserer traditionellen, stundenlang eingekochten Pho-Brühen. Benannt nach unserem gründer „A Béo“ steht unser Name für herzlichkeit und Fülle..."
              : "We love the sizzle of red-hot woks, the absolute precision of fresh sushi creations, and the intense, healing aromas of our slow-simmered Pho bone broth. Named after our jovial founder, the term \"A Béo\" represents generosity and abundance..."
            }
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/about"
              className="px-6 py-3 bg-white/[0.04] hover:bg-[#d4af37] border border-white/10 hover:border-transparent text-white hover:text-black font-semibold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center space-x-2 rounded-none cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isVi ? 'ĐỌC TIỂU SỬ ĐẦY ĐỦ' : isDe ? 'KOMPLETTE STORY LESEN' : 'READ FULL HERITAGE'}</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 bg-[#0e271a] flex items-center justify-center text-[#d4af37] rounded-full shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-white">100% Love</h4>
                <p className="text-[11px] text-white/40 mt-1">{isVi ? 'Chuẩn hương vị mẹ nấu' : isDe ? 'Hausgemacht mit Liebe' : 'Made with heartfelt passion'}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 bg-[#0e271a] flex items-center justify-center text-[#d4af37] rounded-full shrink-0">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-white">Premium Quality</h4>
                <p className="text-[11px] text-white/40 mt-1">{isVi ? 'Nguyên liệu sạch tươi mỗi ngày' : isDe ? 'Täglich frisch gekocht' : 'Freshest catch and veggies'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC EVENTS HIGHLIGHTS SECTION */}
      {activeEvents.length > 0 && (
        <section className="py-24 bg-[#0a0d0b] border-y border-white/5 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-3.5">
                <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-semibold">
                  {isVi ? 'SỰ KIỆN QUÁN PHÁT HÀNH' : isDe ? 'AKTUELLE EVENTS' : 'COMMUNITY & EVENTS'}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-light leading-tight text-white">
                  {isVi ? (
                    <>Hoạt Động <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">Văn Hóa</span> & Ẩm Thực</>
                  ) : isDe ? (
                    <>Unsere <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">Specials</span> & Events</>
                  ) : (
                    <>Exquisite <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">Cultural</span> Events</>
                  )}
                </h2>
              </div>
              <Link
                to="/events"
                className="text-[#d4af37] hover:text-white text-xs uppercase tracking-[0.25em] font-bold border-b border-[#d4af37]/30 hover:border-white pb-1.5 transition-all flex items-center space-x-2 shrink-0 self-start md:self-auto cursor-pointer"
              >
                <span>{isVi ? 'XEM TẤT CẢ SỰ KIỆN' : isDe ? 'ALLE EVENTS SEHEN' : 'EXPLORE ALL EVENTS'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Event highlight items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-black border border-white/5 group flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:border-[#d4af37]/20"
                >
                  <div className="md:w-1/2 h-52 md:h-auto overflow-hidden bg-[#111] shrink-0">
                    <img 
                      src={event.image} 
                      alt={event.title[language]} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[#d4af37] font-mono text-[9px] uppercase tracking-widest">{event.date}</span>
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider line-clamp-1">{event.title[language]}</h3>
                      <p className="text-white/40 text-[11px] leading-relaxed line-clamp-3 font-light">{event.description[language]}</p>
                    </div>
                    <Link
                      to="/events"
                      className="text-[10px] text-white/60 hover:text-[#d4af37] font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{isVi ? 'Tìm hiểu chi tiết' : 'Learn more'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* SIGNATURE CUISINE HIGHLIGHTS */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-3.5">
            <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-semibold">
              {isVi ? 'ĐỀ XUẤT THƯỞNG THỨC' : isDe ? 'SPEISEN-HIGHLIGHTS' : "CHEF'S SIGNATURES"}
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-light leading-tight text-white">
              {isVi ? (
                <>Kiệt Tác <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">Ẩm Thực</span> Được Săn Đón</>
              ) : isDe ? (
                <>Beliebte <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">Meisterwerke</span> của A Béo</>
              ) : (
                <>Most Loved <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">Masterpieces</span></>
              )}
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-[#d4af37] hover:text-white text-xs uppercase tracking-[0.25em] font-bold border-b border-[#d4af37]/30 hover:border-white pb-1.5 transition-all flex items-center space-x-2 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>{t.exploreMenu}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-black border border-white/5 p-5 group flex flex-col justify-between hover:border-[#d4af37]/20 transition-all"
            >
              <div>
                <div className="aspect-square w-full overflow-hidden mb-5 border border-white/5 relative bg-black">
                  <img 
                    src={item.image} 
                    alt={item.name[language]} 
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0e271a] border border-[#d4af37]/30 text-[#d4af37] text-[8px] font-extrabold px-2.5 py-1 tracking-widest uppercase">
                    ID: {item.id}
                  </div>
                </div>

                <h3 className="font-serif text-base font-light text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                  {item.name[language]}
                </h3>
                
                <p className="text-white/40 text-[10px] md:text-[11px] line-clamp-3 mt-2 leading-relaxed font-light">
                  {item.description[language]}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                <span className="text-[#d4af37] font-mono font-semibold text-sm">
                  €{item.price.toFixed(2)}
                </span>
                
                <Link 
                  to="/reservation"
                  className="text-[9px] uppercase font-bold tracking-widest text-white/50 group-hover:text-[#d4af37] transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span>{isVi ? 'ĐẶT BÀN' : 'RESERVE'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECRUITMENT BANNER */}
      {activeJobs.length > 0 && (
        <section className="py-16 bg-[#111]/30 border-t border-white/5 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-950/20 to-black border border-[#d4af37]/15 p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-3.5 text-center md:text-left max-w-xl">
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white/5 text-white/50 text-[9px] uppercase tracking-widest font-bold font-mono">
                {isVi ? 'TUYỂN DỤNG NHÂN SỰ' : isDe ? 'WIR STELLEN EIN' : 'WE ARE HIRING'}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
                {isVi ? 'Gia Nhập Đội Ngũ Sáng Tạo Ẩm Thực' : 'Become part of our Gastronomy Family'}
              </h3>
              <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed">
                {isVi 
                  ? 'A Béo đang liên tục tuyển dụng thợ Sushi, nhân viên phục vụ, phụ bếp tràn đầy năng lượng tại Hannover. Môi trường đãi ngộ cực tốt, lương hấp dẫn và tiền tip dồi dào.'
                  : 'Explore exciting jobs for Sushi chefs, service crews, and kitchen assistants in Hannover with good salaries and supportive teams.'}
              </p>
            </div>
            <Link
              to="/careers"
              className="px-6 py-4 bg-[#d4af37] hover:bg-[#b59223] text-black font-bold text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap shrink-0 rounded-none shadow-lg cursor-pointer"
            >
              {isVi ? 'NỘP ĐƠN ỨNG TUYỂN' : 'VIEW JOB VACANCIES'}
            </Link>
          </div>
        </section>
      )}

      {/* INTERACTIVE GUESTBOOK REVIEWS GRID */}
      {approvedReviews.length > 0 && (
        <section className="py-24 border-t border-white/5 bg-[#070707] relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-3.5">
                <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-semibold">
                  {isVi ? 'THỰC KHÁCH CHIA SẺ' : isDe ? 'WAS UNSERE GÄSTE SAGEN' : 'GUEST BOOK HIGHLIGHTS'}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-light leading-tight text-white">
                  {isVi ? (
                    <>Lưu Bút & <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">Nhận Xét</span> Chân Thực</>
                  ) : isDe ? (
                    <>Liebevolle <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">Bewertungen</span> unserer Gäste</>
                  ) : (
                    <>Guest Reviews & <span className="not-italic font-extrabold text-[#d4af37] uppercase font-sans tracking-wide">Feedback</span></>
                  )}
                </h2>
              </div>
              <Link
                to="/guestbook"
                className="text-[#d4af37] hover:text-white text-xs uppercase tracking-[0.25em] font-bold border-b border-[#d4af37]/30 hover:border-white pb-1.5 transition-all flex items-center space-x-2 shrink-0 self-start md:self-auto cursor-pointer"
              >
                <span>{isVi ? 'VIẾT ĐÁNH GIÁ CỦA BẠN' : 'WRITE A REVIEW'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Reviews display row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {approvedReviews.map((review) => (
                <div 
                  key={review.id}
                  className="p-6 bg-black border border-white/5 relative flex flex-col justify-between space-y-6"
                >
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-[#d4af37]/5 shrink-0" />
                  
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center space-x-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={`w-3.5 h-3.5 ${
                            s <= review.rating ? 'text-[#d4af37] fill-[#d4af37]' : 'text-white/5'
                          }`} 
                        />
                      ))}
                    </div>

                    <p className="text-white/70 text-xs leading-relaxed font-light italic">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">{review.name}</span>
                    <span className="text-[9px] text-white/30 font-mono">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* FOOTER QUICK RESERVATION NUDGE */}
      <section className="py-20 bg-cover bg-center relative border-t border-white/5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-[#050b07]/95 backdrop-blur-[2px]"></div>
        
        <div className="max-w-4xl mx-auto text-center px-6 md:px-12 relative z-10 space-y-8">
          <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-semibold">
            {isVi ? 'KHÔNG GIAN ẤM CÚNG SANG TRỌNG' : isDe ? 'STILVOLLES AMBIENTE' : 'COZY AMBIENCE'}
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
            {isVi 
              ? "Hãy Ghé Thăm & Trải Nghiệm Trực Tiếp" 
              : isDe 
              ? "Erleben Sie echte Gastfreundschaft"
              : "Savor the Warmth of Our Kitchen"
            }
          </h2>
          <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-xl mx-auto font-light">
            {t.resSubtitle} {isVi ? "Chúng tôi khuyên bạn nên đặt bàn trước để được sắp xếp vị trí ngồi lý tưởng và chiêm ngưỡng chảo lửa rực sáng." : "Reservieren Sie Ihren Wunschtisch an einem unserer Standorte für unvergessliche Genussmomente."}
          </p>

          <div className="pt-4 flex justify-center">
            <Link
              to="/reservation"
              className="px-8 py-4 bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#b59223] transition-all flex items-center space-x-3 shadow-xl cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookTable}</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
