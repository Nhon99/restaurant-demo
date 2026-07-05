import React from 'react';
import { Language } from '../types';

interface DatenschutzerklaerungPageProps {
  language: Language;
}

export default function DatenschutzerklaerungPage({ language }: DatenschutzerklaerungPageProps) {
  const isDe = language === 'de';
  const isVi = language === 'vi';

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-12 animate-in fade-in duration-500" id="privacy-page">
      <header className="space-y-4 text-center md:text-left">
        <div className="text-[10px] text-[#d4af37] font-mono tracking-[0.3em] uppercase">
          {isDe ? 'Datenschutz' : isVi ? 'Bảo mật thông tin' : 'Privacy Protection'}
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
          {isDe ? 'Datenschutzerklärung' : isVi ? 'Chính sách Bảo mật' : 'Privacy Policy'}
        </h1>
        <p className="text-xs text-white/40 uppercase tracking-wider">
          {isDe 
            ? 'Datenschutzerklärung nach der EU-Datenschutz-Grundverordnung (DSGVO)' 
            : isVi 
            ? 'Chính sách bảo mật thông tin tuân thủ quy định DSGVO châu Âu' 
            : 'Privacy Policy under the EU General Data Protection Regulation (GDPR)'}
        </p>
      </header>

      <hr className="border-white/5" />

      <div className="space-y-8 text-sm text-white/70 leading-relaxed font-light">
        
        {/* Section 1: Introduction & Responsibility */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-serif uppercase tracking-wider">
            1. {isDe ? 'Allgemeine Hinweise und Pflichtinformationen' : 'General Information and Mandatory Disclosures'}
          </h2>
          <p>
            {isDe 
              ? 'Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.'
              : 'The operators of this website take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this Privacy Policy.'}
          </p>
          <p>
            {isDe
              ? 'Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen.'
              : 'When you use this website, various personal data are collected. Personal data is data with which you can be personally identified. This Privacy Policy explains what data we collect and what we use it for.'}
          </p>
        </section>

        {/* Section 2: Responsible Party */}
        <section className="space-y-3 bg-[#111]/20 border border-white/5 p-6">
          <h2 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider font-mono">
            {isDe ? 'Verantwortliche Stelle' : 'Responsible Party'}
          </h2>
          <p className="text-xs">
            {isDe
              ? 'Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:'
              : 'The responsible party for data processing on this website is:'}
          </p>
          <p className="text-white font-mono text-xs font-semibold">
            A Béo GmbH<br />
            Osterstraße 30<br />
            30159 Hannover<br />
            Deutschland<br />
            E-Mail: info@abeo-hannover.de
          </p>
        </section>

        {/* Section 3: Data Collection on our website */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-serif uppercase tracking-wider">
            2. {isDe ? 'Datenerfassung auf unserer Website' : 'Data Collection on Our Website'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-1">
                {isDe ? 'SSL- bzw. TLS-Verschlüsselung (HTTPS)' : 'SSL/TLS Encryption'}
              </h3>
              <p>
                {isDe
                  ? 'Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.'
                  : 'For security reasons and to protect the transmission of confidential content, such as orders or inquiries you send to us as the site operator, this website uses SSL or TLS encryption. You can recognize an encrypted connection by the fact that the address line of the browser changes from "http://" to "https://" and by the lock symbol in your browser line.'}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-1">
                {isDe ? 'Formulardaten (Reservierungen & Stellenbewerbungen)' : 'Form Data (Reservations & Careers)'}
              </h3>
              <p>
                {isDe
                  ? 'Wenn Sie uns über das Reservierungsformular, Gästebuch oder Karriere-Bewerbungsformular Daten zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns lokal bzw. in einer gesicherten Datenbank gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.'
                  : 'If you send us data via the reservation form, guestbook, or career application form, your details from the inquiry form, including the contact details you provided there, will be stored for the purpose of processing the inquiry and in case of follow-up questions. We do not pass on this data without your explicit consent.'}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-1">
                {isDe ? 'Google Fonts (Lokales Hosting / Self-Host)' : 'Google Fonts (Local & Privacy-Friendly)'}
              </h3>
              <p>
                {isDe
                  ? 'Zur Einhaltung der strengen deutschen Datenschutzstandards lädt diese Website KEINE Schriftarten von externen Google-Servern. Alle verwendeten Schriften sind entweder Standard-Systemschriftarten oder werden datenschutzfreundlich lokal direkt auf unserem eigenen Server gehostet. Dadurch wird die Übertragung Ihrer IP-Adresse an Drittanbieter (wie Google) vollständig unterbunden.'
                  : 'To comply with strict German privacy standards, this website does NOT load any fonts from external Google servers. All fonts used are either standard system fonts or hosted locally on our own server in a privacy-friendly manner. This completely prevents the transmission of your IP address to third-party providers (such as Google).'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Cookies Consent */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-serif uppercase tracking-wider">
            3. {isDe ? 'Cookies & Tracking' : 'Cookies & Consent'}
          </h2>
          <p>
            {isDe
              ? 'Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.'
              : 'Our website uses cookies. These are small text files that your web browser stores on your device. Cookies help us make our service more user-friendly, effective, and secure.'}
          </p>
          <p>
            {isDe
              ? 'Einige Cookies sind für den technischen Betrieb der Seite zwingend notwendig (z.B. Warenkorb, Sprachauswahl, Sicherheit). Andere Cookies (wie Analyse- oder Tracking-Cookies) werden erst geladen und ausgeführt, nachdem Sie Ihre ausdrückliche, aktive Einwilligung (Opt-in) über unseren Cookie-Banner erteilt haben.'
              : 'Some cookies are strictly necessary for the technical operation of the site (e.g., shopping cart, language preference, security). Other cookies (such as analytics or tracking cookies) are only loaded and executed after you have given your explicit, active consent (Opt-in) via our cookie consent banner.'}
          </p>
        </section>

        {/* Section 5: Rights of the Data Subject */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-serif uppercase tracking-wider">
            4. {isDe ? 'Ihre Rechte (Auskunft, Löschung, Widerruf)' : 'Your Rights (Access, Deletion, Revocation)'}
          </h2>
          <p>
            {isDe
              ? 'Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.'
              : 'Within the framework of the applicable legal provisions, you have the right at any time to free information about your stored personal data, its origin and recipient and the purpose of data processing and, if applicable, a right to correction or deletion of this data.'}
          </p>
          <p>
            {isDe
              ? 'Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns.'
              : 'Many data processing operations are only possible with your explicit consent. You can revoke consent you have already given at any time. An informal email to us is sufficient for this purpose.'}
          </p>
        </section>

      </div>
    </div>
  );
}
