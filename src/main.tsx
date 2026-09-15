import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

type Project = { title: string; type: string; description: string; tags: string[]; featured?: boolean }

const projects: Project[] = [
  { title: 'Personal Gemini Journal', type: 'AI / Product', description: 'A privacy-focused journal concept built around thoughtful AI insights and secure personal data.', tags: ['React', 'Firebase', 'Gemini'], featured: true },
  { title: 'Car Rental Management System', type: 'Database', description: 'A relational database project covering entities, relationships, SQL operations and real-world workflows.', tags: ['MySQL', 'SQL', 'DBMS'] },
  { title: 'DSA Daily', type: 'Learning / DSA', description: 'A public coding trail that captures the habit of solving problems consistently and learning through practice.', tags: ['Python', 'DSA', 'LeetCode'] },
]

const skills = [
  ['Languages', 'C · Java · Python · JavaScript · SQL'],
  ['Development', 'HTML · CSS · React · Firebase'],
  ['AI / Data', 'AI/ML · Data Science · Python'],
  ['Tools', 'Git · GitHub · VS Code'],
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>
}

function Wave() {
  return <svg className="wave" viewBox="0 0 1200 110" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 62 C150 8 260 105 410 52 S670 10 820 56 S1050 100 1200 38" />
    <path className="wave-secondary" d="M0 78 C150 28 270 110 420 66 S680 28 830 69 S1040 112 1200 54" />
  </svg>
}

