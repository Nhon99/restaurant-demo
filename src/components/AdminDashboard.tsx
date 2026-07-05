import React, { useState, useEffect } from 'react';
import { Language, RestaurantEvent, CareerOpportunity, GuestReview, JobApplication, Reservation, MenuIndexSection } from '../types';
import { TRANSLATIONS, LOCATIONS, MENU_ITEMS } from '../data';
import { savePdfBlob, getPdfBlob, clearPdfBlob } from '../lib/pdfStore';
import { 
  Lock, Shield, Calendar, X, Search, Check, Trash2, 
  Clock, AlertCircle, Sparkles, MessageSquare, Briefcase, 
  Volume2, ToggleLeft, ToggleRight, FileText, Plus, User, Eye, Send, Filter
} from 'lucide-react';

interface AdminDashboardProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  events: RestaurantEvent[];
  careers: CareerOpportunity[];
  reviews: GuestReview[];
  applications: JobApplication[];
  onUpdateEvents: (events: RestaurantEvent[]) => void;
  onUpdateCareers: (careers: CareerOpportunity[]) => void;
  onUpdateReviews: (reviews: GuestReview[]) => void;
  onUpdateApplications: (applications: JobApplication[]) => void;
}

export default function AdminDashboard({ 
  language, 
  isOpen, 
  onClose,
  events,
  careers,
  reviews,
  applications,
  onUpdateEvents,
  onUpdateCareers,
  onUpdateReviews,
  onUpdateApplications
}: AdminDashboardProps) {
  const t = TRANSLATIONS[language];
  const isVi = language === 'vi';
  const isDe = language === 'de';

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'bookings' | 'events' | 'careers' | 'reviews' | 'inventory' | 'menu'>('bookings');

  // Reservation States managed locally
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [outOfStockIds, setOutOfStockIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // New item creation forms
  const [newEventForm, setNewEventForm] = useState({
    titleVi: '', titleEn: '', titleDe: '',
    descVi: '', descEn: '', descDe: '',
    date: '',
    image: '/assets/img/logoanheo.jpg',
    active: true
  });

  const [newCareerForm, setNewCareerForm] = useState({
    titleVi: '', titleEn: '', titleDe: '',
    deptVi: '', deptEn: '', deptDe: '',
    salary: '',
    location: 'Hannover Mitte',
    requirementsVi: '', requirementsEn: '', requirementsDe: '',
    active: true
  });

  const [reviewReplyForm, setReviewReplyForm] = useState<{ [reviewId: string]: string }>({});

  // Menu Management States
  const [indexSections, setIndexSections] = useState<MenuIndexSection[]>([]);
  const [newSectionForm, setNewSectionForm] = useState({ id: '', labelVi: '', labelDe: '', targetId: '', pageNumber: '', navigationMode: 'auto' as 'auto' | 'html' | 'pdf' });
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionForm, setEditingSectionForm] = useState({ id: '', labelVi: '', labelDe: '', targetId: '', pageNumber: '', navigationMode: 'auto' as 'auto' | 'html' | 'pdf' });

  // Custom PDF States
  const [customPdfUrl, setCustomPdfUrl] = useState<string>('');
  const [pdfUploadStatus, setPdfUploadStatus] = useState<string>('');
  const [pdfFileSize, setPdfFileSize] = useState<string>('');
  const [adminPdfBlobUrl, setAdminPdfBlobUrl] = useState<string>('');

  // Initialize and load local reservation data
  useEffect(() => {
    if (isOpen) {
      loadReservations();
      loadOutOfStock();
      loadMenuConfig();
    }
  }, [isOpen]);

  // Synchronize and revoke local adminPdfBlobUrl from IndexedDB on demand
  useEffect(() => {
    let activeUrl = '';
    const updateAdminBlobUrl = async () => {
      if (customPdfUrl === 'indexeddb_stored_pdf') {
        const blob = await getPdfBlob();
        if (blob) {
          const url = URL.createObjectURL(blob);
          activeUrl = url;
          setAdminPdfBlobUrl(url);
        } else {
          setAdminPdfBlobUrl('');
        }
      } else {
        setAdminPdfBlobUrl(customPdfUrl);
      }
    };
    
    updateAdminBlobUrl();
    return () => {
      if (activeUrl && activeUrl.startsWith('blob:')) {
        URL.revokeObjectURL(activeUrl);
      }
    };
  }, [customPdfUrl]);

  const loadReservations = () => {
    const savedReservations = localStorage.getItem('noosou_all_reservations');
    const singleRes = localStorage.getItem('noosou_reservation');
    
    let resList: Reservation[] = [];
    if (savedReservations) {
      try { resList = JSON.parse(savedReservations); } catch (e) { console.error(e); }
    }
    
    // Auto-integrate single active reservation from user front-end to showcase integration!
    if (singleRes) {
      try { 
        const parsedSingle = JSON.parse(singleRes) as Reservation;
        if (!resList.some(r => r.id === parsedSingle.id)) {
          resList = [parsedSingle, ...resList];
          localStorage.setItem('noosou_all_reservations', JSON.stringify(resList));
        }
      } catch (e) { console.error(e); }
    }
    setReservations(resList);
  };

  const loadOutOfStock = () => {
    const savedOos = localStorage.getItem('noosou_out_of_stock');
    if (savedOos) {
      try { setOutOfStockIds(JSON.parse(savedOos)); } catch (e) { console.error(e); }
    }
  };

  const notifyMenuConfigUpdated = () => {
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('menu-config-updated'));
  };

  const loadMenuConfig = async () => {
    const savedPdf = localStorage.getItem('abeo_custom_menu_pdf');
    if (savedPdf) {
      setCustomPdfUrl(savedPdf);
      if (savedPdf.startsWith('data:application/pdf') || savedPdf === 'indexeddb_stored_pdf') {
        const blob = await getPdfBlob();
        if (blob) {
          setCustomPdfUrl('indexeddb_stored_pdf');
          const sizeInMb = blob.size / (1024 * 1024);
          setPdfFileSize(`${sizeInMb.toFixed(2)} MB (Uploaded File)`);
        } else if (savedPdf.startsWith('data:application/pdf')) {
          try {
            const res = await fetch(savedPdf);
            const blobObj = await res.blob();
            await savePdfBlob(blobObj);
            localStorage.setItem('abeo_custom_menu_pdf', 'indexeddb_stored_pdf');
            setCustomPdfUrl('indexeddb_stored_pdf');
            const sizeInMb = blobObj.size / (1024 * 1024);
            setPdfFileSize(`${sizeInMb.toFixed(2)} MB (Uploaded File)`);
          } catch (e) {
            console.error('Migration failed, fallback to base64 length', e);
            const sizeInMb = (savedPdf.length * 0.75) / (1024 * 1024);
            setPdfFileSize(`${sizeInMb.toFixed(2)} MB (Uploaded File)`);
          }
        }
      } else {
        setPdfFileSize('Custom PDF Link URL');
      }
    } else {
      setCustomPdfUrl('');
      setPdfFileSize('');
    }

    const savedIndex = localStorage.getItem('abeo_speisekarte_index');
    if (savedIndex) {
      try {
        setIndexSections(JSON.parse(savedIndex));
      } catch (e) {
        console.error(e);
      }
    } else {
      setIndexSections([
        { id: 'cover', labelVi: 'Trang Bìa', labelDe: 'Titelseite', targetId: 'cover', pageNumber: 1, navigationMode: 'pdf' },
        { id: 'starters', labelVi: 'Khai Vị', labelDe: 'Vorspeisen', targetId: 'starters', pageNumber: 2, navigationMode: 'pdf' },
        { id: 'soups', labelVi: 'Salát & Súp', labelDe: 'Salat & Suppen', targetId: 'soups', pageNumber: 3, navigationMode: 'pdf' },
        { id: 'mains', labelVi: 'Món Chính', labelDe: 'Hauptgerichte', targetId: 'mains', pageNumber: 4, navigationMode: 'pdf' },
        { id: 'feuerplatte', labelVi: 'Feuerplatte', labelDe: 'Feuerplatte', targetId: 'feuerplatte', pageNumber: 7, navigationMode: 'pdf' },
        { id: 'bowls', labelVi: 'Cơm Bowls', labelDe: 'Healthy Bowls', targetId: 'bowls', pageNumber: 8, navigationMode: 'pdf' },
        { id: 'sushi', labelVi: 'Thế Giới Sushi', labelDe: 'Sushi & Spezial', targetId: 'sushi', pageNumber: 9, navigationMode: 'pdf' },
        { id: 'desserts', labelVi: 'Tráng Miệng', labelDe: 'Dessert', targetId: 'desserts', pageNumber: 14, navigationMode: 'pdf' },
        { id: 'drinks', labelVi: 'Đồ Uống & Rượu', labelDe: 'Getränke & Wein', targetId: 'drinks', pageNumber: 15, navigationMode: 'pdf' },
        { id: 'allergens', labelVi: 'Dị Ứng', labelDe: 'Allergene', targetId: 'allergens', pageNumber: 16, navigationMode: 'pdf' },
      ]);
    }
  };

  const handleSaveIndexSections = (updated: MenuIndexSection[]) => {
    setIndexSections(updated);
    localStorage.setItem('abeo_speisekarte_index', JSON.stringify(updated));
    notifyMenuConfigUpdated();
  };

  const handleAddIndexSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionForm.id || !newSectionForm.labelVi || !newSectionForm.labelDe) return;
    
    const cleanId = newSectionForm.id.toLowerCase().replace(/\s+/g, '-');
    
    if (indexSections.some(sec => sec.id === cleanId)) {
      alert('A section with this ID already exists!');
      return;
    }

    const pageNumVal = newSectionForm.pageNumber ? parseInt(newSectionForm.pageNumber, 10) : undefined;

    const newSec: MenuIndexSection = {
      id: cleanId,
      labelVi: newSectionForm.labelVi,
      labelDe: newSectionForm.labelDe,
      targetId: newSectionForm.targetId || undefined,
      pageNumber: isNaN(pageNumVal as number) ? undefined : pageNumVal,
      navigationMode: newSectionForm.navigationMode,
    };

    const updated = [...indexSections, newSec];
    handleSaveIndexSections(updated);
    setNewSectionForm({ id: '', labelVi: '', labelDe: '', targetId: '', pageNumber: '', navigationMode: 'auto' });
  };

  const handleDeleteIndexSection = (id: string) => {
    const updated = indexSections.filter(sec => sec.id !== id);
    handleSaveIndexSections(updated);
  };

  const handleStartEditSection = (sec: MenuIndexSection) => {
    setEditingSectionId(sec.id);
    setEditingSectionForm({
      id: sec.id,
      labelVi: sec.labelVi,
      labelDe: sec.labelDe,
      targetId: sec.targetId || '',
      pageNumber: sec.pageNumber !== undefined ? String(sec.pageNumber) : '',
      navigationMode: sec.navigationMode || 'auto',
    });
  };

  const handleSaveEditSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSectionForm.labelVi || !editingSectionForm.labelDe) return;

    const pageNumVal = editingSectionForm.pageNumber ? parseInt(editingSectionForm.pageNumber, 10) : undefined;

    const updated = indexSections.map(sec => 
      sec.id === editingSectionId 
        ? { 
            ...sec, 
            labelVi: editingSectionForm.labelVi, 
            labelDe: editingSectionForm.labelDe,
            targetId: editingSectionForm.targetId || undefined,
            pageNumber: isNaN(pageNumVal as number) ? undefined : pageNumVal,
            navigationMode: editingSectionForm.navigationMode,
          }
        : sec
    );
    handleSaveIndexSections(updated);
    setEditingSectionId(null);
  };

  const handleMoveIndexSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === indexSections.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...indexSections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    handleSaveIndexSections(updated);
  };

  const handleResetIndexToDefault = () => {
    if (window.confirm('Are you sure you want to restore the default Speisekarte index? This will overwrite your custom categories.')) {
      localStorage.removeItem('abeo_speisekarte_index');
      notifyMenuConfigUpdated();
      loadMenuConfig();
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setPdfUploadStatus('Error: Only PDF files are supported.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setPdfUploadStatus('Error: File is too large. Please upload a PDF under 25 MB or use the Direct Link input below.');
      return;
    }

    setPdfUploadStatus('Saving to browser database...');
    savePdfBlob(file)
      .then(() => {
        localStorage.setItem('abeo_custom_menu_pdf', 'indexeddb_stored_pdf');
        notifyMenuConfigUpdated();
        setCustomPdfUrl('indexeddb_stored_pdf');
        const sizeInMb = file.size / (1024 * 1024);
        setPdfFileSize(`${sizeInMb.toFixed(2)} MB (${file.name})`);
        setPdfUploadStatus('Success: PDF menu uploaded.');
      })
      .catch((err) => {
        console.error(err);
        setPdfUploadStatus('Error: Failed to save to browser database.');
      });
  };

  const handleSavePdfUrl = async (url: string) => {
    setCustomPdfUrl(url);
    if (url) {
      await clearPdfBlob();
      localStorage.setItem('abeo_custom_menu_pdf', url);
      setPdfFileSize('Custom PDF Link URL');
      setPdfUploadStatus('Success: Direct PDF link saved.');
    } else {
      await clearPdfBlob();
      localStorage.removeItem('abeo_custom_menu_pdf');
      setPdfFileSize('');
      setPdfUploadStatus('Success: Custom PDF link removed.');
    }
    notifyMenuConfigUpdated();
  };

  const handleResetPdfToDefault = async () => {
    if (window.confirm('Are you sure you want to remove the custom PDF menu and restore the original beautifully compiled print menu?')) {
      await clearPdfBlob();
      localStorage.removeItem('abeo_custom_menu_pdf');
      notifyMenuConfigUpdated();
      setCustomPdfUrl('');
      setPdfFileSize('');
      setPdfUploadStatus('Restored default compiled menu.');
    }
  };

  const saveReservations = (updated: Reservation[]) => {
    setReservations(updated);
    localStorage.setItem('noosou_all_reservations', JSON.stringify(updated));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === '1234' || passcode.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
      setPasscode('');
    } else {
      setAuthError(true);
      setPasscode('');
    }
  };

  // Seed sample reservations for live interactive testing
  const seedMockReservations = () => {
    const mockReservations: Reservation[] = [
      {
        id: 'AB-8821-MIT',
        name: 'Sebastian Weber',
        email: 's.weber@hannover.de',
        phone: '+49 172 8844221',
        date: new Date().toISOString().split('T')[0],
        time: '19:30',
        guests: 4,
        locationId: 'loc1',
        status: 'confirmed',
        notes: 'Fensterplatz bevorzugt (Window seat preferred). Vegan friendly.',
        createdAt: new Date(Date.now() - 30 * 60000).toISOString()
      },
      {
        id: 'AB-1049-OST',
        name: 'Trần Minh Tiến',
        email: 'tien.tran@gmx.de',
        phone: '+49 152 3456789',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '18:15',
        guests: 2,
        locationId: 'loc2',
        status: 'pending',
        notes: 'Anniversary celebration. Couple private table.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'AB-9042-GEO',
        name: 'Julia Fischer',
        email: 'julia.fischer@outlook.com',
        phone: '0176 88771122',
        date: new Date().toISOString().split('T')[0],
        time: '13:00',
        guests: 6,
        locationId: 'loc3',
        status: 'seated',
        notes: 'Needs high chair for baby',
        createdAt: new Date(Date.now() - 3 * 3600000).toISOString()
      }
    ];
    saveReservations(mockReservations);
  };

  // Manage Reservation statuses
  const handleUpdateResStatus = (resId: string, status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled') => {
    const updated = reservations.map(r => r.id === resId ? { ...r, status } : r);
    saveReservations(updated);
  };

  const handleDeleteRes = (resId: string) => {
    const updated = reservations.filter(r => r.id !== resId);
    saveReservations(updated);
  };

  // Toggle Out of Stock inventory
  const handleToggleStock = (itemId: string) => {
    let updated: string[];
    if (outOfStockIds.includes(itemId)) {
      updated = outOfStockIds.filter(id => id !== itemId);
    } else {
      updated = [...outOfStockIds, itemId];
    }
    setOutOfStockIds(updated);
    localStorage.setItem('noosou_out_of_stock', JSON.stringify(updated));
  };

  // Add new Event from admin panel
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventForm.titleVi || !newEventForm.titleEn) return;

    const newEvent: RestaurantEvent = {
      id: `evt_${Date.now()}`,
      title: {
        vi: newEventForm.titleVi,
        en: newEventForm.titleEn,
        de: newEventForm.titleDe || newEventForm.titleEn
      },
      description: {
        vi: newEventForm.descVi,
        en: newEventForm.descEn,
        de: newEventForm.descDe || newEventForm.descEn
      },
      date: newEventForm.date || new Date().toISOString().split('T')[0],
      image: newEventForm.image,
      active: newEventForm.active
    };

    onUpdateEvents([newEvent, ...events]);
    setNewEventForm({
      titleVi: '', titleEn: '', titleDe: '',
      descVi: '', descEn: '', descDe: '',
      date: '',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      active: true
    });
  };

  const handleToggleEventActive = (id: string) => {
    const updated = events.map(e => e.id === id ? { ...e, active: !e.active } : e);
    onUpdateEvents(updated);
  };

  const handleDeleteEvent = (id: string) => {
    const updated = events.filter(e => e.id !== id);
    onUpdateEvents(updated);
  };

  // Add new Career from admin panel
  const handleAddCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCareerForm.titleVi || !newCareerForm.titleEn) return;

    const newJob: CareerOpportunity = {
      id: `job_${Date.now()}`,
      title: {
        vi: newCareerForm.titleVi,
        en: newCareerForm.titleEn,
        de: newCareerForm.titleDe || newCareerForm.titleEn
      },
      type: {
        vi: newCareerForm.deptVi || 'Toàn thời gian',
        en: newCareerForm.deptEn || 'Full-time',
        de: newCareerForm.deptDe || 'Vollzeit'
      },
      salary: {
        vi: newCareerForm.salary || 'Lương thỏa thuận',
        en: newCareerForm.salary || 'Competitive',
        de: newCareerForm.salary || 'Nach Vereinbarung'
      },
      requirements: {
        vi: newCareerForm.requirementsVi.split('\n').filter(Boolean),
        en: newCareerForm.requirementsEn.split('\n').filter(Boolean),
        de: (newCareerForm.requirementsDe || newCareerForm.requirementsEn).split('\n').filter(Boolean)
      },
      description: {
        vi: 'Ứng tuyển ngay vị trí hấp dẫn này tại nhà hàng A Béo.',
        en: 'Apply now for this exciting role at A Béo restaurant.',
        de: 'Bewerben Sie sich jetzt für diese spannende Stelle im Restaurant A Béo.'
      },
      active: newCareerForm.active
    };

    onUpdateCareers([newJob, ...careers]);
    setNewCareerForm({
      titleVi: '', titleEn: '', titleDe: '',
      deptVi: '', deptEn: '', deptDe: '',
      salary: '',
      location: 'Hannover Mitte',
      requirementsVi: '', requirementsEn: '', requirementsDe: '',
      active: true
    });
  };

  const handleToggleCareerActive = (id: string) => {
    const updated = careers.map(c => c.id === id ? { ...c, active: !c.active } : c);
    onUpdateCareers(updated);
  };

  const handleDeleteCareer = (id: string) => {
    const updated = careers.filter(c => c.id !== id);
    onUpdateCareers(updated);
  };

  const handleDeleteApplication = (id: string) => {
    const updated = applications.filter(a => a.id !== id);
    onUpdateApplications(updated);
  };

  // Moderating Reviews
  const handleApproveReview = (id: string) => {
    const updated = reviews.map(r => r.id === id ? { ...r, status: 'approved' as const } : r);
    onUpdateReviews(updated);
  };

  const handleDeleteReview = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    onUpdateReviews(updated);
  };

  const handleAddReviewReply = (id: string) => {
    const replyText = reviewReplyForm[id];
    if (!replyText) return;

    const updated = reviews.map(r => r.id === id ? { ...r, reply: replyText } : r);
    onUpdateReviews(updated);
    setReviewReplyForm({ ...reviewReplyForm, [id]: '' });
  };

  if (!isOpen) return null;

  // Search filter applied to Reservations list
  const filteredReservations = reservations.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' ? true : r.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());

  // Count active reservations and pending reviews
  const activeBookingsCount = reservations.filter(r => r.status === 'pending' || r.status === 'confirmed').length;
  const pendingReviewsCount = reviews.filter(r => r.status === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black flex flex-col animate-in fade-in duration-300">
      
      {/* HEADER BAR */}
      <header className="bg-[#111] px-6 py-4.5 border-b border-white/5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-none bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs font-bold text-white tracking-[0.25em] uppercase">A BÉO STAFF PORTAL</h1>
            <p className="text-[9px] text-[#d4af37] tracking-widest font-semibold uppercase mt-0.5">Control Center • Authorized staff only</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {isAuthenticated && (
            <div className="hidden sm:flex items-center space-x-2 text-[10px] text-emerald-400 font-mono tracking-wider bg-emerald-950/20 border border-emerald-500/20 px-3 py-1.5 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Session Authenticated</span>
            </div>
          )}
          <button 
            onClick={onClose}
            className="p-2 border border-white/10 hover:border-white/20 text-white/50 hover:text-white transition-all rounded-none cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {!isAuthenticated ? (
        /* PASSCODE GATE */
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-sm bg-[#111]/40 border border-white/5 p-8 text-center space-y-6">
            <div className="w-14 h-14 rounded-none bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mx-auto">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            
            <div className="space-y-1.5">
              <h2 className="text-sm font-bold tracking-[0.2em] text-white uppercase">Staff Verification</h2>
              <p className="text-xs text-white/40 max-w-[280px] mx-auto leading-relaxed font-light">
                Please enter the security PIN <code className="text-[#d4af37] font-bold">1234</code> or <code className="text-[#d4af37] font-bold">admin</code> to open staff dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••"
                maxLength={8}
                className="w-full bg-black text-center text-xl tracking-[0.5em] font-mono border border-white/10 focus:border-[#d4af37] text-white rounded-none py-3.5 focus:outline-none transition-colors placeholder-white/10"
                autoFocus
              />

              {authError && (
                <div className="text-[10px] text-red-400 tracking-wider font-semibold uppercase flex items-center justify-center space-x-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid passcode. Try again.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#d4af37] hover:bg-[#b59223] text-black font-bold text-[10px] py-4 uppercase tracking-[0.2em] transition-all cursor-pointer"
              >
                ACCESS WORKSPACE
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* CORE WORKSPACE */
        <div className="flex-1 flex flex-col lg:flex-row">
          
          {/* NAVIGATION SIDEBAR */}
          <nav className="w-full lg:w-64 bg-[#0d0d0d] border-b lg:border-b-0 lg:border-r border-white/5 p-4.5 flex flex-col gap-1.5 shrink-0">
            <span className="text-[9px] font-bold text-white/30 tracking-[0.2em] uppercase px-3.5 mb-2 block">Management Hub</span>
            
            <button 
              onClick={() => { setActiveTab('bookings'); setStatusFilter('all'); setSearchQuery(''); }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-left transition-all ${
                activeTab === 'bookings' 
                  ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37]' 
                  : 'text-white/45 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <Calendar className="w-4 h-4" />
                <span>Bookings ({reservations.length})</span>
              </div>
              {activeBookingsCount > 0 && (
                <span className="bg-[#d4af37] text-black font-mono text-[9px] font-bold px-2 py-0.5">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => { setActiveTab('events'); setStatusFilter('all'); setSearchQuery(''); }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-left transition-all ${
                activeTab === 'events' 
                  ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37]' 
                  : 'text-white/45 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <Sparkles className="w-4 h-4" />
                <span>Events ({events.length})</span>
              </div>
            </button>

            <button 
              onClick={() => { setActiveTab('careers'); setStatusFilter('all'); setSearchQuery(''); }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-left transition-all ${
                activeTab === 'careers' 
                  ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37]' 
                  : 'text-white/45 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <Briefcase className="w-4 h-4" />
                <span>Careers & CVs</span>
              </div>
              {applications.length > 0 && (
                <span className="bg-white/25 text-white font-mono text-[9px] font-bold px-2 py-0.5">
                  {applications.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => { setActiveTab('reviews'); setStatusFilter('all'); setSearchQuery(''); }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-left transition-all ${
                activeTab === 'reviews' 
                  ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37]' 
                  : 'text-white/45 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <MessageSquare className="w-4 h-4" />
                <span>Guest Reviews</span>
              </div>
              {pendingReviewsCount > 0 && (
                <span className="bg-red-500 text-white font-mono text-[9px] font-bold px-2 py-0.5 animate-bounce">
                  {pendingReviewsCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => { setActiveTab('inventory'); setStatusFilter('all'); setSearchQuery(''); }}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-left transition-all ${
                activeTab === 'inventory' 
                  ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37]' 
                  : 'text-white/45 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Menu Availability</span>
            </button>

            <button 
              onClick={() => { setActiveTab('menu'); setStatusFilter('all'); setSearchQuery(''); }}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-left transition-all ${
                activeTab === 'menu' 
                  ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37]' 
                  : 'text-white/45 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Menu PDF & Index</span>
            </button>

            {/* SEED CONTROLS */}
            <div className="mt-auto pt-8 border-t border-white/5 space-y-3 p-2">
              <span className="text-[9px] font-bold text-white/20 tracking-[0.15em] uppercase block">Operations Utility</span>
              <button
                onClick={seedMockReservations}
                className="w-full bg-[#111] hover:bg-white/5 border border-white/10 hover:border-[#d4af37]/50 text-white hover:text-[#d4af37] font-semibold text-[9px] py-2.5 uppercase tracking-widest transition-all block text-center cursor-pointer"
              >
                Seed Mock Bookings
              </button>
              <button
                onClick={() => {
                  saveReservations([]);
                  onUpdateApplications([]);
                }}
                className="w-full bg-red-950/20 hover:bg-red-900/35 border border-red-900/30 text-red-400 font-semibold text-[9px] py-2.5 uppercase tracking-widest transition-all block text-center cursor-pointer"
              >
                Reset Live Data
              </button>
            </div>
          </nav>

          {/* MAIN WORKING STAGE */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-80px)]">
            
            {/* TAB: BOOKINGS HUB */}
            {activeTab === 'bookings' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-wider text-white">Bookings Hub</h2>
                    <p className="text-[11px] text-white/40 uppercase mt-0.5">Approve incoming guests, track tables & assign seating</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Guest Name..."
                        className="bg-black border border-white/10 text-xs text-white rounded-none pl-9 pr-4 py-2 w-48 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-black border border-white/10 text-xs text-white rounded-none px-3 py-2 focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="all">All Bookings</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="seated">Seated</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {filteredReservations.length === 0 ? (
                  <div className="p-16 border border-white/5 bg-[#111]/10 text-center text-white/40 space-y-4">
                    <Calendar className="w-10 h-10 text-white/15 mx-auto" />
                    <p className="text-xs uppercase tracking-widest">No matching bookings currently found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredReservations.map((res) => {
                      const branch = LOCATIONS.find(l => l.id === res.locationId)?.name[language] || res.locationId;
                      return (
                        <div 
                          key={res.id}
                          className="bg-black border border-white/5 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-white/10"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-bold font-mono text-[#d4af37] uppercase bg-black border border-white/10 px-2 py-0.5">{res.id}</span>
                              <h4 className="text-sm font-bold text-white uppercase">{res.name}</h4>
                              <span className="text-xs text-white/30">•</span>
                              <span className="text-xs font-bold text-white/70">{res.guests} {isVi ? 'Khách' : 'Guests'}</span>
                            </div>
                            <div className="text-[11px] text-white/40 space-y-0.5">
                              <p><strong>Time:</strong> {res.date} @ <span className="text-white font-mono font-medium">{res.time}</span></p>
                              <p><strong>Branch:</strong> {branch}</p>
                              <p><strong>Contact:</strong> {res.phone} | {res.email}</p>
                              {res.notes && (
                                <p className="text-amber-500 font-light mt-1 text-[10px]">
                                  <strong>Special request:</strong> "{res.notes}"
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Seating and confirmation operations */}
                          <div className="flex flex-wrap items-center gap-2">
                            {res.status === 'pending' && (
                              <button
                                onClick={() => handleUpdateResStatus(res.id, 'confirmed')}
                                className="px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-black border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                              >
                                CONFIRM
                              </button>
                            )}
                            {res.status === 'confirmed' && (
                              <button
                                onClick={() => handleUpdateResStatus(res.id, 'seated')}
                                className="px-3 py-2 bg-sky-600/20 hover:bg-sky-600 text-sky-400 hover:text-black border border-sky-500/30 text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                              >
                                MARK SEATED
                              </button>
                            )}
                            {res.status === 'seated' && (
                              <button
                                onClick={() => handleUpdateResStatus(res.id, 'completed')}
                                className="px-3 py-2 bg-white/5 hover:bg-white text-white/70 hover:text-black border border-white/15 text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                              >
                                COMPLETE
                              </button>
                            )}

                            {res.status !== 'cancelled' && res.status !== 'completed' && (
                              <button
                                onClick={() => handleUpdateResStatus(res.id, 'cancelled')}
                                className="px-3 py-2 bg-red-950/20 hover:bg-red-900/40 text-red-400 border border-red-900/20 text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                              >
                                CANCEL
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteRes(res.id)}
                              className="p-2 border border-white/5 hover:border-red-500/30 text-white/30 hover:text-red-500 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            {/* Status label representation */}
                            <span className={`ml-2 text-[9px] font-bold uppercase px-2 py-1 tracking-widest ${
                              res.status === 'pending' ? 'bg-amber-500/10 border border-amber-500/30 text-amber-500' :
                              res.status === 'confirmed' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' :
                              res.status === 'seated' ? 'bg-sky-500/10 border border-sky-500/30 text-sky-400' :
                              res.status === 'completed' ? 'bg-white/5 text-white/30 border border-white/5' :
                              'bg-red-950/20 text-red-500/60 border border-red-950/30'
                            }`}>
                              {res.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB: EVENTS MANAGER */}
            {activeTab === 'events' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-wider text-white">Events Manager</h2>
                  <p className="text-[11px] text-white/40 uppercase mt-0.5">Publish community events, holidays, and chef collaborations</p>
                </div>

                {/* Event Creation Form */}
                <form onSubmit={handleAddEvent} className="bg-[#111]/40 border border-white/5 p-6 space-y-4">
                  <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-[0.2em] block">CREATE NEW EVENT</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] text-white/40 uppercase tracking-wider block">Vi Title *</label>
                      <input 
                        type="text" required
                        value={newEventForm.titleVi}
                        onChange={(e) => setNewEventForm({ ...newEventForm, titleVi: e.target.value })}
                        placeholder="Tiêu đề tiếng Việt"
                        className="w-full bg-black border border-white/10 px-3.5 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-white/40 uppercase tracking-wider block">En Title *</label>
                      <input 
                        type="text" required
                        value={newEventForm.titleEn}
                        onChange={(e) => setNewEventForm({ ...newEventForm, titleEn: e.target.value })}
                        placeholder="English Title"
                        className="w-full bg-black border border-white/10 px-3.5 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-white/40 uppercase tracking-wider block">De Title</label>
                      <input 
                        type="text"
                        value={newEventForm.titleDe}
                        onChange={(e) => setNewEventForm({ ...newEventForm, titleDe: e.target.value })}
                        placeholder="German Title (Optional)"
                        className="w-full bg-black border border-white/10 px-3.5 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] text-white/40 uppercase tracking-wider block">Vi Description *</label>
                      <textarea 
                        required rows={2}
                        value={newEventForm.descVi}
                        onChange={(e) => setNewEventForm({ ...newEventForm, descVi: e.target.value })}
                        placeholder="Nội dung tiếng Việt"
                        className="w-full bg-black border border-white/10 px-3.5 py-2 text-xs text-white outline-none focus:border-[#d4af37] resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-white/40 uppercase tracking-wider block">En Description *</label>
                      <textarea 
                        required rows={2}
                        value={newEventForm.descEn}
                        onChange={(e) => setNewEventForm({ ...newEventForm, descEn: e.target.value })}
                        placeholder="English Description"
                        className="w-full bg-black border border-white/10 px-3.5 py-2 text-xs text-white outline-none focus:border-[#d4af37] resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-white/40 uppercase tracking-wider block">De Description</label>
                      <textarea 
                        rows={2}
                        value={newEventForm.descDe}
                        onChange={(e) => setNewEventForm({ ...newEventForm, descDe: e.target.value })}
                        placeholder="German Description (Optional)"
                        className="w-full bg-black border border-white/10 px-3.5 py-2 text-xs text-white outline-none focus:border-[#d4af37] resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] text-white/40 uppercase tracking-wider block">Event Date *</label>
                      <input 
                        type="text"
                        value={newEventForm.date}
                        onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })}
                        placeholder="E.g., 2026-07-20 hoặc 20. Juli 2026"
                        className="w-full bg-black border border-white/10 px-3.5 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-white/40 uppercase tracking-wider block">Image URL</label>
                      <input 
                        type="text"
                        value={newEventForm.image}
                        onChange={(e) => setNewEventForm({ ...newEventForm, image: e.target.value })}
                        className="w-full bg-black border border-white/10 px-3.5 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-white hover:bg-[#d4af37] text-black font-bold text-[9px] uppercase tracking-wider px-6 py-2.5 transition-all cursor-pointer"
                  >
                    PUBLISH NEW EVENT
                  </button>
                </form>

                {/* Active Events List */}
                <div className="space-y-4">
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] block">PUBLISHED EVENTS</span>
                  {events.length === 0 ? (
                    <p className="text-xs text-white/30 italic">No events published yet.</p>
                  ) : (
                    events.map((evt) => (
                      <div 
                        key={evt.id}
                        className="bg-[#111]/25 border border-white/5 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex items-center space-x-4">
                          <img src={evt.image} className="w-12 h-12 object-cover" alt="" />
                          <div>
                            <h4 className="text-xs font-bold text-white uppercase">{evt.title[language]}</h4>
                            <p className="text-[10px] text-white/40">{evt.date} • {evt.description[language].substring(0, 80)}...</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2.5">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40">
                              {evt.active ? 'ACTIVE' : 'DRAFT'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleToggleEventActive(evt.id)}
                              className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-all duration-300 ease-in-out focus:outline-none ${
                                evt.active ? 'bg-[#d4af37]' : 'bg-[#222] border border-white/10'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                                  evt.active ? 'translate-x-5 bg-black' : 'translate-x-0.5 bg-white/40'
                                }`}
                              />
                            </button>
                          </div>
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="p-1.5 hover:bg-white/5 text-white/40 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB: CAREERS & CANDIDATE CV APPLICATIONS */}
            {activeTab === 'careers' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-wider text-white">Careers Dashboard</h2>
                  <p className="text-[11px] text-white/40 uppercase mt-0.5">Post job vacancies and review candidate resumes</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                  
                  {/* Left: Careers creation & listings */}
                  <div className="space-y-6">
                    
                    {/* Job creator */}
                    <form onSubmit={handleAddCareer} className="bg-[#111]/40 border border-white/5 p-6 space-y-4">
                      <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-[0.2em] block font-mono">CREATE NEW JOB VACANCY</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] text-white/40 uppercase block">Vi Job Title *</label>
                          <input 
                            type="text" required
                            value={newCareerForm.titleVi}
                            onChange={(e) => setNewCareerForm({ ...newCareerForm, titleVi: e.target.value })}
                            placeholder="E.g., Đầu Bếp Sushi"
                            className="w-full bg-black border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-white/40 uppercase block">En Job Title *</label>
                          <input 
                            type="text" required
                            value={newCareerForm.titleEn}
                            onChange={(e) => setNewCareerForm({ ...newCareerForm, titleEn: e.target.value })}
                            placeholder="E.g., Sushi Chef"
                            className="w-full bg-black border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] text-white/40 uppercase block">Salary (€) *</label>
                          <input 
                            type="text" required
                            value={newCareerForm.salary}
                            onChange={(e) => setNewCareerForm({ ...newCareerForm, salary: e.target.value })}
                            placeholder="E.g., €3200 / month"
                            className="w-full bg-black border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-white/40 uppercase block">Location</label>
                          <input 
                            type="text"
                            value={newCareerForm.location}
                            onChange={(e) => setNewCareerForm({ ...newCareerForm, location: e.target.value })}
                            className="w-full bg-black border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-white/40 uppercase block">Department *</label>
                          <input 
                            type="text" required
                            value={newCareerForm.deptEn}
                            onChange={(e) => setNewCareerForm({ ...newCareerForm, deptEn: e.target.value, deptVi: e.target.value })}
                            placeholder="E.g., Kitchen"
                            className="w-full bg-black border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] text-white/40 uppercase block">Requirements (One per line) *</label>
                        <textarea 
                          required rows={3}
                          value={newCareerForm.requirementsEn}
                          onChange={(e) => setNewCareerForm({ ...newCareerForm, requirementsEn: e.target.value, requirementsVi: e.target.value })}
                          placeholder="Experienced with Wok&#10;Speak English or German&#10;Punctual and passionate"
                          className="w-full bg-black border border-white/10 px-3.5 py-2 text-xs text-white outline-none focus:border-[#d4af37] font-mono leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-white hover:bg-[#d4af37] text-black font-bold text-[9px] uppercase tracking-wider px-6 py-2.5 transition-all cursor-pointer"
                      >
                        POST JOB VACANCY
                      </button>
                    </form>

                    {/* Listings */}
                    <div className="space-y-3.5">
                      <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] block">CURRENT JOB OPENINGS</span>
                      {careers.map((job) => (
                        <div 
                          key={job.id}
                          className="bg-black border border-white/5 p-4 flex items-center justify-between"
                        >
                          <div>
                            <h4 className="text-xs font-bold text-white uppercase">{job.title[language]}</h4>
                            <p className="text-[10px] text-white/40 mt-0.5">{job.type[language]} • {job.salary[language]}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2.5 mr-2">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40">
                                {job.active ? 'ACTIVE' : 'PAUSED'}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleToggleCareerActive(job.id)}
                                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-all duration-300 ease-in-out focus:outline-none ${
                                  job.active ? 'bg-[#d4af37]' : 'bg-[#222] border border-white/10'
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                                    job.active ? 'translate-x-5 bg-black' : 'translate-x-0.5 bg-white/40'
                                  }`}
                                />
                              </button>
                            </div>
                            <button
                              onClick={() => handleDeleteCareer(job.id)}
                              className="p-1.5 hover:bg-white/5 text-white/40 hover:text-red-500 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Right: Submitted CV applications list */}
                  <div className="space-y-4">
                    <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-[0.2em] block font-mono">SUBMITTED CANDIDATE CVS ({applications.length})</span>
                    
                    {applications.length === 0 ? (
                      <div className="p-12 border border-white/5 bg-[#111]/10 text-center text-white/30 italic text-xs">
                        No candidate applications submitted yet.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {applications.map((app) => (
                          <div 
                            key={app.id}
                            className="bg-black border border-white/5 p-5 space-y-3 relative transition-all hover:border-[#d4af37]/20"
                          >
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <span className="text-[8px] text-[#d4af37] font-mono tracking-wider font-bold block uppercase">
                                  {app.createdAt ? app.createdAt.split('T')[0] : ''}
                                </span>
                                <h4 className="text-xs font-extrabold text-white uppercase flex items-center space-x-1.5">
                                  <User className="w-3.5 h-3.5 text-white/40" />
                                  <span>{app.name}</span>
                                </h4>
                                <span className="inline-block px-2 py-0.5 bg-white/5 text-white/60 font-mono text-[9px] uppercase tracking-wider mt-1">
                                  Role: {app.positionTitle}
                                </span>
                              </div>
                              <button
                                onClick={() => handleDeleteApplication(app.id)}
                                className="p-1 hover:bg-white/5 text-white/30 hover:text-red-500 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="bg-[#111]/55 p-3.5 border border-white/5 space-y-1.5 text-[11px] text-white/50 leading-relaxed font-light">
                              <p><strong>Phone:</strong> {app.phone}</p>
                              <p><strong>Email:</strong> {app.email}</p>
                              {app.experience && (
                                <p><strong>Portfolio / Experience:</strong> <span className="text-[#d4af37] break-all">{app.experience}</span></p>
                              )}
                              {app.notes && (
                                <p className="text-white/70 italic mt-2 pl-2 border-l border-[#d4af37]/45">
                                  "{app.notes}"
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* TAB: GUESTBOOK MODERATION */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-wider text-white">Guestbook Moderation</h2>
                  <p className="text-[11px] text-white/40 uppercase mt-0.5">Approve incoming reviews and compose answers to customers</p>
                </div>

                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-xs text-white/30 italic">No reviews currently registered.</p>
                  ) : (
                    reviews.map((rev) => (
                      <div 
                        key={rev.id}
                        className={`p-5 border flex flex-col justify-between gap-4 transition-all ${
                          rev.status === 'pending' 
                            ? 'bg-amber-950/5 border-amber-500/20' 
                            : 'bg-black border-white/5'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-white uppercase">{rev.name}</span>
                              <span className="text-xs text-white/20 font-mono">({rev.date})</span>
                              <span className="text-xs text-white/30">•</span>
                              <div className="flex items-center space-x-0.5 text-[#d4af37]">
                                {Array.from({ length: rev.rating }).map((_, i) => (
                                  <span key={i}>★</span>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-white/80 leading-relaxed italic">
                              "{rev.comment}"
                            </p>

                            {/* Display reply if any */}
                            {rev.reply && (
                              <div className="bg-[#d4af37]/5 border-l border-[#d4af37]/45 p-3 text-[11px] text-white/60 font-light mt-2 max-w-xl">
                                <strong>Chef Reply:</strong> "{rev.reply}"
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            {rev.status === 'pending' && (
                              <button
                                onClick={() => handleApproveReview(rev.id)}
                                className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-black border border-emerald-500/20 text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                              >
                                APPROVE
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteReview(rev.id)}
                              className="p-1.5 border border-white/10 hover:border-red-500/20 text-white/40 hover:text-red-500 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <span className={`text-[8px] font-bold uppercase px-2 py-0.5 tracking-wider ${
                              rev.status === 'pending' ? 'bg-amber-600/10 border border-amber-500/20 text-amber-500 animate-pulse' : 'bg-white/5 text-white/40 border border-white/5'
                            }`}>
                              {rev.status}
                            </span>
                          </div>
                        </div>

                        {/* Compose reply box */}
                        <div className="border-t border-white/5 pt-3 flex items-center space-x-3 max-w-xl">
                          <input 
                            type="text"
                            value={reviewReplyForm[rev.id] || ''}
                            onChange={(e) => setReviewReplyForm({ ...reviewReplyForm, [rev.id]: e.target.value })}
                            placeholder="Write an official response (e.g., Cảm ơn bạn rất nhiều!)..."
                            className="flex-1 bg-black border border-white/10 px-3 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                          <button
                            onClick={() => handleAddReviewReply(rev.id)}
                            className="px-3 py-1.5 bg-[#d4af37] text-black font-bold text-[9px] uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                          >
                            <Send className="w-3 h-3" />
                            <span>REPLY</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB: INVENTORY */}
            {activeTab === 'inventory' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-wider text-white">Menu Availability (Live Stock)</h2>
                  <p className="text-[11px] text-white/40 uppercase mt-0.5">Toggle dishes in real-time if a specific ingredient is exhausted</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MENU_ITEMS.map((item) => {
                    const isOos = outOfStockIds.includes(item.id);
                    return (
                      <div 
                        key={item.id}
                        className={`p-4 border flex items-center justify-between gap-4 transition-all ${
                          isOos 
                            ? 'bg-red-950/10 border-red-900/20' 
                            : 'bg-black border-white/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img src={item.image} className="w-10 h-10 object-cover shrink-0" alt="" />
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold text-white uppercase truncate">{item.name[language]}</h4>
                            <span className="text-[9px] text-[#d4af37] font-mono tracking-wider">ID: {item.id} • €{item.price.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2.5 shrink-0">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${isOos ? 'text-red-400' : 'text-[#d4af37]'}`}>
                            {isOos ? 'OOS' : 'IN STOCK'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleStock(item.id)}
                            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-all duration-300 ease-in-out focus:outline-none ${
                              !isOos ? 'bg-[#d4af37]' : 'bg-[#222] border border-white/10'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                                !isOos ? 'translate-x-5 bg-black' : 'translate-x-0.5 bg-white/40'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: MENU CONFIG & INDEX CUSTOMIZER */}
            {activeTab === 'menu' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-wider text-white">Menu PDF & Index</h2>
                  <p className="text-[11px] text-white/40 uppercase mt-0.5">Upload a custom PDF menu and customize the Speisekarte index navigation</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* LEFT COLUMN: PDF MENU UPLOAD */}
                  <div className="space-y-6 bg-[#0a0a0a] border border-white/5 p-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1">1. PDF Menu Configuration</h3>
                      <p className="text-[10px] text-white/40 uppercase">Replace the original web printable menu with a custom PDF file or link</p>
                    </div>

                    {/* Drag & drop / file selector upload */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60">Upload PDF File</label>
                      <div className="border border-dashed border-white/10 hover:border-[#d4af37]/40 bg-black p-6 text-center transition-all relative">
                        <input 
                          type="file" 
                          accept=".pdf"
                          onChange={handlePdfUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <FileText className="w-8 h-8 text-[#d4af37]/60" />
                          <span className="text-xs text-white/80 font-medium">Click or drag & drop PDF here</span>
                          <span className="text-[9px] text-white/30 uppercase">Max 25 MB (Stored securely in browser database)</span>
                        </div>
                      </div>
                    </div>

                    {/* Direct PDF Link URL alternative */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60">Or Specify Direct PDF URL Link (No File Limit)</label>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="e.g., https://example.com/speisekarte.pdf"
                          value={customPdfUrl.startsWith('data:') || customPdfUrl === 'indexeddb_stored_pdf' ? '' : customPdfUrl}
                          onChange={(e) => handleSavePdfUrl(e.target.value)}
                          className="flex-1 bg-black border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <p className="text-[9px] text-white/30 uppercase leading-normal">
                        Perfect for hosted PDFs or large files exceeding browser localStorage quotas.
                      </p>
                    </div>

                    {/* Upload/Link Status indicator */}
                    <div className="pt-4 border-t border-white/5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/40 uppercase text-[9px] font-bold">Current Active Menu:</span>
                        <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${customPdfUrl ? 'text-[#d4af37]' : 'text-emerald-400'}`}>
                          {customPdfUrl ? 'Custom PDF Active' : 'Default Compiled HTML Active'}
                        </span>
                      </div>

                      {pdfFileSize && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/40 uppercase text-[9px] font-bold">PDF Source Details:</span>
                          <span className="font-mono text-[10px] text-white/80">{pdfFileSize}</span>
                        </div>
                      )}

                      {pdfUploadStatus && (
                        <div className={`p-3 text-[10px] font-semibold uppercase tracking-wider ${
                          pdfUploadStatus.startsWith('Error') 
                            ? 'bg-red-950/15 border border-red-900/30 text-red-400' 
                            : 'bg-emerald-950/15 border border-emerald-900/30 text-emerald-400'
                        }`}>
                          {pdfUploadStatus}
                        </div>
                      )}

                      {customPdfUrl && (
                        <div className="flex gap-2 pt-2">
                          <a 
                            href={adminPdfBlobUrl || customPdfUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 bg-[#111] hover:bg-white/5 border border-white/10 text-white font-semibold text-[10px] py-2 uppercase tracking-widest text-center transition-all cursor-pointer"
                          >
                            Preview PDF
                          </a>
                          <button
                            type="button"
                            onClick={handleResetPdfToDefault}
                            className="flex-1 bg-red-950/10 hover:bg-red-900/20 border border-red-900/30 text-red-400 font-semibold text-[10px] py-2 uppercase tracking-widest transition-all cursor-pointer"
                          >
                            Reset to Default
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: SPEISEKARTE INDEX CUSTOMIZER */}
                  <div className="space-y-6 bg-[#0a0a0a] border border-white/5 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1">2. Speisekarte Index</h3>
                        <p className="text-[10px] text-white/40 uppercase">Customize & reorder categories for quick-jump sidebar list</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetIndexToDefault}
                        className="text-[9px] font-bold text-red-400 hover:text-red-300 uppercase tracking-wider underline cursor-pointer"
                      >
                        Reset Index
                      </button>
                    </div>

                    {/* Edit Section Form (when editing) */}
                    {editingSectionId && (
                      <form onSubmit={handleSaveEditSection} className="p-4 bg-black border border-[#d4af37]/30 space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">Edit Index Category: <span className="font-mono text-white">{editingSectionId}</span></h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-white/50 uppercase">German Label (DE)</label>
                            <input 
                              type="text"
                              value={editingSectionForm.labelDe}
                              onChange={(e) => setEditingSectionForm({ ...editingSectionForm, labelDe: e.target.value })}
                              className="w-full bg-[#111] border border-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-white/50 uppercase">Vietnamese Label (VI)</label>
                            <input 
                              type="text"
                              value={editingSectionForm.labelVi}
                              onChange={(e) => setEditingSectionForm({ ...editingSectionForm, labelVi: e.target.value })}
                              className="w-full bg-[#111] border border-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-white/50 uppercase">HTML Target Section</label>
                            <select
                              value={editingSectionForm.targetId}
                              onChange={(e) => setEditingSectionForm({ ...editingSectionForm, targetId: e.target.value })}
                              className="w-full bg-[#111] border border-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                            >
                              <option value="">None / Không liên kết</option>
                              <option value="cover">Trang Bìa (Titelseite)</option>
                              <option value="starters">Khai Vị (Vorspeisen)</option>
                              <option value="soups">Salát & Súp (Salat & Suppen)</option>
                              <option value="mains">Món Chính (Hauptgerichte)</option>
                              <option value="feuerplatte">Feuerplatte (Feuerplatte)</option>
                              <option value="bowls">Cơm Bowls (Healthy Bowls)</option>
                              <option value="sushi">Thế Giới Sushi (Sushi & Spezial)</option>
                              <option value="desserts">Tráng Miệng (Dessert)</option>
                              <option value="drinks">Đồ Uống & Rượu (Getränke & Wein)</option>
                              <option value="allergens">Dị Ứng (Allergene)</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-white/50 uppercase">PDF Page Number</label>
                            <input 
                              type="number"
                              min="1"
                              max="100"
                              placeholder="e.g. 3"
                              value={editingSectionForm.pageNumber}
                              onChange={(e) => setEditingSectionForm({ ...editingSectionForm, pageNumber: e.target.value })}
                              className="w-full bg-[#111] border border-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-white/50 uppercase">Navigation Mode</label>
                            <select
                              value={editingSectionForm.navigationMode}
                              onChange={(e) => setEditingSectionForm({ ...editingSectionForm, navigationMode: e.target.value as 'auto' | 'html' | 'pdf' })}
                              className="w-full bg-[#111] border border-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                            >
                              <option value="auto">Auto (PDF if page set)</option>
                              <option value="html">Scroll to HTML section</option>
                              <option value="pdf">Jump to PDF page</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setEditingSectionId(null)}
                            className="px-3 py-1 bg-[#222] text-white text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1 bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Index Sections list */}
                    <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                      {indexSections.map((sec, index) => (
                        <div 
                          key={sec.id}
                          className="bg-black border border-white/5 hover:border-white/10 p-2.5 flex items-center justify-between gap-3"
                        >
                          <div className="overflow-hidden">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-[9px] text-[#d4af37] font-bold uppercase tracking-wider">#{index + 1}</span>
                              <span className="font-mono text-[10px] text-white/40 uppercase">{sec.id}</span>
                            </div>
                            <div className="text-xs text-white/90 font-medium truncate mt-0.5">
                              DE: {sec.labelDe} • VI: {sec.labelVi}
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {sec.targetId && (
                                <span className="bg-[#d4af37]/10 text-[#d4af37] text-[8px] font-bold font-mono px-1 py-0.5 uppercase tracking-wider">
                                  HTML: {sec.targetId}
                                </span>
                              )}
                              {sec.pageNumber && (
                                <span className="bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 text-[8px] font-bold font-mono px-1 py-0.5 uppercase tracking-wider">
                                  {sec.navigationMode === 'pdf' ? `PDF ${sec.pageNumber}` : sec.navigationMode === 'html' ? `HTML` : `Auto ${sec.pageNumber}`}
                                </span>
                              )}
                              {!sec.targetId && !sec.pageNumber && (
                                <span className="text-[8px] font-bold font-mono text-white/20 uppercase tracking-wider">
                                  No Destination Link
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-1.5 shrink-0">
                            {/* Reordering */}
                            <button
                              type="button"
                              onClick={() => handleMoveIndexSection(index, 'up')}
                              disabled={index === 0}
                              className={`p-1 border border-white/5 text-white/40 hover:text-[#d4af37] hover:border-[#d4af37]/30 transition-all cursor-pointer disabled:opacity-20 disabled:pointer-events-none`}
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveIndexSection(index, 'down')}
                              disabled={index === indexSections.length - 1}
                              className={`p-1 border border-white/5 text-white/40 hover:text-[#d4af37] hover:border-[#d4af37]/30 transition-all cursor-pointer disabled:opacity-20 disabled:pointer-events-none`}
                              title="Move Down"
                            >
                              ▼
                            </button>

                            {/* Editing */}
                            <button
                              type="button"
                              onClick={() => handleStartEditSection(sec)}
                              className="p-1 border border-white/5 text-white/40 hover:text-[#d4af37] hover:border-[#d4af37]/30 transition-all cursor-pointer text-[10px] font-bold px-1.5"
                            >
                              EDIT
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDeleteIndexSection(sec.id)}
                              className="p-1.5 border border-white/5 text-white/40 hover:text-red-500 hover:border-red-900/30 transition-all cursor-pointer"
                              title="Delete Section"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Section Form */}
                    <form onSubmit={handleAddIndexSection} className="p-4 bg-black border border-white/5 space-y-3">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/60">Add New Index Category</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="text"
                          placeholder="Unique ID (e.g. salads)"
                          value={newSectionForm.id}
                          onChange={(e) => setNewSectionForm({ ...newSectionForm, id: e.target.value })}
                          className="bg-[#111] border border-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          required
                        />
                        <input 
                          type="text"
                          placeholder="German Name (DE)"
                          value={newSectionForm.labelDe}
                          onChange={(e) => setNewSectionForm({ ...newSectionForm, labelDe: e.target.value })}
                          className="bg-[#111] border border-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          required
                        />
                        <input 
                          type="text"
                          placeholder="Vietnamese Name (VI)"
                          value={newSectionForm.labelVi}
                          onChange={(e) => setNewSectionForm({ ...newSectionForm, labelVi: e.target.value })}
                          className="bg-[#111] border border-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          required
                        />
                        <input 
                          type="number"
                          min="1"
                          max="100"
                          placeholder="PDF Page (optional)"
                          value={newSectionForm.pageNumber}
                          onChange={(e) => setNewSectionForm({ ...newSectionForm, pageNumber: e.target.value })}
                          className="bg-[#111] border border-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-white/40 uppercase block">HTML Target Section Link (optional)</label>
                        <select
                          value={newSectionForm.targetId}
                          onChange={(e) => setNewSectionForm({ ...newSectionForm, targetId: e.target.value })}
                          className="w-full bg-[#111] border border-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                        >
                          <option value="">None / Không liên kết</option>
                          <option value="cover">Trang Bìa (Titelseite)</option>
                          <option value="starters">Khai Vị (Vorspeisen)</option>
                          <option value="soups">Salát & Súp (Salat & Suppen)</option>
                          <option value="mains">Món Chính (Hauptgerichte)</option>
                          <option value="feuerplatte">Feuerplatte (Feuerplatte)</option>
                          <option value="bowls">Cơm Bowls (Healthy Bowls)</option>
                          <option value="sushi">Thế Giới Sushi (Sushi & Spezial)</option>
                          <option value="desserts">Tráng Miệng (Dessert)</option>
                          <option value="drinks">Đồ Uống & Rượu (Getränke & Wein)</option>
                          <option value="allergens">Dị Ứng (Allergene)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-white/40 uppercase block">Navigation Mode</label>
                        <select
                          value={newSectionForm.navigationMode}
                          onChange={(e) => setNewSectionForm({ ...newSectionForm, navigationMode: e.target.value as 'auto' | 'html' | 'pdf' })}
                          className="w-full bg-[#111] border border-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                        >
                          <option value="auto">Auto (PDF if page set)</option>
                          <option value="html">Scroll to HTML section</option>
                          <option value="pdf">Jump to PDF page</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#d4af37] text-black font-bold text-[10px] py-2 uppercase tracking-widest transition-all cursor-pointer text-center"
                      >
                        ADD INDEX CATEGORY
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
