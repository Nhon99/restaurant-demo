import React, { useState } from 'react';
import { Language, CareerOpportunity, JobApplication } from '../types';
import { TRANSLATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Coins, CheckSquare, Sparkles, X, FileText, CheckCircle2 } from 'lucide-react';

interface CareersPageProps {
  language: Language;
  careers: CareerOpportunity[];
  onApply: (application: JobApplication) => void;
}

export default function CareersPage({ language, careers, onApply }: CareersPageProps) {
  const t = TRANSLATIONS[language];
  const isVi = language === 'vi';
  const isDe = language === 'de';

  const [selectedJob, setSelectedJob] = useState<CareerOpportunity | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeJobs = careers.filter(c => c.active);

  const handleOpenApply = (job: CareerOpportunity) => {
    setSelectedJob(job);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.experience) {
      return;
    }

    const application: JobApplication = {
      id: `app_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      positionId: selectedJob!.id,
      positionTitle: selectedJob!.title[language],
      experience: formData.experience,
      notes: formData.notes,
      createdAt: new Date().toISOString()
    };

    onApply(application);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', experience: '', notes: '' });

    // Close after delay
    setTimeout(() => {
      setSelectedJob(null);
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 bg-[#0a0a0a] px-6 md:px-12 border-b border-white/5 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 pt-6">
          <div className="w-12 h-[1px] bg-[#d4af37]"></div>
          <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] font-semibold">
            {isVi ? 'TUYỂN DỤNG NHÂN SỰ' : isDe ? 'KARRIERE BEI UNS' : 'CAREERS & POSITIONS'}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-tight">
            {isVi ? 'Gia Nhập ' : 'Join '}
            <span className="not-italic font-extrabold text-[#d4af37] uppercase tracking-wider font-sans">{isVi ? 'A BÉO FAMILY' : 'A BÉO TEAM'}</span>
          </h1>
          <p className="text-white/40 max-w-xl text-xs md:text-sm leading-relaxed">
            {t.careersSubtitle}
          </p>
        </div>

        {/* Vacancies layout */}
        {activeJobs.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-white/5 p-12">
            <Briefcase className="w-12 h-12 text-[#d4af37]/40 mx-auto mb-4" />
            <p className="text-white/50 text-sm">
              {isVi 
                ? 'Hiện tại các vị trí đã đủ nhân sự. Hãy theo dõi chúng tôi cho những cơ hội tương lai nhé!' 
                : isDe 
                ? 'Zurzeit haben wir keine offenen Stellen. Bitte schauen Sie zu einem späteren Zeitpunkt wieder vorbei!' 
                : 'All positions are currently filled. Follow us to stay updated on future openings!'}
            </p>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {activeJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-black border border-white/5 hover:border-[#d4af37]/20 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all"
              >
                <div className="space-y-3.5 flex-1">
                  <div className="flex flex-wrap gap-2.5 items-center">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white/5 text-white/50 text-[9px] uppercase tracking-widest font-bold font-mono">
                      {job.type[language]}
                    </span>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#d4af37]/10 text-[#d4af37] text-[9px] uppercase tracking-widest font-bold font-mono">
                      <Coins className="w-3 h-3 shrink-0" />
                      <span>{job.salary[language]}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                    {job.title[language]}
                  </h3>

                  <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light">
                    {job.description[language]}
                  </p>

                  {/* Requirements breakdown */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block">{t.requirements}:</span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {job.requirements[language].map((req, i) => (
                        <li key={i} className="text-white/40 text-xs flex items-start space-x-2 font-light leading-snug">
                          <CheckSquare className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="shrink-0 pt-4 md:pt-0">
                  <button
                    onClick={() => handleOpenApply(job)}
                    className="px-6 py-3.5 bg-white hover:bg-[#d4af37] text-black hover:text-black font-bold text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer"
                  >
                    {t.applyNow}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Application Modal Popup */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedJob(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-[#0c0c0c] border border-white/10 w-full max-w-lg p-6 md:p-8 overflow-hidden shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {isSubmitted ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-[#d4af37]/10 border border-[#d4af37] flex items-center justify-center text-[#d4af37] rounded-full animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">{t.applySuccess}</h3>
                    <p className="text-xs text-white/50 max-w-sm leading-relaxed font-light">
                      {t.applySuccessMsg}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider block">{t.applyFormTitle}</span>
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider">{selectedJob.title[language]}</h3>
                    </div>

                    <div className="space-y-3.5 pt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">{t.yourName} *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-black border border-white/5 focus:border-[#d4af37] px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all"
                          placeholder={isVi ? 'Nguyễn Văn A' : 'E.g., John Doe'}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">{t.email} *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-black border border-white/5 focus:border-[#d4af37] px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all"
                            placeholder="name@example.com"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">{t.phone} *</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-black border border-white/5 focus:border-[#d4af37] px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all"
                            placeholder="+49 123 45678"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">
                          {isVi ? 'Kinh nghiệm bản thân (Nêu ngắn gọn) *' : isDe ? 'Berufserfahrung (Kurzbeschreibung) *' : 'Relevant Experience (Brief summary) *'}
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className="w-full bg-black border border-white/5 focus:border-[#d4af37] px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all resize-none"
                          placeholder={isVi ? 'Mô tả số năm kinh nghiệm, vị trí đã từng làm việc...' : 'Summary of previous gastronomy roles...'}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">{t.resNotes}</label>
                        <textarea
                          rows={2}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full bg-black border border-white/5 focus:border-[#d4af37] px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all resize-none"
                          placeholder={isVi ? 'Khung thời gian có thể đi làm, thắc mắc...' : 'Availability or other questions...'}
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#d4af37] hover:bg-[#b59223] text-black font-bold py-3 px-4 text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer"
                      >
                        {isVi ? 'NỘP ĐƠN ỨNG TUYỂN' : isDe ? 'BEWERBUNG ABSCHICKEN' : 'SUBMIT APPLICATION'}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
