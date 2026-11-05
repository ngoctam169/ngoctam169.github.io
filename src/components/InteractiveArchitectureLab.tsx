import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  Code2,
  Layers,
  CheckCircle2,
  ArrowRight,
  Users,
  Server,
  Radio
} from 'lucide-react';
import { ENTERPRISE_PROJECTS, EnterpriseProject, Lang } from '../data/portfolioData';
import { recordTelemetry } from '../services/api';

interface Props {
  lang: Lang;
  onMetricsUpdate?: () => void;
}

export const InteractiveArchitectureLab: React.FC<Props> = ({ lang, onMetricsUpdate }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(ENTERPRISE_PROJECTS[0].id);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [simLoadLevel, setSimLoadLevel] = useState<'normal' | 'peak' | 'burst'>('peak');

  const activeProject: EnterpriseProject =
    ENTERPRISE_PROJECTS.find((p) => p.id === selectedProjectId) || ENTERPRISE_PROJECTS[0];
  const activeNode =
    activeProject.architectureNodes[selectedNodeIndex] || activeProject.architectureNodes[0];

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    setSelectedNodeIndex(0);
    recordTelemetry('architectureInspections').then(() => {
      if (onMetricsUpdate) onMetricsUpdate();
    });
  };

  const simMetrics = {
    normal: {
      rps: '2,850 evt/s',
      p99: '14.2 ms',
      dropRate: '0.00%',
      workers: '12 Active Workers (Redis + Beanstalkd)',
      webrtcRooms: '420 Encrypted Channels'
    },
    peak: {
      rps: '18,400 evt/s',
      p99: '26.8 ms',
      dropRate: '0.00%',
      workers: '48 Auto-Scaled Workers (Zero Blocking)',
      webrtcRooms: '2,150 Encrypted Channels'
    },
    burst: {
      rps: '54,900 evt/s',
      p99: '33.9 ms',
      dropRate: '0.00%',
      workers: '128 K8s Burst Pods + Redis Backpressure',
      webrtcRooms: '6,800 Encrypted Channels'
    }
  }[simLoadLevel];

  return (
    <section id="projects" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" />
              {lang === 'vi'
                ? '4 Hệ Thống Production Cấp Doanh Nghiệp • Kiến Trúc Tương Tác Trực Quan'
                : '4 Flagship Enterprise Production Systems • Interactive Architecture Blueprint'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lang === 'vi'
                ? 'Dự Án Thực Chiến & Phòng Thí Nghiệm Kiến Trúc Hệ Thống'
                : 'Enterprise Case Studies & Interactive System Architecture Lab'}
            </h2>
            <p className="mt-3 text-slate-300 max-w-3xl text-base leading-relaxed">
              {lang === 'vi'
                ? 'Mỗi dự án dưới đây đều là hệ thống Production thực tế tại Ngân hàng (PVcomBank), Bảo hiểm Quốc tế (Shinhan Life) và Viễn thông (Worldfone4X / South Telecom). Hãy bấm vào từng dự án và từng Node kiến trúc để kiểm chứng chiều sâu thiết kế hệ thống cấp Senior 10 năm.'
                : 'Every project below is a battle-tested production platform deployed across Banking (PVcomBank), Multinational Insurance (Shinhan Life), and Telecom (Worldfone4X / South Telecom). Click any system or architecture node to inspect throughput, failover, and code quality.'}
            </p>
          </div>

          {/* Live Stress Test Simulator Pill */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 min-w-[300px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                {lang === 'vi' ? 'Mô phỏng Tải Real-Time' : 'Live Load Telemetry'}
              </span>
              <span className="text-xs font-mono text-sky-300 font-semibold">{simMetrics.p99} P99</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mb-2.5">
              {(['normal', 'peak', 'burst'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSimLoadLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                    simLoadLevel === lvl
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm shadow-sky-500/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {lvl === 'normal'
                    ? lang === 'vi'
                      ? 'Chuẩn'
                      : 'Normal'
                    : lvl === 'peak'
                    ? lang === 'vi'
                      ? 'Cao điểm'
                      : 'Peak'
                    : lang === 'vi'
                    ? 'Bão tải (Burst)'
                    : 'Burst 55K'}
                </button>
              ))}
            </div>
            <div className="text-[11px] font-mono text-slate-300 flex items-center justify-between border-t border-slate-800 pt-2">
              <span>Throughput: {simMetrics.rps}</span>
              <span className="text-emerald-400">Drop: {simMetrics.dropRate}</span>
            </div>
          </div>
        </div>

        {/* Project Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          {ENTERPRISE_PROJECTS.map((proj, idx) => {
            const isSelected = proj.id === activeProject.id;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => handleSelectProject(proj.id)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-sky-500/20 via-slate-900 to-emerald-500/10 border-sky-400 shadow-lg shadow-sky-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className={isSelected ? 'text-sky-300 font-bold' : 'text-slate-400'}>
                    CASE STUDY 0{idx + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {proj.headlineMetric}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base line-clamp-2 mb-1.5">
                  {proj.name}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>
                    {lang === 'vi' ? `Quy mô đội ngũ: ${proj.teamSize} kỹ sư` : `Squad Size: ${proj.teamSize} Engineers`}
                  </span>
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Case Study Deep-Dive Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Top Project Identity Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-sky-400 mb-2">
                <span>{lang === 'vi' ? activeProject.clientOrDomainVi : activeProject.clientOrDomainEn}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">
                  {lang === 'vi' ? activeProject.roleVi : activeProject.roleEn}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{activeProject.name}</h3>
              <p className="mt-2.5 text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
                {lang === 'vi' ? activeProject.summaryVi : activeProject.summaryEn}
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <div className="px-4 py-3 rounded-2xl bg-slate-950/90 border border-sky-500/30">
                <div className="text-[11px] font-mono uppercase text-slate-400">
                  {lang === 'vi' ? 'Chỉ Số Lõi' : 'Primary SLA / Impact'}
                </div>
                <div className="text-lg font-extrabold text-sky-300 mt-0.5">{activeProject.headlineMetric}</div>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-slate-950/90 border border-emerald-500/30">
                <div className="text-[11px] font-mono uppercase text-slate-400">
                  {lang === 'vi' ? 'Điểm Nhấn Kỹ Thuật' : 'Architectural Edge'}
                </div>
                <div className="text-lg font-extrabold text-emerald-300 mt-0.5">
                  {activeProject.secondaryMetric}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive 4-Node System Architecture Diagram */}
          <div className="my-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-sky-300 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                {lang === 'vi'
                  ? 'Sơ Đồ Kiến Trúc Luồng Dữ Liệu (Bấm vào từng Node để xem chi tiết xử lý & chống lỗi)'
                  : 'Interactive System Dataflow Topology (Click any node to inspect benchmarks & failover)'}
              </h4>
              <span className="text-xs text-slate-400 hidden sm:inline">
                {lang === 'vi' ? 'Đang chọn:' : 'Inspecting:'}{' '}
                <strong className="text-white">{activeNode.title}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
              {activeProject.architectureNodes.map((node, i) => {
                const isNodeActive = i === selectedNodeIndex;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      setSelectedNodeIndex(i);
                      recordTelemetry('architectureInspections');
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all relative cursor-pointer ${
                      isNodeActive
                        ? 'bg-sky-500/15 border-sky-400 ring-2 ring-sky-400/20'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                      <span>STAGE 0{i + 1}</span>
                      <span className="text-emerald-400 font-semibold">{node.latencyOrThroughput}</span>
                    </div>
                    <div className="font-bold text-white text-sm mb-1 flex items-center justify-between gap-2">
                      <span>{node.title}</span>
                      {i < 3 && <ArrowRight className="w-4 h-4 text-sky-400 hidden md:inline shrink-0" />}
                    </div>
                    <div className="text-xs text-sky-300/90 font-mono truncate">{node.tech}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Architecture Node Inspector Panel */}
            <div className="mt-4 p-5 rounded-2xl bg-slate-950/90 border border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-sky-400 mb-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>{activeNode.layer}</span>
                  <span>•</span>
                  <span className="text-emerald-300">{activeNode.tech}</span>
                </div>
                <h5 className="text-base font-bold text-white mb-2">{activeNode.title}</h5>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {lang === 'vi' ? activeNode.descriptionVi : activeNode.descriptionEn}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/30">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-emerald-400 font-bold mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  {lang === 'vi'
                    ? 'Cơ Chế Chịu Lỗi & Phục Hồi (Resilience)'
                    : 'Fault-Tolerance & High Availability'}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {lang === 'vi' ? activeNode.failureRecoveryVi : activeNode.failureRecoveryEn}
                </p>
              </div>
            </div>
          </div>

          {/* STAR Breakdown Grid: Challenge, Architectural Execution, Quantified Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/90">
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                {lang === 'vi' ? '1. Bài Toán & Thách Thức Cốt Lõi' : '1. Enterprise Problem & Bottleneck'}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {lang === 'vi' ? activeProject.starChallengeVi : activeProject.starChallengeEn}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/90">
              <h4 className="text-sm font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                {lang === 'vi' ? '2. Giải Pháp Kiến Trúc Của Ngọc Tâm' : '2. Architectural Execution'}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {(lang === 'vi' ? activeProject.starArchitectureVi : activeProject.starArchitectureEn).map(
                  (item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/90">
              <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {lang === 'vi' ? '3. Kết Quả Định Lượng & Tác Động ROI' : '3. Quantified Production Impact'}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {(lang === 'vi' ? activeProject.starImpactVi : activeProject.starImpactEn).map(
                  (item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Before vs After Senior Code & Security Refactoring Showcase */}
          <div className="mt-8 pt-8 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-sky-400" />
                {lang === 'vi'
                  ? activeProject.codeHighlight.titleVi
                  : activeProject.codeHighlight.titleEn}
              </h4>
              <span className="text-xs font-mono text-emerald-400">
                SonarQube Grade A • OWASP Hardened • High-Concurrency Ready
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-rose-950/20 border border-rose-500/30 overflow-hidden">
                <div className="px-4 py-2.5 bg-rose-950/40 border-b border-rose-500/20 text-xs font-mono text-rose-300 font-semibold">
                  ❌ {activeProject.codeHighlight.beforeLabel}
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{activeProject.codeHighlight.beforeSnippet}</code>
                </pre>
              </div>

              <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/30 overflow-hidden">
                <div className="px-4 py-2.5 bg-emerald-950/40 border-b border-emerald-500/20 text-xs font-mono text-emerald-300 font-semibold">
                  ✅ {activeProject.codeHighlight.afterLabel}
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-100 overflow-x-auto leading-relaxed">
                  <code>{activeProject.codeHighlight.afterSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase text-slate-400 mr-2">
                {lang === 'vi' ? 'Công nghệ sử dụng:' : 'Production Stack:'}
              </span>
              {activeProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800/90 text-sky-200 border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
