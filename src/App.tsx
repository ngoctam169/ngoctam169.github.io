import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Code2,
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
import { Mascot, MASCOT_STYLES, mascotSheets } from './components/Mascot';

type Lang = 'vi' | 'en';

interface ProjectItem {
  name: string;
  label: Record<Lang, string>;
  intro: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
  pipeline: string[];
  archNote: Record<Lang, string>;
  technologies: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    name: 'Worldfone4X',
    label: {
      vi: 'Omnichannel platform · Team size 10',
      en: 'Omnichannel platform · Team size 10',
    },
    intro: {
      vi: 'Mình tham gia phát triển và tối ưu Worldfone4X — nền tảng Omnichannel Contact Center kết nối thoại, các kênh nhắn tin và CRM trong môi trường production.',
      en: 'Developed and optimized Worldfone4X — an enterprise Omnichannel Contact Center platform unifying voice, social messaging, and CRM workflows in high-load production.',
    },
    highlights: {
      vi: [
        'Tích hợp hai chiều với Salesforce, HubSpot và xử lý luồng giao tiếp realtime qua Zalo, WhatsApp, LiveChat, LINE cùng các dịch vụ OTT.',
        'Tối ưu các module chịu tải cao trong phần Omnichat (Beanstalkd, Redis, WebSocket, MongoDB) để tăng lượng tin nhắn xử lý được và giảm độ trễ vào khung giờ cao điểm.',
        'Phối hợp cùng team xử lý các vấn đề phát sinh trên môi trường thực tế, tham gia điều phối sprint và hỗ trợ các thành viên mới nắm bắt hệ thống.',
      ],
      en: [
        'Built bi-directional integrations with Salesforce and HubSpot alongside real-time messaging pipelines across Zalo, WhatsApp, LiveChat, LINE, and OTT channels.',
        'Optimized high-traffic Omnichat modules (Beanstalkd, Redis, WebSocket, MongoDB) to increase message throughput and reduce peak-hour latency.',
        'Handled production troubleshooting, facilitated Agile Scrum ceremonies as Scrum Host, and mentored new engineers joining the team.',
      ],
    },
    pipeline: [
      'Zalo / WhatsApp / LINE Webhook',
      'Nginx & PHP Ingestion API',
      'Beanstalkd / Redis Queue',
      'Omnichat Worker Pool',
      'MongoDB + Redis State',
      'WebSocket Push & CRM Sync',
    ],
    archNote: {
      vi: 'Tách biệt hoàn toàn luồng nhận webhook khỏi luồng xử lý nghiệp vụ bằng hàng đợi Beanstalkd và Redis, giúp hệ thống không bị nghẽn kết nối khi lượng tin nhắn đổ về đột biến.',
      en: 'Decoupled webhook ingestion from message routing via Beanstalkd and Redis queues, preventing connection bottlenecks during traffic spikes.',
    },
    technologies: ['PHP', 'MongoDB', 'Redis', 'Beanstalkd', 'JavaScript', 'WebSocket', 'Salesforce / HubSpot API'],
  },
  {
    name: 'Shinhan Life',
    label: {
      vi: 'Enterprise delivery & security · Team size 2',
      en: 'Enterprise delivery & security · Team size 2',
    },
    intro: {
      vi: 'Mình tham gia dự án Shinhan Life, tập trung vào việc cải thiện chất lượng mã nguồn, xử lý các vấn đề bảo mật ứng dụng và triển khai tích hợp onsite.',
      en: 'Led code quality remediation, application security hardening, and onsite enterprise system integration for Shinhan Life.',
    },
    highlights: {
      vi: [
        'Rà soát và xử lý các cảnh báo trên SonarQube, giảm khoảng 85% code smells để mã nguồn sạch, dễ đọc và dễ bảo trì hơn.',
        'Khắc phục các lỗ hổng Cross-site Scripting (XSS) và viết thêm unit tests (PHPUnit) cho những hàm nghiệp vụ quan trọng.',
        'Làm việc trực tiếp cùng đội ngũ IT và nghiệp vụ phía khách hàng để triển khai onsite và đồng bộ dữ liệu ổn định với hệ thống internal APIs.',
      ],
      en: [
        'Resolved static analysis findings in SonarQube, reducing code smells by 85% to meet strict financial maintainability standards.',
        'Remediated Cross-site Scripting (XSS) vulnerabilities across user-facing modules and added PHPUnit tests for core business logic.',
        'Deployed and customized Worldfone4X onsite at Shinhan Life, synchronizing workflows with internal customer APIs alongside IT and business stakeholders.',
      ],
    },
    pipeline: [
      'Source Audit (SonarQube)',
      'Input Sanitization & CSP (Anti-XSS)',
      'Core Business Refactor (-85% Smells)',
      'PHPUnit Regression Suite',
      'Onsite Deployment & Internal API Sync',
    ],
    archNote: {
      vi: 'Chuẩn hóa lớp kiểm tra dữ liệu đầu vào/đầu ra và bổ sung unit test cho các hàm tính toán nghiệp vụ trước khi triển khai vào mạng nội bộ của khách hàng bảo hiểm.',
      en: 'Standardized input/output encoding and unit-tested core business logic prior to onsite deployment within the client’s internal network.',
    },
    technologies: ['PHP', 'PHPUnit', 'SonarQube', 'MongoDB', 'Redis', 'JavaScript', 'WebSocket'],
  },
  {
    name: 'PVcomBank',
    label: {
      vi: 'Banking communication & WebRTC · Team size 3',
      en: 'Banking communication & WebRTC · Team size 3',
    },
    intro: {
      vi: 'Mình phát triển module giao tiếp thời gian thực cho PVcomBank, bao gồm tính năng gọi video và luồng gửi nhận tin nhắn.',
      en: 'Built a standalone real-time communication module for PVcomBank featuring secure WebRTC video calling and high-volume chat delivery.',
    },
    highlights: {
      vi: [
        'Xây dựng tính năng video call bằng WebRTC kết hợp với custom signaling server phù hợp với yêu cầu bảo mật của môi trường ngân hàng.',
        'Tối ưu tốc độ gửi nhận tin nhắn, luồng định tuyến chat, xử lý kết nối WebSocket, cân bằng tải và tuần tự hóa dữ liệu.',
        'Kết nối với các internal APIs của PVcomBank để xác thực thông tin khách hàng và quản lý phiên làm việc.',
      ],
      en: [
        'Implemented encrypted WebRTC video calling backed by a custom signaling server tailored for banking security requirements.',
        'Optimized chat routing, WebSocket connection handling, load balancing, and payload serialization for low-latency message delivery.',
        'Integrated directly with PVcomBank internal APIs for customer verification and session lifecycle management.',
      ],
    },
    pipeline: [
      'Customer App / Browser',
      'Token Auth & PVcomBank Verification API',
      'Custom WebRTC Signaling (WebSocket)',
      'STUN / TURN & Encrypted Media Stream',
      'Session Audit & Chat Persistence',
    ],
    archNote: {
      vi: 'Xác thực phiên làm việc qua internal API ngân hàng trước khi cấp phát kết nối signaling WebSocket và thiết lập luồng media WebRTC giữa khách hàng với tổng đài viên.',
      en: 'Validated customer sessions against banking APIs prior to WebSocket signaling handshake and encrypted WebRTC media negotiation.',
    },
    technologies: ['PHP', 'WebRTC', 'WebSocket', 'MongoDB', 'Redis', 'Custom Signaling'],
  },
  {
    name: 'Video Room Integration System',
    label: {
      vi: 'Realtime media architecture · Team size 2',
      en: 'Realtime media architecture · Team size 2',
    },
    intro: {
      vi: 'Mình phụ trách phần backend cho hệ thống phòng họp video thời gian thực, kết nối Laravel với Janus WebRTC Server và Jitsi.',
      en: 'Designed and built the real-time video conferencing backend bridging Laravel with Janus WebRTC Server and Jitsi.',
    },
    highlights: {
      vi: [
        'Sử dụng Laravel Queues (Redis) để xử lý bất đồng bộ các sự kiện gửi về từ Janus, giúp ứng dụng giữ được sự ổn định khi có nhiều phòng hoạt động cùng lúc.',
        'Thiết kế cấu trúc lưu trữ trên MongoDB cho lịch sử phiên họp, đồng thời chuyển đổi dữ liệu sự kiện từ Janus sang định dạng metadata tương thích với Jitsi.',
        'Thiết lập Laravel Task Scheduling để định kỳ dọn dẹp các phiên Janus đã hết hạn và dữ liệu phòng họp tạm thời.',
      ],
      en: [
        'Leveraged Laravel Queues (Redis) to asynchronously process high-frequency room events from Janus without blocking application workers.',
        'Designed MongoDB schemas for session history and transformed Janus event payloads into Jitsi-compatible occupant metadata.',
        'Configured Laravel Task Scheduling to automatically prune expired Janus sessions and temporary room records.',
      ],
    },
    pipeline: [
      'Janus WebRTC Event Webhook',
      'Laravel API Producer',
      'Redis Queue Workers',
      'Payload Mapper (Janus → Jitsi Metadata)',
      'MongoDB Session Store',
      'Scheduled Cleanup Cron',
    ],
    archNote: {
      vi: 'Đưa toàn bộ sự kiện phòng họp từ Janus vào Redis Queue để xử lý bất đồng bộ, đồng bộ trạng thái người tham gia sang Jitsi và tự động dọn phiên hết hạn bằng Laravel Scheduler.',
      en: 'Queued intensive Janus room callbacks through Redis workers, mapped participant state to Jitsi metadata, and automated stale session cleanup.',
    },
    technologies: ['Laravel', 'Janus WebRTC', 'Jitsi', 'MongoDB', 'Redis', 'WebSocket'],
  },
];

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
      'SonarQube',
      'JWT / Firebase JWT',
      'Agile / Scrum',
    ],
  ],
];

