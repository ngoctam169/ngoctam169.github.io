import React from 'react';
import { X, Download, FileText, Award, CheckCircle2 } from 'lucide-react';
import { CANDIDATE_PROFILE, CAREER_TIMELINE, ENTERPRISE_PROJECTS, Lang } from '../data/portfolioData';
import { recordTelemetry } from '../services/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

export const ExecutiveResumeModal: React.FC<Props> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                {lang === 'vi'
                  ? 'Hồ Sơ Năng Lực & CV Chính Thức — Nguyễn Ngọc Tâm'
                  : 'Official Executive CV & Dossier — Nguyễn Ngọc Tâm'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                ATS-Optimized • 2 Phiên Bản PDF Sẵn Sàng Tải Xuống
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Download Action Bar */}
        <div className="px-6 py-4 bg-slate-900/95 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs sm:text-sm text-slate-300 font-medium">
            {lang === 'vi'
              ? 'Chọn phiên bản PDF phù hợp với nhu cầu tuyển dụng của bạn:'
              : 'Select the PDF version best suited for your hiring workflow:'}
          </span>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="./NGUYEN_NGOC_TAM_SENIOR_ARCHITECT_CV.pdf"
              download="NGUYEN_NGOC_TAM_SENIOR_ARCHITECT_CV.pdf"
              onClick={() => recordTelemetry('cvDownloads')}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition shadow-md shadow-sky-500/20"
            >
              <Award className="w-4 h-4" />
              {lang === 'vi'
                ? 'Tải CV Senior Architect (Executive PDF)'
                : 'Download Senior Architect CV (PDF)'}
            </a>
            <a
              href="./NGUYEN_NGOC_TAM_CV.pdf"
              download="NGUYEN_NGOC_TAM_PHP.pdf"
              onClick={() => recordTelemetry('cvDownloads')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              {lang === 'vi' ? 'Tải CV Gốc (Original PDF)' : 'Download Original CV (PDF)'}
            </a>
          </div>
        </div>

        {/* Scrollable Executive Summary Preview */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-200">
          <div className="border-b border-slate-800 pb-5">
            <h2 className="text-2xl font-black text-white">{CANDIDATE_PROFILE.fullName}</h2>
            <p className="text-sky-400 font-bold text-sm sm:text-base mt-0.5">
              {lang === 'vi' ? CANDIDATE_PROFILE.titleVi : CANDIDATE_PROFILE.titleEn}
            </p>
            <p className="text-xs font-mono text-slate-400 mt-2">
              {CANDIDATE_PROFILE.phoneFormatted} • {CANDIDATE_PROFILE.email} • linkedin.com/in/ngoctam1609 • github.com/ngoctam169 • Ho Chi Minh City
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2">
              {lang === 'vi' ? 'Tóm Tắt Năng Lực Cốt Lõi' : 'Executive Summary'}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'vi' ? CANDIDATE_PROFILE.heroPitchVi : CANDIDATE_PROFILE.heroPitchEn}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold mb-3">
              {lang === 'vi' ? 'Lịch Sử Công Tác & Học Vấn' : 'Work Experience & Education'}
            </h4>
            <div className="space-y-4">
              {CAREER_TIMELINE.map((item) => (
                <div key={item.company} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{item.company}</span>
                    <span className="text-xs font-mono text-sky-400">{item.period}</span>
                  </div>
                  <div className="text-xs text-emerald-300 font-semibold mb-2">
                    {lang === 'vi' ? item.roleVi : item.roleEn}
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {(lang === 'vi' ? item.highlightsVi : item.highlightsEn).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-3">
              {lang === 'vi' ? 'Dự Án Trọng Điểm (Production)' : 'Flagship Enterprise Projects'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ENTERPRISE_PROJECTS.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="font-bold text-white text-sm mb-1">{p.name}</div>
                  <div className="text-xs font-mono text-emerald-400 mb-2">{p.headlineMetric}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi' ? p.summaryVi : p.summaryEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
