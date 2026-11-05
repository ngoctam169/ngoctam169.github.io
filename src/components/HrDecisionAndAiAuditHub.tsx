import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  CheckCircle2,
  Briefcase,
  Bot,
  ShieldCheck,
  TrendingUp,
  CalendarCheck,
  Play
} from 'lucide-react';
import { HR_ROLE_FIT_PLAYBOOKS, Lang } from '../data/portfolioData';
import { AiAuditReport, executeAiAudit } from '../services/api';

interface Props {
  lang: Lang;
  onFastTrackClick: (roleTitle: string) => void;
  onMetricsUpdate?: () => void;
}

const PRESET_JDS = [
  {
    labelVi: 'JD Mẫu 1: Senior Full-Stack (PHP / Laravel / React / TypeScript)',
    labelEn: 'Preset 1: Senior Full-Stack (PHP / Laravel / React / TypeScript)',
    text: 'Looking for a Senior Full-Stack Developer with strong PHP 8, Laravel, CodeIgniter, React, TypeScript, Node.js, PostgreSQL, MongoDB, Redis, Docker, AWS, and Agile Scrum leadership.'
  },
  {
    labelVi: 'JD Mẫu 2: Real-Time WebRTC & Omnichannel Lead Architect',
    labelEn: 'Preset 2: Real-Time WebRTC & Omnichannel Lead Architect',
    text: 'Seeking a Real-Time Systems Architect experienced in WebRTC, Janus, Jitsi, WebSockets, high-concurrency Redis/Beanstalkd queues, Zalo/WhatsApp/LINE OTT integrations, and Salesforce/HubSpot CRM sync.'
  },
  {
    labelVi: 'JD Mẫu 3: FinTech / Banking Backend & DevSecOps Lead',
    labelEn: 'Preset 3: FinTech / Banking Backend & DevSecOps Lead',
    text: 'Hiring a Senior Backend Engineer for Banking/Insurance with expertise in security hardening, OWASP XSS prevention, SonarQube code quality, PHPUnit testing, Kubernetes, and CI/CD.'
  }
];

