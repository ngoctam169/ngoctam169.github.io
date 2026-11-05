import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Clock3,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from 'lucide-react';
// @ts-ignore
import { AUTHOR } from './data/author';
// @ts-ignore
import { latestBlogPosts } from './data/blogMeta';
// @ts-ignore
import { blogPosts, findBlogPost } from './data/blogPosts';
import { Mascot, MASCOT_STYLES, mascotSheets } from './components/Mascot';
import {
  AiAuditReport,
  EndorsementItem,
  executeAiAudit,
  fetchOverview,
  PortfolioMetrics,
  submitContactFastTrack,
  submitEndorsement,
} from './services/api';

const projectDetails: Record<
  string,
  {
    label: string;
    intro: string;
    highlights: string[];
  }
> = {
  Worldfone4X: {
    label: 'Omnichannel platform · Team size 10',
    intro:
      'Mình tham gia phát triển và tối ưu nền tảng Worldfone4X — hệ thống Omnichannel Contact Center hợp nhất voice, social messaging và CRM integration trong môi trường production chịu tải cao.',
    highlights: [
      'Tích hợp hai chiều với Salesforce, HubSpot và xây dựng luồng realtime qua Zalo, WhatsApp, LiveChat, LINE và các dịch vụ OTT.',
      'Tối ưu các module chịu tải cao trong thành phần Omnichat (Beanstalkd, Redis, WebSocket, MongoDB) giúp tăng message throughput và giảm peak-time latency xuống <35ms (P99).',
      'Đảm nhiệm vai trò Scrum Host điều phối các buổi sprint ceremonies, tháo gỡ điểm nghẽn kỹ thuật cho đội ngũ 10 kỹ sư và đào tạo developer mới.',
    ],
  },
  'Shinhan Life': {
    label: 'Enterprise delivery & security · Team size 2',
    intro:
      'Mình trực tiếp tham gia dự án Shinhan Life, chịu trách nhiệm chính về chất lượng mã nguồn, bảo mật thông tin cấp độ tài chính - bảo hiểm và tích hợp hệ thống onsite.',
    highlights: [
      'Giải quyết triệt để các cảnh báo chất lượng mã nguồn trên SonarQube, giảm 85% code smells và đáp ứng tiêu chuẩn bảo trì cấp enterprise.',
      'Phát hiện, khắc phục 100% lỗ hổng Cross-site Scripting (XSS) bảo vệ dữ liệu tài chính nhạy cảm và triển khai unit tests (PHPUnit) cho các hàm nghiệp vụ cốt lõi.',
      'Triển khai, tùy biến onsite nền tảng Worldfone4X tại Shinhan Life và đồng bộ ổn định với hệ thống internal APIs cùng bộ phận IT và business của khách hàng.',
    ],
  },
  PVcomBank: {
    label: 'Banking communication & WebRTC · Team size 3',
    intro:
      'Mình phát triển module giao tiếp thời gian thực độc lập (standalone) cho ngân hàng PVcomBank, bao gồm video call bảo mật và hệ thống phân phối tin nhắn lưu lượng lớn.',
    highlights: [
      'Xây dựng tính năng gọi video bảo mật bằng WebRTC kết hợp hạ tầng custom signaling server, mã hóa kênh truyền media và xác thực token nghiêm ngặt.',
      'Tối ưu hóa tốc độ phân phối tin nhắn, thuật toán chia luồng chat, xử lý WebSocket, cân bằng tải (load balancing) và tuần tự hóa dữ liệu (data serialization).',
      'Tích hợp trực tiếp với internal APIs của PVcomBank phục vụ xác thực khách hàng (customer verification), quản lý phiên (session management) và ghi log kiểm toán.',
    ],
  },
  'Video Room Integration System': {
    label: 'Realtime media architecture · Team size 2',
    intro:
      'Mình thiết kế kiến trúc backend truyền tải video thời gian thực kết nối Laravel với Janus WebRTC Server và Jitsi, xử lý bất đồng bộ hàng loạt sự kiện phòng họp.',
    highlights: [
      'Kiến trúc hệ thống tận dụng Laravel Queues (Redis) để xử lý bất đồng bộ các luồng sự kiện cường độ cao từ Janus, đảm bảo zero application downtime dưới tải nặng.',
      'Thiết kế schema MongoDB tối ưu để lưu trữ, xử lý và kiểm toán lịch sử phiên họp; biến đổi và ánh xạ (transform & map) payload sự kiện giữa Janus và cấu trúc occupant metadata của Jitsi.',
      'Triển khai Laravel Task Scheduling tự động dọn dẹp các phiên Janus hết hạn và dữ liệu phòng họp tạm thời trong cơ sở dữ liệu.',
    ],
  },
};

const skillGroups: Array<[string, string[]]> = [
  [
    'Application development',
    [
      'PHP 7.x / 8.x',
      'Laravel',
      'CodeIgniter',
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Kendo UI',
      'RESTful API',
      'MVVM',
    ],
  ],
  [
    'Data & processing',
    [
      'MongoDB',
      'PostgreSQL',
      'SQL Server',
      'Redis',
      'Beanstalkd',
      'Laravel Queue',
      'Laravel Task Scheduling',
      'SQLite / LibSQL',
    ],
  ],
  [
    'Realtime & integration',
    [
      'WebSocket',
      'WebRTC',
      'Janus WebRTC Server',
      'Jitsi',
      'Salesforce CRM',
      'HubSpot CRM',
      'Zalo / WhatsApp / LINE / LiveChat',
      'Webhooks & Postback',
    ],
  ],
  [
    'Delivery & quality',
    [
      'AWS EC2 / S3',
      'Docker',
      'Kubernetes (K8s)',
      'GitLab CI/CD',
      'GitHub Actions',
      'Nginx',
      'Linux',
      'PHPUnit',
      'SonarQube (-85% smells)',
      'JWT / Firebase JWT',
      'Agile / Scrum Host',
    ],
  ],
];

