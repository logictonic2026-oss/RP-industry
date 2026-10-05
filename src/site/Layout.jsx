import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { services, companyEmail } from './content';
import { scrollPageTo } from '../components/scrollController';

export function RoutePosition() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = hash && document.getElementById(hash.slice(1));
      scrollPageTo(target ? window.scrollY + target.getBoundingClientRect().top : 0, true);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const dropdown = useRef();
  useEffect(() => {
    const escape = event => { if (event.key === 'Escape') { setOpen(false); if (dropdown.current) dropdown.current.open = false; } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);
  return <header className="site-header"><Link className="site-logo" to="/" aria-label="AARPEE Group home"><img src="/aarpee-group-logo.png" alt="AARPEE Group — AARPEE Industries and Thry Co" /></Link>
    <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation" onClick={event => { if (event.target.closest('a')) { setOpen(false); if (dropdown.current) dropdown.current.open = false; } }}><NavLink to="/" end>Home</NavLink><details ref={dropdown} className="site-dropdown"><summary>Capabilities <ChevronDown size={13} /></summary><div><Link to="/aarpee-industries"><strong>AARPEE Industries</strong><span>Precision machining</span></Link><Link to="/tryco"><strong>Thry Co</strong><span>Additive manufacturing</span></Link><Link to="/sectors"><strong>Applications</strong><span>Find your industry</span></Link></div></details><Link to="/#manufacturing">3D explorer <span className="nav-live" /></Link><NavLink to="/about">About</NavLink><NavLink to="/contact">Contact</NavLink><Link to="/rfq" className="site-button site-button--nav">Start a project <ArrowUpRight size={15} /></Link></nav>
    <button className="site-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </header>;
}

export function ProjectCTA() { return <section className="project-cta"><div><p className="eyebrow">FROM DRAWING TO DIRECTION</p><h2>Let’s make<br /><span>your next part.</span></h2></div><div><p>A drawing, a model or an idea.<br />Start with what you have.</p><Link className="site-button site-button--sand" to="/rfq">Discuss your project <ArrowUpRight size={19} /></Link></div></section>; }

export function Footer() {
  return <footer className="site-footer"><div className="footer-grid"><div className="footer-brand"><Link to="/" className="site-logo"><img src="/aarpee-group-logo.png" alt="AARPEE Group" /></Link><p>Precision machining.<br />Rapid prototyping.<br />One manufacturing partner.</p><a href={`mailto:${companyEmail}`}>{companyEmail} <ArrowUpRight size={14} /></a></div><div><h3>AARPEE Industries</h3>{services.filter(s => s.arm === 'rp').map(s => <Link key={s.id} to={s.path}>{s.name}</Link>)}</div><div><h3>Thry Co</h3>{services.filter(s => s.arm === 'thry').map(s => <Link key={s.id} to={s.path}>{s.name}</Link>)}<Link to="/tryco/portfolio">Application gallery</Link></div><div><h3>The group</h3><Link to="/about">Our approach</Link><Link to="/sectors">Sectors</Link><Link to="/contact">Contact</Link><Link to="/rfq">Start a project <ArrowRight size={13} /></Link></div></div><div className="footer-baseline"><span>© AARPEE Group · AARPEE Industries & Thry Co</span><span>Engineered around your next idea.</span><Link to="/credits">Credits</Link><a href="#top">Back to top ↑</a></div></footer>;
}

export function PageIntro({ label, title, description, children }) { return <section className="page-intro site-width"><p className="eyebrow">{label}</p><h1>{title}</h1><div className="page-intro__bottom"><p>{description}</p>{children}</div></section>; }
export function SectionHeading({ label, title, children }) { return <div className="section-heading"><div><p className="eyebrow">{label}</p><h2>{title}</h2></div>{children}</div>; }
