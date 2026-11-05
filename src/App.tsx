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
      'Mình tham gia phát triển và tối ưu Worldfone4X — nền tảng Omnichannel Contact Center kết nối thoại, các kênh nhắn tin và CRM trong môi trường production.',
    highlights: [
      'Tích hợp với Salesforce, HubSpot và xử lý luồng giao tiếp realtime qua Zalo, WhatsApp, LiveChat, LINE cùng các dịch vụ OTT.',
      'Tối ưu các module chịu tải cao trong phần Omnichat (Beanstalkd, Redis, WebSocket, MongoDB) để tăng lượng tin nhắn xử lý được và giảm độ trễ vào khung giờ cao điểm.',
      'Phối hợp cùng team xử lý các vấn đề phát sinh trên môi trường thực tế, tham gia điều phối sprint và hỗ trợ các thành viên mới nắm bắt hệ thống.',
    ],
  },
  'Shinhan Life': {
    label: 'Enterprise delivery & security · Team size 2',
    intro:
      'Mình tham gia dự án Shinhan Life, tập trung vào việc cải thiện chất lượng mã nguồn, xử lý các vấn đề bảo mật ứng dụng và triển khai tích hợp onsite.',
    highlights: [
      'Rà soát và xử lý các cảnh báo trên SonarQube, giảm khoảng 85% code smells để mã nguồn sạch, dễ đọc và dễ bảo trì hơn.',
      'Khắc phục các lỗ hổng Cross-site Scripting (XSS) và viết thêm unit tests (PHPUnit) cho những hàm nghiệp vụ quan trọng.',
      'Làm việc trực tiếp cùng đội ngũ IT và nghiệp vụ phía khách hàng để triển khai onsite và đồng bộ dữ liệu ổn định với hệ thống internal APIs.',
    ],
  },
  PVcomBank: {
    label: 'Banking communication & WebRTC · Team size 3',
    intro:
      'Mình phát triển module giao tiếp thời gian thực cho PVcomBank, bao gồm tính năng gọi video và luồng gửi nhận tin nhắn.',
    highlights: [
      'Xây dựng tính năng video call bằng WebRTC kết hợp với custom signaling server phù hợp với yêu cầu bảo mật của môi trường ngân hàng.',
      'Tối ưu tốc độ gửi nhận tin nhắn, luồng định tuyến chat, xử lý kết nối WebSocket, cân bằng tải và tuần tự hóa dữ liệu.',
      'Kết nối với các internal APIs của PVcomBank để xác thực thông tin khách hàng và quản lý phiên làm việc.',
    ],
  },
  'Video Room Integration System': {
    label: 'Realtime media architecture · Team size 2',
    intro:
      'Mình phụ trách phần backend cho hệ thống phòng họp video thời gian thực, kết nối Laravel với Janus WebRTC Server và Jitsi.',
    highlights: [
      'Sử dụng Laravel Queues (Redis) để xử lý bất đồng bộ các sự kiện gửi về từ Janus, giúp ứng dụng giữ được sự ổn định khi có nhiều phòng hoạt động cùng lúc.',
      'Thiết kế cấu trúc lưu trữ trên MongoDB cho lịch sử phiên họp, đồng thời chuyển đổi dữ liệu sự kiện từ Janus sang định dạng metadata tương thích với Jitsi.',
      'Thiết lập Laravel Task Scheduling để định kỳ dọn dẹp các phiên Janus đã hết hạn và dữ liệu phòng họp tạm thời.',
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

const impactCards = [
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
];

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mascotIndex, setMascotIndex] = useState<number>(0);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

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
        <article className="inner-page section-shell about-author cvp-page cvp-page-v5">
          <header className="cvp5-hero">
            <div className="cvp5-kicker">
              <span>Portfolio · Nguyễn Ngọc Tâm</span>
              <span>Ho Chi Minh City, Vietnam</span>
            </div>

            <h1>
              <span>Nguyễn Ngọc Tâm</span>
              <strong>Full-stack Developer</strong>
            </h1>

            <p className="cvp5-lead">
              Mình là Full-stack Developer làm việc tại TP. Hồ Chí Minh từ năm 2022. Công việc hằng ngày của mình xoay
              quanh việc phát triển và tối ưu các hệ thống web, nền tảng giao tiếp thời gian thực (WebSocket, WebRTC,
              Janus, Jitsi), tích hợp CRM (Salesforce, HubSpot) cùng các kênh nhắn tin Zalo, WhatsApp, LINE và LiveChat
              trong môi trường production.
            </p>

            <div className="cvp5-actions">
              <a
                className="btn large"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
              >
                Xem dự án <ArrowRight />
              </a>
              <a className="btn secondary large" href={`mailto:${AUTHOR.email}`}>
                <Mail /> Liên hệ
              </a>
              <a
                className="btn secondary large"
                href="./NGUYEN_NGOC_TAM_CV.pdf"
                download="NGUYEN_NGOC_TAM_CV.pdf"
              >
                <Download /> Tải CV PDF
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
                <strong>
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
              <h2 id="projects-title">Dự án đã tham gia</h2>
              <p>
                Những dự án thực tế mình trực tiếp tham gia phát triển backend, giao tiếp thời gian thực, tích hợp hệ
                thống và tối ưu vận hành trên môi trường production.
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

          {/* SECTION 2: HIGHLIGHTS */}
          <section className="cvp5-section" id="impact" aria-labelledby="impact-title">
            <div className="cvp5-section-head cvp5-section-head-split">
              <div>
                <span>Key highlights</span>
                <h2 id="impact-title">Điểm nhấn trong công việc</h2>
              </div>
              <p>Những mảng công việc mình thường xuyên đảm nhận và giải quyết trong dự án.</p>
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
                  <h3>Full-stack Developer</h3>
                  <p>
                    Tham gia phát triển các dòng sản phẩm chính của công ty, tích hợp với các nền tảng CRM
                    (Salesforce, HubSpot) và xây dựng luồng giao tiếp thời gian thực cho cả thoại lẫn tin nhắn (Zalo,
                    WhatsApp, LiveChat, LINE, WebRTC). Bên cạnh việc xử lý các vấn đề kỹ thuật trên production và theo
                    dõi tối ưu chi phí hạ tầng AWS, mình cũng đảm nhận vai trò Scrum Host hỗ trợ điều phối sprint và
                    hướng dẫn các thành viên mới trong nhóm.
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
                    Phối hợp cùng các bạn front-end và thành viên trong team để xây dựng các API backend rõ ràng, dễ
                    kết nối, tối ưu trải nghiệm người dùng và cập nhật tiến độ công việc hằng ngày với quản lý dự án.
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
              <p>Các ngôn ngữ, cơ sở dữ liệu và công cụ mình sử dụng trực tiếp trong quá trình làm việc.</p>
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

          {/* SECTION 5: EDUCATION & WORKING APPROACH */}
          <section className="cvp5-section cvp5-meta-grid" id="education">
            <article className="cvp5-meta-card">
              <GraduationCap />
              <div>
                <span>Education</span>
                <h2>Industrial University of Ho Chi Minh City</h2>
                <p>Information Technology · 09/2019 — 02/2022</p>
              </div>
            </article>

            <article className="cvp5-meta-card">
              <Code2 />
              <div>
                <span>How I work</span>
                <h2>Cách mình tiếp cận công việc</h2>
                <p>
                  Mình ưu tiên tìm hiểu kỹ nguyên nhân gốc rễ khi xử lý lỗi trên production, viết code rõ ràng để đồng
                  nghiệp dễ đọc và dễ bảo trì, đồng thời phối hợp sát với team nghiệp vụ khi triển khai tích hợp cho
                  khách hàng.
                </p>
              </div>
            </article>
          </section>

          {/* SECTION 6: CONTACT */}
          <section className="cvp5-contact" id="contact" aria-labelledby="contact-title">
            <div>
              <span>Contact</span>
              <h2 id="contact-title">Nguyễn Ngọc Tâm · Full-stack Developer</h2>
              <p>
                Bạn có thể liên hệ trực tiếp với mình qua số điện thoại <strong>0824608716</strong>, email{' '}
                <strong>{AUTHOR.email}</strong> hoặc LinkedIn để trao đổi thêm về công việc và dự án.
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
              Portfolio cá nhân của Nguyễn Ngọc Tâm — Full-stack Developer tại TP. Hồ Chí Minh.
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
            <a href={AUTHOR.sameAs[0]} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={AUTHOR.sameAs[1]} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}