const impactCards = [
  {
    index: '01',
    metric: '-85% Code Smells',
    title: 'Chất lượng mã nguồn & Bảo mật Enterprise',
    desc: 'Xử lý triệt để cảnh báo SonarQube, khắc phục 100% lỗ hổng XSS và bổ sung PHPUnit tests cho hệ thống tài chính - bảo hiểm Shinhan Life.',
  },
  {
    index: '02',
    metric: '<35ms P99 Latency',
    title: 'Hiệu năng Omnichat & WebSocket tải cao',
    desc: 'Tối ưu luồng phân phối tin nhắn đa kênh (Zalo, WhatsApp, LINE, LiveChat) và WebRTC signaling cho Worldfone4X và ngân hàng PVcomBank.',
  },
  {
    index: '03',
    metric: 'Zero Downtime',
    title: 'Kiến trúc Queue & Realtime Video Mesh',
    desc: 'Xử lý bất đồng bộ sự kiện phòng họp Janus WebRTC & Jitsi qua Laravel Queue (Redis) cùng cơ chế tự động dọn dẹp phiên trên MongoDB.',
  },
  {
    index: '04',
    metric: 'Cloud & Scrum Lead',
    title: 'Tối ưu chi phí Cloud & Dẫn dắt đội ngũ',
    desc: 'Dự toán, tối ưu chi phí hạ tầng AWS (EC2, S3, Docker, K8s), đào tạo kỹ sư mới và điều phối Sprint với vai trò Scrum Host tại South Telecom.',
  },
];

function CodeBlock({ language, label, code }: { language: string; label: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <figure className="article-code">
      <figcaption>
        <span>{label}</span>
        <span className="code-language">{language}</span>
        <button type="button" onClick={copy} aria-label={`Sao chép đoạn code ${label}`}>
          {copied ? <Check /> : <Copy />}
          {copied ? 'Đã sao chép' : 'Sao chép'}
        </button>
      </figcaption>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
    </figure>
  );
}

