import { useEffect, useState } from 'react';
import { Language, MenuIndexSection } from '../types';
import { getPdfBlob } from '../lib/pdfStore';

interface PDFMenuBookProps {
  language: Language;
  outOfStockIds: string[];
  handleDownloadPDF: () => void;
}

export default function PDFMenuBook({ language, outOfStockIds, handleDownloadPDF }: PDFMenuBookProps) {
  const [activeSection, setActiveSection] = useState<string>('all');
  const [sections, setSections] = useState<MenuIndexSection[]>([]);
  const [customPdfUrl, setCustomPdfUrl] = useState<string>('');
  const [pdfSrc, setPdfSrc] = useState<string>('');
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string>('');

  const isVi = language === 'vi';

  useEffect(() => {
    let activeObjectUrl = '';

    const loadConfig = async () => {
      const savedPdf = localStorage.getItem('abeo_custom_menu_pdf');

      if (savedPdf) {
        setCustomPdfUrl(savedPdf);

        if (savedPdf === 'indexeddb_stored_pdf') {
          try {
            const blob = await getPdfBlob();
            if (blob) {
              const objectUrl = URL.createObjectURL(blob);
              if (activeObjectUrl) {
                URL.revokeObjectURL(activeObjectUrl);
              }
              activeObjectUrl = objectUrl;
              setPdfBlobUrl(objectUrl);
              setPdfSrc(objectUrl);
            } else {
              setCustomPdfUrl('');
              setPdfBlobUrl('');
              setPdfSrc('');
            }
          } catch (error) {
            console.error('Error loading PDF blob from IndexedDB', error);
            setCustomPdfUrl('');
            setPdfBlobUrl('');
            setPdfSrc('');
          }
        } else {
          setPdfBlobUrl(savedPdf);
          setPdfSrc(savedPdf);
        }
      } else {
        setCustomPdfUrl('');
        setPdfBlobUrl('');
        setPdfSrc('');
      }

      const savedIndex = localStorage.getItem('abeo_speisekarte_index');
      if (savedIndex) {
        try {
          const parsed = JSON.parse(savedIndex) as MenuIndexSection[];
          setSections(parsed);
          return;
        } catch (error) {
          console.error('Error parsing custom index from localStorage', error);
        }
      }

      setSections([
        { id: 'cover', labelVi: 'Trang Bìa', labelDe: 'Titelseite', targetId: 'cover', pageNumber: 1 },
        { id: 'starters', labelVi: 'Khai Vị', labelDe: 'Vorspeisen', targetId: 'starters', pageNumber: 2 },
        { id: 'soups', labelVi: 'Salát & Sú', labelDe: 'Salat & Suppen', targetId: 'soups', pageNumber: 3 },
        { id: 'mains', labelVi: 'Món Chính', labelDe: 'Hauptgerichte', targetId: 'mains', pageNumber: 4 },
        { id: 'feuerplatte', labelVi: 'Feuerplatte', labelDe: 'Feuerplatte', targetId: 'feuerplatte', pageNumber: 7 },
        { id: 'bowls', labelVi: 'Cơm Bowls', labelDe: 'Healthy Bowls', targetId: 'bowls', pageNumber: 8 },
        { id: 'sushi', labelVi: 'Thế Giới Sushi', labelDe: 'Sushi & Spezial', targetId: 'sushi', pageNumber: 9 },
        { id: 'desserts', labelVi: 'Tráng Miệng', labelDe: 'Dessert', targetId: 'desserts', pageNumber: 14 },
        { id: 'drinks', labelVi: 'Đồ Uống & Rượu', labelDe: 'Getränke & Wein', targetId: 'drinks', pageNumber: 15 },
        { id: 'allergens', labelVi: 'Dị Ứng', labelDe: 'Allergene', targetId: 'allergens', pageNumber: 16 },
      ]);
    };

    loadConfig();
    window.addEventListener('storage', loadConfig);
    window.addEventListener('menu-config-updated', loadConfig as EventListener);

    return () => {
      window.removeEventListener('storage', loadConfig);
      window.removeEventListener('menu-config-updated', loadConfig as EventListener);
      if (activeObjectUrl) {
        URL.revokeObjectURL(activeObjectUrl);
      }
    };
  }, [language]);

  const scrollToSection = (section: MenuIndexSection) => {
    setActiveSection(section.id);
    const navigationMode = section.navigationMode || 'auto';
    const shouldUsePdf = Boolean(
      customPdfUrl &&
      section.pageNumber &&
      (navigationMode === 'pdf' || navigationMode === 'auto')
    );

    if (shouldUsePdf) {
      const basePdfUrl = pdfBlobUrl || (customPdfUrl !== 'indexeddb_stored_pdf' ? customPdfUrl : '');
      if (basePdfUrl) {
        setPdfSrc(`${basePdfUrl.split('#')[0]}#page=${section.pageNumber}`);
        return;
      }
    }

    const targetId = section.targetId || section.id;
    const element = document.getElementById(`section-${targetId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentPdfUrl = pdfBlobUrl || customPdfUrl;
  const hasCustomPdf = Boolean(currentPdfUrl);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-4 xl:gap-6 w-full max-w-7xl mx-auto overflow-x-hidden px-1 sm:px-2 lg:px-3">
      <div className="hidden xl:block w-full bg-[#0f0f10] border border-white/10 p-4 sticky top-4 self-start max-h-[calc(100vh-1.5rem)] overflow-y-auto select-none shadow-[0_10px_35px_rgba(0,0,0,0.22)] rounded-[20px]">
        <div className="flex items-center mb-4 pb-3 border-b border-white/10">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-white/80 font-bold font-mono">
            {isVi ? 'MỤC LỤC THỰC ĐƠN' : 'Speisekarte-Index'}
          </h2>
        </div>

        <div className="space-y-1.5">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section)}
              className={`w-full text-left px-3 py-2 text-[10px] font-mono tracking-wider transition-all rounded-lg flex items-center justify-between ${
                activeSection === section.id
                  ? 'bg-[#d4af37]/12 text-[#d4af37] font-bold'
                  : 'text-white/70 hover:text-white hover:bg-white/8'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{isVi ? section.labelVi : section.labelDe}</span>
                {section.pageNumber && (
                  <span className="text-[7px] font-bold font-mono bg-white/5 text-[#d4af37] border border-white/5 rounded px-1.5 py-0.5 uppercase tracking-wide">
                    {isVi ? `Trang ${section.pageNumber}` : `S. ${section.pageNumber}`}
                  </span>
                )}
              </span>
              {activeSection === section.id && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
            </button>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-white/10">
          <button
            onClick={handleDownloadPDF}
            className="w-full py-2.5 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-mono text-[9px] font-bold uppercase tracking-[0.25em] transition-all duration-300 rounded-lg cursor-pointer"
          >
            <span>{isVi ? 'TẢI FILE PDF GỐC' : 'PDF HERUNTERLADEN'}</span>
          </button>
        </div>
      </div>

      <div className="xl:hidden w-full bg-[#0f0f10] border border-white/10 p-2 sticky top-14 z-20 overflow-x-auto whitespace-nowrap scrollbar-none flex space-x-2 items-center -mx-3 px-3 rounded-[16px]">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section)}
            className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider transition-all border flex items-center space-x-1.5 rounded-full ${
              activeSection === section.id
                ? 'bg-[#d4af37] text-black border-[#d4af37] font-extrabold'
                : 'bg-black/40 text-white/60 border-white/5 hover:text-white'
            }`}
          >
            <span>{isVi ? section.labelVi : section.labelDe}</span>
            {section.pageNumber && (
              <span className={`text-[7px] font-extrabold ${activeSection === section.id ? 'text-black/60 bg-black/5' : 'text-[#d4af37] bg-white/5'} px-1 py-0.2 rounded`}>
                p.{section.pageNumber}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col items-center space-y-4 overflow-x-hidden">
        <div className="w-full max-w-5xl mx-auto rounded-[24px] border-[10px] border-[#0e271a] bg-[#fcfaf6] shadow-[inset_0_0_0_2px_#d4af37] p-4 sm:p-5 text-[#0e271a]">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#111]/10 border border-[#0e271a]/20 p-3 rounded-[20px] text-[#0e271a]">
            <div className="text-emerald-400 uppercase text-[9px] font-bold tracking-[0.25em]">
              {hasCustomPdf
                ? (isVi ? 'Đang hiển thị menu PDF của bạn' : 'Ihre PDF-Speisekarte wird angezeigt')
                : (isVi ? 'Chưa có PDF để hiển thị' : 'Keine PDF zum Anzeigen verfügbar')}
            </div>
            {hasCustomPdf && (
              <button
                type="button"
                onClick={() => window.open(currentPdfUrl, '_blank')}
                className="px-3 py-1.5 bg-[#d4af37] hover:bg-[#d4af37]/80 text-black font-extrabold text-[9px] uppercase tracking-[0.2em] transition-all cursor-pointer rounded-full"
              >
                {isVi ? 'Mở PDF gốc ↗' : 'Original PDF öffnen ↗'}
              </button>
            )}
          </div>

          {hasCustomPdf ? (
            <div className="mt-2 w-full overflow-hidden rounded-[20px] border border-white/10 bg-stone-950">
              <div className="mx-auto w-full max-w-[760px] min-h-[420px] h-[72vh] max-h-[780px]">
                <iframe
                  key={pdfSrc}
                  src={pdfSrc}
                  className="h-full w-full border-0"
                  title="Speisekarte Custom PDF"
                />
              </div>
            </div>
          ) : (
            <div className="mt-4 text-sm text-white/70 text-center">
              {isVi
                ? 'Vui lòng tải lên menu PDF trong trang Admin.'
                : 'Bitte laden Sie im Admin-Bereich die PDF-Speisekarte hoch.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
