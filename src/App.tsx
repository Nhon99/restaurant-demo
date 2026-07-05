import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Language, RestaurantEvent, CareerOpportunity, GuestReview, JobApplication } from './types';
import { TRANSLATIONS, INITIAL_EVENTS, INITIAL_CAREERS, INITIAL_REVIEWS } from './data';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import CookieBanner from './components/CookieBanner';
import { Sparkles, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// New Modular Pages
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import CareersPage from './pages/CareersPage';
import GuestbookPage from './pages/GuestbookPage';
import ReservationPage from './pages/ReservationPage';
import LocationsPage from './pages/LocationsPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzerklaerungPage from './pages/DatenschutzerklaerungPage';

// Auto scroll to top on page transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [language, setLanguage] = useState<Language>('de'); // Default to German for German web compliance and native audience
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Core synchronized states
  const [events, setEvents] = useState<RestaurantEvent[]>([]);
  const [careers, setCareers] = useState<CareerOpportunity[]>([]);
  const [reviews, setReviews] = useState<GuestReview[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const t = TRANSLATIONS[language];

  // Initialize data from localStorage or fallback defaults
  useEffect(() => {
    // 1. Events
    const savedEvents = localStorage.getItem('abeo_events');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (e) {
        setEvents(INITIAL_EVENTS);
      }
    } else {
      setEvents(INITIAL_EVENTS);
      localStorage.setItem('abeo_events', JSON.stringify(INITIAL_EVENTS));
    }

    // 2. Careers
    const savedCareers = localStorage.getItem('abeo_careers');
    if (savedCareers) {
      try {
        setCareers(JSON.parse(savedCareers));
      } catch (e) {
        setCareers(INITIAL_CAREERS);
      }
    } else {
      setCareers(INITIAL_CAREERS);
      localStorage.setItem('abeo_careers', JSON.stringify(INITIAL_CAREERS));
    }

    // 3. Reviews
    const savedReviews = localStorage.getItem('abeo_reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('abeo_reviews', JSON.stringify(INITIAL_REVIEWS));
    }

    // 4. Job Applications
    const savedApps = localStorage.getItem('abeo_applications');
    if (savedApps) {
      try {
        setApplications(JSON.parse(savedApps));
      } catch (e) {
        setApplications([]);
      }
    } else {
      setApplications([]);
    }
  }, []);

  // Update localStorage when states mutate
  const updateEvents = (newEvents: RestaurantEvent[]) => {
    setEvents(newEvents);
    localStorage.setItem('abeo_events', JSON.stringify(newEvents));
  };

  const updateCareers = (newCareers: CareerOpportunity[]) => {
    setCareers(newCareers);
    localStorage.setItem('abeo_careers', JSON.stringify(newCareers));
  };

  const updateReviews = (newReviews: GuestReview[]) => {
    setReviews(newReviews);
    localStorage.setItem('abeo_reviews', JSON.stringify(newReviews));
  };

  const updateApplications = (newApps: JobApplication[]) => {
    setApplications(newApps);
    localStorage.setItem('abeo_applications', JSON.stringify(newApps));
  };

  // Add review from public Guestbook
  const handleAddReview = (newReview: GuestReview) => {
    const updated = [newReview, ...reviews];
    updateReviews(updated);
  };

  // Submit job application from public Careers
  const handleAddApplication = (newApp: JobApplication) => {
    const updated = [newApp, ...applications];
    updateApplications(updated);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white selection:bg-[#d4af37] selection:text-black font-sans" id="app-root">
        
        {/* Top micro announcement bar */}
        <div className="bg-black border-b border-white/5 px-4 py-2.5 text-center text-[9px] font-bold text-[#d4af37] uppercase tracking-[0.25em] flex items-center justify-center space-x-2 md:space-x-3.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
          <span>
            {language === 'vi' 
              ? 'TRẢI NGHIỆM ĐẶT BÀN THƯỞNG THỨC ẨM THỰC TRONG KHÔNG GIAN ẤM CÚNG CỦA A BÉO HANNOVER!' 
              : language === 'de' 
              ? 'ERLEBEN SIE TRADITIONELLE KULINARISCHE GENÜSSE AN UNSEREN STANDORTEN IN HANNOVER!' 
              : 'BOOK A TABLE TO ENJOY FRESH TRADITIONAL ASIAN FOOD & FINE SUSHI IN HANNOVER!'}
          </span>
        </div>

        {/* Main Navigation */}
        <Navbar 
          language={language} 
          setLanguage={setLanguage} 
        />

        {/* Main Routing Stage */}
        <main className="flex-grow pb-16">
          <Routes>
            <Route path="/" element={<Home language={language} events={events} reviews={reviews} careers={careers} />} />
            <Route path="/menu" element={<MenuPage language={language} />} />
            <Route path="/about" element={<AboutPage language={language} />} />
            <Route path="/events" element={<EventsPage language={language} events={events} />} />
            <Route path="/careers" element={<CareersPage language={language} careers={careers} onApply={handleAddApplication} />} />
            <Route path="/guestbook" element={<GuestbookPage language={language} reviews={reviews} onAddReview={handleAddReview} />} />
            <Route path="/reservation" element={<ReservationPage language={language} />} />
            <Route path="/locations" element={<LocationsPage language={language} />} />
            <Route path="/impressum" element={<ImpressumPage language={language} />} />
            <Route path="/datenschutz" element={<DatenschutzerklaerungPage language={language} />} />
          </Routes>
        </main>

        {/* Footer Branding & Compliance */}
        <footer className="bg-black border-t border-white/5 py-16 px-6 md:px-12 text-center text-white/30" id="app-footer">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 text-left">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-9 h-9 bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center font-bold text-[#d4af37] text-xs font-mono">AB</div>
              <div>
                <span className="text-xs font-bold text-white tracking-[0.22em] block uppercase">A BÉO HANNOVER</span>
                <span className="text-[9px] text-[#d4af37] block uppercase tracking-widest leading-none mt-1">Vietnamesische Küche & Sushi</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 max-w-md w-full md:items-end">
              <p className="text-[10px] uppercase tracking-wider md:text-right leading-relaxed text-white/40 font-light">
                {t.footerText}
              </p>
              
              {/* Mandatory Legal Notice and Privacy Policy Links for German Web (Impressumspflicht & DSGVO) */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] uppercase tracking-widest font-semibold text-white/50 pt-1">
                <Link to="/impressum" className="hover:text-[#d4af37] transition-colors">
                  {language === 'vi' ? 'Thông tin pháp lý (Impressum)' : language === 'de' ? 'Impressum' : 'Legal Notice'}
                </Link>
                <span>•</span>
                <Link to="/datenschutz" className="hover:text-[#d4af37] transition-colors">
                  {language === 'vi' ? 'Chính sách bảo mật' : language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </Link>
                <span>•</span>
                <button 
                  onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
                  className="hover:text-[#d4af37] transition-colors uppercase font-semibold cursor-pointer text-[10px]"
                >
                  {language === 'vi' ? 'Cài đặt Cookie' : language === 'de' ? 'Cookie-Einstellungen' : 'Cookie Preferences'}
                </button>
              </div>

              <div className="pt-2">
                <button
                  id="staff-portal-btn"
                  onClick={() => setIsAdminOpen(true)}
                  className="px-4 py-2 border border-[#d4af37]/20 hover:border-[#d4af37] text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold bg-[#d4af37]/5 hover:bg-[#d4af37]/10 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>🔒</span>
                  <span>Staff Portal</span>
                </button>
              </div>
            </div>
          </div>
        </footer>

        {/* Global Privacy-friendly Cookie Consent Banner */}
        <CookieBanner language={language} />

        {/* Admin Management Dashboard */}
        <AdminDashboard 
          language={language}
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          events={events}
          careers={careers}
          reviews={reviews}
          applications={applications}
          onUpdateEvents={updateEvents}
          onUpdateCareers={updateCareers}
          onUpdateReviews={updateReviews}
          onUpdateApplications={updateApplications}
        />

        {/* Floating Back to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="back-to-top"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 z-50 p-3 bg-black/95 border border-[#d4af37] hover:bg-[#d4af37] hover:text-black text-[#d4af37] rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
              title={language === 'vi' ? 'Quay lại đầu trang' : 'Nach oben'}
              type="button"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </BrowserRouter>
  );
}
