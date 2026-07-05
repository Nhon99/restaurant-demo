import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { Calendar, Menu as MenuIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function Navbar({ language, setLanguage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  // Đã lược bỏ hoàn toàn phần Icon nhiễu loạn
  const navItems = [
    { path: '/', label: language === 'vi' ? 'Trang chủ' : 'Home' },
    { path: '/menu', label: t.exploreMenu },
    { path: '/about', label: language === 'vi' ? 'Tiểu sử' : language === 'de' ? 'Über Uns' : 'About Us' },
    { path: '/events', label: t.eventsTitle },
    { path: '/careers', label: language === 'vi' ? 'Tuyển dụng' : language === 'de' ? 'Karriere' : 'Careers' },
    { path: '/guestbook', label: language === 'vi' ? 'Lưu bút' : language === 'de' ? 'Gästebuch' : 'Guestbook' },
    { path: '/locations', label: t.ourLocations },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#060606]/95 border-b border-white/5 backdrop-blur-xl px-6 md:px-12 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300" id="vip-navbar">
      {/* Chỉ giữ lại một đường kẻ chỉ vàng siêu mảnh sang trọng trên cùng */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
      
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo - Căn lề chuẩn tinh tế */}
        <Link 
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-3.5 cursor-pointer group"
        >
          {/* Khung chứa Logo hình đầu bếp - Thiết kế bo viền Gold Luxury */}
          <div className="relative w-12 h-12 rounded-full border border-[#d4af37]/50 bg-[#141414] p-[1.5px] overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#d4af37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500">
            <img 
              src="/assets/img/logoanheo.jpg" // Hãy lưu ảnh logo vào thư mục public hoặc assets của bạn và sửa đường dẫn tại đây
              alt="A Béo Logo" 
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Phần Text Thông tin thương hiệu - Căn chỉnh khoảng cách chuẩn */}
          <div className="flex flex-col justify-center">
            <span className="text-base md:text-lg font-serif font-bold tracking-[0.22em] text-[#d4af37] leading-none group-hover:text-white transition-colors duration-300">
              A BÉO
            </span>
            <span className="text-[7.5px] text-white/40 tracking-[0.2em] font-sans font-medium uppercase leading-none mt-1.5 transition-colors duration-300 group-hover:text-white/60">
              KÜCHE & SUSHI • HANNOVER
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Không Icon, chữ mỏng thoáng, khoảng cách đồng đều */}
        <div className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `relative text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 py-2 px-4 rounded-none ${
                isActive 
                  ? 'text-[#d4af37] font-semibold' 
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-[-17px] left-4 right-4 h-[1px] bg-[#d4af37] shadow-[0_1px_5px_rgba(212,175,55,0.5)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Side Actions: Language & CTA Button */}
        <div className="flex items-center space-x-6">
          
          {/* Tái cấu trúc bộ chọn ngôn ngữ dạng góc vuông phẳng cao cấp */}
          <div className="hidden sm:flex items-center border border-white/10 p-0.5 bg-black/40">
            {(['vi', 'en', 'de'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 text-[9px] font-bold tracking-wider transition-all duration-300 uppercase cursor-pointer ${
                  language === lang 
                    ? 'bg-[#d4af37] text-black font-extrabold' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Nút Đặt bàn (CTA) - Thiết kế tinh gọn sắc sảo cứng cáp */}
          <Link
            to="/reservation"
            className="flex items-center space-x-2 px-5 py-2.5 border border-[#d4af37] text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-400 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.bookTable}</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-1.5 text-white/60 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#d4af37]" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Gọn Gàng */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[73px] bg-[#060606]/98 border-b border-white/5 p-4 flex flex-col space-y-1 z-40 animate-in fade-in slide-in-from-top-2 duration-300 backdrop-blur-2xl">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `w-full p-3 text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-200 ${
                isActive 
                  ? 'bg-[#d4af37]/5 text-[#d4af37] border-l border-[#d4af37] pl-4 font-semibold' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </NavLink>
          ))}
          {/* Lựa chọn ngôn ngữ tích hợp gọn vào bản mobile */}
          <div className="flex sm:hidden items-center justify-center border-t border-white/5 pt-3 mt-2 gap-4">
            {(['vi', 'en', 'de'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-[10px] uppercase tracking-widest px-2 py-1 ${language === lang ? 'text-[#d4af37] font-bold' : 'text-white/40'}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}