function ArticleBlock({ block }: { block: any }) {
  if (block.type === 'h2') return <h2 id={block.id}>{block.text}</h2>;
  if (block.type === 'h3') return <h3 id={block.id}>{block.text}</h3>;
  if (block.type === 'list')
    return (
      <ul>
        {block.items.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  if (block.type === 'code') return <CodeBlock {...block} />;
  if (block.type === 'note')
    return (
      <aside className="article-note">
        <strong>{block.title}</strong>
        <p>{block.text}</p>
      </aside>
    );
  return <p>{block.text}</p>;
}

export function App() {
  const [view, setView] = useState<'about' | 'blog' | 'post'>('about');
  const [activeSlug, setActiveSlug] = useState<string>('nguyen-ngoc-tam-ninh-thuan');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mascotCharacter, setMascotCharacter] = useState<string>('fox-riso');

  // Backend SQLite / API state
  const [metrics, setMetrics] = useState<PortfolioMetrics>({
    portfolioViews: 14825,
    aiAuditRuns: 643,
    architectureInspections: 3192,
    cvDownloads: 490,
    recruiterShortlists: 129,
    dbEngine: 'SQLite 3 Native Engine (node:sqlite) + Turso LibSQL Ready',
  });
  const [endorsements, setEndorsements] = useState<EndorsementItem[]>([]);
  const [jdInput, setJdInput] = useState<string>(
    'Senior Full-stack Developer (PHP 8, Laravel, JavaScript/TypeScript, React, MongoDB, PostgreSQL, Redis, WebSocket, WebRTC, AWS, Docker, Kubernetes)'
  );
  const [auditReport, setAuditReport] = useState<AiAuditReport | null>(null);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);

  // Contact & Endorsement Form
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [contactDone, setContactDone] = useState<string>('');

  const [endorseAuthor, setEndorseAuthor] = useState<string>('');
  const [endorseRole, setEndorseRole] = useState<string>('');
  const [endorseComment, setEndorseComment] = useState<string>('');
  const [endorseDone, setEndorseDone] = useState<string>('');

  useEffect(() => {
    const syncFromUrl = () => {
      const p = window.location.pathname;
      const h = window.location.hash;
      if (h.startsWith('#/blog/')) {
        setActiveSlug(h.replace('#/blog/', ''));
        setView('post');
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (h === '#/blog' || p.endsWith('/blog')) {
        setView('blog');
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (p.includes('/blog/')) {
        const slug = p.split('/blog/')[1]?.replace(/\/$/, '');
        if (slug) {
          setActiveSlug(slug);
          setView('post');
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      } else {
        setView('about');
      }
    };
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  useEffect(() => {
    fetchOverview().then((data) => {
      setMetrics(data.metrics);
      setEndorsements(data.endorsements);
    });
    executeAiAudit(jdInput).then((rep) => setAuditReport(rep));
  }, []);

  const navigateToAbout = (sectionId?: string) => {
    setView('about');
    setMobileMenuOpen(false);
    if (sectionId) {
      window.history.pushState(null, '', `#${sectionId}`);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 40);
    } else {
      window.history.pushState(null, '', './');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToBlog = () => {
    setView('blog');
    setMobileMenuOpen(false);
    window.history.pushState(null, '', '#/blog');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navigateToPost = (slug: string) => {
    setActiveSlug(slug);
    setView('post');
    setMobileMenuOpen(false);
    window.history.pushState(null, '', `#/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleRunAudit = async (customJd?: string) => {
    setIsAuditing(true);
    const text = customJd ?? jdInput;
    if (customJd) setJdInput(customJd);
    const rep = await executeAiAudit(text);
    setAuditReport(rep);
    setIsAuditing(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim()) return;
    const res = await submitContactFastTrack({
      name: contactName || 'HR / Tech Lead',
      email: contactEmail,
      company: 'Enterprise Partner',
      roleType: 'Senior Full-stack Developer',
      compensationRange: 'Thương lượng',
      message: contactMessage || 'Trao đổi cơ hội hợp tác với Nguyễn Ngọc Tâm.',
    });
    setContactDone(res.message);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const handleEndorseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!endorseComment.trim()) return;
    const res = await submitEndorsement({
      author: endorseAuthor || 'Tech Lead / Recruiter',
      role: endorseRole || 'Engineering Reviewer',
      company: 'Enterprise',
      highlightMetric: 'Verified Production Impact',
      comment: endorseComment,
    });
    setEndorsements(res.endorsements);
    setEndorseAuthor('');
    setEndorseRole('');
    setEndorseComment('');
    setEndorseDone('Đã lưu nhận xét vào SQLite Database!');
    setTimeout(() => setEndorseDone(''), 3000);
  };

  const story = findBlogPost('nguyen-ngoc-tam-ninh-thuan');
  const activePost = findBlogPost(activeSlug) || story;

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Bỏ qua menu
      </a>

      {/* Header: Exact Huashu Editorial Global Header from iloveyou/about */}
      <header className="site-header stable-header editorial-global-header">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            navigateToAbout();
          }}
          className="brand editorial-wordmark"
          aria-label="Nguyễn Ngọc Tâm - Portfolio"
        >
          <span>Nguyễn Ngọc Tâm</span>
        </a>

        <nav className="desktop-nav simplified-desktop-nav" aria-label="Điều hướng chính">
          <a
            href="#projects"
            className={view === 'about' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              navigateToAbout('projects');
            }}
          >
            Projects
          </a>
          <a
            href="#impact"
            onClick={(e) => {
              e.preventDefault();
              navigateToAbout('impact');
            }}
          >
            Impact
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              navigateToAbout('experience');
            }}
          >
            Experience
          </a>
          <a
            href="#stack"
            onClick={(e) => {
              e.preventDefault();
              navigateToAbout('stack');
            }}
          >
            Stack
          </a>
          <a
            href="#ai-audit"
            onClick={(e) => {
              e.preventDefault();
              navigateToAbout('ai-audit');
            }}
          >
            AI Review
          </a>
          <a
            href="#/blog"
            className={view === 'blog' || view === 'post' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              navigateToBlog();
            }}
          >
            Blog
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              navigateToAbout();
            }}
          >
            About Me
          </a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Đổi giao diện Sáng / Tối"
            title="Đổi giao diện Huashu Paper / Dark"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <div className="header-session-slot">
            <a
              href="./NGUYEN_NGOC_TAM_SENIOR_ARCHITECT_CV.pdf"
              download="NGUYEN_NGOC_TAM_SENIOR_ARCHITECT_CV.pdf"
              className="btn small header-start-learning"
            >
              Tải CV PDF
            </a>
          </div>
          <button
            type="button"
            className="icon-btn menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <nav className="mobile-menu grouped-mobile-menu simplified-mobile-menu" aria-label="Điều hướng di động">
          <section>
            <strong>Hồ sơ Nguyễn Ngọc Tâm</strong>
            <div>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToAbout('projects');
                }}
              >
                Dự án tiêu biểu
              </a>
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToAbout('experience');
                }}
              >
                Kinh nghiệm
              </a>
              <a
                href="#stack"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToAbout('stack');
                }}
              >
                Công nghệ
              </a>
              <a
                href="#ai-audit"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToAbout('ai-audit');
                }}
              >
                HR & AI Review
              </a>
            </div>
          </section>
          <section>
            <strong>Chuyên môn & Liên hệ</strong>
            <div>
              <a
                href="#/blog"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToBlog();
                }}
              >
                Engineering Blog
              </a>
              <a href="./NGUYEN_NGOC_TAM_SENIOR_ARCHITECT_CV.pdf" download>
                Tải CV Senior PDF
              </a>
              <a href="./NGUYEN_NGOC_TAM_CV.pdf" download>
                Tải CV Gốc PDF
              </a>
              <a href={`mailto:${AUTHOR.email}`}>Gửi Email</a>
            </div>
          </section>
        </nav>
      )}

      <main id="main-content" className="page" tabIndex={-1}>
        {view === 'about' && (
          <article className="inner-page section-shell about-author cvp-page cvp-page-v5">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <a
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToAbout();
                    }}
                  >
                    Trang chủ
                  </a>
                </li>
                <li>
                  <span aria-current="page">About Me · Nguyễn Ngọc Tâm</span>
                </li>
              </ol>
            </nav>

            <header className="cvp5-hero">
              <div className="cvp5-kicker">
                <span>Portfolio · Huashu Editorial × Page Mascot</span>
                <span>Ho Chi Minh City, Vietnam</span>
              </div>

              <div className="cvp5-hero-grid">
                <div>
                  <h1>
                    <span>Nguyễn Ngọc Tâm</span>
                    <strong>Full-stack Developer</strong>
                  </h1>

                  <p className="cvp5-lead">
                    Mình xây dựng, tối ưu và vận hành các hệ thống web &amp; realtime communication trong môi trường
                    production — từ kiến trúc backend/API (PHP, Laravel, Node.js), cơ sở dữ liệu &amp; hàng đợi
                    (MongoDB, PostgreSQL, Redis, Beanstalkd) đến WebSocket, WebRTC (Janus, Jitsi), tích hợp CRM
                    (Salesforce, HubSpot) và bảo mật cấp độ tài chính - ngân hàng.
                  </p>

                  <div className="cvp5-actions">
                    <a className="btn large" href="#projects">
                      Xem dự án <ArrowRight />
                    </a>
                    <a className="btn secondary large" href={`mailto:${AUTHOR.email}`}>
                      <Mail /> Liên hệ
                    </a>
                    <a
                      className="btn secondary large"
                      href="./NGUYEN_NGOC_TAM_SENIOR_ARCHITECT_CV.pdf"
                      download="NGUYEN_NGOC_TAM_SENIOR_ARCHITECT_CV.pdf"
                    >
                      <Download /> CV PDF
                    </a>
                    <a
                      className="cvp5-text-link"
                      href={AUTHOR.sameAs[1]}
                      target="_blank"
                      rel="me noopener noreferrer"
                    >
                      GitHub <ExternalLink />
                    </a>
                    <a
                      className="cvp5-text-link"
                      href={AUTHOR.sameAs[0]}
                      target="_blank"
                      rel="me noopener noreferrer"
                    >
                      LinkedIn <ExternalLink />
                    </a>
                  </div>
                </div>

                {/* Interactive Page Mascot Stage (nilbuild/page-mascot) */}
                <aside className="cvp5-mascot-stage" aria-label="Interactive Page Mascot">
                  <div className="cvp5-mascot-topline">
                    <span>
                      <b>/page-mascot</b> · cursor tracker
                    </span>
                    <span>click to boop</span>
                  </div>
                  <div className="cvp5-mascot-canvas">
                    <Mascot
                      key={mascotCharacter}
                      {...mascotSheets(mascotCharacter)}
                      label={mascotCharacter}
                      size={168}
                    />
                  </div>
                  <div className="cvp5-mascot-styles" role="group" aria-label="Chọn phong cách mascot">
                    {MASCOT_STYLES.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        className={mascotCharacter === st.id ? 'active' : ''}
                        onClick={() => setMascotCharacter(st.id)}
                        title={`${st.name} (${st.note})`}
                      >
                        {st.name}
                      </button>
                    ))}
                  </div>
                  <div className="cvp5-mascot-caption">
                    Di chuột để mascot nhìn theo · Bấm vào mascot để xem biểu cảm
                  </div>
                </aside>
              </div>

              <div className="cvp5-facts" aria-label="Thông tin nhanh">
                <div>
                  <span>Current</span>
                  <strong>South Telecom</strong>
                </div>
                <div>
                  <span>Role</span>
                  <strong>Full-stack Developer · Scrum Host</strong>
                </div>
                <div>
                  <span>Experience</span>
                  <strong>07/2022 — Present (Production Lead)</strong>
                </div>
                <div>
                  <span>Location</span>
                  <strong>
                    <MapPin /> Ho Chi Minh City
                  </strong>
                </div>
              </div>
            </header>

            <nav className="cvp5-nav" aria-label="Đi nhanh trong hồ sơ">
              <a href="#projects">Projects</a>
              <a href="#impact">Impact</a>
              <a href="#experience">Experience</a>
              <a href="#stack">Stack</a>
              <a href="#ai-audit">HR &amp; AI Review</a>
              <a
                href="#/blog"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToBlog();
                }}
              >
                Engineering Blog
              </a>
              <a href="#contact">Contact</a>
            </nav>

            {/* SECTION 1: SELECTED WORK / PROJECTS */}
            <section className="cvp5-section" id="projects" aria-labelledby="projects-title">
              <div className="cvp5-section-head">
                <span>Selected work</span>
                <h2 id="projects-title">Dự án tiêu biểu</h2>
                <p>
                  Các hệ thống enterprise và realtime communication mình trực tiếp thiết kế kiến trúc, phát triển
                  tính năng và tối ưu trong môi trường production.
                </p>
              </div>

              <div className="cvp5-project-list">
                {AUTHOR.selectedProjects.map((project: any, index: number) => {
                  const detail = projectDetails[project.name];
                  return (
                    <article className="cvp5-project" key={project.name}>
                      <div className="cvp5-project-title">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <small>{detail?.label}</small>
                        <h3>{project.name}</h3>
                      </div>

                      <div className="cvp5-project-body">
                        <p>{detail?.intro || project.summary}</p>

                        <ul>
                          {(detail?.highlights || [project.summary]).map((item: string) => (
                            <li key={item}>
                              <Check />
                              {item}
                            </li>
                          ))}
                        </ul>

                        <div className="cvp5-tags">
                          {project.technologies.map((item: string) => (
                            <span key={item}>{item}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* SECTION 2: SELECTED ENGINEERING IMPACT */}
            <section className="cvp5-section" id="impact" aria-labelledby="impact-title">
              <div className="cvp5-section-head cvp5-section-head-split">
                <div>
                  <span>Production metrics</span>
                  <h2 id="impact-title">Dấu ấn kỹ thuật &amp; Tác động thực tế</h2>
                </div>
                <p>Những con số định lượng đã được kiểm chứng qua các kỳ audit bảo mật và vận hành thực tế.</p>
              </div>

              <div className="cvp-strength-grid">
                {impactCards.map((card) => (
                  <article key={card.index}>
                    <span>
                      {card.index} · {card.metric}
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* SECTION 3: WORK EXPERIENCE */}
            <section className="cvp5-section" id="experience" aria-labelledby="experience-title">
              <div className="cvp5-section-head">
                <span>Experience</span>
                <h2 id="experience-title">Kinh nghiệm làm việc</h2>
              </div>

              <div className="cvp5-experience">
                <article>
                  <div className="cvp5-experience-side">
                    <span>07/2022 — Present</span>
                    <small>Ho Chi Minh City</small>
                  </div>
                  <div>
                    <p className="cvp5-company">South Telecom</p>
                    <h3>Full-stack Developer · Scrum Host</h3>
                    <p>
                      Tại South Telecom, mình phát triển các dòng sản phẩm chủ lực hiệu năng cao, tích hợp các nền
                      tảng CRM (Salesforce, HubSpot), xây dựng và tối ưu các kênh giao tiếp thời gian thực cho cả
                      thoại và tin nhắn (Zalo, WhatsApp, LiveChat, LINE, WebRTC). Bên cạnh việc xử lý sự cố
                      production, dự toán và tối ưu chi phí dịch vụ đám mây (AWS), mình còn đảm nhiệm vai trò Scrum
                      Host điều phối các nghi thức sprint, tháo gỡ blockers và trực tiếp hướng dẫn kỹ sư mới.
                    </p>
                  </div>
                </article>

                <article>
                  <div className="cvp5-experience-side">
                    <span>04/2022 — 07/2022</span>
                    <small>Ho Chi Minh City</small>
                  </div>
                  <div>
                    <p className="cvp5-company">R-Digital</p>
                    <h3>Backend Developer Intern</h3>
                    <p>
                      Phối hợp cùng đội ngũ front-end developers và các thành viên trong nhóm để thiết lập mục tiêu,
                      thiết kế mã nguồn backend gắn kết và tối ưu trải nghiệm người dùng, đồng thời báo cáo tiến độ
                      dự án hằng ngày cho ban lãnh đạo.
                    </p>
                  </div>
                </article>
              </div>
            </section>

            {/* SECTION 4: TECHNICAL STACK */}
            <section className="cvp5-section" id="stack" aria-labelledby="stack-title">
              <div className="cvp5-section-head cvp5-section-head-split">
                <div>
                  <span>Technical stack</span>
                  <h2 id="stack-title">Công nghệ đã sử dụng</h2>
                </div>
                <p>Hệ sinh thái công nghệ mình làm việc trực tiếp trong các dự án production.</p>
              </div>

              <div className="cvp5-stack">
                {skillGroups.map(([group, items]) => (
                  <article key={group}>
                    <h3>{group}</h3>
                    <div>
                      {items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* SECTION 5: HR & AI REVIEW + LIVE SQLITE DATABASE */}
            <section className="cvp5-section" id="ai-audit" aria-labelledby="ai-audit-title">
              <div className="cvp5-section-head cvp5-section-head-split">
                <div>
                  <span>Executive evaluation · SQLite &amp; Node.js API</span>
                  <h2 id="ai-audit-title">Thẩm định Hồ sơ (AI Review 100/100) &amp; Đánh giá thực tế</h2>
                </div>
                <p>
                  Được vận hành trực tiếp bởi Backend Node.js + {metrics.dbEngine} ({metrics.portfolioViews.toLocaleString()}{' '}
                  lượt xem).
                </p>
              </div>

              <div className="huashu-audit-grid">
                <div className="huashu-audit-cell">
                  <span className="overline">AI PORTFOLIO &amp; ATS RUBRIC · 100 / 100</span>
                  <h3>Kiểm tra mức độ tương thích với Job Description</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.82rem', margin: '0 0 10px' }}>
                    Dán yêu cầu tuyển dụng (JD) của bạn hoặc chọn mẫu bên dưới để đối chiếu trực tiếp với kinh
                    nghiệm thực tế của Nguyễn Ngọc Tâm:
                  </p>

                  <div className="huashu-preset-row">
                    <button
                      type="button"
                      onClick={() =>
                        handleRunAudit(
                          'Senior Full-Stack Developer: PHP 8, Laravel, CodeIgniter, JavaScript, TypeScript, React, MongoDB, PostgreSQL, Redis, AWS, Docker, Kubernetes'
                        )
                      }
                    >
                      Senior Full-stack (PHP/Laravel/React)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleRunAudit(
                          'Realtime & WebRTC Systems Engineer: WebSockets, WebRTC, Janus, Jitsi, Beanstalkd, Redis Queues, Salesforce & HubSpot CRM'
                        )
                      }
                    >
                      Realtime &amp; WebRTC Architect
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleRunAudit(
                          'Banking & Enterprise Backend Lead: SonarQube, OWASP XSS Security, PHPUnit, High-Concurrency APIs, Scrum Facilitator'
                        )
                      }
                    >
                      Banking &amp; Security Lead
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={jdInput}
                    onChange={(e) => setJdInput(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', fontSize: '.8rem', marginBottom: '10px' }}
                  />
                  <button
                    type="button"
                    className="btn small"
                    onClick={() => handleRunAudit()}
                    disabled={isAuditing}
                  >
                    {isAuditing ? 'Đang phân tích...' : 'Chạy đối chiếu AI & JD'}
                  </button>

                  {auditReport && (
                    <div className="huashu-rubric-list">
                      {auditReport.rubricScores.map((r) => (
                        <div key={r.dimension} className="huashu-rubric-item">
                          <div className="huashu-rubric-head">
                            <span>{r.dimension}</span>
                            <span>{r.score}/100</span>
                          </div>
                          <p>{r.evidence}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="huashu-audit-cell">
                  <span className="overline">PEER &amp; RECRUITER ENDORSEMENTS (LIVE DB)</span>
                  <h3>Nhận xét từ đồng nghiệp &amp; đối tác dự án</h3>
                  <div className="huashu-rubric-list" style={{ marginBottom: '20px' }}>
                    {endorsements.slice(0, 3).map((item) => (
                      <div key={item.id} className="huashu-rubric-item">
                        <div className="huashu-rubric-head">
                          <span>
                            {item.author} · <small style={{ color: 'var(--muted)' }}>{item.role}</small>
                          </span>
                          <span>★ {item.rating}.0</span>
                        </div>
                        <p>“{item.commentVi}”</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleEndorseSubmit} style={{ display: 'grid', gap: '8px' }}>
                    <strong style={{ fontSize: '.78rem' }}>Thêm đánh giá trực tiếp vào Database:</strong>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        required
                        value={endorseAuthor}
                        onChange={(e) => setEndorseAuthor(e.target.value)}
                        placeholder="Tên của bạn"
                        style={{ padding: '8px 10px', fontSize: '.78rem' }}
                      />
                      <input
                        type="text"
                        value={endorseRole}
                        onChange={(e) => setEndorseRole(e.target.value)}
                        placeholder="Chức danh / Công ty"
                        style={{ padding: '8px 10px', fontSize: '.78rem' }}
                      />
                    </div>
                    <textarea
                      rows={2}
                      required
                      value={endorseComment}
                      onChange={(e) => setEndorseComment(e.target.value)}
                      placeholder="Nhận xét về hồ sơ của Nguyễn Ngọc Tâm..."
                      style={{ padding: '8px 10px', fontSize: '.78rem' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <button type="submit" className="btn secondary small">
                        Lưu nhận xét vào DB
                      </button>
                      {endorseDone && (
                        <small style={{ color: 'var(--primary)', fontWeight: 600 }}>{endorseDone}</small>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* SECTION 6: EDUCATION & ENGINEERING BLOG META GRID */}
            <section className="cvp5-section cvp5-meta-grid">
              <article className="cvp5-meta-card">
                <GraduationCap />
                <div>
                  <span>Education</span>
                  <h2>Industrial University of Ho Chi Minh City</h2>
                  <p>Information Technology · 09/2019 — 02/2022</p>
                </div>
              </article>

              <article className="cvp5-meta-card cvp5-writing">
                <div>
                  <span>Engineering notes</span>
                  <h2>Cách mình phân tích và xử lý bài toán kỹ thuật</h2>
                  <p>
                    Mình ghi lại các case đã gặp khi làm PHP, MongoDB, Redis, queue, WebSocket, WebRTC và
                    production.
                  </p>
                </div>
                <a
                  href="#/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToBlog();
                  }}
                >
                  Đọc Engineering Blog <ArrowRight />
                </a>
              </article>
            </section>

            {/* SECTION 7: CONTACT */}
            <section className="cvp5-contact" id="contact" aria-labelledby="contact-title">
              <div>
                <span>Contact</span>
                <h2 id="contact-title">Nguyễn Ngọc Tâm · Full-stack Developer</h2>
                <p>
                  Có thể liên hệ trực tiếp với mình qua số điện thoại <strong>0824608716</strong>, email{' '}
                  <strong>{AUTHOR.email}</strong> hoặc LinkedIn nếu muốn trao đổi về công việc.
                </p>

                <form
                  onSubmit={handleContactSubmit}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '8px',
                    marginTop: '16px',
                    maxWidth: '680px',
                  }}
                >
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Tên HR / Tech Lead"
                    style={{ padding: '9px 12px', fontSize: '.8rem' }}
                  />
                  <input
                    type="text"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Email hoặc SĐT liên hệ"
                    style={{ padding: '9px 12px', fontSize: '.8rem' }}
                  />
                  <input
                    type="text"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Lời nhắn / Lịch hẹn phỏng vấn"
                    style={{ padding: '9px 12px', fontSize: '.8rem' }}
                  />
                  <button type="submit" className="btn small">
                    Gửi lời mời phỏng vấn
                  </button>
                </form>
                {contactDone && (
                  <p style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '8px', fontSize: '.8rem' }}>
                    {contactDone}
                  </p>
                )}
              </div>
              <div className="cvp5-contact-actions">
                <a className="btn large" href={`mailto:${AUTHOR.email}`}>
                  <Mail /> {AUTHOR.email}
                </a>
                <a className="btn secondary large" href="tel:0824608716">
                  <Phone /> 0824608716
                </a>
                <a
                  className="btn secondary large"
                  href={AUTHOR.sameAs[0]}
                  target="_blank"
                  rel="me noopener noreferrer"
                >
                  <BriefcaseBusiness /> LinkedIn
                </a>
              </div>
            </section>
          </article>
        )}

        {/* ENGINEERING BLOG INDEX VIEW */}
        {view === 'blog' && story && (
          <div className="inner-page section-shell blog-index">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <a
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToAbout();
                    }}
                  >
                    About Nguyễn Ngọc Tâm
                  </a>
                </li>
                <li>
                  <span aria-current="page">Engineering Blog</span>
                </li>
              </ol>
            </nav>

            <header className="blog-hero">
              <div>
                <span className="overline">ENGINEERING NOTES · BACKEND · REALTIME · PRODUCTION</span>
                <h1>Những ghi chú kỹ thuật mình muốn giữ lại</h1>
                <p>
                  Mình ghi lại các case đã gặp khi làm PHP/Laravel, MongoDB, Redis, WebSocket, WebRTC, queue và
                  performance.
                </p>
                <div className="blog-author-line">
                  <BookOpenText aria-hidden="true" />
                  <span>
                    Nguyễn Ngọc Tâm · {AUTHOR.jobTitle} tại South Telecom
                  </span>
                </div>
              </div>
              <div className="blog-topic-cloud" aria-label="Chủ đề chính">
                {['PHP', 'Laravel', 'MongoDB', 'Redis', 'WebSocket', 'WebRTC', 'Performance'].map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
            </header>

            <section className="blog-story-preview" aria-labelledby="personal-story-preview-title">
              <div className="blog-story-preview-copy">
                <span className="article-category">{story.category}</span>
                <h2 id="personal-story-preview-title">{story.title}</h2>
                <p className="article-lead">{story.description}</p>
                <div className="story-preview-body">
                  {story.content
                    .filter((block: any) => block.type === 'p')
                    .slice(0, 2)
                    .map((block: any, idx: number) => (
                      <p key={idx}>{block.text}</p>
                    ))}
                </div>
                <div className="article-byline">
                  <span>
                    Viết bởi{' '}
                    <a
                      href="#about"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToAbout();
                      }}
                    >
                      {AUTHOR.name}
                    </a>
                  </span>
                  <span>
                    <CalendarDays aria-hidden="true" />
                    <time dateTime={story.datePublished}>
                      {new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(
                        new Date(`${story.datePublished}T00:00:00`)
                      )}
                    </time>
                  </span>
                  <span>
                    <Clock3 aria-hidden="true" />
                    {story.readingTime}
                  </span>
                </div>
                <a
                  className="btn story-read-more"
                  href={`#/blog/${story.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToPost(story.slug);
                  }}
                >
                  Đọc câu chuyện đầy đủ <ArrowRight />
                </a>
              </div>
            </section>

            <section className="blog-list" aria-labelledby="all-articles-title">
              <div className="section-intro left">
                <span className="overline">TECHNICAL ARTICLES</span>
                <h2 id="all-articles-title">Những thứ mình từng phải tìm hiểu khi đi làm</h2>
                <p>Có bài bắt đầu từ một bug, có bài từ một thứ mình phải tự đọc thêm để xử lý công việc.</p>
              </div>
              <div className="blog-grid">
                {latestBlogPosts.map((post: any) => (
                  <article className="blog-card" key={post.slug}>
                    <div className="blog-card-meta">
                      <span>{post.category}</span>
                      <span>
                        <Clock3 aria-hidden="true" /> {post.readingTime}
                      </span>
                    </div>
                    <h3>
                      <a
                        href={`#/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToPost(post.slug);
                        }}
                      >
                        {post.title}
                      </a>
                    </h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <time dateTime={post.datePublished}>
                        {new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(
                          new Date(`${post.datePublished}T00:00:00`)
                        )}
                      </time>
                      <a
                        className="text-link"
                        href={`#/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToPost(post.slug);
                        }}
                      >
                        Đọc bài <ArrowRight />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* BLOG POST ARTICLE DETAIL VIEW */}
        {view === 'post' && activePost && (
          <article className="inner-page section-shell article-page">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <a
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToAbout();
                    }}
                  >
                    About Nguyễn Ngọc Tâm
                  </a>
                </li>
                <li>
                  <a
                    href="#/blog"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToBlog();
                    }}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <span>{activePost.category}</span>
                </li>
                <li>
                  <span aria-current="page">{activePost.title}</span>
                </li>
              </ol>
            </nav>

            <header className="article-header">
              <span className="article-category">{activePost.category}</span>
              <h1>{activePost.title}</h1>
              <p className="article-lead">{activePost.description}</p>
              <div className="article-byline">
                <span>
                  Viết bởi{' '}
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToAbout();
                    }}
                  >
                    {AUTHOR.name}
                  </a>
                </span>
                <span>
                  <CalendarDays aria-hidden="true" />
                  <time dateTime={activePost.datePublished}>
                    {new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(
                      new Date(`${activePost.datePublished}T00:00:00`)
                    )}
                  </time>
                </span>
                <span>
                  <Clock3 aria-hidden="true" />
                  {activePost.readingTime}
                </span>
              </div>
              <div className="article-tags" aria-label="Thẻ bài viết">
                {activePost.tags.map((tag: string) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </header>

            <div className="article-layout">
              <div className="article-content">
                {activePost.content.map((block: any, idx: number) => (
                  <ArticleBlock key={`${block.type}-${block.id || idx}`} block={block} />
                ))}
              </div>
              <aside className="article-toc" aria-label="Mục lục">
                <strong>Trong bài này</strong>
                <ol>
                  {activePost.content
                    .filter((block: any) => block.type === 'h2')
                    .map((block: any) => (
                      <li key={block.id}>
                        <a href={`#${block.id}`}>{block.text}</a>
                      </li>
                    ))}
                </ol>
              </aside>
            </div>

            <aside className="author-box" aria-labelledby="article-author-title">
              <div className="author-monogram" aria-hidden="true">
                NT
              </div>
              <div>
                <span className="overline">TÁC GIẢ</span>
                <h2 id="article-author-title">{AUTHOR.name}</h2>
                <strong>{AUTHOR.jobTitle}</strong>
                <p>{AUTHOR.description}</p>
                <div className="author-links">
                  <a
                    className="text-link"
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToAbout();
                    }}
                  >
                    About Nguyễn Ngọc Tâm <ArrowRight />
                  </a>
                  <a href={AUTHOR.sameAs[0]} target="_blank" rel="me noopener noreferrer">
                    <ExternalLink /> LinkedIn
                  </a>
                  <a href={AUTHOR.sameAs[1]} target="_blank" rel="me noopener noreferrer">
                    <ExternalLink /> GitHub
                  </a>
                </div>
              </div>
            </aside>

            <section className="related-articles" aria-labelledby="related-title">
              <div className="related-heading">
                <div>
                  <span className="overline">ĐỌC TIẾP</span>
                  <h2 id="related-title">Bài viết liên quan</h2>
                </div>
                <a
                  className="text-link"
                  href="#/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToBlog();
                  }}
                >
                  Xem toàn bộ Blog
                </a>
              </div>
              <div className="blog-grid two">
                {blogPosts
                  .filter((item: any) => item.slug !== activePost.slug)
                  .slice(0, 2)
                  .map((item: any) => (
                    <article className="blog-card compact" key={item.slug}>
                      <div className="blog-card-meta">
                        <span>{item.category}</span>
                        <span>
                          <Clock3 aria-hidden="true" /> {item.readingTime}
                        </span>
                      </div>
                      <h3>
                        <a
                          href={`#/blog/${item.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateToPost(item.slug);
                          }}
                        >
                          {item.title}
                        </a>
                      </h3>
                      <p>{item.excerpt}</p>
                      <div className="blog-card-footer">
                        <time dateTime={item.datePublished}>{item.datePublished}</time>
                        <a
                          className="text-link"
                          href={`#/blog/${item.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateToPost(item.slug);
                          }}
                        >
                          Đọc bài <ArrowRight />
                        </a>
                      </div>
                    </article>
                  ))}
              </div>
            </section>

            <a
              className="back-link article-back"
              href="#/blog"
              onClick={(e) => {
                e.preventDefault();
                navigateToBlog();
              }}
            >
              <ArrowLeft /> Quay lại Blog
            </a>
          </article>
        )}
      </main>

      {/* Exact Huashu Editorial Footer */}
      <footer className="footer editorial-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a
              className="brand editorial-wordmark"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                navigateToAbout();
              }}
            >
              Nguyễn Ngọc Tâm
            </a>
            <p>Full-stack Developer · Realtime Systems · WebRTC &amp; Omnichannel</p>
            <small>
              Portfolio &amp; Engineering Notes của Nguyễn Ngọc Tâm (Ngọc Tâm) tại South Telecom, TP. Hồ Chí Minh.
            </small>
          </div>

          <nav className="editorial-footer-nav" aria-label="Liên kết cuối trang">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                navigateToAbout('projects');
              }}
            >
              Projects
            </a>
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                navigateToAbout('experience');
              }}
            >
              Experience
            </a>
            <a
              href="#stack"
              onClick={(e) => {
                e.preventDefault();
                navigateToAbout('stack');
              }}
            >
              Technical Stack
            </a>
            <a
              href="#/blog"
              onClick={(e) => {
                e.preventDefault();
                navigateToBlog();
              }}
            >
              Engineering Blog
            </a>
            <a href="./NGUYEN_NGOC_TAM_SENIOR_ARCHITECT_CV.pdf" download>
              CV PDF
            </a>
            <a href={`mailto:${AUTHOR.email}`}>Contact</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <small>© 2026 Nguyễn Ngọc Tâm · Full-stack Developer · Ho Chi Minh City, Vietnam</small>
          <div>
            <a href={AUTHOR.sameAs[0]} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={AUTHOR.sameAs[1]} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="./llms.txt">LLMs.txt</a>
            <a href="./sitemap.xml">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
