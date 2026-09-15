import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

type Project = {
  title: string
  kind: string
  description: string
  tags: string[]
  featured?: boolean
  href?: string
}

const projects: Project[] = [
  {
    title: 'Personal Gemini Journal',
    kind: 'AI / Product',
    description:
      'A privacy-focused journaling product exploring secure personal data, AI-assisted reflection, and a calm writing experience.',
    tags: ['React', 'Firebase', 'Gemini'],
    featured: true,
    href:'https://github.com/Arjun-patil-631/1M1B-AI-for-Sustainability-Virtual-Internship'
  },
  {
    title: 'Car Rental Management System',
    kind: 'Database',
    description:
      'A relational database project designed around vehicles, categories, customers, rentals, and real-world SQL workflows.',
    tags: ['MySQL', 'SQL', 'DBMS'],

  },
  {
    title: 'DSA Daily',
    kind: 'Learning / DSA',
    description:
      'A public coding trail built around consistency, problem solving, and learning by solving problems regularly.',
    tags: ['Python', 'DSA', 'LeetCode'],
    href: 'https://github.com/Arjun-patil-631/dsa-daily',
  },
]

const skills = [
  { icon: '</>', title: 'Languages', items: ['C', 'Java', 'Python', 'JavaScript', 'SQL'] },
  { icon: '⌘', title: 'Development', items: ['HTML', 'CSS', 'React', 'Firebase'] },
  { icon: '◌', title: 'AI / Data', items: ['AI / ML', 'Data Science', 'Python'] },
  { icon: '↗', title: 'Tools', items: ['Git', 'GitHub', 'VS Code'] },
]

const journey = [
  { marker: '01', label: 'FOUNDATIONS', title: 'Started the B.Tech journey', body: 'Learning the fundamentals of programming, computer science, and AI/ML.' },
  { marker: '02', label: 'CONSISTENCY', title: 'Built a DSA habit', body: 'Turned problem solving into a repeatable practice instead of a one-time goal.' },
  { marker: '03', label: 'EXPERIENCE', title: 'Explored AI/ML in practice', body: 'Worked through internship and workshop experiences while continuing to build.' },
  { marker: '04', label: 'BUILDING', title: 'Turning ideas into products', body: 'Projects are getting bigger, more practical, and closer to things people could actually use.' },
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}

function Wave({ dark = false }: { dark?: boolean }) {
  return (
    <svg className={`wave ${dark ? 'wave-dark' : ''}`} viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 68 C130 18 245 108 395 55 S660 16 815 63 S1045 111 1200 44" />
      <path className="wave-secondary" d="M0 82 C130 34 250 115 405 69 S675 32 830 73 S1055 117 1200 59" />
      <path className="wave-tertiary" d="M0 91 C150 51 250 121 420 80 S680 45 850 83 S1050 122 1200 72" />
    </svg>
  )
}

