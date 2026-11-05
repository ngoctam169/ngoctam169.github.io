import React, { useEffect, useState } from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Briefcase,
  GraduationCap,
  MessageSquarePlus
} from 'lucide-react';
import {
  CANDIDATE_PROFILE,
  CAREER_TIMELINE,
  EXECUTIVE_KPIS,
  Lang,
  SKILL_DOMAINS
} from './data/portfolioData';
import {
  EndorsementItem,
  fetchOverview,
  PortfolioMetrics,
  submitContactFastTrack,
  submitEndorsement
} from './services/api';
import { InteractiveArchitectureLab } from './components/InteractiveArchitectureLab';
import { HrDecisionAndAiAuditHub } from './components/HrDecisionAndAiAuditHub';
import { AiOverviewSeoShowcase } from './components/AiOverviewSeoShowcase';
import { ExecutiveResumeModal } from './components/ExecutiveResumeModal';

export function App() {
  const [lang, setLang] = useState<Lang>('vi');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<PortfolioMetrics>({
    portfolioViews: 14825,
    aiAuditRuns: 643,
    architectureInspections: 3192,
    cvDownloads: 490,
    recruiterShortlists: 129,
    dbEngine: 'SQLite 3 Native Engine + Turso LibSQL Ready'
  });
  const [endorsements, setEndorsements] = useState<EndorsementItem[]>([]);

  // Endorsement Form State
  const [showEndorseForm, setShowEndorseForm] = useState<boolean>(false);
  const [endorseAuthor, setEndorseAuthor] = useState<string>('');
  const [endorseRole, setEndorseRole] = useState<string>('');
  const [endorseCompany, setEndorseCompany] = useState<string>('');
  const [endorseHighlight, setEndorseHighlight] = useState<string>(
    'Top 1% Senior Full-Stack & WebRTC Architect'
  );
  const [endorseComment, setEndorseComment] = useState<string>('');
  const [endorseSuccess, setEndorseSuccess] = useState<string>('');

  // Fast-Track Contact Form State
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactCompany, setContactCompany] = useState<string>('');
  const [contactRole, setContactRole] = useState<string>(
    'Senior / Lead Full-Stack & Real-Time Systems Architect'
  );
  const [contactComp, setContactComp] = useState<string>('Offer Senior / Lead Hấp Dẫn (Thương lượng)');
  const [contactMessage, setContactMessage] = useState<string>(
    'Chào Nguyễn Ngọc Tâm, chúng tôi rất ấn tượng với hồ sơ năng lực và các dự án Worldfone4X, PVcomBank, Shinhan Life của bạn. Mời bạn tham gia phỏng vấn Fast-Track cùng Tech Lead/CTO của chúng tôi.'
  );
  const [contactStatus, setContactStatus] = useState<string>('');
  const [isSubmittingContact, setIsSubmittingContact] = useState<boolean>(false);

  const refreshOverview = async () => {
    const data = await fetchOverview();
    setMetrics(data.metrics);
    setEndorsements(data.endorsements);
  };

  useEffect(() => {
    refreshOverview();
  }, []);

  const handleFastTrackRoleSelect = (roleTitle: string) => {
    setContactRole(roleTitle);
    const el = document.getElementById('contact-fast-track');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddEndorsement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!endorseComment.trim()) return;
    const res = await submitEndorsement({
      author: endorseAuthor || 'HR / Tech Lead',
      role: endorseRole || 'Engineering Manager / Recruiter',
      company: endorseCompany || 'Enterprise Technology Organization',
      highlightMetric: endorseHighlight,
      comment: endorseComment
    });
    setEndorsements(res.endorsements);
    setEndorseAuthor('');
    setEndorseRole('');
    setEndorseCompany('');
    setEndorseComment('');
    setEndorseSuccess(
      lang === 'vi'
        ? 'Đã lưu nhận xét vào cơ sở dữ liệu thành công!'
        : 'Endorsement saved to database successfully!'
    );
    setTimeout(() => {
      setEndorseSuccess('');
      setShowEndorseForm(false);
    }, 2500);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    const res = await submitContactFastTrack({
      name: contactName,
      email: contactEmail,
      company: contactCompany,
      roleType: contactRole,
      compensationRange: contactComp,
      message: contactMessage
    });
    setIsSubmittingContact(false);
    setContactStatus(res.message);
    refreshOverview();
  };

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 bg-executive-grid relative">
      {/* Top Ambient Glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[520px] bg-radial-glow z-0" />

      {/* Sticky Command Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#050814]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand Identity */}
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 p-[1.5px] shadow-md shadow-sky-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-sm tracking-tighter text-sky-300 group-hover:text-white transition">
                NT
              </div>
            </div>
            <div>
              <div className="font-extrabold text-white text-sm sm:text-base tracking-tight flex items-center gap-1.5">
                <span>Nguyễn Ngọc Tâm</span>
                <span className="hidden xl:inline-block px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                  SENIOR ARCHITECT
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Full-Stack • WebRTC • Omnichannel • Cloud FinOps
              </div>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#projects" className="hover:text-sky-300 transition">
              {lang === 'vi' ? 'Dự Án & Kiến Trúc' : 'Architecture Lab'}
            </a>
            <a href="#hr-hub" className="hover:text-sky-300 transition">
              {lang === 'vi' ? 'HR & AI Audit (100/100)' : 'HR & AI Audit'}
            </a>
            <a href="#skills" className="hover:text-sky-300 transition">
              {lang === 'vi' ? 'Ma Trận Kỹ Năng' : 'Skill Matrix'}
            </a>
            <a href="#experience" className="hover:text-sky-300 transition">
              {lang === 'vi' ? 'Kinh Nghiệm' : 'Experience'}
            </a>
            <a href="#endorsements" className="hover:text-sky-300 transition">
              {lang === 'vi' ? 'Đánh Giá Thực Tế' : 'Endorsements'}
            </a>
            <a href="#seo-ai-overview" className="hover:text-sky-300 transition">
              {lang === 'vi' ? 'AI Overview & DB' : 'AI Overview & DB'}
            </a>
          </nav>

          {/* Right Actions: Language Toggle, CV Modal, Hire CTA */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition cursor-pointer"
              title="Switch Language (Tiếng Việt / English)"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'vi' ? 'VI' : 'EN'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsResumeModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white flex items-center gap-1.5 transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{lang === 'vi' ? 'Xem / Tải CV' : 'CV / Dossier'}</span>
              <span className="sm:hidden">CV</span>
            </button>

            <a
              href="#contact-fast-track"
              className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition shadow-md shadow-sky-500/20"
            >
              {lang === 'vi' ? 'Tuyển Dụng Ngay' : 'Hire Now'}
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main id="top" className="relative z-10">
        <section className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Hero Left 7 Cols */}
              <div className="lg:col-span-7">
                {/* Caliber Badge */}
                <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono font-semibold mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>
                    {lang === 'vi'
                      ? CANDIDATE_PROFILE.caliberBadgeVi
                      : CANDIDATE_PROFILE.caliberBadgeEn}
                  </span>
                </div>

                {/* Main SEO & Executive H1 */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                  {CANDIDATE_PROFILE.fullName}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-300 to-indigo-400">
                    ({CANDIDATE_PROFILE.shortName})
                  </span>
                </h1>

                <p className="mt-3 text-xl sm:text-2xl font-bold text-sky-300">
                  {lang === 'vi' ? CANDIDATE_PROFILE.titleVi : CANDIDATE_PROFILE.titleEn}
                </p>

                <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {lang === 'vi' ? CANDIDATE_PROFILE.heroPitchVi : CANDIDATE_PROFILE.heroPitchEn}
                </p>

                {/* Primary CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#hr-hub"
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-black text-sm inline-flex items-center gap-2 shadow-xl shadow-sky-500/20 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    {lang === 'vi'
                      ? 'Thẩm Định Năng Lực & AI Audit (100/100)'
                      : 'Inspect HR Playbook & AI Audit (100/100)'}
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsResumeModalOpen(true)}
                    className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm inline-flex items-center gap-2 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-sky-400" />
                    {lang === 'vi'
                      ? 'Tải CV PDF (Bản Gốc & Senior Architect)'
                      : 'Download CV PDF (Original & Executive)'}
                  </button>

                  <a
                    href="#projects"
                    className="px-5 py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 text-slate-200 border border-slate-800 font-semibold text-sm inline-flex items-center gap-2 transition"
                  >
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    {lang === 'vi' ? 'Xem 4 Kiến Trúc Hệ Thống' : 'Explore 4 System Architectures'}
                  </a>
                </div>

                {/* Direct Contact Bar */}
                <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm text-slate-300">
                  <a
                    href={`tel:${CANDIDATE_PROFILE.phone}`}
                    className="inline-flex items-center gap-2 hover:text-sky-300 transition font-mono"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>{CANDIDATE_PROFILE.phoneFormatted}</span>
                  </a>
                  <a
                    href={`mailto:${CANDIDATE_PROFILE.email}`}
                    className="inline-flex items-center gap-2 hover:text-sky-300 transition font-mono"
                  >
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>{CANDIDATE_PROFILE.email}</span>
                  </a>
                  <a
                    href={CANDIDATE_PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-sky-300 transition font-mono"
                  >
                    <Linkedin className="w-4 h-4 text-sky-400" />
                    <span>linkedin.com/in/ngoctam1609</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={CANDIDATE_PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-sky-300 transition font-mono"
                  >
                    <Github className="w-4 h-4 text-slate-200" />
                    <span>github.com/ngoctam169</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Hero Right 5 Cols: Executive Architect Command Dossier Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-slate-900/90 border border-slate-700/80 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <img
                        src="./avatar-nguyen-ngoc-tam.png"
                        alt="Nguyễn Ngọc Tâm (Ngọc Tâm) — Senior Full-Stack & WebRTC Architect"
                        className="w-14 h-14 rounded-2xl border border-sky-400/50 object-cover"
                      />
                      <div>
                        <div className="text-xs font-mono uppercase text-emerald-400 font-bold">
                          VERIFIED SENIOR PROFILE
                        </div>
                        <div className="text-lg font-black text-white">
                          Nguyễn Ngọc Tâm (Ngọc Tâm)
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-sky-400" />
                          <span>Ho Chi Minh City, Vietnam</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                        TOP 0.5%
                      </div>
                    </div>
                  </div>

                  {/* Production Pedigree Highlights */}
                  <div className="space-y-3 text-xs sm:text-sm mb-6">
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">
                          {lang === 'vi'
                            ? 'Kiến Trúc Sư Nòng Cốt Tại South Telecom'
                            : 'Core Systems Architect at South Telecom'}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Worldfone4X Omnichannel • Scrum Host (10-Engineer Squad) • AWS FinOps (-42%)
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                      <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">
                          {lang === 'vi'
                            ? 'Bảo Chứng Tại Ngân Hàng & Bảo Hiểm Quốc Tế'
                            : 'Proven in Tier-1 Banking & Global Insurance'}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          PVcomBank (WebRTC Video eKYC) • Shinhan Life (-85% SonarQube Smells, 0 XSS)
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                      <Terminal className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">
                          {lang === 'vi'
                            ? 'Chuyên Gia Real-Time Streaming & Queue Mesh'
                            : 'Real-Time Media & Async Queue Specialist'}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Janus WebRTC + Jitsi + Laravel Redis Queues • MongoDB • PostgreSQL • Beanstalkd
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Download & Fast-Track Bar inside Card */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href="./NGUYEN_NGOC_TAM_SENIOR_ARCHITECT_CV.pdf"
                      download="NGUYEN_NGOC_TAM_SENIOR_ARCHITECT_CV.pdf"
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-400" />
                      <span>Senior CV (PDF)</span>
                    </a>
                    <a
                      href="./NGUYEN_NGOC_TAM_CV.pdf"
                      download="NGUYEN_NGOC_TAM_PHP.pdf"
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Original CV (PDF)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Executive KPI Cards */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {EXECUTIVE_KPIS.map((kpi) => (
                <div
                  key={kpi.id}
                  className="p-5 rounded-2xl bg-slate-900/75 border border-slate-800/90 hover:border-sky-500/40 transition"
                >
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-300 font-mono">
                    {kpi.value}
                  </div>
                  <div className="text-xs font-bold text-white mt-1.5">
                    {lang === 'vi' ? kpi.labelVi : kpi.labelEn}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
                    {lang === 'vi' ? kpi.detailVi : kpi.detailEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE ARCHITECTURE LAB & 4 ENTERPRISE CASE STUDIES */}
        <InteractiveArchitectureLab lang={lang} onMetricsUpdate={refreshOverview} />

        {/* HR DECISION HUB & LIVE AI PORTFOLIO AUDITOR (100/100) */}
        <HrDecisionAndAiAuditHub
          lang={lang}
          onFastTrackClick={handleFastTrackRoleSelect}
          onMetricsUpdate={refreshOverview}
        />

        {/* 10-YEAR CALIBER TECHNICAL COMPETENCY MATRIX */}
        <section id="skills" className="py-20 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Terminal className="w-3.5 h-3.5" />
                {lang === 'vi'
                  ? 'Ma Trận Năng Lực Kỹ Thuật Toàn Diện • Full-Stack + WebRTC + Cloud'
                  : 'Full-Spectrum Engineering Matrix • Full-Stack + WebRTC + Cloud'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {lang === 'vi'
                  ? 'Năng Lực Cốt Lõi Cấp Senior / Principal (6 Trụ Cột Chuyên Môn)'
                  : 'Senior / Principal Engineering Competency Matrix'}
              </h2>
              <p className="mt-3 text-slate-300 text-base leading-relaxed">
                {lang === 'vi'
                  ? 'Làm chủ trọn vẹn chu trình phát triển phần mềm từ kiến trúc Backend chịu tải cao (PHP 8/Laravel/Node.js), giao tiếp thời gian thực (WebRTC/Janus/Jitsi/WebSockets), tối ưu Database & Queue đến Cloud FinOps và điều phối Agile Scrum.'
                  : 'Complete end-to-end ownership spanning high-concurrency Backend (PHP 8/Laravel/Node.js), Real-Time Media (WebRTC/Janus/Jitsi/WebSockets), Distributed Databases/Queues, Cloud FinOps, and Agile Scrum leadership.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILL_DOMAINS.map((domain) => (
                <div
                  key={domain.id}
                  className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <h3 className="text-base font-extrabold text-white">
                        {lang === 'vi' ? domain.titleVi : domain.titleEn}
                      </h3>
                      <span className="text-[11px] font-mono text-sky-400">{domain.yearsCaliber}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                      {domain.masteryPercent}%
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {domain.skills.map((sk) => (
                      <div key={sk.name}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-200">{sk.name}</span>
                          <span className="text-[11px] font-mono text-emerald-400">
                            {sk.highlight}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400"
                            style={{ width: `${sk.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE & EDUCATION TIMELINE */}
        <section id="experience" className="py-20 border-t border-slate-800/80 bg-slate-950/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Briefcase className="w-3.5 h-3.5" />
                {lang === 'vi'
                  ? 'Hành Trình Sự Nghiệp & Dấu Ấn Lãnh Đạo Kỹ Thuật'
                  : 'Professional Track Record & Academic Foundation'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {lang === 'vi'
                  ? 'Kinh Nghiệm Làm Việc Thực Chiến & Học Vấn'
                  : 'Enterprise Work Experience & Education'}
              </h2>
            </div>

            <div className="space-y-6">
              {CAREER_TIMELINE.map((exp, idx) => (
                <div
                  key={exp.company}
                  className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                        {idx === 2 ? (
                          <GraduationCap className="w-5 h-5" />
                        ) : (
                          <Briefcase className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white">{exp.company}</h3>
                        <p className="text-xs sm:text-sm font-bold text-emerald-400">
                          {lang === 'vi' ? exp.roleVi : exp.roleEn}
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-700 text-xs font-mono text-sky-300">
                        {exp.period}
                      </span>
                      <div className="text-xs text-slate-400 mt-1">{exp.location}</div>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-300">
                    {(lang === 'vi' ? exp.highlightsVi : exp.highlightsEn).map((h, i) => (
                      <li
                        key={i}
                        className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE DATABASE-BACKED ENDORSEMENTS & PEER REVIEWS */}
        <section id="endorsements" className="py-20 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {lang === 'vi'
                    ? 'Đánh Giá Từ Chuyên Gia & HR (Lưu Trữ Trực Tiếp Trên SQLite / Turso DB)'
                    : 'Executive Endorsements (Backed by Live SQLite / Turso Database)'}
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {lang === 'vi'
                    ? 'Nhận Định Từ Principal Architects, Security Leads & HR'
                    : 'What Principal Architects, Security Leads & Recruiters Say'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowEndorseForm(!showEndorseForm)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-sky-500/40 text-sky-300 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition cursor-pointer shrink-0"
              >
                <MessageSquarePlus className="w-4 h-4" />
                {lang === 'vi'
                  ? 'Viết Đánh Giá / Shortlist Vào Database'
                  : 'Add Live Endorsement to Database'}
              </button>
            </div>

            {/* Add Endorsement Form (Connected to POST /api/endorsements) */}
            {showEndorseForm && (
              <form
                onSubmit={handleAddEndorsement}
                className="mb-10 p-6 rounded-3xl bg-slate-900 border border-sky-500/40 space-y-4"
              >
                <h3 className="text-base font-bold text-white">
                  {lang === 'vi'
                    ? 'Gửi Nhận Xét / Đánh Giá Trực Tiếp Lên Cơ Sở Dữ Liệu'
                    : 'Submit a Live Technical Endorsement to the Portfolio Database'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    value={endorseAuthor}
                    onChange={(e) => setEndorseAuthor(e.target.value)}
                    placeholder={lang === 'vi' ? 'Họ tên của bạn (VD: Anh Minh - CTO)' : 'Your Name'}
                    className="rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm text-white"
                  />
                  <input
                    type="text"
                    value={endorseRole}
                    onChange={(e) => setEndorseRole(e.target.value)}
                    placeholder={
                      lang === 'vi' ? 'Chức danh (VD: Head of Engineering / HR)' : 'Your Role / Title'
                    }
                    className="rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm text-white"
                  />
                  <input
                    type="text"
                    value={endorseCompany}
                    onChange={(e) => setEndorseCompany(e.target.value)}
                    placeholder={lang === 'vi' ? 'Công ty / Tổ chức' : 'Company / Organization'}
                    className="rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm text-white"
                  />
                </div>
                <input
                  type="text"
                  value={endorseHighlight}
                  onChange={(e) => setEndorseHighlight(e.target.value)}
                  placeholder={lang === 'vi' ? 'Điểm ấn tượng nhất' : 'Key Highlight'}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm text-white"
                />
                <textarea
                  rows={3}
                  required
                  value={endorseComment}
                  onChange={(e) => setEndorseComment(e.target.value)}
                  placeholder={
                    lang === 'vi'
                      ? 'Nhập nhận xét của bạn về năng lực kỹ thuật và hồ sơ của Nguyễn Ngọc Tâm...'
                      : 'Write your endorsement for Nguyễn Ngọc Tâm...'
                  }
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm text-white"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-mono">{endorseSuccess}</span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition cursor-pointer"
                  >
                    {lang === 'vi' ? 'Lưu Vào Database Ngay' : 'Save to Database'}
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {endorsements.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: item.rating || 5 }).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono">
                        {item.highlightMetric}
                      </span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed italic mb-6">
                      &ldquo;{lang === 'vi' ? item.commentVi : item.commentEn}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <span>{item.author}</span>
                      <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    </div>
                    <div className="text-xs text-sky-300 font-medium">{item.role}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {item.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GOOGLE AI OVERVIEW (SGE) + KNOWLEDGE GRAPH + FREE CLOUD DB PANEL */}
        <AiOverviewSeoShowcase lang={lang} metrics={metrics} />

        {/* FAST-TRACK INTERVIEW & DIRECT CONTACT SECTION */}
        <section
          id="contact-fast-track"
          className="py-20 border-t border-slate-800/80 bg-gradient-to-b from-slate-950/50 to-[#050814]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left 5 Cols: Direct Executive Contact Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                  <Send className="w-3.5 h-3.5" />
                  {lang === 'vi'
                    ? 'Kết Nối Trực Tiếp Với Nguyễn Ngọc Tâm'
                    : 'Direct Fast-Track Recruitment Channel'}
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {lang === 'vi'
                    ? 'Đừng Bỏ Lỡ Một Senior Architect Thực Chiến Cho Đội Ngũ Của Bạn'
                    : 'Secure an Immediate Interview with Nguyễn Ngọc Tâm'}
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {lang === 'vi'
                    ? 'Liên hệ trực tiếp qua Điện thoại / Zalo, Email hoặc gửi lời mời phỏng vấn qua biểu mẫu bên cạnh (được lưu trữ trực tiếp vào Database hệ thống).'
                    : 'Reach out directly via Phone/Zalo, Email, or submit a Fast-Track Interview invitation through the database-backed form.'}
                </p>

                <div className="space-y-3.5">
                  <a
                    href={`tel:${CANDIDATE_PROFILE.phone}`}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-400 flex items-center gap-4 transition"
                  >
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">
                        Hotline / Zalo / WhatsApp (24/7)
                      </div>
                      <div className="text-base font-extrabold text-white font-mono">
                        {CANDIDATE_PROFILE.phoneFormatted} (0824608716)
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${CANDIDATE_PROFILE.email}`}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-400 flex items-center gap-4 transition"
                  >
                    <div className="w-11 h-11 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Direct Email</div>
                      <div className="text-base font-extrabold text-white font-mono">
                        {CANDIDATE_PROFILE.email}
                      </div>
                    </div>
                  </a>

                  <a
                    href={CANDIDATE_PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-400 flex items-center gap-4 transition"
                  >
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">LinkedIn Profile</div>
                      <div className="text-base font-extrabold text-white font-mono">
                        linkedin.com/in/ngoctam1609
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right 7 Cols: Fast-Track Interview Booking Form (Connected to SQLite/Turso DB) */}
              <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-2">
                  {lang === 'vi'
                    ? 'Đặt Lịch Phỏng Vấn Nhanh (Fast-Track Interview Booking)'
                    : 'Fast-Track Executive Interview Scheduler'}
                </h3>
                <p className="text-xs text-slate-400 font-mono mb-6">
                  POST /api/contact • Persisted in SQLite3 / Turso Database
                </p>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        {lang === 'vi' ? 'Tên HR / Tech Lead / CTO *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="VD: Nguyễn Thu Hà (HR Manager)"
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        {lang === 'vi' ? 'Email hoặc Số Điện Thoại Liên Hệ *' : 'Work Email or Phone *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="hr@company.com / 090xxxxxxx"
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        {lang === 'vi' ? 'Tên Công Ty / Tập Đoàn' : 'Company / Organization'}
                      </label>
                      <input
                        type="text"
                        value={contactCompany}
                        onChange={(e) => setContactCompany(e.target.value)}
                        placeholder="VD: Techcombank / Grab / KMS / NashTech..."
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        {lang === 'vi' ? 'Mức Đãi Ngộ Dự Kiến (Range)' : 'Compensation Package'}
                      </label>
                      <input
                        type="text"
                        value={contactComp}
                        onChange={(e) => setContactComp(e.target.value)}
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {lang === 'vi' ? 'Vị Trí Tuyển Dụng' : 'Target Engineering Role'}
                    </label>
                    <input
                      type="text"
                      value={contactRole}
                      onChange={(e) => setContactRole(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-sky-300 font-semibold focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {lang === 'vi' ? 'Lời Nhắn / Thời Gian Phỏng Vấn Đề Xuất' : 'Interview Details'}
                    </label>
                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  {contactStatus && (
                    <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs sm:text-sm text-emerald-200 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>{contactStatus}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-black text-sm uppercase tracking-wider transition cursor-pointer shadow-lg shadow-sky-500/20"
                  >
                    {isSubmittingContact
                      ? lang === 'vi'
                        ? 'Đang lưu lịch hẹn vào Database...'
                        : 'Saving to Database...'
                      : lang === 'vi'
                      ? 'Gửi Lời Mời Phỏng Vấn Nguyễn Ngọc Tâm Ngay'
                      : 'Send Fast-Track Interview Invitation'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-10 bg-[#03060f] text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-white">Nguyễn Ngọc Tâm (Ngọc Tâm)</strong> — Senior Full-Stack
            Developer &amp; Real-Time Distributed Systems Architect • Ho Chi Minh City, Vietnam.
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono">
            <a href="./llms.txt" className="hover:text-sky-300">
              /llms.txt
            </a>
            <a href="./llms-full.txt" className="hover:text-sky-300">
              /llms-full.txt
            </a>
            <a href="./ai-profile.json" className="hover:text-sky-300">
              /ai-profile.json
            </a>
            <a href="./sitemap.xml" className="hover:text-sky-300">
              /sitemap.xml
            </a>
          </div>
        </div>
      </footer>

      {/* Executive Resume Modal */}
      <ExecutiveResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
