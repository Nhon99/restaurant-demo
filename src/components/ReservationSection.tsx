import React, { useState, useEffect } from 'react';
import { Language, Reservation } from '../types';
import { TRANSLATIONS, LOCATIONS } from '../data';
import { Calendar, Users, Clock, MapPin, CheckCircle, Gift, AlertCircle } from 'lucide-react';

interface ReservationSectionProps {
  language: Language;
}

export default function ReservationSection({ language }: ReservationSectionProps) {
  const t = TRANSLATIONS[language];

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [locationId, setLocationId] = useState(LOCATIONS[0].id);
  const [notes, setNotes] = useState('');

  // Cancellation state without dialog popup
  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);

  // Active reservation from localStorage if any
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('noosou_reservation');
    if (saved) {
      try {
        setConfirmedReservation(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date) {
      return; // Browser validation handles required fields
    }

    const newRes: Reservation = {
      id: `NS-${Math.floor(1000 + Math.random() * 9000)}-${LOCATIONS.find(l => l.id === locationId)!.name.substring(7, 10).toUpperCase()}`,
      name,
      email,
      phone,
      guests,
      date,
      time,
      locationId,
      notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('noosou_reservation', JSON.stringify(newRes));

    // Also push to master list for the Admin Dashboard
    const savedAll = localStorage.getItem('noosou_all_reservations');
    let allList: Reservation[] = [];
    if (savedAll) {
      try {
        allList = JSON.parse(savedAll);
      } catch (e) {
        console.error(e);
      }
    }
    allList = [newRes, ...allList];
    localStorage.setItem('noosou_all_reservations', JSON.stringify(allList));

    setConfirmedReservation(newRes);
    setIsConfirmingCancel(false);
  };

  const handleCancelReservation = () => {
    if (!isConfirmingCancel) {
      setIsConfirmingCancel(true);
      return;
    }

    localStorage.removeItem('noosou_reservation');
    setConfirmedReservation(null);
    setIsConfirmingCancel(false);
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setGuests(2);
    setDate('');
    setTime('18:00');
    setNotes('');
  };

  const activeLoc = LOCATIONS.find(l => l.id === (confirmedReservation?.locationId || locationId))!;

  // Generate nice time slots
  const TIME_SLOTS = [
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  return (
    <div className="py-20 bg-[#0a0a0a] border-t border-white/5 px-6 md:px-12" id="reservation">
      <div className="max-w-4xl mx-auto">
        
        {/* Section title */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] mb-1 font-semibold">Table Bookings</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light italic text-white leading-tight">
            {t.tableReservation}
          </h2>
          <p className="text-white/40 max-w-lg text-xs md:text-sm leading-relaxed">
            {t.resSubtitle}
          </p>
        </div>

        {confirmedReservation ? (
          /* CONFIRMED STATE: Render Virtual Ticket Pass */
          <div className="bg-[#111] border border-white/5 rounded-none overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
            {/* Header branding */}
            <div className="bg-[#d4af37] px-6 py-8 text-center text-black flex flex-col items-center space-y-2">
              <CheckCircle className="w-10 h-10 text-black" />
              <h3 className="text-lg font-bold uppercase tracking-[0.2em]">{t.resSuccess}</h3>
              <p className="text-[11px] font-medium max-w-xs opacity-80">{t.resSuccessMsg}</p>
            </div>

            {/* Ticket body */}
            <div className="p-6 md:p-10 space-y-8 relative">
              {/* Left/Right ticket notches */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-[#0a0a0a] rounded-full border-r border-white/5" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-[#0a0a0a] rounded-full border-l border-white/5" />

              <div className="text-center">
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest block">{t.resCode}</span>
                <span className="text-3xl font-serif italic font-semibold text-[#d4af37] tracking-wider block mt-1.5">
                  {confirmedReservation.id}
                </span>
              </div>

              {/* Grid info */}
              <div className="grid grid-cols-2 gap-6 border-t border-b border-white/5 py-6 text-xs">
                <div>
                  <span className="text-white/30 uppercase tracking-widest text-[9px] block">{t.fullName}</span>
                  <span className="font-serif italic text-[#d4af37] text-sm mt-1.5 block">{confirmedReservation.name}</span>
                </div>
                <div>
                  <span className="text-white/30 uppercase tracking-widest text-[9px] block">{t.resGuests}</span>
                  <span className="font-serif italic text-[#d4af37] text-sm mt-1.5 block flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-white/30" />
                    <span>{confirmedReservation.guests} {t.guests}</span>
                  </span>
                </div>
                <div>
                  <span className="text-white/30 uppercase tracking-widest text-[9px] block">{t.resDate}</span>
                  <span className="font-serif italic text-[#d4af37] text-sm mt-1.5 block flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-white/30" />
                    <span>{confirmedReservation.date}</span>
                  </span>
                </div>
                <div>
                  <span className="text-white/30 uppercase tracking-widest text-[9px] block">{t.resTime}</span>
                  <span className="font-serif italic text-[#d4af37] text-sm mt-1.5 block flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-white/30" />
                    <span>{confirmedReservation.time}</span>
                  </span>
                </div>
              </div>

              {/* Location details */}
              <div className="bg-black border border-white/5 p-4.5 rounded-none flex items-start space-x-3.5 text-xs text-white/60">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-white block">{activeLoc.name}</span>
                  <span className="block text-xs">{activeLoc.address}</span>
                  <span className="block text-[11px] text-white/40">Phone: {activeLoc.phone}</span>
                </div>
              </div>

              {confirmedReservation.notes && (
                <div>
                  <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest block">{t.resNotes}</span>
                  <p className="text-xs text-white/70 italic bg-black border border-white/5 p-4 rounded-none mt-2">
                    "{confirmedReservation.notes}"
                  </p>
                </div>
              )}

              {/* Simulated barcode */}
              <div className="pt-4 flex flex-col items-center space-y-2 border-t border-dashed border-white/10">
                <div className="h-10 w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_4px,#444_4px,#444_6px)] opacity-40" />
                <span className="text-[9px] font-mono text-white/30 tracking-[0.4em] uppercase">{confirmedReservation.id}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-black hover:bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-none text-[10px] uppercase tracking-[0.15em] transition-colors"
                >
                  Print Pass
                </button>
                <button
                  onClick={handleCancelReservation}
                  className={`flex-1 font-bold py-3.5 rounded-none text-[10px] uppercase tracking-[0.15em] transition-colors border ${
                    isConfirmingCancel 
                      ? 'bg-red-950/40 border-red-500 text-red-200 animate-pulse'
                      : 'bg-red-950/10 hover:bg-red-950/20 border-red-900/30 text-red-400'
                  }`}
                >
                  {isConfirmingCancel 
                    ? (language === 'vi' ? 'Xác nhận Hủy?' : language === 'de' ? 'Wirklich stornieren?' : 'Confirm Cancel?')
                    : (language === 'vi' ? 'Hủy bàn đã đặt' : language === 'de' ? 'Reservierung stornieren' : 'Cancel Booking')
                  }
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* FORM STATE: Input elements */
          <form onSubmit={handleSubmit} className="bg-[#111]/40 border border-white/5 rounded-none p-6 md:p-10 space-y-8 shadow-xl">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column Fields */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">{t.resName} *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Nguyen Binh"
                    className="w-full bg-black border border-white/5 focus:border-[#d4af37] rounded-none p-3.5 text-xs text-white placeholder-white/25 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">{t.email} *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g., name@domain.com"
                    className="w-full bg-black border border-white/5 focus:border-[#d4af37] rounded-none p-3.5 text-xs text-white placeholder-white/25 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">{t.phone} *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="E.g., +49 176 1234567"
                    className="w-full bg-black border border-white/5 focus:border-[#d4af37] rounded-none p-3.5 text-xs text-white placeholder-white/25 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">{t.resLocation}</label>
                  <select
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    className="w-full bg-black border border-white/5 focus:border-[#d4af37] rounded-none p-3.5 text-xs text-white focus:outline-none transition-colors"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id} className="bg-black text-white">
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column Fields */}
              <div className="space-y-5 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">{t.resGuests}</label>
                    <div className="flex items-center bg-black border border-white/5 rounded-none px-3">
                      <Users className="w-4 h-4 text-white/30 mr-2 shrink-0" />
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 2)}
                        className="w-full bg-transparent border-none py-3.5 text-xs text-white focus:outline-none text-center"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">{t.resTime}</label>
                    <div className="flex items-center bg-black border border-white/5 rounded-none px-3">
                      <Clock className="w-4 h-4 text-white/30 mr-2 shrink-0" />
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-transparent border-none py-3.5 text-xs text-white focus:outline-none [color-scheme:dark]"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot} className="bg-black text-white">{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">{t.resDate} *</label>
                  <div className="flex items-center bg-black border border-white/5 rounded-none px-3.5 py-1">
                    <Calendar className="w-4 h-4 text-white/30 mr-3 shrink-0" />
                    <input
                      type="date"
                      required
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent border-none py-2.5 text-xs text-white focus:outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">{t.resNotes}</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Allergies, high chair for children, window seat..."
                    rows={2}
                    className="w-full bg-black border border-white/5 focus:border-[#d4af37] rounded-none p-3.5 text-xs text-white placeholder-white/20 focus:outline-none resize-none transition-colors"
                  />
                </div>
              </div>

            </div>

            {/* Terms and Submit */}
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start space-x-3 text-[10px] text-white/35 leading-relaxed max-w-md">
                <AlertCircle className="w-4.5 h-4.5 text-[#d4af37] shrink-0 mt-0.5" />
                <p>
                  By confirming, you agree to show up within 15 minutes of your slot. Tables are held for 15 minutes before being released. Cancellations are free.
                </p>
              </div>

              <button
                type="submit"
                className="bg-white hover:bg-white/90 text-black font-bold py-4 px-8 rounded-none text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all shadow-lg shadow-white/5"
              >
                {t.bookNow}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