function App() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const ids = ['home','about','projects','journey','skills','next','contact']
    const onScroll = () => {
      const current = ids.reduce((best, id) => {
        const el = document.getElementById(id)
        if (!el) return best
        return Math.abs(el.getBoundingClientRect().top - 110) < Math.abs(best.top - 110) ? { id, top: el.getBoundingClientRect().top } : best
      }, { id: 'home', top: Infinity }).id
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return <>
    <div className="paper-grain" aria-hidden="true" />
    <header className="nav-wrap">
      <nav className="nav container">
        <button className="brand" onClick={() => go('home')} aria-label="Go to home">AP</button>
        <button className="menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation">☰</button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {['home','about','projects','journey','skills','next','contact'].map(id => <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>{id === 'next' ? "What's Next" : id[0].toUpperCase()+id.slice(1)}</button>)}
          <a className="resume" href="#contact" onClick={() => setMenuOpen(false)}>View Resume ↗</a>
        </div>
      </nav>
    </header>

    <main>
      <section id="home" className="hero section container">
        <div className="dot-grid hero-grid" aria-hidden="true" />
        <div className="signature">Arjun Patil</div>
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot" /> Hey, I’m</div>
          <h1>Arjun <span>Patil</span></h1>
          <p className="role">AI/ML Student <i>·</i> Developer <i>·</i> Builder</p>
          <p className="hero-text">I enjoy figuring out how things work, solving problems through code, and turning ideas into things people can actually use.</p>
          <div className="hero-actions"><button className="btn primary" onClick={() => go('projects')}>View My Work <span>→</span></button><a className="btn ghost" href="https://github.com/Arjun-patil-631" target="_blank" rel="noreferrer">GitHub ↗</a></div>
          <div className="hand-note">still learning. still building.</div>
        </div>
        <div className="hero-visual">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="terminal">
            <div className="terminal-top"><span /><span /><span /><b>~/arjun</b></div>
            <div className="terminal-body"><p><em>$</em> whoami</p><p className="muted">&gt; curious developer</p><p><em>$</em> status</p><p className="green">&gt; learning → building → repeating</p><p><em>$</em> next</p><p className="muted">&gt; make something useful.</p><span className="cursor" /></div>
          </div>
          <div className="code-watermark">&lt;/&gt;</div>
        </div>
        <div className="scroll-hint">SCROLL <span>↓</span></div>
      </section>

      <Wave />

      <section id="about" className="section container about">
        <Reveal><div className="section-label">01 / ABOUT</div><div className="section-heading"><h2>A little about me<span>.</span></h2><div className="brain-mark">◉<small>AI</small></div></div></Reveal>
        <Reveal className="about-layout"><p className="lead">I’m a B.Tech AI/ML student who learns mostly by experimenting — making something, breaking it, understanding why, and building it better.</p><div className="about-cards">{[['01','Student','Learning the foundations and going beyond the syllabus.'],['02','Problem Solver','DSA, debugging, and figuring things out one step at a time.'],['03','AI Enthusiast','Exploring AI/ML through projects instead of just theory.'],['04','Always Building','Ideas become more interesting when they become real.']].map(([n,t,d]) => <article className="mini-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></Reveal>
      </section>

      <section id="projects" className="section container projects">
        <Reveal><div className="section-label">02 / PROJECTS <span className="brackets">&lt; / &gt;</span></div><div className="section-heading"><h2>Projects that matter<span>.</span></h2><p>Not everything I’ve coded — just the things worth talking about.</p></div></Reveal>
        <div className="project-grid">{projects.map((p, i) => <Reveal className={p.featured ? 'featured-wrap' : ''} key={p.title}><article className={`project-card ${p.featured ? 'featured' : ''}`}><div className="project-art"><span>{p.featured ? '✦' : i === 1 ? '▦' : '</>'}</span><div className="sketch-line" /></div><div className="project-content"><div className="project-type">{p.type}</div><h3>{p.title}</h3><p>{p.description}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div><a href="#contact">View project <span>↗</span></a></div></article></Reveal>)}</div>
      </section>

      <section id="journey" className="section container journey">
        <Reveal><div className="section-label">03 / JOURNEY</div><div className="section-heading"><h2>Progress over time<span>.</span></h2><p>A timeline of learning, not a list of titles.</p></div></Reveal>
        <div className="timeline"><div className="timeline-line" />{[['01','Started B.Tech','Found the intersection of coding, AI and problem solving.'],['02','Built consistency','Started treating DSA and GitHub as habits rather than one-off tasks.'],['03','Started building bigger','Projects moved from classroom exercises toward useful products.'],['04','What’s next','Keep learning. Keep shipping. See where the ideas go.']].map(([n,t,d], i) => <Reveal className="timeline-item" key={n}><div className="node">{n}</div><div><span className="tiny-year">STEP {i+1}</span><h3>{t}</h3><p>{d}</p></div></Reveal>)}</div>
      </section>

      <section id="skills" className="section container skills">
        <Reveal><div className="section-label">04 / SKILLS</div><div className="section-heading"><h2>Things I work with<span>.</span></h2><p>Tools I’m using now — and a few I’m still growing into.</p></div></Reveal>
        <div className="skills-grid">{skills.map(([t,d]) => <Reveal key={t}><article className="skill-card"><div className="skill-icon">{t === 'AI / Data' ? '◌' : t === 'Tools' ? '⌁' : t === 'Languages' ? '&lt;/&gt;' : '□'}</div><h3>{t}</h3><p>{d}</p></article></Reveal>)}</div>
        <div className="explore"><span>Currently exploring</span><b>APIs</b><b>Full-stack</b><b>Product Development</b></div>
      </section>

      <section id="next" className="next-section">
        <Wave />
        <div className="container section"><Reveal><div className="section-label">05 / WHAT’S NEXT</div><div className="section-heading"><h2>Still becoming better<span>.</span></h2><p>I’m interested in what happens when learning turns into something people can actually use.</p></div></Reveal>
          <div className="next-grid"><Reveal><article className="progress-card"><div><span>IN DEVELOPMENT</span><h3>Personal Gemini Journal</h3><p>Building thoughtfully, with privacy and useful AI at the center.</p></div><strong>70%</strong><div className="progress"><i style={{width:'70%'}} /></div></article></Reveal><Reveal><article className="progress-card"><div><span>COMING SOON</span><h3>Technive</h3><p>A startup we’re building from the ground up. Not launched yet.</p></div><strong>30%</strong><div className="progress"><i style={{width:'30%'}} /></div></article></Reveal></div>
          <div className="quote">“Build. Learn. Repeat.”</div>
        </div>
      </section>

      <section id="contact" className="section container contact"><Reveal><div className="contact-paper"><div className="dot-grid" aria-hidden="true" /><div><div className="section-label">06 / CONTACT</div><h2>Let’s build something <span>great.</span></h2><p>If you’re building something interesting, I’d love to hear about it.</p></div><div className="contact-actions"><a className="btn primary" href="mailto:your-email@example.com">Get in touch →</a><a className="social" href="https://www.linkedin.com/in/arjun-patil-1401v" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="social" href="https://github.com/Arjun-patil-631" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></Reveal></section>
    </main>

    <footer className="footer"><div className="container footer-inner"><div><b>AP</b><span>Arjun Patil</span><small>AI/ML Student · Developer · Builder</small></div><div className="footer-quote">Build. Learn. Repeat.</div></div></footer>
  </>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