function App() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const terminalLines = useMemo(
    () => [
      '$ whoami',
      '> curious developer',
      '$ focus',
      '> AI · code · building',
      '$ status',
      '> still becoming better...',
    ],
    [],
  )

  useEffect(() => {
    let char = 0
    let deleting = false
    let timer: number
    const text = 'still building.'

    const tick = () => {
      const next = deleting ? text.slice(0, char - 1) : text.slice(0, char + 1)
      setTyped(next)
      char += deleting ? -1 : 1
      if (!deleting && char === text.length) {
        deleting = true
        timer = window.setTimeout(tick, 1500)
        return
      }
      if (deleting && char === 0) {
        deleting = false
        timer = window.setTimeout(tick, 500)
        return
      }
      timer = window.setTimeout(tick, deleting ? 70 : 105)
    }
    timer = window.setTimeout(tick, 650)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const sections = ['home', 'about', 'works', 'journey', 'skills', 'next', 'contact']
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const current = sections.reduce(
        (best, id) => {
          const el = document.getElementById(id)
          if (!el) return best
          const distance = Math.abs(el.getBoundingClientRect().top - 110)
          return distance < best.distance ? { id, distance } : best
        },
        { id: 'home', distance: Number.POSITIVE_INFINITY },
      )
      setActive(current.id)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => window.removeEventListener('pointermove', onPointer)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <>
      <div className="paper-grain" aria-hidden="true" />
      <div className="cursor-glow" style={{ transform: `translate(${mouse.x * 34}px, ${mouse.y * 22}px)` }} aria-hidden="true" />

      <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="nav container">
          <button className="brand" onClick={() => go('home')} aria-label="Go to home">AP</button>
          <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle navigation" aria-expanded={menuOpen}>☰</button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {['home', 'about', 'works', 'journey', 'skills', 'next', 'contact'].map((id) => (
              <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>
                {id === 'next' ? "What's Next" : id[0].toUpperCase() + id.slice(1)}
              </button>
            ))}
            <button className="resume" onClick={() => window.open('https://drive.google.com/file/d/1LRicABtRiwHcDJPXchtFb9R44cmVSocR/view?usp=sharing','_blank')}>Resume <span>↗</span></button>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section container">
          <div className="hero-grid dot-grid" aria-hidden="true" />
          <div className="hero-ring ring-a" aria-hidden="true" />
          <div className="hero-ring ring-b" aria-hidden="true" />
          <div className="signature">Arjun Patil</div>
          <div className="hero-copy">
            <Reveal>
              <div className="eyebrow"><span className="pulse-dot" /> Hey, I’m</div>
              <h1>Arjun <span>Patil</span></h1>
              <p className="role">AI/ML Student <i>·</i> Developer <i>·</i> Builder</p>
              <p className="hero-text">I enjoy figuring out how things work, solving problems through code, and turning ideas into things people can actually use.</p>
              <div className="hero-actions">
                <button className="btn primary" onClick={() => go('works')}>View My Work <span>→</span></button>
                <a className="btn ghost" href="https://github.com/Arjun-patil-631" target="_blank" rel="noreferrer">GitHub ↗</a>
              </div>
              <div className="hero-note">Build. Learn. <span>{typed}<b className="type-cursor">|</b></span></div>
            </Reveal>
          </div>

          <Reveal className="hero-visual" delay={160}>
            <div className="visual-caption caption-one">turning ideas into impact →</div>
            <div className="visual-caption caption-two">keep going</div>
            <div className="terminal">
              <div className="terminal-top"><div className="traffic"><span /><span /><span /></div><b>~/arjun</b><small>portfolio.log</small></div>
              <div className="terminal-body">
                {terminalLines.map((line, i) => <p key={`${line}-${i}`} className={line.startsWith('>') ? 'terminal-muted' : line.includes('status') || line.includes('focus') ? 'terminal-green' : ''}>{line}</p>)}
                <span className="cursor-block" />
              </div>
            </div>
            <div className="code-watermark">&lt;/&gt;</div>
            <div className="mini-stamp">AP<br /><small>BUILD / 01</small></div>
          </Reveal>

          <button className="scroll-hint" onClick={() => go('about')}>SCROLL <span>↓</span></button>
        </section>

        <Wave />

        <section id="about" className="section container about">
          <Reveal><div className="section-label">01 / ABOUT</div></Reveal>
          <div className="section-heading-row">
            <Reveal><h2>A little about me<span>.</span></h2></Reveal>
            <Reveal delay={100}><div className="brain-mark" aria-hidden="true"><span>⌁</span><small>AI</small></div></Reveal>
          </div>
          <Reveal className="about-layout" delay={100}>
            <p className="lead">I’m a B.Tech AI/ML student who learns mostly by experimenting — making something, breaking it, understanding why, and building it better.</p>
            <div className="about-cards">
              {[
                ['01', 'Student', 'Learning the foundations and going beyond the syllabus.'],
                ['02', 'Problem Solver', 'DSA, debugging, and figuring things out one step at a time.'],
                ['03', 'AI Enthusiast', 'Exploring AI/ML through projects instead of only theory.'],
                ['04', 'Always Building', 'Ideas become more interesting when they become real.'],
              ].map(([n, title, body], i) => (
                <article className="mini-card" key={n} style={{ '--card-delay': `${i * 80}ms` } as CSSProperties}>
                  <span className="card-number">{n}</span><div className="mini-card-mark">+</div><h3>{title}</h3><p>{body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="projects" className="section container projects">
          <Reveal><div className="section-label">02 / WORKS <span className="brackets">&lt; / &gt;</span></div></Reveal>
          <div className="section-heading-row projects-head">
            <Reveal><div><h2>Works that matter<span>.</span></h2><p>Not everything I’ve coded — just the things worth talking about.</p></div></Reveal>
            <Reveal delay={100}><div className="scribble-arrow">ideas → <span>build</span> → learn</div></Reveal>
          </div>
          <div className="project-grid">
            {projects.map((project, i) => (
              <Reveal className={project.featured ? 'featured-wrap' : ''} key={project.title} delay={i * 90}>
                <article className={`project-card ${project.featured ? 'featured' : ''}`}>
                  <div className="project-art">
                    <div className="project-art-grid" />
                    <span className="project-art-icon">{project.featured ? '✦' : i === 1 ? '▦' : '</>'}</span>
                    <div className="project-art-line line-a" /><div className="project-art-line line-b" /><div className="project-art-dot" />
                    <span className="project-index">0{i + 1}</span>
                  </div>
                  <div className="project-content">
                    <div className="project-type">{project.kind}</div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    {project.href ? <a href={project.href} target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a> : <button className="text-link" onClick={() => go('contact')}>Project details <span>→</span></button>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="journey" className="section container journey">
          <Reveal><div className="section-label">03 / JOURNEY</div></Reveal>
          <Reveal delay={70}><div className="section-heading"><h2>Progress over time<span>.</span></h2><p>A timeline of learning, not a list of titles.</p></div></Reveal>
          <div className="timeline">
            <div className="timeline-line"><span /></div>
            {journey.map((item, i) => (
              <Reveal className="timeline-item" key={item.marker} delay={i * 80}>
                <div className="node"><span>{item.marker}</span></div>
                <div className="timeline-copy"><span className="tiny-label">{item.label}</span><h3>{item.title}</h3><p>{item.body}</p></div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="skills" className="section container skills">
          <Reveal><div className="section-label">04 / SKILLS</div></Reveal>
          <Reveal delay={70}><div className="section-heading"><h2>Things I work with<span>.</span></h2><p>Tools I’m using now — and a few I’m still growing into.</p></div></Reveal>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <Reveal key={skill.title} delay={i * 70}>
                <article className="skill-card">
                  <div className="skill-icon">{skill.icon}</div><span className="skill-count">0{i + 1}</span>
                  <h3>{skill.title}</h3>
                  <div className="skill-list">{skill.items.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}><div className="explore"><span>Currently exploring</span><b>APIs</b><b>Full-stack</b><b>Product Development</b></div></Reveal>
        </section>

        <section id="next" className="next-section">
          <Wave dark />
          <div className="container section next-inner">
            <Reveal><div className="section-label">05 / WHAT’S NEXT</div></Reveal>
            <Reveal delay={70}><div className="section-heading"><h2>Still becoming better<span>.</span></h2><p>I’m interested in what happens when learning turns into something people can actually use.</p></div></Reveal>
            <div className="next-grid">
              <Reveal delay={100}><ProgressCard title="Personal Gemini Journal" status="IN DEVELOPMENT" progress={70} body="Building thoughtfully, with privacy and useful AI at the center." /></Reveal>
              <Reveal delay={180}><ProgressCard title="Technive" status="COMING SOON" progress={30} body="A startup we’re building from the ground up. Not launched yet." /></Reveal>
            </div>
            <Reveal delay={240}><div className="quote-block"><span>“</span><p>Build. Learn. Repeat.</p><small>— the process matters</small></div></Reveal>
          </div>
        </section>

        <section id="contact" className="section container contact">
          <Reveal>
            <div className="contact-paper">
              <div className="dot-grid contact-grid" aria-hidden="true" />
              <div className="contact-copy"><div className="section-label">06 / CONTACT</div><h2>Let’s build something <span>great.</span></h2><p>If you’re building something interesting, I’d love to hear about it.</p></div>
              <div className="contact-actions">
                <a className="btn primary" href="mailto:5631arjunpatil@gmail.com">Get in touch <span>→</span></a>
                <div className="social-row"><a className="social" href="https://www.linkedin.com/in/arjun-patil-1401v" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="social" href="https://github.com/Arjun-patil-631" target="_blank" rel="noreferrer">GitHub ↗</a></div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand"><b>AP</b><div><strong>Arjun Patil</strong><small>AI/ML Student · Developer · Builder</small></div></div>
          <div className="footer-center">Still learning. Still building.</div>
          <div className="footer-quote">Build. Learn. Repeat.</div>
        </div>
      </footer>
    </>
  )
}

function ProgressCard({ title, status, progress, body }: { title: string; status: string; progress: number; body: string }) {
  return (
    <article className="progress-card">
      <div className="progress-head"><span>{status}</span><strong>{progress}%</strong></div>
      <h3>{title}</h3><p>{body}</p>
      <div className="progress-track"><i style={{ '--progress': `${progress}%` } as CSSProperties} /></div>
      <small>{progress < 100 ? 'Work in progress' : 'Complete'}</small>
    </article>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
