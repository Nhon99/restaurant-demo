import React from 'react';
import { Language } from '../types';

interface ImpressumPageProps {
  language: Language;
}

export default function ImpressumPage({ language }: ImpressumPageProps) {
  const isDe = language === 'de';
  const isVi = language === 'vi';

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-12 animate-in fade-in duration-500" id="impressum-page">
      <header className="space-y-4 text-center md:text-left">
        <div className="text-[10px] text-[#d4af37] font-mono tracking-[0.3em] uppercase">
          {isDe ? 'Rechtliche Angaben' : isVi ? 'Thông tin Pháp lý' : 'Legal Information'}
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
          Impressum
        </h1>
        <p className="text-xs text-white/40 uppercase tracking-wider">
          {isDe 
            ? 'Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)' 
            : isVi 
            ? 'Thông tin công bố theo mục 5 DDG Đức' 
            : 'Information according to § 5 DDG (German Digital Services Act)'}
        </p>
      </header>

      <hr className="border-white/5" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white/70 leading-relaxed">
        
        {/* Company and Representative Details */}
        <div className="space-y-4 bg-[#111]/20 border border-white/5 p-6 rounded-none">
          <h2 className="text-[#d4af37] font-bold text-xs uppercase tracking-wider font-mono">
            {isDe ? 'Diensteanbieter' : isVi ? 'Đơn vị cung cấp dịch vụ' : 'Service Provider'}
          </h2>
          <div className="space-y-2">
            <p className="font-bold text-white uppercase text-xs tracking-wider">A Béo GmbH</p>
            <p className="text-white/60">
              Osterstraße 30<br />
              30159 Hannover<br />
              Deutschland
            </p>
          </div>
          
          <div className="pt-4 border-t border-white/5 space-y-2">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider">
              {isDe ? 'Vertreten durch' : isVi ? 'Đại diện pháp luật' : 'Represented by'}
            </h3>
            <p className="text-white/60">Nguyen Viet Binh (Geschäftsführer)</p>
          </div>
        </div>

        {/* Contact and Registration */}
        <div className="space-y-4 bg-[#111]/20 border border-white/5 p-6 rounded-none">
          <h2 className="text-[#d4af37] font-bold text-xs uppercase tracking-wider font-mono">
            {isDe ? 'Kontakt & Register' : isVi ? 'Liên hệ & Đăng ký doanh nghiệp' : 'Contact & Registration'}
          </h2>
          
          <div className="space-y-2 text-white/60">
            <p><strong>E-Mail:</strong> <a href="mailto:info@abeo-hannover.de" className="text-[#d4af37] underline hover:text-[#e5cb6e]">info@abeo-hannover.de</a></p>
            <p><strong>Tel:</strong> <a href="tel:+495111234567" className="text-[#d4af37] underline hover:text-[#e5cb6e]">+49 (0) 511 1234567</a></p>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-2 text-white/60">
            <p>
              <strong>Registergericht:</strong> Amtsgericht Hannover<br />
              <strong>Registernummer:</strong> HRB 12345
            </p>
            <p>
              <strong>Umsatzsteuer-Identifikationsnummer:</strong><br />
              gemäß § 27 a Umsatzsteuergesetz: <span className="text-white font-mono">DE 987654321</span>
            </p>
          </div>
        </div>

      </div>

      {/* Disclaimers & Consumer Dispute Resolution */}
      <div className="space-y-6 text-xs text-white/50 leading-relaxed font-light">
        
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            {isDe ? 'EU-Streitschlichtung' : isVi ? 'Giải quyết tranh chấp người tiêu dùng EU' : 'EU Dispute Resolution'}
          </h3>
          <p>
            {isDe 
              ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: ' 
              : 'The European Commission provides a platform for online dispute resolution (ODR): '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] underline">
              https://ec.europa.eu/consumers/odr/
            </a>.
          </p>
          <p>
            {isDe
              ? 'Unsere E-Mail-Adresse finden Sie oben im Impressum.'
              : 'Our e-mail address can be found above in the legal notice.'}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            {isDe 
              ? 'Verbraucherstreitbeilegung / Universalschlichtungsstelle' 
              : 'Consumer Dispute Resolution'}
          </h3>
          <p>
            {isDe 
              ? 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
              : 'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.'}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            {isDe ? 'Haftung für Inhalte' : 'Liability for Content'}
          </h3>
          <p>
            {isDe 
              ? 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.'
              : 'As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 para. 1 DDG. However, according to §§ 8 to 10 DDG, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.'}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            {isDe ? 'Haftung für Links' : 'Liability for Links'}
          </h3>
          <p>
            {isDe 
              ? 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
              : 'Our website contains links to external websites of third parties, the content of which we have no influence over. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages.'}
          </p>
        </div>

      </div>
    </div>
  );
}
