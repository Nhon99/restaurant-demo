import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Settings, Check, X } from 'lucide-react';
import { Language } from '../types';

interface CookieBannerProps {
  language: Language;
}

export default function CookieBanner({ language }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const isDe = language === 'de';
  const isVi = language === 'vi';

  useEffect(() => {
    // Check if user has already made a selection
    const savedConsent = localStorage.getItem('abeo_cookie_consent');
    if (!savedConsent) {
      // Trigger short delay before opening for dramatic professional entry effect
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowPreferences(true);
    };
    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem('abeo_cookie_consent', JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('abeo_cookie_consent', JSON.stringify(necessaryOnly));
    setPreferences(necessaryOnly);
    setIsVisible(false);
  };

  const handleSaveSelection = () => {
    localStorage.setItem('abeo_cookie_consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[#0c0c0c] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
        id="cookie-consent-banner"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left Text */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-[#d4af37] font-mono text-[10px] uppercase tracking-widest font-bold">
              <Shield className="w-4 h-4" />
              <span>{isDe ? 'Privatsphäre & Cookie-Einwilligung' : isVi ? 'Quyền riêng tư & Cookie' : 'Privacy & Cookie Consent'}</span>
            </div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              {isDe 
                ? 'Wir schätzen Ihre Privatsphäre' 
                : isVi 
                ? 'Chúng tôi trân trọng quyền riêng tư của bạn' 
                : 'We value your privacy'}
            </h4>
            <p className="text-[11px] text-white/50 leading-relaxed font-light">
              {isDe ? (
                <>
                  Um Ihnen ein optimales Web-Erlebnis bei A Béo zu bieten, nutzen wir notwendige Cookies. Mit Ihrer Einwilligung verwenden wir zudem funktionale und analytische Cookies, um unsere Speisekarte und Services kontinuierlich zu verbessern. Sie können Ihre Auswahl jederzeit anpassen. Weitere Details finden Sie in unserer{' '}
                  <a href="/datenschutz" className="text-[#d4af37] underline hover:text-[#e5cb6e]">Datenschutzerklärung</a>.
                </>
              ) : isVi ? (
                <>
                  Để mang lại trải nghiệm duyệt web tối ưu tại nhà hàng A Béo, chúng tôi sử dụng cookie bắt buộc. Với sự đồng ý của bạn, chúng tôi cũng sử dụng cookie phân tích để nâng cấp thực đơn và chất lượng dịch vụ. Bạn có thể thay đổi thiết lập bất cứ lúc nào. Xem thêm tại{' '}
                  <a href="/datenschutz" className="text-[#d4af37] underline hover:text-[#e5cb6e]">Chính sách bảo mật</a>.
                </>
              ) : (
                <>
                  To offer you an optimal browsing experience at A Béo, we use necessary cookies. With your consent, we also use functional and analytics cookies to continuously improve our menu and services. You can customize your preferences at any time. Read more in our{' '}
                  <a href="/datenschutz" className="text-[#d4af37] underline hover:text-[#e5cb6e]">Privacy Policy</a>.
                </>
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="px-4 py-2.5 bg-transparent border border-white/10 hover:border-white/30 text-white/70 hover:text-white font-mono text-[9px] font-bold uppercase tracking-widest transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{isDe ? 'EINSTELLUNGEN' : isVi ? 'CẤU HÌNH' : 'PREFERENCES'}</span>
            </button>
            <button
              onClick={handleAcceptNecessary}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white font-mono text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              {isDe ? 'NUR NOTWENDIGE' : isVi ? 'CHỈ BẮT BUỘC' : 'ESSENTIAL ONLY'}
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#b59223] text-black font-mono text-[9px] font-bold uppercase tracking-widest transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isDe ? 'ALLE AKZEPTIEREN' : isVi ? 'ĐỒNG Ý TẤT CẢ' : 'ACCEPT ALL'}</span>
            </button>
          </div>

        </div>

        {/* Preferences Drawer */}
        <AnimatePresence>
          {showPreferences && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="max-w-6xl mx-auto overflow-hidden mt-6 pt-6 border-t border-white/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Pref 1: Necessary */}
                <div className="bg-[#111]/45 p-4 border border-white/5 flex items-start justify-between">
                  <div className="space-y-1 pr-4">
                    <span className="text-[10px] font-bold text-white uppercase block">
                      {isDe ? 'Notwendige Cookies' : isVi ? 'Cookie bắt buộc' : 'Necessary Cookies'}
                    </span>
                    <p className="text-[9px] text-white/40 leading-relaxed font-light">
                      {isDe 
                        ? 'Zwingend erforderlich für den Betrieb der Seite (Sprachauswahl, Warenkorb, Login).'
                        : 'Required for basic features like shopping cart, language toggle, and security.'}
                    </p>
                  </div>
                  <span className="text-[8px] bg-emerald-950/40 text-emerald-400 font-mono font-bold px-2 py-1 uppercase tracking-wider border border-emerald-500/20">
                    {isDe ? 'IMMER AKTIV' : 'ALWAYS ACTIVE'}
                  </span>
                </div>

                {/* Pref 2: Analytics */}
                <div className="bg-[#111]/45 p-4 border border-white/5 flex items-start justify-between">
                  <div className="space-y-1 pr-4">
                    <span className="text-[10px] font-bold text-white uppercase block">
                      {isDe ? 'Analytische Cookies' : isVi ? 'Cookie phân tích' : 'Analytical Cookies'}
                    </span>
                    <p className="text-[9px] text-white/40 leading-relaxed font-light">
                      {isDe 
                        ? 'Erlaubt uns die Speisekartennutzung anonymisiert zu analysieren (z.B. welche Gerichte am liebsten aufgerufen werden).'
                        : 'Helps us analyze menu usage anonymously (e.g., tracking most popular dishes) to improve service.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                    className={`px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest border transition-all ${
                      preferences.analytics 
                        ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-white/5 text-white/30 border-white/5'
                    }`}
                  >
                    {preferences.analytics ? (isDe ? 'AKTIV' : 'ON') : (isDe ? 'INAKTIV' : 'OFF')}
                  </button>
                </div>

                {/* Pref 3: Marketing */}
                <div className="bg-[#111]/45 p-4 border border-white/5 flex items-start justify-between">
                  <div className="space-y-1 pr-4">
                    <span className="text-[10px] font-bold text-white uppercase block">
                      {isDe ? 'Marketing & Social Media' : isVi ? 'Cookie tiếp thị' : 'Marketing & Social'}
                    </span>
                    <p className="text-[9px] text-white/40 leading-relaxed font-light">
                      {isDe 
                        ? 'Wird verwendet, um Ihnen relevante Rabattaktionen anzubieten oder unsere Social-Media-Feeds darzustellen.'
                        : 'Used to provide relevant restaurant offers or embed social media features.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                    className={`px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest border transition-all ${
                      preferences.marketing 
                        ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-white/5 text-white/30 border-white/5'
                    }`}
                  >
                    {preferences.marketing ? (isDe ? 'AKTIV' : 'ON') : (isDe ? 'INAKTIV' : 'OFF')}
                  </button>
                </div>

              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={handleSaveSelection}
                  className="px-5 py-2.5 bg-white text-black font-mono text-[9px] font-bold uppercase tracking-widest hover:bg-[#d4af37] transition-colors cursor-pointer"
                >
                  {isDe ? 'EINSTELLUNGEN SPEICHERN' : isVi ? 'LƯU THIẾT LẬP' : 'SAVE SELECTION'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  );
}