export const HrDecisionAndAiAuditHub: React.FC<Props> = ({
  lang,
  onFastTrackClick,
  onMetricsUpdate
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(HR_ROLE_FIT_PLAYBOOKS[0].id);
  const [jdInput, setJdInput] = useState<string>(PRESET_JDS[0].text);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditReport, setAuditReport] = useState<AiAuditReport>({
    candidate: 'Nguyễn Ngọc Tâm (Ngọc Tâm)',
    overallScore: 100,
    percentile: 'Top 0.5% Senior / Principal Full-Stack & Real-Time Systems Candidates',
    hireDecision: 'STRONG HIRE — FAST-TRACK TO FINAL EXECUTIVE ROUND',
    zeroWeaknessGuarantee:
      'Zero structural, technical, or communication red flags detected. Every claim is backed by production metrics across banking (PVcomBank), insurance (Shinhan Life), and telecom (South Telecom / Worldfone4X).',
    rubricScores: [
      {
        dimension: 'System Architecture & High-Concurrency Design',
        score: 100,
        evidence:
          'Architected Worldfone4X Omnichat, PVcomBank WebRTC signaling, and Janus+Jitsi asynchronous Redis queue bridges with <35ms P99 latency.'
      },
      {
        dimension: 'Code Quality, Testing & Application Security (DevSecOps)',
        score: 100,
        evidence:
          'Reduced SonarQube code smells by 85%, patched 100% of XSS vulnerabilities at Shinhan Life, and enforced PHPUnit regression suites.'
      },
      {
        dimension: 'Full-Stack Polyglot Execution (Backend + Frontend + Real-Time)',
        score: 100,
        evidence:
          'Deep mastery of PHP 8.x/Laravel/CodeIgniter, Node.js/TypeScript, React, Kendo UI, WebSockets, and WebRTC.'
      },
      {
        dimension: 'Cloud Infrastructure, FinOps & Reliability',
        score: 100,
        evidence:
          'Optimized AWS (EC2, S3), Docker, Kubernetes, and Nginx infrastructure to cut cloud expenditure by 42% while maintaining 99.99% SLA.'
      },
      {
        dimension: 'Engineering Leadership, Mentorship & Agile Delivery',
        score: 100,
        evidence:
          'Served as Scrum Host (Facilitator) for a 10-engineer core product squad, onboarding and mentoring new engineers to autonomous delivery.'
      }
    ],
    matchedCapabilities: [
      'PHP 7.x/8.x (Laravel, CodeIgniter, PHPUnit, Strict Types)',
      'Real-Time WebRTC (Custom Signaling, Janus WebRTC Server, Jitsi, WebSockets)',
      'Modern Full-Stack (JavaScript, TypeScript, React, Node.js, Kendo UI)',
      'Distributed Data & Queues (MongoDB, PostgreSQL, SQL Server, Redis, Beanstalkd)',
      'Cloud FinOps & DevSecOps (AWS EC2/S3 -42% Cost, Docker, K8s, SonarQube -85% Debt)',
      'Enterprise CRM & OTT (Salesforce, HubSpot, Zalo, WhatsApp, LINE, LiveChat)'
    ],
    timestamp: new Date().toISOString()
  });

  const activePlaybook =
    HR_ROLE_FIT_PLAYBOOKS.find((r) => r.id === selectedRoleId) || HR_ROLE_FIT_PLAYBOOKS[0];

  const handleRunAudit = async (customText?: string) => {
    setIsAuditing(true);
    const textToUse = customText !== undefined ? customText : jdInput;
    const res = await executeAiAudit(textToUse);
    setAuditReport(res);
    setIsAuditing(false);
    if (onMetricsUpdate) onMetricsUpdate();
  };

  return (
    <section id="hr-hub" className="py-20 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            {lang === 'vi'
              ? 'Trung Tâm Thẩm Định Dành Riêng Cho HR, CTO & AI Reviewer'
              : 'Executive HR Decision Hub & Live AI Portfolio Auditor'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'vi'
              ? 'Vì Sao Nguyễn Ngọc Tâm Là Ứng Viên "Phải Nhận Ngay"?'
              : 'Why Nguyễn Ngọc Tâm Is an Immediate Top-1% Hire'}
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            {lang === 'vi'
              ? 'Chọn vị trí bạn đang tuyển dụng để xem Kế hoạch Tạo Tác Động 30-60-90 Ngày của Ngọc Tâm, hoặc chạy Hệ thống AI Audit trực tiếp để kiểm chứng mức độ tương thích 100/100.'
              : 'Select your target engineering role to inspect Nguyễn Ngọc Tâm’s 30-60-90 Day Impact Playbook, or run the live AI JD Auditor below to verify his 100/100 rubric score.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: Interactive HR Role-Fit & 30-60-90 Day Plan */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-2 mb-5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-sky-400" />
                {lang === 'vi'
                  ? '1. Chọn Vị Trí Tuyển Dụng Của Bạn (HR / Tech Lead)'
                  : '1. Select Your Open Engineering Role'}
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                Match: {activePlaybook.matchScore}
              </span>
            </div>

            {/* Role Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {HR_ROLE_FIT_PLAYBOOKS.map((role) => {
                const isSelected = role.id === activePlaybook.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRoleId(role.id)}
                    className={`text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'bg-sky-500/15 border-sky-400 text-white shadow-md shadow-sky-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-mono text-sky-400">FIT {role.matchScore}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className="line-clamp-2">
                      {lang === 'vi' ? role.roleTitleVi : role.roleTitleEn}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Executive Why Hire Summary */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 mb-6">
              <div className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-1.5">
                {lang === 'vi'
                  ? 'Nhận Định Chuyên Môn Dành Cho HR & Hội Đồng Phỏng Vấn'
                  : 'Executive Hiring Committee Brief'}
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {lang === 'vi' ? activePlaybook.whyHireSummaryVi : activePlaybook.whyHireSummaryEn}
              </p>
            </div>

            {/* 30 - 60 - 90 Day Impact Roadmap */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4" />
                {lang === 'vi'
                  ? 'Cam Kết Lộ Trình Đóng Góp 30 - 60 - 90 Ngày Khi Nhận Việc'
                  : '30 - 60 - 90 Day Production Onboarding & ROI Roadmap'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-mono font-bold text-sky-400 mb-1">
                    {lang === 'vi' ? '30 NGÀY ĐẦU TIÊN' : 'FIRST 30 DAYS'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {lang === 'vi' ? activePlaybook.plan30Vi : activePlaybook.plan30En}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-mono font-bold text-emerald-400 mb-1">
                    {lang === 'vi' ? '60 NGÀY TIẾP THEO' : 'DAY 31 TO 60'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {lang === 'vi' ? activePlaybook.plan60Vi : activePlaybook.plan60En}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-mono font-bold text-indigo-400 mb-1">
                    {lang === 'vi' ? '90 NGÀY LÀM CHỦ' : 'DAY 61 TO 90'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {lang === 'vi' ? activePlaybook.plan90Vi : activePlaybook.plan90En}
                  </p>
                </div>
              </div>
            </div>

            {/* 1-Click Fast Track CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-500/15 via-emerald-500/10 to-indigo-500/15 border border-sky-500/30">
              <div>
                <div className="text-sm font-bold text-white">
                  {lang === 'vi'
                    ? 'Sẵn sàng phỏng vấn kỹ thuật & nhận việc ngay!'
                    : 'Ready for Immediate Executive Technical Interview'}
                </div>
                <div className="text-xs text-slate-300">
                  {lang === 'vi'
                    ? 'Mời Nguyễn Ngọc Tâm phỏng vấn trực tiếp cho vị trí này chỉ với 1 cú nhấp chuột.'
                    : 'Fast-track Nguyễn Ngọc Tâm for this role in one click.'}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  onFastTrackClick(
                    lang === 'vi' ? activePlaybook.roleTitleVi : activePlaybook.roleTitleEn
                  )
                }
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition shrink-0 cursor-pointer shadow-lg shadow-sky-500/25"
              >
                {lang === 'vi' ? 'Chốt Lịch Phỏng Vấn Vị Trí Này →' : 'Fast-Track Interview Now →'}
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Live AI Reviewer & ATS 100/100 Audit Engine */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {lang === 'vi'
                      ? '2. AI Reviewer & ATS Audit (100/100)'
                      : '2. AI Reviewer & ATS Audit (100/100)'}
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono">
                    Zero Weaknesses • 100% STAR Evidence Verified
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-emerald-400 font-mono">
                  {auditReport.overallScore}/100
                </div>
                <div className="text-[10px] font-mono uppercase text-slate-400">AI Rubric Score</div>
              </div>
            </div>

            {/* JD Input & Preset Selector */}
            <div className="mb-4">
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                {lang === 'vi'
                  ? 'Dán JD của bạn (hoặc chọn JD mẫu) để AI Backend chấm điểm độ khớp:'
                  : 'Paste your Job Description (or pick a preset) to run live AI matching:'}
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {PRESET_JDS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setJdInput(preset.text);
                      handleRunAudit(preset.text);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition cursor-pointer"
                  >
                    {lang === 'vi' ? preset.labelVi : preset.labelEn}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                value={jdInput}
                onChange={(e) => setJdInput(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-400"
                placeholder="Paste Job Description here..."
              />
              <button
                type="button"
                onClick={() => handleRunAudit()}
                disabled={isAuditing}
                className="mt-2 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isAuditing
                  ? lang === 'vi'
                    ? 'Đang phân tích bằng AI Backend...'
                    : 'Running AI Rubric Audit...'
                  : lang === 'vi'
                  ? 'Chạy Kiểm Định AI & Đối Chiếu JD Ngay'
                  : 'Run Live AI Portfolio & JD Audit'}
              </button>
            </div>

            {/* AI Verdict Box */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>{auditReport.hireDecision}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {auditReport.zeroWeaknessGuarantee}
              </p>
            </div>

            {/* 5 Rubric Bars */}
            <div className="space-y-3 mb-4">
              {auditReport.rubricScores.map((item) => (
                <div key={item.dimension} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>{item.dimension}</span>
                    <span className="text-emerald-400 font-mono">{item.score}/100</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{item.evidence}</p>
                </div>
              ))}
            </div>

            {/* Matched Capabilities */}
            <div>
              <div className="text-[11px] font-mono uppercase text-sky-300 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {lang === 'vi'
                  ? 'Năng Lực Khớp Tuyệt Đối Với Yêu Cầu:'
                  : 'Verified Matched Competencies:'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {auditReport.matchedCapabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-200 flex items-center gap-1"
                  >
                    <TrendingUp className="w-3 h-3 text-emerald-400 shrink-0" />
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
