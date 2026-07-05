import { useState, useEffect } from 'react';
import { MenuItem, Language } from '../types';
import { MENU_ITEMS, TRANSLATIONS } from '../data';
import { Flame, Filter, Search, ShieldAlert, Calendar, Sparkles, FileText, Grid, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import PDFMenuBook from '../components/PDFMenuBook';
import { getPdfBlob } from '../lib/pdfStore';

interface MenuPageProps {
  language: Language;
}

export default function MenuPage({ language }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Live Out of Stock tracking
  const [outOfStockIds, setOutOfStockIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'pdf' | 'grid'>('pdf');

  const t = TRANSLATIONS[language];

  const handleDownloadPDF = async () => {
    const customPdf = localStorage.getItem('abeo_custom_menu_pdf');
    if (customPdf === 'indexeddb_stored_pdf') {
      try {
        const blob = await getPdfBlob();
        if (blob) {
          const objectUrl = URL.createObjectURL(blob);
          window.open(objectUrl, '_blank');
          setTimeout(() => URL.revokeObjectURL(objectUrl), 3000);
          return;
        }
      } catch (error) {
        console.error('Failed to open uploaded PDF from IndexedDB', error);
      }
    }

    if (customPdf) {
      window.open(customPdf, '_blank');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const isDe = language === 'de';
    const isVi = language === 'vi';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>A BÉO Hannover - Speisekarte</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            color: #111;
            background-color: #fff;
            margin: 0;
            padding: 0;
            font-size: 11px;
            line-height: 1.4;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .page {
            width: 210mm;
            height: 297mm;
            box-sizing: border-box;
            padding: 20mm;
            position: relative;
            background-color: #fcfaf6;
            page-break-after: always;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 15px solid #0e271a;
            box-shadow: inset 0 0 0 2px #d4af37;
            overflow: hidden;
          }

          @media screen {
            .page {
              margin: 20px auto;
              box-shadow: 0 10px 30px rgba(0,0,0,0.15), inset 0 0 0 2px #d4af37;
            }
            body {
              background-color: #333;
              padding: 20px 0;
            }
          }

          .page-bg-illustration {
            position: absolute;
            bottom: 5mm;
            right: 5mm;
            opacity: 0.05;
            width: 80mm;
            pointer-events: none;
          }

          .header {
            text-align: center;
            margin-bottom: 5mm;
          }

          .header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            font-weight: 700;
            margin: 0;
            letter-spacing: 4px;
            color: #0e271a;
          }

          .header .subtitle {
            font-size: 11px;
            color: #d4af37;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin: 5px 0;
            font-weight: 700;
          }

          .header .divider {
            width: 40px;
            height: 1px;
            background-color: #d4af37;
            margin: 10px auto;
          }

          .page-title {
            font-family: 'Playfair Display', serif;
            font-size: 26px;
            font-style: italic;
            color: #0e271a;
            text-align: center;
            margin-bottom: 8mm;
            letter-spacing: 1px;
            position: relative;
          }

          .page-title::after {
            content: '';
            display: block;
            width: 30px;
            height: 1px;
            background-color: #d4af37;
            margin: 6px auto 0 auto;
          }

          .menu-section {
            flex-grow: 1;
          }

          .menu-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6mm 10mm;
            margin-bottom: 5mm;
          }

          .menu-grid.single-col {
            grid-template-columns: 1fr;
            max-width: 140mm;
            margin-left: auto;
            margin-right: auto;
          }

          .menu-item {
            display: flex;
            flex-direction: column;
            page-break-inside: avoid;
          }

          .menu-item-header {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            font-weight: 600;
            font-size: 12px;
            color: #0e271a;
            margin-bottom: 2px;
          }

          .menu-item-name {
            font-family: 'Inter', sans-serif;
            font-weight: 700;
          }

          .menu-item-dots {
            flex-grow: 1;
            border-bottom: 1px dotted #ccc;
            margin: 0 6px;
          }

          .menu-item-price {
            font-family: 'Playfair Display', serif;
            color: #b59223;
            font-weight: 700;
            font-size: 12px;
          }

          .menu-item-desc {
            color: #555;
            font-size: 9.5px;
            line-height: 1.3;
            font-weight: 400;
          }

          .menu-item-tags {
            font-size: 8px;
            color: #d4af37;
            margin-top: 2px;
            font-weight: 600;
          }

          .suboptions {
            margin-left: 10px;
            margin-top: 3px;
            font-size: 9px;
            color: #333;
          }

          .suboption-line {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 2px;
          }

          .footer {
            border-top: 1px solid #e5cb6e;
            padding-top: 3mm;
            text-align: center;
            font-size: 8px;
            color: #777;
            font-family: 'Inter', sans-serif;
          }

          /* Cover page style */
          .cover-page {
            justify-content: center;
            align-items: center;
            text-align: center;
            background-color: #f7f3eb;
          }

          .cover-logo-wrapper {
            margin-bottom: 15mm;
          }

          .cover-logo {
            width: 85mm;
            height: auto;
            border-radius: 50%;
            border: 2px solid #d4af37;
            padding: 5px;
            background: white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }

          .cover-title {
            font-family: 'Playfair Display', serif;
            font-size: 50px;
            font-weight: 700;
            color: #0e271a;
            letter-spacing: 5px;
            margin: 0;
          }

          .cover-subtitle {
            font-size: 13px;
            color: #d4af37;
            text-transform: uppercase;
            letter-spacing: 5px;
            margin: 8px 0 25px 0;
            font-weight: 700;
          }

          .opening-hours-box {
            border: 2px solid #0e271a;
            padding: 5mm 10mm;
            display: inline-block;
            margin-top: 10mm;
            background-color: white;
            box-shadow: 4px 4px 0px #d4af37;
          }

          .opening-hours-title {
            font-family: 'Playfair Display', serif;
            font-size: 18px;
            font-style: italic;
            color: #0e271a;
            margin-bottom: 3px;
          }

          .opening-hours-text {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 1px;
            color: #333;
          }

          /* Welcome page */
          .welcome-text {
            max-width: 140mm;
            margin: 0 auto;
            text-align: center;
            font-family: 'Playfair Display', serif;
            font-size: 15px;
            line-height: 1.8;
            color: #222;
            font-style: italic;
          }

          .welcome-legend {
            margin-top: 15mm;
            display: flex;
            justify-content: center;
            gap: 10mm;
            font-family: 'Inter', sans-serif;
            font-size: 11px;
            font-weight: 600;
            color: #0e271a;
          }

          .welcome-illustration-row {
            margin-top: 15mm;
            text-align: center;
          }

          .welcome-illustration-row img {
            max-width: 130mm;
            border-radius: 4px;
            border: 1px solid #d4af37;
          }

          /* Allergy and additives tables */
          .allergy-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 4mm;
            font-size: 9px;
          }

          .allergy-table td {
            padding: 5px 10px;
            border-bottom: 1px solid #eee;
          }

          .allergy-code {
            font-weight: 700;
            color: #0e271a;
            width: 30px;
          }

          @media print {
            body {
              background-color: #fff;
              padding: 0;
            }
            .page {
              margin: 0;
              border: 15px solid #0e271a !important;
              box-shadow: inset 0 0 0 2px #d4af37 !important;
            }
          }
        </style>
      </head>
      <body>

        <!-- PAGE 1: COVER -->
        <div class="page cover-page">
          <div class="cover-logo-wrapper">
            <svg class="cover-logo" viewBox="0 0 200 200" style="max-width: 70mm;">
              <circle cx="100" cy="100" r="95" fill="#0e271a" />
              <circle cx="100" cy="100" r="88" fill="none" stroke="#d4af37" stroke-width="2" />
              <text x="100" y="85" font-family="'Playfair Display', serif" font-size="28" font-weight="bold" fill="#d4af37" text-anchor="middle" letter-spacing="2">A BÉO</text>
              <text x="100" y="115" font-family="'Inter', sans-serif" font-size="7" font-weight="600" fill="#fff" text-anchor="middle" letter-spacing="3">VIETNAMESISCHE KÜCHE</text>
              <text x="100" y="130" font-family="'Inter', sans-serif" font-size="7" font-weight="600" fill="#fff" text-anchor="middle" letter-spacing="3">& SUSHI • HANNOVER</text>
              <path d="M 60,150 L 140,150" stroke="#d4af37" stroke-width="1.5" />
              <circle cx="100" cy="150" r="3" fill="#d4af37" />
            </svg>
          </div>
          <h1 class="cover-title">A Béo</h1>
          <p class="cover-subtitle">VIETNAMESISCHE KÜCHE & SUSHI</p>
          
          <div class="opening-hours-box">
            <div class="opening-hours-title">Unsere Öffnungszeiten</div>
            <div class="opening-hours-text">Täglich | 11:30 - 22:00 Uhr</div>
          </div>
          
          <div class="footer">
            Osterstraße 30, 30159 Hannover | Tel: +49 (0) 511 1234567 | info@abeo-hannover.de
          </div>
        </div>


        <!-- PAGE 2: WELCOME -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Willkommen bei A Béo</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section" style="display: flex; flex-direction: column; justify-content: center;">
            <div class="welcome-text">
              <p>Entdecken Sie die Vielfalt der vietnamesischen Küche – frisch, aromatisch und mit viel Liebe zubereitet.</p>
              <p>Unsere Gerichte verbinden traditionelle vietnamesische Rezepte mit modernen Einflüssen und feiner Sushi-Kultur.</p>
              <p>Von knusprigem Bánh mì über duftende Phở bis hin zu frischem Sushi und hausgemachten Getränken – bei uns genießen Sie authentische Aromen in stilvoller und entspannter Atmosphäre.</p>
              <p style="color: #0e271a; font-weight: 600; font-size: 17px; margin-top: 10px;">A Béo steht für frische Zutaten, Qualität und familiäre Gastfreundschaft.</p>
              <p style="font-size: 18px; color: #d4af37; margin-top: 10px;">Wir wünschen Ihnen einen guten Appetit!</p>
            </div>

            <div class="welcome-legend">
              <span>🍀 = Vegetarische / Vegan-Option</span>
              <span>🌷 = Vegan</span>
              <span>🌶️ = Scharf (Chili)</span>
            </div>
          </div>

          <div class="footer">
            A Béo GmbH • Osterstraße 30, 30159 Hannover • Geschäftsführer: Nguyen Viet Binh
          </div>
        </div>


        <!-- PAGE 3: VORSPEISEN (1-5) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Thực Đơn Khai Vị • Vorspeisen</div>
            <div class="divider"></div>
          </div>

          <div class="page-title">Vorspeise</div>

          <div class="menu-section">
            <div class="menu-grid single-col">
              
              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">1 — Mini Frühlingsrollen (6St) 🍀</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">2,90</span>
                </div>
                <div class="menu-item-desc">Knusprige Mini-Frühlingsrollen mit Gemüse gefüllt, serviert mit Süß-Sauer-Chili-Dipp.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">2 — vietnamesische Frühlingsrollen</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">6,50</span>
                </div>
                <div class="menu-item-desc">Reispapier gefüllt mit Hühnerfleisch, Glasnudeln, Morcheln, Möhren und Zwiebeln, goldbraun gebacken, serviert mit Limetten-Dip.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">3 — Hausgemachter Kimchi 🌶️ 🍀</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">5,50</span>
                </div>
                <div class="menu-item-desc">Fermentierter Chinakohl, Möhren, Rettich, Ingwer, Knoblauch mit würziger Schärfe.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">4 — Khoai Lang chiên 🍀</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">5,50</span>
                </div>
                <div class="menu-item-desc">Süßkartoffelpommes, dazu serviert mit cremigem hausgemachten Spicy-Mayo Dip.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">5 — Gỏi cuốn (Sommerrollen) — je 2 Stk.</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price"></span>
                </div>
                <div class="menu-item-desc">Reispapierrollen gefüllt mit frischem Salat, Koriander, Minze, Gurken, Möhren und Reisnudeln, serviert mit feinem Kräuter-Limetten-Dip oder Erdnuss-Dip.</div>
                <div class="suboptions">
                  <div class="suboption-line"><span>A. Tofu 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">5,50</span></div>
                  <div class="suboption-line"><span>B. Huhn</span><span class="menu-item-dots"></span><span class="menu-item-price">6,50</span></div>
                  <div class="suboption-line"><span>C. gegrilltes Schweinefleisch</span><span class="menu-item-dots"></span><span class="menu-item-price">6,50</span></div>
                  <div class="suboption-line"><span>D. Garnelen</span><span class="menu-item-dots"></span><span class="menu-item-price">6,50</span></div>
                </div>
              </div>

            </div>
          </div>

          <div class="footer">
            Preise in Euro (€) inkl. MwSt. • Osterstraße 30, 30159 Hannover
          </div>
        </div>


        <!-- PAGE 4: VORSPEISEN & SALATE (6-11, 20-22) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Vorspeisen & Salate</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="page-title" style="margin-bottom: 4mm;">Weitere Vorspeisen</div>
            <div class="menu-grid" style="margin-bottom: 8mm;">
              
              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">6 — Edamame 🍀</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">5,50</span>
                </div>
                <div class="menu-item-desc">Gedämpfte grüne Sojabohnen in der Schote, verfeinert mit Meersalz.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">7 — Gyoza (5 Stück) 🍀</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">6,50</span>
                </div>
                <div class="menu-item-desc">Gebackene Teigtaschen gefüllt mit frischem Gemüse, dazu süßer Dip.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">8 — Garnelen-Dumplings</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">7,50</span>
                </div>
                <div class="menu-item-desc">Gedämpfte Teigtaschen mit saftiger Garnelenfüllung, serviert mit milder Teriyaki-Sauce.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">9 — Tôm chiên cốm (3St)</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">6,50</span>
                </div>
                <div class="menu-item-desc">Knusprig gebackene Garnelen umhüllt von grünen Klebreisflocken, serviert mit Sweet-Chili Dip.</div>
              </div>

              <div class="menu-item" style="grid-column: span 2;">
                <div class="menu-item-header">
                  <span class="menu-item-name">10 — Hawaii Style Bowl</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price"></span>
                </div>
                <div class="menu-item-desc">Frischer bunter Salat mit Avocado, Edamame, Wakame-Seetang, Gurken, Mango und pikanter Erdnuss-Sesam-Sauce. Wahlweise mit:</div>
                <div class="suboptions" style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
                  <div class="suboption-line"><span>A. Frischer Lachs</span><span class="menu-item-dots"></span><span class="menu-item-price">9,20</span></div>
                  <div class="suboption-line"><span>B. Frischer Thunfisch</span><span class="menu-item-dots"></span><span class="menu-item-price">10,20</span></div>
                </div>
              </div>

              <div class="menu-item" style="grid-column: span 2;">
                <div class="menu-item-header">
                  <span class="menu-item-name">11 — Asia Genussplatte für 2 Personen</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">15,90</span>
                </div>
                <div class="menu-item-desc">Genuss-Mix bestehend aus Edamame, vietnamesischen Frühlingsrollen, Sommerrollen mit Hühnerfleisch, knusprigen Garnelen und Süßkartoffelpommes.</div>
              </div>

            </div>

            <div class="page-title" style="margin-bottom: 4mm;">Salate</div>
            <div class="menu-grid">
              
              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">20 — Seetangsalat 🍀</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">5,50</span>
                </div>
                <div class="menu-item-desc">Grüner Wakame Seetang mit geröstetem Sesam in pikanter Sesamöl-Vinaigrette.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">21 — Nộm xoài 🍀</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">9,50</span>
                </div>
                <div class="menu-item-desc">Frischer, knackiger Mangosalat mit Möhrenstreifen, roten Zwiebeln, gerösteten Erdnüssen, Röstzwiebeln und duftender Minze in Limetten-Chili-Dressing.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">22 — Nộm xoài bò</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">7,50</span>
                </div>
                <div class="menu-item-desc">Hausgemachter frischer Mangosalat wie Nr. 21, garniert mit zart gebratenen Rindfleischstreifen.</div>
              </div>

            </div>
          </div>

          <div class="footer">
            A Béo • Authentische Küche & Sushi in Hannover
          </div>
        </div>


        <!-- PAGE 5: SUPPEN & HAUPTGERICHTE (30-32, 40-41) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Suppen & Hauptgerichte</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="page-title" style="margin-bottom: 4mm;">Suppen</div>
            <div class="menu-grid" style="margin-bottom: 8mm;">
              
              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">30 — Miso-Suppe 🍀</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">5,50</span>
                </div>
                <div class="menu-item-desc">Traditionelle japanische Sojabohnenbrühe mit Tofuwürfeln, Seetang und Lauchzwiebeln.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">31 — A Béo Suppe 🍀</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">5,00</span>
                </div>
                <div class="menu-item-desc">Sämige Suppe mit süßem Mais, Ei, feinen Champignons, Tofu und frischen Karotten.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">32 — A Béo Hähnchensuppe</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">6,00</span>
                </div>
                <div class="menu-item-desc">Hausgemachte, reichhaltige Suppe wie Nr. 31 mit zartem Hähnchenfleisch.</div>
              </div>

            </div>

            <div class="page-title" style="margin-bottom: 4mm;">Hauptgerichte</div>
            <div class="menu-grid">
              
              <div class="menu-item" style="grid-column: span 2;">
                <div class="menu-item-header">
                  <span class="menu-item-name">40 — Fliegende Nudeln</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price"></span>
                </div>
                <div class="menu-item-desc">Hausgemachte Eiernudeln, spektakulär fliegend serviert auf einem Bambusstab, mit saisonalem, knackigem Pfannengemüse, frischem Salat und wahlweise cremiger roter Kokos-Curry-Sauce oder samtiger Erdnuss-Sauce:</div>
                <div class="suboptions" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
                  <div class="suboption-line"><span>A. Tofu & Spiegelei 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">14,90</span></div>
                  <div class="suboption-line"><span>B. Knuspriges Hähnchen</span><span class="menu-item-dots"></span><span class="menu-item-price">16,90</span></div>
                  <div class="suboption-line"><span>C. Knusprige Ente</span><span class="menu-item-dots"></span><span class="menu-item-price">17,90</span></div>
                </div>
              </div>

              <div class="menu-item" style="grid-column: span 2;">
                <div class="menu-item-header">
                  <span class="menu-item-name">41 — Phở (Traditionelle Reisbandnudelsuppe)</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price"></span>
                </div>
                <div class="menu-item-desc">Die weltberühmte vietnamesische Nationalbrühe, über 12 Stunden mit Sternanis, Zimt và Kardamom kräftig eingekocht, serviert mit zarten Reisbandnudeln, Frühlingszwiebeln, Koriander, Ingwer, Chili und Limettenecken:</div>
                <div class="suboptions" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
                  <div class="suboption-line"><span>A. Tofu 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">12,90</span></div>
                  <div class="suboption-line"><span>B. Hühnerfleisch</span><span class="menu-item-dots"></span><span class="menu-item-price">13,90</span></div>
                  <div class="suboption-line"><span>C. Zartes Rindfleisch</span><span class="menu-item-dots"></span><span class="menu-item-price">15,90</span></div>
                </div>
              </div>

            </div>
          </div>

          <div class="footer">
            Frische Zutaten & Meisterhafte Zubereitung
          </div>
        </div>


        <!-- PAGE 6: NUDELN & REIS SPEZIALITÄTEN (42-45) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Vietnamesische Nudelspezialitäten</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="page-title">Hauptgerichte aus der Schale</div>
            
            <div class="menu-grid single-col" style="gap: 8mm;">
              
              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">42 — Bún bò Huế 🌶️</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">15,50</span>
                </div>
                <div class="menu-item-desc">Würzige, leicht scharfe Reisnudelsuppe aus Zentralvietnam (Kaiserstadt Huế) mit einer kräftigen Zitronengras-Chili-Brühe, zarten Rindfleischstreifen, geschmorter Schweinehaxe, herzhaften Fleischbällchen und frischen asiatischen Kräutern.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">43 — Bún thịt nướng</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">15,50</span>
                </div>
                <div class="menu-item-desc">Warme Reisnudeln serviert mit traditionell gegrillten Schweinefleischstreifen, frischen Kräutern (Koriander, Minze), Gurken, Möhrenstreifen, Röstzwiebeln, Erdnüssen und einem hausgemachten Limetten-Fischsauce-Dressing.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">44 — Bún Nem</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">15,90</span>
                </div>
                <div class="menu-item-desc">Große Reisnudelschale garniert mit knusprig goldbraun gebackenen vietnamesischen Frühlingsrollen, frischen asiatischen Kräutern, Salat, Erdnüssen und hausgemachtem Kräuter-Limetten-Dip.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">45 — Bún bò Nam Bộ</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">15,90</span>
                </div>
                <div class="menu-item-desc">Traditionelles Gericht des Südens: Lauwarme Reisnudelschale mit zart im Wok gebratenen Rindfleischstreifen, frischem Salat, Sojasprossen, Gurken, Erdnüssen, Röstzwiebeln und feinem Knoblauch-Kräuter-Dip.</div>
              </div>

            </div>
          </div>

          <div class="footer">
            Osterstraße 30, 30159 Hannover
          </div>
        </div>


        <!-- PAGE 7: HAUPTGERICHTE TEIL II (46, 50, 60) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Fleischgerichte & Gebratener Reis</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            
            <div class="menu-grid single-col" style="gap: 8mm;">
              
              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">46 — Nem Lụi (Schweinespieße)</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">15,90</span>
                </div>
                <div class="menu-item-desc">Gegrillte vietnamesische Hackfleischspieße aus Schweinefleisch, angerichtet mit frischem Salat, Gurken, eingelegtem Gemüse (Dưa góp) und aromatischem Kräuter-Dip. Wahlweise serviert mit:</div>
                <div class="suboptions">
                  <div class="suboption-line"><span>A. Reisnudeln (Bún)</span><span class="menu-item-dots"></span><span class="menu-item-price">15,90</span></div>
                  <div class="suboption-line"><span>B. Gedämpfter Klebreis (Xôi)</span><span class="menu-item-dots"></span><span class="menu-item-price">15,90</span></div>
                </div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">50 — Asiatische Knusperente (mit Knochen)</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">23,90</span>
                </div>
                <div class="menu-item-desc">1/2 knusprig gebackene Ente mit krosser Haut und saftigem Fleisch, serviert auf gedämpftem Chinakohl, verfeinert mit pikanter Sojasauce. Wahlweise mit Reis, Pommes frites oder knusprigen Süßkartoffelpommes serviert.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">60 — Cơm rang (Gebratener Jasminreis)</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price"></span>
                </div>
                <div class="menu-item-desc">Goldgelb im Wok gebratener Jasminreis mit knackigen Erbsen, Karottenstreifen, frischem Ei, Zwiebeln und Frühlingslauch. Wahlweise mit:</div>
                <div class="suboptions">
                  <div class="suboption-line"><span>A. Knuspriger Bio-Tofu 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">12,90</span></div>
                  <div class="suboption-line"><span>B. Gebratenes Hähnchenbrustfilet</span><span class="menu-item-dots"></span><span class="menu-item-price">13,90</span></div>
                  <div class="suboption-line"><span>C. Knusprig paniertes Hähnchen</span><span class="menu-item-dots"></span><span class="menu-item-price">14,90</span></div>
                  <div class="suboption-line"><span>D. Knusprig gebratene Ente</span><span class="menu-item-dots"></span><span class="menu-item-price">15,90</span></div>
                  <div class="suboption-line"><span>E. Gebratene Rindfleischstreifen</span><span class="menu-item-dots"></span><span class="menu-item-price">15,90</span></div>
                  <div class="suboption-line"><span>F. Black Tiger Garnelen</span><span class="menu-item-dots"></span><span class="menu-item-price">16,90</span></div>
                </div>
              </div>

            </div>
          </div>

          <div class="footer">
            A Béo • Osterstraße 30, 30159 Hannover
          </div>
        </div>


        <!-- PAGE 8: HAUPTGERICHTE TEIL III (61, 70) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Gebratene Nudeln & Red Thai Curry</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="menu-grid single-col" style="gap: 8mm;">
              
              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">61 — Mì Xào (Gebratene Eiernudeln)</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price"></span>
                </div>
                <div class="menu-item-desc">Frisch im Wok geschwenkte Weizeneiernudeln mit verschiedenem Marktgemüse (Brokkoli, Karotten, Chinakohl), Ei und Sojasprossen. Wahlweise serviert mit:</div>
                <div class="suboptions">
                  <div class="suboption-line"><span>A. Knuspriger Bio-Tofu 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">12,90</span></div>
                  <div class="suboption-line"><span>B. Gebratenes Hähnchenbrustfilet</span><span class="menu-item-dots"></span><span class="menu-item-price">13,90</span></div>
                  <div class="suboption-line"><span>C. Knusprig paniertes Hähnchen</span><span class="menu-item-dots"></span><span class="menu-item-price">14,90</span></div>
                  <div class="suboption-line"><span>D. Knusprig gebratene Ente</span><span class="menu-item-dots"></span><span class="menu-item-price">15,90</span></div>
                  <div class="suboption-line"><span>E. Gebratene Rindfleischstreifen</span><span class="menu-item-dots"></span><span class="menu-item-price">15,90</span></div>
                  <div class="suboption-line"><span>F. Black Tiger Garnelen</span><span class="menu-item-dots"></span><span class="menu-item-price">16,90</span></div>
                </div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">70 — Red Thai Curry 🌶️</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price"></span>
                </div>
                <div class="menu-item-desc">Aromatisches rotes Kokos-Curry mit Zitronengras, thailändischem Basilikum und cremig verfeinerter Kokosmilch, serviert mit buntem Gemüse (Paprika, Zucchini, Aubergine, Bambus) und duftendem Jasminreis. Wahlweise mit:</div>
                <div class="suboptions">
                  <div class="suboption-line"><span>A. Knuspriger Bio-Tofu 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">12,90</span></div>
                  <div class="suboption-line"><span>B. Gebratenes Hähnchenbrustfilet</span><span class="menu-item-dots"></span><span class="menu-item-price">13,90</span></div>
                  <div class="suboption-line"><span>C. Knusprig paniertes Hähnchen</span><span class="menu-item-dots"></span><span class="menu-item-price">14,90</span></div>
                  <div class="suboption-line"><span>D. Knusprig gebratene Ente</span><span class="menu-item-dots"></span><span class="menu-item-price">15,90</span></div>
                  <div class="suboption-line"><span>E. Gebratene Rindfleischstreifen</span><span class="menu-item-dots"></span><span class="menu-item-price">15,90</span></div>
                  <div class="suboption-line"><span>F. Black Tiger Garnelen</span><span class="menu-item-dots"></span><span class="menu-item-price">16,90</span></div>
                  <div class="suboption-line"><span>G. Gegrilltes Lachsfilet</span><span class="menu-item-dots"></span><span class="menu-item-price">16,90</span></div>
                </div>
              </div>

            </div>
          </div>

          <div class="footer">
            Gerichte können auf Wunsch schärfer zubereitet werden.
          </div>
        </div>


        <!-- PAGE 9: HAUPTGERICHTE & FEUERPLATTE (71, 72, 80) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Wok-Gerichte & Feuerplatte</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="menu-grid single-col" style="gap: 6mm;">
              
              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">71 — Saigon Erdnuss-Curry</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price"></span>
                </div>
                <div class="menu-item-desc">Milde, super cremige Erdnuss-Sauce verfeinert mit Kokosmilch, knackigem Pfannengemüse, Brokkoli, Blumenkohl und Erbsen, serviert mit duftendem gedämpften Jasminreis. Wahlweise mit:</div>
                <div class="suboptions" style="font-size: 8.5px;">
                  <div class="suboption-line"><span>Tofu 12,90 | Hähnchen 13,90 | Knusprig Hähnchen 14,90 | Ente 15,90 | Rind 15,90 | Garnelen 16,90 | Lachs 16,90</span></div>
                </div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">72 — Saigon Wok (Klassisch in Sojasauce)</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price"></span>
                </div>
                <div class="menu-item-desc">Traditionelles Wok-Gericht mit marktfrischem Gemüse, Bambussprossen, Paprika, Shiitake-Pilzen und Lauch, kräftig geschwenkt in dunkler, pikanter Knoblauch-Sojasauce, dazu Jasminreis. Wahlweise mit:</div>
                <div class="suboptions" style="font-size: 8.5px;">
                  <div class="suboption-line"><span>Tofu 12,90 | Hähnchen 13,90 | Knusprig Hähnchen 14,90 | Ente 15,90 | Rind 15,90 | Garnelen 16,90 | Lachs 16,90</span></div>
                </div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">80 — Zisch Kitchen (Auf heißer Gusseisenplatte serviert)</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price"></span>
                </div>
                <div class="menu-item-desc">Sensationell brutzelnd servierte Feuerplatte mit frischem Bambus, knackiger Paprika, weißen Champignons, Porree und frischem Ingwer in würziger Spezialsauce. Beilage wahlweise: Reis, Pommes oder Süßkartoffeln. Wahlweise mit:</div>
                <div class="suboptions">
                  <div class="suboption-line"><span>A. Knuspriger Bio-Tofu 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">16,50</span></div>
                  <div class="suboption-line"><span>B. Gebratenes Hähnchenbrustfilet</span><span class="menu-item-dots"></span><span class="menu-item-price">17,50</span></div>
                  <div class="suboption-line"><span>C. Knusprig paniertes Hähnchen</span><span class="menu-item-dots"></span><span class="menu-item-price">18,50</span></div>
                  <div class="suboption-line"><span>D. Knusprig gebratene Ente</span><span class="menu-item-dots"></span><span class="menu-item-price">19,50</span></div>
                  <div class="suboption-line"><span>E. Gebratenes Rindfleisch</span><span class="menu-item-dots"></span><span class="menu-item-price">19,50</span></div>
                  <div class="suboption-line"><span>F. Black Tiger Riesen-Garnelen</span><span class="menu-item-dots"></span><span class="menu-item-price">19,90</span></div>
                </div>
              </div>

            </div>
          </div>

          <div class="footer">
            A Béo • Osterstraße 30, 30159 Hannover
          </div>
        </div>


        <!-- PAGE 10: BOWL SPEZIALITÄTEN (90-96) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Gesunde Bowl-Kreationen</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="page-title">Bolw</div>
            <p style="text-align: center; font-size: 10px; color: #555; margin-top: -6mm; margin-bottom: 6mm; font-style: italic;">
              Alle Bowls werden auf feinstem japanischem Sushi-Reis angerichtet, verziert mit knackiger Gurke, cremiger Avocado, saftigen Tomaten, Edamame, süßem Mais und geröstetem Sesam. Dazu eine hausgemachte Sauce nach Wahl: Sweet-Chili-Sauce, milde Teriyaki-Sauce oder sämige Haus-Mayo-Sauce.
            </p>

            <div class="menu-grid single-col" style="gap: 5.5mm;">
              
              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">90 — Sake Bolw</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">16,00</span>
                </div>
                <div class="menu-item-desc">Angeteasert mit feinsten, frischen rohen Lachsscheiben (Sashimi-Qualität).</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">91 — Tuna Bolw</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">17,00</span>
                </div>
                <div class="menu-item-desc">Angeteasert mit feinen, frischen rohen Thunfischstücken (Sashimi-Qualität).</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">92 — Tokyo Bolw</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">18,00</span>
                </div>
                <div class="menu-item-desc">Garniert mit edlem, saftig gegrilltem BBQ-Süßwasseraal (Unagi).</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">93 — Buddha Bolw 🍀</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">15,50</span>
                </div>
                <div class="menu-item-desc">Vegetarische Bowl-Kreation mit knusprig frittiertem Bio-Tofuwürfeln.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">94 — Tempura Bolw</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">17,50</span>
                </div>
                <div class="menu-item-desc">Garniert mit in krossem Tempurateig goldbraun gebackenen Großgarnelen.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">95 — Chicken Bolw</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">16,00</span>
                </div>
                <div class="menu-item-desc">Angerichtet mit knusprig panierten, saftigen Hähnchenbrustfiletstreifen.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header">
                  <span class="menu-item-name">96 — Sashimi Bolw</span>
                  <span class="menu-item-dots"></span>
                  <span class="menu-item-price">21,00</span>
                </div>
                <div class="menu-item-desc">Die Königsklasse: Ein üppiger Mix aus feinstem Lachs, Thunfisch und gekochten Garnelen (Ebi).</div>
              </div>

            </div>
          </div>

          <div class="footer">
            Beste Rohwaren & Höchste Qualität für unsere Bowls
          </div>
        </div>


        <!-- PAGE 11: SUSHI KLASSIKER (100-122) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Sushi Meisterschnitte</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="page-title" style="margin-bottom: 4mm;">Maki • Nigiri • Sashimi</div>
            
            <div class="menu-grid" style="gap: 5mm 15mm;">
              
              <!-- Maki Column -->
              <div>
                <h3 style="font-family: 'Playfair Display', serif; font-size: 15px; color: #0e271a; border-bottom: 1px solid #d4af37; padding-bottom: 4px; margin-bottom: 3px;">Maki (je 6 Stück)</h3>
                <p style="font-size: 8px; color: #666; font-style: italic; margin-bottom: 4px;">In Noriblatt gerollte Reisrollen mit Füllung</p>
                
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>100 — Gurke (Kappa) 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">4,50</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>101 — Avocado 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">5,00</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>102 — Lachs (Sake)</span><span class="menu-item-dots"></span><span class="menu-item-price">5,00</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>103 — Thunfisch (Tekka)</span><span class="menu-item-dots"></span><span class="menu-item-price">5,00</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>104 — Surimi (Krabbenimitat)</span><span class="menu-item-dots"></span><span class="menu-item-price">5,00</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>105 — Ebi (Garnele)</span><span class="menu-item-dots"></span><span class="menu-item-price">5,00</span></div>
                </div>
              </div>

              <!-- Nigiri Column -->
              <div>
                <h3 style="font-family: 'Playfair Display', serif; font-size: 15px; color: #0e271a; border-bottom: 1px solid #d4af37; padding-bottom: 4px; margin-bottom: 3px;">Nigiri (je 2 Stück)</h3>
                <p style="font-size: 8px; color: #666; font-style: italic; margin-bottom: 4px;">Handgeformte Reisbällchen mit edler Auflage</p>
                
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>110 — Avocado 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">4,50</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>111 — Tofutasche (Inari) 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">5,00</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>112 — Lachs (Sake)</span><span class="menu-item-dots"></span><span class="menu-item-price">5,00</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>113 — Thunfisch (Maguro)</span><span class="menu-item-dots"></span><span class="menu-item-price">5,00</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>114 — BBQ-Aal (Unagi)</span><span class="menu-item-dots"></span><span class="menu-item-price">5,00</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>115 — Ebi (Riesengarnele)</span><span class="menu-item-dots"></span><span class="menu-item-price">5,00</span></div>
                </div>
              </div>

              <!-- Sashimi Column (Bottom Wide) -->
              <div style="grid-column: span 2; margin-top: 5mm;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 15px; color: #0e271a; border-bottom: 1px solid #d4af37; padding-bottom: 4px; margin-bottom: 6px;">Sashimi (Edle rohe Fischschnitte)</h3>
                
                <div class="menu-grid" style="gap: 5mm 15mm;">
                  <div class="menu-item">
                    <div class="menu-item-header">
                      <span class="menu-item-name">120 — Sake Sashimi (5 Scheiben)</span>
                      <span class="menu-item-dots"></span>
                      <span class="menu-item-price">11,00</span>
                    </div>
                    <div class="menu-item-desc">Feinste Tranchen von fangfrischem Premium-Lachs.</div>
                  </div>

                  <div class="menu-item">
                    <div class="menu-item-header">
                      <span class="menu-item-name">121 — Maguro Sashimi (5 Scheiben)</span>
                      <span class="menu-item-dots"></span>
                      <span class="menu-item-price">12,00</span>
                    </div>
                    <div class="menu-item-desc">Zartschmelzende Tranchen von feinstem Thunfisch.</div>
                  </div>

                  <div class="menu-item" style="grid-column: span 2;">
                    <div class="menu-item-header">
                      <span class="menu-item-name">122 — Sashimi Mix (A Béo Signature)</span>
                      <span class="menu-item-dots"></span>
                      <span class="menu-item-price">15,00</span>
                    </div>
                    <div class="menu-item-desc">Meisterlicher Sashimi-Mix mit 4 Scheiben Lachs und 3 Scheiben Thunfisch, dekoriert auf Eis.</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="footer">
            Frisch serviert mit Wasabi und eingelegtem Ingwer (Gari)
          </div>
        </div>


        <!-- PAGE 12: INSIDE OUT & SPEZIAL ROLLS (130-146) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Inside Out & Spezial Rolls</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="page-title" style="margin-bottom: 3mm;">Inside Out Rolls (je 8 Stk.)</div>
            <div class="menu-grid" style="margin-bottom: 5mm; gap: 4mm 10mm;">
              
              <div class="menu-item">
                <div class="menu-item-header"><span>130 — Avocado Roll 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">8,00</span></div>
                <div class="menu-item-desc">Avocado, Frischkäse und Sesam-Ummantelung.</div>
              </div>
              <div class="menu-item">
                <div class="menu-item-header"><span>131 — Kappa Roll 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">8,00</span></div>
                <div class="menu-item-desc">Knackige Gurke, Frischkäse, abgerundet mit Sesam.</div>
              </div>
              <div class="menu-item">
                <div class="menu-item-header"><span>132 — Sake Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">9,00</span></div>
                <div class="menu-item-desc">Frischer Lachs, cremige Avocado und Sesam.</div>
              </div>
              <div class="menu-item">
                <div class="menu-item-header"><span>133 — Tuna Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">9,50</span></div>
                <div class="menu-item-desc">Feiner Thunfisch, Avocado und weißer Sesam.</div>
              </div>
              <div class="menu-item">
                <div class="menu-item-header"><span>134 — Tempura Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">9,50</span></div>
                <div class="menu-item-desc">Knusprig frittierte Tempura-Garnele, Gurke và Sesam.</div>
              </div>
              <div class="menu-item">
                <div class="menu-item-header"><span>135 — Crispy Chicken Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">9,00</span></div>
                <div class="menu-item-desc">Knusprig paniertes Hähnchen, Gurke, süße Teriyaki-Sauce.</div>
              </div>
              <div class="menu-item">
                <div class="menu-item-header"><span>136 — Ebi Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">9,50</span></div>
                <div class="menu-item-desc">Gekochte Riesen-Garnele, Avocado und Sesam-Mantel.</div>
              </div>
              <div class="menu-item">
                <div class="menu-item-header"><span>137 — Alaska Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">9,50</span></div>
                <div class="menu-item-desc">Lachs, cremige Avocado, Surimi und roter Masago (Fischrogen).</div>
              </div>
              <div class="menu-item" style="grid-column: span 2;">
                <div class="menu-item-header"><span>138 — Yasai Roll 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">9,00</span></div>
                <div class="menu-item-desc">Frittierter Tofu, Gurke, Avocado, umhüllt mit feinem Sesam-Mantel.</div>
              </div>

            </div>

            <div class="page-title" style="margin-bottom: 3mm;">Spezial Rolls (Premium je 8 Stk.)</div>
            <div class="menu-grid" style="gap: 4mm 10mm;">
              
              <div class="menu-item">
                <div class="menu-item-header"><span>140 — Green Dragon Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">16,50</span></div>
                <div class="menu-item-desc">Füllung: Tempura-Garnele, Gurke. Top: Avocado-Mantel, Masago.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>141 — Creamy Salmon Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">16,50</span></div>
                <div class="menu-item-desc">Füllung: Avocado, Gurke. Top: Frische Lachsscheiben, pikante Mayo.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>142 — Black Dragon Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">16,50</span></div>
                <div class="menu-item-desc">Füllung: Lachs, Avocado. Top: Gegrillter Unagi-Aal, Teriyaki-Sauce.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>143 — Inari Veggie Roll 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">15,00</span></div>
                <div class="menu-item-desc">Füllung: Avocado, Mango, Frischkäse. Top: Inari-Tofutasche.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>143B — Ruby Tuna Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">16,50</span></div>
                <div class="menu-item-desc">Füllung: Tempura-Garnele, Avocado. Top: Thunfischscheiben, Schnittlauch.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>144 — Rainbow Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">17,00</span></div>
                <div class="menu-item-desc">Füllung: Tempura-Garnele, Gurke. Top: Lachs, Thunfisch, Avocado.</div>
              </div>

            </div>
          </div>

          <div class="footer">
            Spezialität des Hauses • Meisterhaft gerollt
          </div>
        </div>


        <!-- PAGE 13: CRUNCHY SUSHI & SUSHI SCHIFF (150-171) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Crunchy Rolls & Sushi Boote</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="page-title" style="margin-bottom: 3mm;">Crunchy Sushi Rolls (Warm gebacken - 8 Stk.)</div>
            <div class="menu-grid" style="margin-bottom: 5mm; gap: 4.5mm 10mm;">
              
              <div class="menu-item">
                <div class="menu-item-header"><span>150 — Crunchy Veggi Roll 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">11,50</span></div>
                <div class="menu-item-desc">Knusprig gebackene Rolle mit Möhren, Gurken, Avocado, Mango, cremigen Frischkäse und Sesam.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>151 — Crunchy Mini Salmon Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">7,00</span></div>
                <div class="menu-item-desc">Knusprige Mini-Rolle mit feinem Lachs, dazu Mayonnaise-Sauce und gerösteter Sesam.</div>
              </div>

              <div class="menu-item" style="grid-column: span 2;">
                <div class="menu-item-header"><span>152 — Crunchy Tuna Roll</span><span class="menu-item-dots"></span><span class="menu-item-price">13,20</span></div>
                <div class="menu-item-desc">Gebackene Big-Roll gefüllt mit Thunfisch, Porree, Avocado, verziert mit Röstzwiebeln und Teriyaki-Sauce.</div>
              </div>

            </div>

            <div class="page-title" style="margin-bottom: 3mm;">Crunchy Sandwich Rolls (3 extra krosse Ecken)</div>
            <div class="menu-grid" style="margin-bottom: 5mm; gap: 4.5mm 10mm;">
              
              <div class="menu-item">
                <div class="menu-item-header"><span>160 — Crunchy Sake Sandwich</span><span class="menu-item-dots"></span><span class="menu-item-price">11,50</span></div>
                <div class="menu-item-desc">Lachs, Frischkäse, Gurken, Süßkartoffelpommes, hausgemachte Mayo-Sauce.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>161 — Crunchy Vegi Sandwich 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">10,50</span></div>
                <div class="menu-item-desc">Tofu, Gurken, Avocado, Süßkartoffelstreifen, serviert mit Kräuter-Dip.</div>
              </div>

              <div class="menu-item" style="grid-column: span 2;">
                <div class="menu-item-header"><span>162 — Crunchy Chicken Sandwich</span><span class="menu-item-dots"></span><span class="menu-item-price">10,90</span></div>
                <div class="menu-item-desc">Knuspriges Hähnchen, Gurken, Avocado, geschmolzener Mozzarella und Mayonnaise.</div>
              </div>

            </div>

            <div class="page-title" style="margin-bottom: 3mm;">Sushi Schiff (Boote für Genießer)</div>
            <div class="menu-grid" style="gap: 5mm 10mm;">
              
              <div class="menu-item">
                <div class="menu-item-header"><span>170 — Für 2-3 Personen (Standard)</span><span class="menu-item-dots"></span><span class="menu-item-price">55,00</span></div>
                <div class="menu-item-desc">Meisterhafte Sushi-Kombination bestehend aus: 2 Ebi Tempura, 12 Maki (6 Lachs, 6 Gurke), 8 Sake Roll Inside Out, 8 Golden Tempura Roll Spezial, 8 Crunchy Veggi Roll, 4 Nigiri (2 Lachs, 2 Ebi). Unvergesslich präsentiert.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>171 — Für 4-5 Personen (Kaiser-Klasse)</span><span class="menu-item-dots"></span><span class="menu-item-price">95,00</span></div>
                <div class="menu-item-desc">Premium Riesen-Sushi-Boot für die ganze Familie: 2 Ebi Tempura, 12 Maki, 8 Sake Roll IO, 8 Chicken Roll, 8 Golden Tempura, 8 Unagi Crab Roll, 8 Crunchy Veggi Roll, 8 Nigiri, dazu 4 feine Lachs-Sashimi Tranchen.</div>
              </div>

            </div>
          </div>

          <div class="footer">
            A Béo • Das beste Sushi-Erlebnis in Hannover
          </div>
        </div>


        <!-- PAGE 14: DESSERT & DRINKS (180-209) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Desserts & Hausgemachte Erfrischungen</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="page-title" style="margin-bottom: 3.5mm;">Nước Tráng Miệng • Dessert</div>
            <div class="menu-grid" style="margin-bottom: 6mm; gap: 4mm 10mm;">
              
              <div class="menu-item">
                <div class="menu-item-header"><span>180 — Chè dừa dầm 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">6,50</span></div>
                <div class="menu-item-desc">Traditionelles vietnamesisches Kokos-Dessert: frische Kokosraspel, Kokosgelees, Tapioka in samtig-süßer Kokosmilch. Sensationell erfrischend!</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>181 — Xôi kem</span><span class="menu-item-dots"></span><span class="menu-item-price">6,50</span></div>
                <div class="menu-item-desc">Gedämpfter Pandan-Klebreis serviert mit cremiger Kugel Kokoseis, gerösteten Kokoschips und Waffelrolle.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>182 — Gemischtes Eis</span><span class="menu-item-dots"></span><span class="menu-item-price">6,00</span></div>
                <div class="menu-item-desc">Köstliche Kombination aus 3 Kugeln feinstem Eis: Vanille, Mango und cremiges Kokoseis.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>183 — Gebackene Banane</span><span class="menu-item-dots"></span><span class="menu-item-price">5,00</span></div>
                <div class="menu-item-desc">Gebackene Banane im Teigmantel, beträufelt mit goldener Honigsauce, dazu 1 Kugel Vanilleeis.</div>
              </div>

              <div class="menu-item" style="grid-column: span 2;">
                <div class="menu-item-header"><span>184 — Sesam Bällchen (3 Stk.) 🍀</span><span class="menu-item-dots"></span><span class="menu-item-price">4,00</span></div>
                <div class="menu-item-desc">Knusprige Klebreisbällchen mit süßer Mungbohnenfüllung, gewälzt in weißem Sesam.</div>
              </div>

            </div>

            <div class="page-title" style="margin-bottom: 3.5mm;">Hausgemachte Eistee & Limonaden (0,4l)</div>
            <div class="menu-grid" style="gap: 4mm 10mm;">
              
              <div class="menu-item">
                <div class="menu-item-header"><span>205 — Drachenfrucht-Eistee</span><span class="menu-item-dots"></span><span class="menu-item-price">5,50</span></div>
                <div class="menu-item-desc">Frisch gebrühter schwarzer Jasmin-Tee mit exotischer roter Drachenfrucht, verfeinert mit Limetten.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>206 — Lychee Lemonade</span><span class="menu-item-dots"></span><span class="menu-item-price">5,50</span></div>
                <div class="menu-item-desc">Prickelnde, süße Limonade aus reifen Litschis, Minzblättern, Limettensaft und Soda.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>207 — Passion Mint Fizz</span><span class="menu-item-dots"></span><span class="menu-item-price">6,50</span></div>
                <div class="menu-item-desc">Exotische frische Passionsfrucht mit spritziger Minze, Rohrzucker, Limetten und Sodawasser.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>208 — Passion Lemongrass Fizz</span><span class="menu-item-dots"></span><span class="menu-item-price">6,50</span></div>
                <div class="menu-item-desc">Spritziger Zitronengras-Infusion, gemixt mit frischer Maracuja, Limetten und Soda.</div>
              </div>

              <div class="menu-item" style="grid-column: span 2;">
                <div class="menu-item-header"><span>209 — Mango Lassi</span><span class="menu-item-dots"></span><span class="menu-item-price">6,00</span></div>
                <div class="menu-item-desc">Der absolute Klassiker: Cremiger Joghurt-Drink gemixt mit sonnengereifter, süßer Mango.</div>
              </div>

            </div>
          </div>

          <div class="footer">
            A Béo • Osterstraße 30, 30159 Hannover
          </div>
        </div>


        <!-- PAGE 15: SOFTDRINKS, BIER, COCKTAILS (210-255) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Getränke & Cocktails</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="menu-grid" style="gap: 5mm 15mm; margin-bottom: 5mm;">
              
              <!-- Softdrinks Column -->
              <div>
                <h3 style="font-family: 'Playfair Display', serif; font-size: 14px; color: #0e271a; border-bottom: 1px solid #d4af37; padding-bottom: 4px; margin-bottom: 4px;">Alkoholfreie Getränke</h3>
                <div style="font-size: 9px; display: flex; justify-content: right; margin-bottom: 3px; font-weight: bold; color: #b59223;">0,2l / 0,4l</div>
                
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>210 — Coca-Cola / Zero</span><span class="menu-item-dots"></span><span class="menu-item-price">2,90 / 4,90</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>212 — Fanta / Sprite</span><span class="menu-item-dots"></span><span class="menu-item-price">2,90 / 4,90</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>214 — Mezzo Mix</span><span class="menu-item-dots"></span><span class="menu-item-price">2,90 / 4,90</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>215 — Schweppes Ginger Ale</span><span class="menu-item-dots"></span><span class="menu-item-price">3,20 / 5,20</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>216 — Schweppes Tonic Water</span><span class="menu-item-dots"></span><span class="menu-item-price">3,20 / 5,20</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>217 — Schweppes Bitter Lemon</span><span class="menu-item-dots"></span><span class="menu-item-price">3,20 / 5,20</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>220 — Säfte & Saftschorlen</span><span class="menu-item-dots"></span><span class="menu-item-price">3,20 / 5,20</span></div>
                  <div class="menu-item-desc" style="font-size: 8px;">Apfel, Orange, Ananas, Mango, Maracuja, Banane, Kirsche.</div>
                </div>
              </div>

              <!-- Bier Column -->
              <div>
                <h3 style="font-family: 'Playfair Display', serif; font-size: 14px; color: #0e271a; border-bottom: 1px solid #d4af37; padding-bottom: 4px; margin-bottom: 4px;">Kühle Biere</h3>
                
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>Krombacher vom Fass (Pils/Alster)</span><span class="menu-item-dots"></span><span class="menu-item-price">3,90 (0,3l) / 5,90 (0,5l)</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>244 — Krombacher Pils alkoholfrei</span><span class="menu-item-dots"></span><span class="menu-item-price">3,90 (0,33l)</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>245 — Hefeweizen (Hell/Dunkel)</span><span class="menu-item-dots"></span><span class="menu-item-price">5,90 (0,5l)</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>247 — Saigon Bier (Asiatisch)</span><span class="menu-item-dots"></span><span class="menu-item-price">4,50 (0,33l)</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 3px;">
                  <div class="menu-item-header"><span>248 — Kirin Bier (Japanisch)</span><span class="menu-item-dots"></span><span class="menu-item-price">4,50 (0,33l)</span></div>
                </div>
              </div>

            </div>

            <div class="page-title" style="margin-bottom: 3.5px;">Premium Cocktails</div>
            <div class="menu-grid" style="gap: 4mm 10mm;">
              
              <div class="menu-item">
                <div class="menu-item-header"><span>250 — Beer Flip</span><span class="menu-item-dots"></span><span class="menu-item-price">7,50</span></div>
                <div class="menu-item-desc">Exotischer Mix aus Ananassaft, Cranberrysaft, Sprite und feinem Kirin-Bier. Unwiderstehlich!</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>251 — Classic Mojito</span><span class="menu-item-dots"></span><span class="menu-item-price">8,90</span></div>
                <div class="menu-item-desc">Mạnh mẽ với Barcadi Rum, frische Limettenscheiben, Minzblätter, feiner brauner Rohrzucker und Sodawasser.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>252 — Cuba Libre</span><span class="menu-item-dots"></span><span class="menu-item-price">8,90</span></div>
                <div class="menu-item-desc">Edler Havana Club Rum, gepresster Limettensaft, aufgegossen mit eiskalter Coca-Cola.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>253 — Tequila Sunrise</span><span class="menu-item-dots"></span><span class="menu-item-price">9,50</span></div>
                <div class="menu-item-desc">Tequila Gold, spritziger Orangensaft, frischer Limettensaft, verfeinert mit süßer Grenadine.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>254 — Pina Colada</span><span class="menu-item-dots"></span><span class="menu-item-price">8,90</span></div>
                <div class="menu-item-desc">Havana Club Rum, süßer Ananassaft, samtige Sahne und feiner Kokossirup. Traumhaft cremig.</div>
              </div>

              <div class="menu-item">
                <div class="menu-item-header"><span>255 — Ipanema (Alkoholfrei)</span><span class="menu-item-dots"></span><span class="menu-item-price">7,90</span></div>
                <div class="menu-item-desc">Limettenstücke, brauner Rohrzucker, Minzblätter, spritziger Maracujasaft und Ginger Ale.</div>
              </div>

            </div>
          </div>

          <div class="footer">
            Alkoholabgabe erst ab 18 Jahren. Bitte trinken Sie verantwortungsbewusst.
          </div>
        </div>


        <!-- PAGE 16: LONGDRINKS, SPIRITUOSEN, WEIN, KAFFEE, TEE (260-316) -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Bar & Kaffeespezialitäten</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="menu-grid" style="gap: 5mm 15mm; margin-bottom: 5mm;">
              
              <!-- Left Column: Longdrinks & Spirituosen -->
              <div>
                <h3 style="font-family: 'Playfair Display', serif; font-size: 13px; color: #0e271a; border-bottom: 1px solid #d4af37; padding-bottom: 3px; margin-bottom: 4px;">Longdrinks & Shots</h3>
                
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>260 — Jack Daniels Cola</span><span class="menu-item-dots"></span><span class="menu-item-price">8,50</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>261 — Rum Cola (Bacardi)</span><span class="menu-item-dots"></span><span class="menu-item-price">8,50</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>262 — Gin Tonic (Gordon's)</span><span class="menu-item-dots"></span><span class="menu-item-price">8,90</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>Shots (Jägermeister / Sambuca 2cl)</span><span class="menu-item-dots"></span><span class="menu-item-price">3,80</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>280 — Vietnamesischer Reisschnaps (2cl)</span><span class="menu-item-dots"></span><span class="menu-item-price">3,80</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>282 — Sake (Warm serviert 5cl)</span><span class="menu-item-dots"></span><span class="menu-item-price">7,50</span></div>
                </div>

                <h3 style="font-family: 'Playfair Display', serif; font-size: 13px; color: #0e271a; border-bottom: 1px solid #d4af37; padding-bottom: 3px; margin-top: 4mm; margin-bottom: 4px;">Ausgesuchte Weine (0,2l)</h3>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>Grauburgunder (Weißwein trocken)</span><span class="menu-item-dots"></span><span class="menu-item-price">6,80</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>Spätburgunder Rosé (Feinherb)</span><span class="menu-item-dots"></span><span class="menu-item-price">6,90</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>Merlot trocken (Rotwein)</span><span class="menu-item-dots"></span><span class="menu-item-price">6,50</span></div>
                </div>
              </div>

              <!-- Right Column: Kaffee & Tee -->
              <div>
                <h3 style="font-family: 'Playfair Display', serif; font-size: 13px; color: #0e271a; border-bottom: 1px solid #d4af37; padding-bottom: 3px; margin-bottom: 4px;">Kaffeespezialitäten</h3>
                
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>300 — Caffé Cremé</span><span class="menu-item-dots"></span><span class="menu-item-price">3,20</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>301 — Espresso / doppelt</span><span class="menu-item-dots"></span><span class="menu-item-price">2,90 / 4,90</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>303 — Cappuccino</span><span class="menu-item-dots"></span><span class="menu-item-price">3,50</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>304 — Latte Macchiato</span><span class="menu-item-dots"></span><span class="menu-item-price">4,20</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>308 — Cà Phê sữa đá (Vietnamesisch)</span><span class="menu-item-dots"></span><span class="menu-item-price">5,50</span></div>
                  <div class="menu-item-desc" style="font-size: 8px;">Kräftiger, frisch gebrühter Espresso tröpfelnd serviert über süßer Kondensmilch auf Eisguss.</div>
                </div>

                <h3 style="font-family: 'Playfair Display', serif; font-size: 13px; color: #0e271a; border-bottom: 1px solid #d4af37; padding-bottom: 3px; margin-top: 4mm; margin-bottom: 4px;">Frischer Teeguss</h3>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>310 — Genmaicha Tee (Grüntee-Reis)</span><span class="menu-item-dots"></span><span class="menu-item-price">4,90</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>311 — Rosen Tee / Jasmin Tee</span><span class="menu-item-dots"></span><span class="menu-item-price">4,90</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>314 — Frischer Ingwertee mit Honig</span><span class="menu-item-dots"></span><span class="menu-item-price">4,90</span></div>
                </div>
                <div class="menu-item" style="margin-bottom: 2px;">
                  <div class="menu-item-header"><span>315 — Frischer Zitronengrastee</span><span class="menu-item-dots"></span><span class="menu-item-price">4,90</span></div>
                </div>
              </div>

            </div>
          </div>

          <div class="footer">
            A Béo • Osterstraße 30, 30159 Hannover
          </div>
        </div>


        <!-- PAGE 17: ALLERGENE & ZUSATZSTOFFE -->
        <div class="page">
          <div class="header">
            <h1>A Béo</h1>
            <div class="subtitle">Verbraucherinformationen</div>
            <div class="divider"></div>
          </div>

          <div class="menu-section">
            <div class="page-title" style="margin-bottom: 3mm;">Allergene & Zusatzstoffe</div>
            
            <table class="allergy-table">
              <tr>
                <td class="allergy-code">A</td><td>Glutenhaltiges Getreide (Weizen, Roggen, Gerste)</td>
                <td class="allergy-code">H</td><td>Schalenfrüchte (Nüsse wie Mandeln, Haselnüsse)</td>
              </tr>
              <tr>
                <td class="allergy-code">B</td><td>Krebstiere und daraus gewonnene Erzeugnisse</td>
                <td class="allergy-code">I</td><td>Sellerie und daraus gewonnene Erzeugnisse</td>
              </tr>
              <tr>
                <td class="allergy-code">C</td><td>Eier und daraus gewonnene Erzeugnisse</td>
                <td class="allergy-code">J</td><td>Senf und daraus gewonnene Erzeugnisse</td>
              </tr>
              <tr>
                <td class="allergy-code">D</td><td>Fische und daraus gewonnene Erzeugnisse</td>
                <td class="allergy-code">K</td><td>Sesamsamen und daraus gewonnene Erzeugnisse</td>
              </tr>
              <tr>
                <td class="allergy-code">E</td><td>Erdnüsse und daraus gewonnene Erzeugnisse</td>
                <td class="allergy-code">L</td><td>Schwefeldioxid und Sulfite</td>
              </tr>
              <tr>
                <td class="allergy-code">F</td><td>Sojabohnen und daraus gewonnene Erzeugnisse</td>
                <td class="allergy-code">M</td><td>Lupinen und daraus gewonnene Erzeugnisse</td>
              </tr>
              <tr>
                <td class="allergy-code">G</td><td>Milch und Laktose</td>
                <td class="allergy-code">N</td><td>Weichtiere (Tintenfisch, Muscheln)</td>
              </tr>
            </table>

            <h3 style="font-family: 'Playfair Display', serif; font-size: 13px; color: #0e271a; border-bottom: 1px solid #d4af37; padding-bottom: 3px; margin-top: 5mm; margin-bottom: 3px;">Zusatzstoffe</h3>
            <table class="allergy-table" style="margin-top: 0;">
              <tr>
                <td class="allergy-code">1</td><td>Mit Farbstoff</td>
                <td class="allergy-code">5</td><td>Geschwefelt</td>
              </tr>
              <tr>
                <td class="allergy-code">2</td><td>Mit Konservierungsstoff</td>
                <td class="allergy-code">6</td><td>Geschwärzt</td>
              </tr>
              <tr>
                <td class="allergy-code">3</td><td>Mit Antioxidationsmittel</td>
                <td class="allergy-code">7</td><td>Gewachst</td>
              </tr>
              <tr>
                <td class="allergy-code">4</td><td>Mit Geschmacksverstärker</td>
                <td class="allergy-code">8</td><td>Mit Süßungsmittel</td>
              </tr>
            </table>

            <div style="margin-top: 6mm; text-align: center; font-size: 10px; color: #333; line-height: 1.5; padding: 10px; border: 1px dashed #d4af37;">
              <strong>Hinweis für Allergiker:</strong> Bei Fragen zu Allergenen oder Unverträglichkeiten steht Ihnen unser geschultes Servicepersonal gerne zur Verfügung. Bitte sprechen Sie uns vor der Bestellung an. Wir wünschen Ihnen einen angenehmen Aufenthalt und einen guten Appetit!
            </div>
          </div>

          <div class="footer">
            A Béo GmbH • Osterstraße 30, 30159 Hannover • Vietnamesische Küche & Sushi
          </div>
        </div>

      </body>
      </html>
    `);

    printWindow.document.close();
  };

  useEffect(() => {
    const checkStock = () => {
      const saved = localStorage.getItem('noosou_out_of_stock');
      if (saved) {
        try {
          setOutOfStockIds(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      } else {
        setOutOfStockIds([]);
      }
    };
    checkStock();
    window.addEventListener('storage', checkStock);
    const interval = setInterval(checkStock, 1500);
    return () => {
      window.removeEventListener('storage', checkStock);
      clearInterval(interval);
    };
  }, []);

  const isVi = language === 'vi';
  const isDe = language === 'de';

  const categories = [
    { id: 'all', label: t.all },
    { id: 'starters', label: t.starters },
    { id: 'soups', label: t.soups },
    { id: 'wok', label: t.wok },
    { id: 'sushi', label: t.sushi },
    { id: 'drinks', label: t.drinks },
    { id: 'desserts', label: t.desserts },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase() === searchQuery.toLowerCase();
    const matchesTag = selectedTag === 'all' || item.tags.includes(selectedTag);
    return matchesCategory && matchesSearch && matchesTag;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 bg-[#0a0a0a] px-6 md:px-12 border-b border-white/5 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col items-center text-center space-y-5 mb-16 pt-6">
          <div className="w-12 h-[1px] bg-[#d4af37]"></div>
          <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-semibold">
            {isVi ? 'ẨM THỰC CHỌN LỌC' : isDe ? 'KULINARISCHE AUSWAHL' : 'CHEF SELECTIONS'}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-tight">
            {isVi ? 'Thực Đơn ' : 'Our '}
            <span className="not-italic font-extrabold text-[#d4af37] uppercase tracking-wider font-sans">
              {isVi ? 'A BÉO' : 'SIGNATURE MENU'}
            </span>
          </h1>
          <p className="text-white/40 max-w-xl text-xs md:text-sm leading-relaxed">
            {isVi 
              ? 'Tất cả các món ăn được chuẩn bị nóng hổi từ nguyên liệu tươi sạch nhập mới mỗi ngày, giữ trọn hương vị ẩm thực Việt Nam ấm cúng cùng Sushi tuyệt tác.' 
              : 'Our culinary creations are made with handpicked ingredients, traditional family recipes, and meticulous Japanese-Vietnamese presentation.'}
          </p>
        </div>

        {/* Dual View Toggle Segmented Control */}
        <div className="flex justify-center mb-12 select-none">
          <div className="bg-[#111] border border-white/10 p-1.5 flex space-x-1 shadow-2xl">
            <button
              onClick={() => {
                setViewMode('pdf');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-5 py-3 text-[10px] sm:text-xs font-mono tracking-[0.2em] font-extrabold uppercase transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                viewMode === 'pdf'
                  ? 'bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isVi ? 'Bản Thiết Kế Gốc (PDF)' : 'PDF SPEISEKARTE'}</span>
            </button>
            <button
              onClick={() => {
                setViewMode('grid');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-5 py-3 text-[10px] sm:text-xs font-mono tracking-[0.2em] font-extrabold uppercase transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{isVi ? 'Tìm Kiếm & Lọc (Grid)' : 'SUCHE & FILTER'}</span>
            </button>
          </div>
        </div>

        {viewMode === 'pdf' ? (
          <PDFMenuBook 
            language={language} 
            outOfStockIds={outOfStockIds} 
            handleDownloadPDF={handleDownloadPDF} 
          />
        ) : (
          <>
            {/* Filter Controls Panel */}
            <div className="flex flex-col space-y-6 mb-12 bg-[#111]/40 border border-white/5 p-6 md:p-8 rounded-none">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isVi ? 'Tìm phở bò thố đá, vịt giòn, sushi...' : 'Search flying noodles, sushi, Pho...'}
                    className="w-full bg-black border border-white/10 focus:border-[#d4af37] text-white rounded-none py-3.5 pl-11 pr-4 text-xs tracking-wide focus:outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-[10px] uppercase tracking-wider font-bold"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Diet Filter Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-white/30 mr-2" />
                  <button
                    onClick={() => setSelectedTag('all')}
                    className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border ${
                      selectedTag === 'all'
                        ? 'bg-[#d4af37] text-black border-[#d4af37]'
                        : 'bg-black text-white/55 border-white/5 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {t.all}
                  </button>
                  <button
                    onClick={() => setSelectedTag('vegan')}
                    className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border flex items-center space-x-1.5 ${
                      selectedTag === 'vegan'
                        ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-black text-emerald-500/85 hover:text-emerald-400 hover:bg-emerald-950/20 border-white/5'
                    }`}
                  >
                    <span>🌱</span>
                    <span>{t.vegTag}</span>
                  </button>
                  <button
                    onClick={() => setSelectedTag('spicy')}
                    className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border flex items-center space-x-1.5 ${
                      selectedTag === 'spicy'
                        ? 'bg-red-600/20 text-red-300 border-red-500/30'
                        : 'bg-black text-red-500/85 hover:text-red-400 hover:bg-red-950/20 border-white/5'
                    }`}
                  >
                    <span>🌶️</span>
                    <span>{t.spicyTag}</span>
                  </button>
                  <button
                    onClick={() => setSelectedTag('gluten-free')}
                    className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border flex items-center space-x-1.5 ${
                      selectedTag === 'gluten-free'
                        ? 'bg-blue-600/20 text-blue-300 border-blue-500/30'
                        : 'bg-black text-blue-500/85 hover:text-blue-400 hover:bg-red-950/20 border-white/5'
                    }`}
                  >
                    <span>🌾</span>
                    <span>{t.gfTag}</span>
                  </button>
                </div>
              </div>

              {/* Categories bar */}
              <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2 border-t border-white/5 pt-5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-5 py-2.5 text-[11px] uppercase tracking-widest font-bold transition-all border ${
                      selectedCategory === cat.id
                        ? 'bg-[#d4af37]/5 text-[#d4af37] border-[#d4af37]/30'
                        : 'text-white/60 hover:text-white bg-black border-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-black border border-white/5 rounded-none">
                <ShieldAlert className="w-10 h-10 text-white/20" />
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-bold text-white">No dishes found</h3>
                  <p className="text-white/40 text-xs mt-1">Try tweaking your search keywords or active filters.</p>
                </div>
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedTag('all'); setSearchQuery(''); }}
                  className="text-[9px] uppercase tracking-widest bg-white text-black font-bold py-2.5 px-6"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Menu Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => {
                const isOos = outOfStockIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`group flex flex-col bg-[#111] border rounded-none overflow-hidden transition-all duration-500 ${
                      isOos ? 'border-red-950/20 opacity-50' : 'border-white/5 hover:border-[#d4af37]/30'
                    }`}
                  >
                    <div className="relative h-56 overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.name[language]}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-750"
                      />
                      
                      {isOos && (
                        <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center z-10">
                          <span className="text-[10px] font-bold text-red-500 tracking-[0.25em] uppercase font-mono bg-red-950/40 border border-red-500/35 px-3 py-1.5">
                            {isVi ? 'TẠM HẾT HÀNG' : isDe ? 'AUSVERKAUFT' : 'OUT OF STOCK'}
                          </span>
                        </div>
                      )}

                      <span className="absolute top-4 left-4 bg-black/90 border border-white/10 text-[9px] text-[#d4af37] font-bold font-mono tracking-widest uppercase px-3 py-1.5 rounded-none backdrop-blur-md">
                        ID: {item.id} • {t[item.category as keyof typeof t] || item.category}
                      </span>

                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => {
                          let tagEmoji = '';
                          let tagColor = 'bg-black/90 border border-white/10 text-white';
                          if (tag === 'vegan') { tagEmoji = '🌱'; tagColor = 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/20'; }
                          if (tag === 'spicy') { tagEmoji = '🌶️'; tagColor = 'bg-red-950/40 text-red-300 border border-red-800/20'; }
                          if (tag === 'gluten-free') { tagEmoji = '🌾'; tagColor = 'bg-blue-950/40 text-blue-300 border border-blue-800/20'; }
                          if (tag === 'bestseller') { tagEmoji = '⭐'; tagColor = 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20'; }
                          
                          return (
                            <span key={tag} className={`text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-none ${tagColor} flex items-center space-x-1 backdrop-blur-sm`}>
                              <span>{tagEmoji}</span>
                              <span className="capitalize">{tag === 'gluten-free' ? t.gfTag : tag === 'vegan' ? t.vegTag : tag === 'spicy' ? t.spicyTag : t.bestTag}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base font-serif font-medium text-white tracking-wide group-hover:text-[#d4af37] transition-colors leading-snug">
                            {item.name[language]}
                          </h3>
                          <span className="text-base font-serif italic font-semibold text-[#d4af37] whitespace-nowrap">
                            €{item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-white/40 text-xs leading-relaxed line-clamp-3 font-light">
                          {item.description[language]}
                        </p>
                      </div>

                      {/* Redirection to Book Table to enjoy the specific dish */}
                      <div className="pt-2">
                        {isOos ? (
                          <div className="w-full bg-[#111] border border-white/5 text-white/20 font-bold py-3 px-4 text-[9px] uppercase tracking-[0.2em] text-center">
                            {isVi ? 'TẠM HẾT HÀNG' : isDe ? 'ZURZEIT NICHT VERFÜGBAR' : 'NOT AVAILABLE'}
                          </div>
                        ) : (
                          <Link
                            to="/reservation"
                            className="w-full border border-[#d4af37]/45 text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold py-3 px-4 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all rounded-none cursor-pointer"
                          >
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            <span>{isVi ? 'ĐẶT BÀN THƯỞNG THỨC' : isDe ? 'TISCH RESERVIEREN' : 'RESERVE TABLE TO ENJOY'}</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