const impactCards: Record<Lang, Array<{ index: string; metric: string; title: string; desc: string }>> = {
  vi: [
    {
      index: '01',
      metric: 'Realtime & Omnichat',
      title: 'Tối ưu luồng tin nhắn và kết nối thời gian thực',
      desc: 'Làm việc thường xuyên với WebSocket, Redis, Beanstalkd và MongoDB để giữ độ trễ thấp khi lưu lượng tin nhắn tăng cao.',
    },
    {
      index: '02',
      metric: 'Code Quality & Security',
      title: 'Chú trọng chất lượng code và an toàn dữ liệu',
      desc: 'Rà soát SonarQube, giảm 85% code smells, xử lý triệt để các lỗi XSS và viết unit test cho các luồng nghiệp vụ quan trọng.',
    },
    {
      index: '03',
      metric: 'WebRTC & Media',
      title: 'Kinh nghiệm thực tế với gọi video và signaling',
      desc: 'Xây dựng tính năng gọi video qua WebRTC, custom signaling server và đồng bộ trạng thái phòng họp giữa Janus với Jitsi.',
    },
    {
      index: '04',
      metric: 'Delivery & Teamwork',
      title: 'Triển khai thực tế và đồng hành cùng đội ngũ',
      desc: 'Tích hợp hệ thống onsite với khách hàng, theo dõi chi phí hạ tầng AWS và hỗ trợ điều phối sprint, hướng dẫn thành viên mới.',
    },
  ],
  en: [
    {
      index: '01',
      metric: 'Realtime & Omnichat',
      title: 'High-throughput messaging & real-time pipelines',
      desc: 'Hands-on optimization with WebSocket, Redis, Beanstalkd, and MongoDB to maintain low latency during peak traffic.',
    },
    {
      index: '02',
      metric: 'Code Quality & Security',
      title: 'Clean, maintainable code & security hardening',
      desc: 'Remediated SonarQube warnings (-85% code smells), eliminated XSS vulnerabilities, and expanded PHPUnit test coverage.',
    },
    {
      index: '03',
      metric: 'WebRTC & Media',
      title: 'Production WebRTC video calling & signaling',
      desc: 'Engineered custom WebRTC signaling servers for banking video calls and synchronized room state across Janus and Jitsi.',
    },
    {
      index: '04',
      metric: 'Delivery & Teamwork',
      title: 'Onsite enterprise delivery & Scrum facilitation',
      desc: 'Delivered onsite integrations for enterprise clients, optimized AWS cloud costs, facilitated sprints, and mentored teammates.',
    },
  ],
};

const faqItems: Record<Lang, Array<{ question: string; answer: string }>> = {
  vi: [
    {
      question: 'Nguyễn Ngọc Tâm (Ngọc Tâm) hiện đang làm công việc gì?',
      answer:
        'Mình là Nguyễn Ngọc Tâm (thường gọi là Ngọc Tâm hoặc Ngọc Tâm Dev), hiện đang làm Full-stack Developer tại South Telecom ở TP. Hồ Chí Minh từ tháng 07/2022. Công việc chính của mình là phát triển backend/API, tích hợp client, xây dựng các hệ thống giao tiếp thời gian thực (WebSocket, WebRTC) và tích hợp CRM.',
    },
    {
      question: 'Những dự án thực tế nổi bật mà Nguyễn Ngọc Tâm đã tham gia là gì?',
      answer:
        'Tại South Telecom, mình trực tiếp tham gia phát triển nền tảng Omnichannel Worldfone4X (tích hợp Salesforce, HubSpot, Zalo, WhatsApp, LINE, LiveChat), dự án Shinhan Life (tối ưu SonarQube giảm 85% code smells, xử lý lỗi bảo mật XSS và triển khai onsite), module gọi video WebRTC cho ngân hàng PVcomBank, và hệ thống phòng họp trực tuyến kết nối Laravel với Janus WebRTC Server và Jitsi.',
    },
    {
      question: 'Thế mạnh công nghệ của Ngọc Tâm gồm những mảng nào?',
      answer:
        'Mình làm việc sâu với PHP (Laravel, CodeIgniter), JavaScript/TypeScript (React, Node.js, Kendo UI), cơ sở dữ liệu MongoDB, PostgreSQL, SQL Server, hàng đợi Redis và Beanstalkd, cùng các công nghệ thời gian thực như WebSocket, WebRTC, Janus và Jitsi trên hạ tầng Linux, Docker, Kubernetes và AWS.',
    },
    {
      question: 'Làm sao để liên hệ trực tiếp với Nguyễn Ngọc Tâm khi có cơ hội hợp tác?',
      answer:
        'Bạn có thể gọi hoặc nhắn Zalo cho mình qua số 0824608716, gửi email đến nguyenngoctam1609@gmail.com, hoặc kết nối qua LinkedIn (linkedin.com/in/ngoctam1609) và GitHub (github.com/ngoctam169).',
    },
  ],
  en: [
    {
      question: 'Who is Nguyễn Ngọc Tâm (Ngọc Tâm) and what is his current role?',
      answer:
        'I am Nguyễn Ngọc Tâm (Ngọc Tâm), a Full-stack Developer at South Telecom in Ho Chi Minh City since July 2022. I focus on backend/API architecture, frontend client integration, real-time communication systems (WebSocket, WebRTC), and enterprise CRM integrations.',
    },
    {
      question: 'What are the key production projects Nguyễn Ngọc Tâm has built?',
      answer:
        'At South Telecom, I have contributed to the Worldfone4X Omnichannel platform (integrating Salesforce, HubSpot, Zalo, WhatsApp, LINE, LiveChat), Shinhan Life (reducing SonarQube code smells by 85%, fixing XSS vulnerabilities, and delivering onsite integration), PVcomBank (standalone WebRTC video call & chat module), and the Video Room Integration System connecting Laravel with Janus WebRTC Server and Jitsi.',
    },
    {
      question: 'What is Nguyễn Ngọc Tâm’s core technical stack?',
      answer:
        'My day-to-day stack includes PHP (Laravel, CodeIgniter), JavaScript/TypeScript (React, Node.js, Kendo UI), MongoDB, PostgreSQL, SQL Server, Redis, and Beanstalkd, alongside WebSocket, WebRTC, Janus, and Jitsi running on Linux, Docker, Kubernetes, and AWS.',
    },
    {
      question: 'How can recruiters or engineering teams contact Nguyễn Ngọc Tâm?',
      answer:
        'You can reach me directly via phone/Zalo at +84 824 608 716 (0824608716), email at nguyenngoctam1609@gmail.com, LinkedIn (linkedin.com/in/ngoctam1609), or GitHub (github.com/ngoctam169).',
    },
  ],
};

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('lang') === 'en') return 'en';
    }
    return 'vi';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mascotIndex, setMascotIndex] = useState<number>(0);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    const next: Lang = lang === 'vi' ? 'en' : 'vi';
    setLang(next);
    const url = new URL(window.location.href);
    if (next === 'en') {
      url.searchParams.set('lang', 'en');
    } else {
      url.searchParams.delete('lang');
    }
    window.history.replaceState(null, '', url.toString());
  };

  const scrollToSection = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (sectionId) {
      window.history.pushState(null, '', `#${sectionId}`);
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', './');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentMascot = MASCOT_STYLES[mascotIndex] || MASCOT_STYLES[0];
  const cycleMascot = () => {
    setMascotIndex((prev) => (prev + 1) % MASCOT_STYLES.length);
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Bỏ qua menu
      </a>

      <header className="site-header stable-header editorial-global-header">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection();
          }}
          className="brand editorial-wordmark"
          aria-label="Nguyễn Ngọc Tâm - Portfolio"
        >
          <span>Nguyễn Ngọc Tâm</span>
        </a>

        <nav className="desktop-nav simplified-desktop-nav" aria-label="Điều hướng chính">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
          >
            Projects
          </a>
          <a
            href="#impact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('impact');
            }}
          >
            Highlights
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('experience');
            }}
          >
            Experience
          </a>
          <a
            href="#stack"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('stack');
            }}
          >
            Stack
          </a>
          <a
            href="#education"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('education');
            }}
          >
            Education
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Contact
          </a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn lang-btn"
            onClick={toggleLang}
            aria-label="Chuyển đổi ngôn ngữ Tiếng Việt / English"
            title={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
          >
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>
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
              href="./NGUYEN_NGOC_TAM_CV.pdf"
              download="NGUYEN_NGOC_TAM_CV.pdf"
              className="btn small header-start-learning"
            >
              {lang === 'vi' ? 'Tải CV PDF' : 'Download CV'}
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
                  scrollToSection('projects');
                }}
              >
                Dự án tiêu biểu
              </a>
              <a
                href="#impact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('impact');
                }}
              >
                Điểm nhấn công việc
              </a>
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('experience');
                }}
              >
                Kinh nghiệm làm việc
              </a>
              <a
                href="#stack"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('stack');
                }}
              >
                Công nghệ sử dụng
              </a>
            </div>
          </section>
          <section>
            <strong>Liên hệ &amp; CV</strong>
            <div>
              <a href="./NGUYEN_NGOC_TAM_CV.pdf" download>
                Tải CV PDF
              </a>
              <a href={`mailto:${AUTHOR.email}`}>Gửi Email</a>
              <a href="tel:0824608716">Gọi 0824608716</a>
            </div>
          </section>
        </nav>
      )}

      <main id="main-content" className="page" tabIndex={-1}>
        <article
          className="inner-page section-shell about-author cvp-page cvp-page-v5"
          itemScope
          itemType="https://schema.org/Person"
        >
          <header className="cvp5-hero">
            <div className="cvp5-kicker">
              <span>Portfolio · Nguyễn Ngọc Tâm (Ngọc Tâm)</span>
              <span>Ho Chi Minh City, Vietnam</span>
            </div>

            <h1>
              <span itemProp="name">Nguyễn Ngọc Tâm</span>
              <strong itemProp="jobTitle">Full-stack Developer</strong>
            </h1>

            {lang === 'vi' ? (
              <p className="cvp5-lead" itemProp="description">
                Mình là <strong>Nguyễn Ngọc Tâm</strong> (Ngọc Tâm), Full-stack Developer làm việc tại{' '}
                <strong itemProp="worksFor">South Telecom</strong> (TP. Hồ Chí Minh) từ năm 2022. Công việc hằng ngày
                của mình xoay quanh việc phát triển và tối ưu các hệ thống web, nền tảng giao tiếp thời gian thực
                (WebSocket, WebRTC, Janus, Jitsi), tích hợp CRM (Salesforce, HubSpot) cùng các kênh nhắn tin Zalo,
                WhatsApp, LINE và LiveChat trong môi trường production.
              </p>
            ) : (
              <p className="cvp5-lead" itemProp="description">
                I am <strong>Nguyễn Ngọc Tâm</strong> (Ngọc Tâm), a Full-stack Developer at{' '}
                <strong itemProp="worksFor">South Telecom</strong> in Ho Chi Minh City since 2022. My day-to-day work
                focuses on building and optimizing production web applications, real-time communication systems
                (WebSocket, WebRTC, Janus, Jitsi), CRM integrations (Salesforce, HubSpot), and omnichannel messaging
                pipelines across Zalo, WhatsApp, LINE, and LiveChat.
              </p>
            )}

            <div className="cvp5-actions">
              <a
                className="btn large"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
              >
                {lang === 'vi' ? 'Xem dự án' : 'View Projects'} <ArrowRight />
              </a>
              <a className="btn secondary large" href={`mailto:${AUTHOR.email}`} itemProp="email">
                <Mail /> {lang === 'vi' ? 'Liên hệ' : 'Contact Me'}
              </a>
              <a
                className="btn secondary large"
                href="./NGUYEN_NGOC_TAM_CV.pdf"
                download="NGUYEN_NGOC_TAM_CV.pdf"
              >
                <Download /> {lang === 'vi' ? 'Tải CV PDF' : 'Download CV'}
              </a>
              <a
                className="cvp5-text-link"
                href={AUTHOR.sameAs[1]}
                target="_blank"
                rel="me noopener noreferrer"
                itemProp="sameAs"
              >
                GitHub <ExternalLink />
              </a>
              <a
                className="cvp5-text-link"
                href={AUTHOR.sameAs[0]}
                target="_blank"
                rel="me noopener noreferrer"
                itemProp="sameAs"
              >
                LinkedIn <ExternalLink />
              </a>
            </div>

            <div className="cvp5-facts" aria-label="Thông tin nhanh">
              <div>
                <span>Current</span>
                <strong>South Telecom</strong>
              </div>
              <div>
                <span>Role</span>
                <strong>Full-stack Developer</strong>
              </div>
              <div>
                <span>Experience</span>
                <strong>07/2022 — Present</strong>
              </div>
              <div>
                <span>Location</span>
                <strong itemProp="address">
                  <MapPin /> Ho Chi Minh City
                </strong>
              </div>
            </div>
          </header>

          <nav className="cvp5-nav" aria-label="Đi nhanh trong hồ sơ">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
            >
              Projects
            </a>
            <a
              href="#impact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('impact');
              }}
            >
              Highlights
            </a>
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('experience');
              }}
            >
              Experience
            </a>
            <a
              href="#stack"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('stack');
              }}
            >
              Stack
            </a>
            <a
              href="#education"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('education');
              }}
            >
              Education
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('faq');
              }}
            >
              Q&amp;A
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              Contact
            </a>
          </nav>

          {/* SECTION 1: SELECTED WORK / PROJECTS */}
          <section className="cvp5-section" id="projects" aria-labelledby="projects-title">
            <div className="cvp5-section-head">
              <span>Selected work</span>
              <h2 id="projects-title">{lang === 'vi' ? 'Dự án đã tham gia' : 'Selected Production Projects'}</h2>
              <p>
                {lang === 'vi'
                  ? 'Những dự án thực tế mình trực tiếp tham gia phát triển backend, giao tiếp thời gian thực, tích hợp hệ thống và tối ưu vận hành trên môi trường production.'
                  : 'Enterprise and real-time communication systems where I directly contributed to backend architecture, third-party integrations, and production optimization.'}
              </p>
            </div>

            <div className="cvp5-project-list">
              {PROJECTS.map((project, index) => (
                <article className="cvp5-project" key={project.name}>
                  <div className="cvp5-project-title">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <small>{project.label[lang]}</small>
                    <h3>{project.name}</h3>
                  </div>

                  <div className="cvp5-project-body">
                    <p>{project.intro[lang]}</p>

                    <ul>
                      {project.highlights[lang].map((item) => (
                        <li key={item}>
                          <Check />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <details className="cvp5-arch-flow">
                      <summary>
                        {lang === 'vi'
                          ? 'Sơ đồ luồng xử lý thực tế (Architecture Flow)'
                          : 'System Architecture & Data Flow'}
                      </summary>
                      <div className="cvp5-arch-body">
                        <div className="cvp5-arch-pipeline">
                          {project.pipeline.map((step, sIdx) => (
                            <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <span className="cvp5-arch-node">{step}</span>
                              {sIdx < project.pipeline.length - 1 && <span className="cvp5-arch-arrow">→</span>}
                            </span>
                          ))}
                        </div>
                        <p className="cvp5-arch-note">{project.archNote[lang]}</p>
                      </div>
                    </details>

                    <div className="cvp5-tags">
                      {project.technologies.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION 2: HIGHLIGHTS */}
          <section className="cvp5-section" id="impact" aria-labelledby="impact-title">
            <div className="cvp5-section-head cvp5-section-head-split">
              <div>
                <span>Key highlights</span>
                <h2 id="impact-title">{lang === 'vi' ? 'Điểm nhấn trong công việc' : 'Engineering Highlights'}</h2>
              </div>
              <p>
                {lang === 'vi'
                  ? 'Những mảng công việc mình thường xuyên đảm nhận và giải quyết trong dự án.'
                  : 'Core areas I regularly own and deliver across production projects.'}
              </p>
            </div>

            <div className="cvp-strength-grid">
              {impactCards[lang].map((card) => (
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
              <h2 id="experience-title">{lang === 'vi' ? 'Kinh nghiệm làm việc' : 'Work Experience'}</h2>
            </div>

            <div className="cvp5-experience">
              <article>
                <div className="cvp5-experience-side">
                  <span>07/2022 — Present</span>
                  <small>Ho Chi Minh City</small>
                </div>
                <div>
                  <p className="cvp5-company">South Telecom</p>
                  <h3>Full-stack Developer</h3>
                  <p>
                    {lang === 'vi'
                      ? 'Tham gia phát triển các dòng sản phẩm chính của công ty, tích hợp với các nền tảng CRM (Salesforce, HubSpot) và xây dựng luồng giao tiếp thời gian thực cho cả thoại lẫn tin nhắn (Zalo, WhatsApp, LiveChat, LINE, WebRTC). Bên cạnh việc xử lý các vấn đề kỹ thuật trên production và theo dõi tối ưu chi phí hạ tầng AWS, mình cũng đảm nhận vai trò Scrum Host hỗ trợ điều phối sprint và hướng dẫn các thành viên mới trong nhóm.'
                      : 'Develop core high-performance product lines, integrate enterprise CRM platforms (Salesforce, HubSpot), and build real-time communication channels for voice and messaging (Zalo, WhatsApp, LiveChat, LINE, WebRTC). Handle production troubleshooting, estimate and optimize AWS cloud costs, facilitate sprints as Scrum Host, and mentor new developers.'}
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
                    {lang === 'vi'
                      ? 'Phối hợp cùng các bạn front-end và thành viên trong team để xây dựng các API backend rõ ràng, dễ kết nối, tối ưu trải nghiệm người dùng và cập nhật tiến độ công việc hằng ngày với quản lý dự án.'
                      : 'Collaborated with front-end developers and team members to design cohesive backend code, improve user experience, and deliver daily project progress reports to management.'}
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
                <h2 id="stack-title">{lang === 'vi' ? 'Công nghệ đã sử dụng' : 'Technical Stack'}</h2>
              </div>
              <p>
                {lang === 'vi'
                  ? 'Các ngôn ngữ, cơ sở dữ liệu và công cụ mình sử dụng trực tiếp trong quá trình làm việc.'
                  : 'Languages, databases, and infrastructure tools I work with in production.'}
              </p>
            </div>

            <div className="cvp5-stack">
              {skillGroups.map(([group, items]) => (
                <article key={group}>
                  <h3>{group}</h3>
                  <div>
                    {items.map((item) => (
                      <span key={item} itemProp="knowsAbout">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION 5: EDUCATION & WORKING APPROACH */}
          <section className="cvp5-section cvp5-meta-grid" id="education">
            <article className="cvp5-meta-card">
              <GraduationCap />
              <div>
                <span>Education</span>
                <h2 itemProp="alumniOf">Industrial University of Ho Chi Minh City</h2>
                <p>Information Technology · 09/2019 — 02/2022</p>
              </div>
            </article>

            <article className="cvp5-meta-card">
              <Code2 />
              <div>
                <span>How I work</span>
                <h2>{lang === 'vi' ? 'Cách mình tiếp cận công việc' : 'How I Approach Engineering'}</h2>
                <p>
                  {lang === 'vi'
                    ? 'Mình ưu tiên tìm hiểu kỹ nguyên nhân gốc rễ khi xử lý lỗi trên production, viết code rõ ràng để đồng nghiệp dễ đọc và dễ bảo trì, đồng thời phối hợp sát với team nghiệp vụ khi triển khai tích hợp cho khách hàng.'
                    : 'I prioritize root-cause analysis when debugging production issues, write clean and maintainable code for teammates, and collaborate closely with business and IT teams during onsite integrations.'}
                </p>
              </div>
            </article>
          </section>

          {/* SECTION 6: FAQ FOR GOOGLE AI OVERVIEW & RECRUITERS */}
          <section className="cvp5-section" id="faq" aria-labelledby="faq-title">
            <div className="cvp5-section-head">
              <span>Quick facts</span>
              <h2 id="faq-title">
                {lang === 'vi' ? 'Thông tin tóm tắt về Nguyễn Ngọc Tâm' : 'Quick Facts about Nguyễn Ngọc Tâm'}
              </h2>
            </div>

            <div className="faq-list">
              {faqItems[lang].map((item, idx) => (
                <details key={item.question} open={idx === 0}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* SECTION 7: CONTACT */}
          <section className="cvp5-contact" id="contact" aria-labelledby="contact-title">
            <div>
              <span>Contact</span>
              <h2 id="contact-title">Nguyễn Ngọc Tâm · Full-stack Developer</h2>
              <p>
                {lang === 'vi' ? (
                  <>
                    Bạn có thể liên hệ trực tiếp với mình qua số điện thoại{' '}
                    <strong itemProp="telephone">0824608716</strong>, email <strong>{AUTHOR.email}</strong> hoặc
                    LinkedIn để trao đổi thêm về công việc và dự án.
                  </>
                ) : (
                  <>
                    Feel free to reach out directly via phone/Zalo at{' '}
                    <strong itemProp="telephone">+84 824 608 716</strong>, email at <strong>{AUTHOR.email}</strong>, or
                    LinkedIn to discuss engineering roles and projects.
                  </>
                )}
              </p>
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
      </main>

      {/* Corner Page Mascot (nilbuild/page-mascot) */}
      <aside className="corner-mascot-dock" aria-label="Interactive corner mascot">
        <div className="corner-mascot-frame" title="Di chuột để mascot nhìn theo · Click để tương tác">
          <Mascot
            key={currentMascot.id}
            {...mascotSheets(currentMascot.id)}
            label={currentMascot.name}
            size={84}
          />
        </div>
        <button
          type="button"
          className="corner-mascot-switch"
          onClick={cycleMascot}
          title="Đổi nhân vật mascot"
        >
          {currentMascot.name} ↻
        </button>
      </aside>

      <footer className="footer editorial-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a
              className="brand editorial-wordmark"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection();
              }}
            >
              Nguyễn Ngọc Tâm
            </a>
            <p>Full-stack Developer · Realtime Systems · WebRTC &amp; Omnichannel</p>
            <small>
              Portfolio cá nhân của Nguyễn Ngọc Tâm (Ngọc Tâm) — Full-stack Developer tại TP. Hồ Chí Minh.
            </small>
          </div>

          <nav className="editorial-footer-nav" aria-label="Liên kết cuối trang">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
            >
              Projects
            </a>
            <a
              href="#impact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('impact');
              }}
            >
              Highlights
            </a>
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('experience');
              }}
            >
              Experience
            </a>
            <a
              href="#stack"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('stack');
              }}
            >
              Technical Stack
            </a>
            <a href="./NGUYEN_NGOC_TAM_CV.pdf" download>
              CV PDF
            </a>
            <a href={`mailto:${AUTHOR.email}`}>Contact</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <small>© 2026 Nguyễn Ngọc Tâm · Full-stack Developer · Ho Chi Minh City, Vietnam</small>
          <div>
            <a href={AUTHOR.sameAs[0]} target="_blank" rel="me noopener noreferrer">
              LinkedIn
            </a>
            <a href={AUTHOR.sameAs[1]} target="_blank" rel="me noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
