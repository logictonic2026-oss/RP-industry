import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Settings } from 'lucide-react';
import './About.css';

const timeline = [
  { year: '1994', event: 'AARPEE Industries founded in Pune, Maharashtra. First CNC machines installed.' },
  { year: '2001', event: 'First Tier 1 automotive contract — rubber seals for a major OEM.' },
  { year: '2008', event: 'Expanded to VMC machining for engine block components.' },
  { year: '2014', event: 'ISO quality certification achieved. 100+ active clients.' },
  { year: '2019', event: 'Thry Co division launched — entering 3D printing & additive manufacturing.' },
  { year: '2022', event: 'Portfolio expanded to SLA & SLS. First art & craft clients onboarded.' },
  { year: '2024', event: 'AARPEE Group unified portal launched — one hub, two manufacturing arms.' },
];

const values = [
  { icon: <Shield size={22} />, title: 'Uncompromising Quality', desc: '30+ years of strict tolerance standards demanded by the automotive industry.' },
  { icon: <Settings size={22} />, title: 'On-Time Delivery', desc: 'We understand production delays are costly. Our scheduling keeps commitments.' },
  { icon: <Zap size={22} />, title: 'Innovation at Core', desc: 'From CNC machining to additive manufacturing — we evolve with technology.' },
  { icon: <Shield size={22} />, title: 'Client Partnership', desc: 'We become an extension of your engineering team, not just a supplier.' },
];

export default function About() {
  return (
    <div className="page-wrapper about-page">

      {/* Header */}
      <div className="about-header">
        <div className="container">
          <span className="overline overline-rp">Our Story</span>
          <span className="accent-bar accent-bar-rp" style={{ display: 'block' }} />
          <h1 className="h1 about-header__h1">
            The 30-Year Legacy &amp; the Future of Hybrid Manufacturing
          </h1>
          <p className="about-header__sub">
            AARPEE Group is built on three decades of trust, precision, and relentless improvement —
            now unified with the creative power of additive manufacturing.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="about-stats bg-blue">
        <div className="container about-stats__grid">
          {[
            { n: '1994', l: 'Founded' },
            { n: '30+',  l: 'Years of Excellence' },
            { n: '500+', l: 'Satisfied Clients' },
            { n: '2',    l: 'Manufacturing Arms' },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-number" style={{ color: 'var(--white)' }}>{s.n}</div>
              <div className="stat-label" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Mission */}
      <section className="section">
        <div className="container about-mission">
          <div className="card card-rp about-mission__card">
            <div className="icon-circle icon-circle-rp" style={{ marginBottom: 16 }}>
              <Settings size={22} />
            </div>
            <h2 className="h2" style={{ marginBottom: 16 }}>AARPEE Industries</h2>
            <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: 12 }}>
              Since 1994, AARPEE Industries has served the most demanding segment of manufacturing — the
              automotive industry. VMC machining, billet processing, rubber components and jig &amp;
              fixture capabilities built on precision engineering and rigorous QC.
            </p>
            <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: 24 }}>
              Every component meets the standards demanded by Tier 1 and Tier 2 automotive suppliers,
              with tight tolerances, high-strength materials and robust inspection processes.
            </p>
            <Link to="/aarpee-industries" className="btn btn-outline">
              Explore AARPEE Industries <ArrowRight size={15} />
            </Link>
          </div>

          <div className="card card-thry about-mission__card">
            <div className="icon-circle icon-circle-thry" style={{ marginBottom: 16 }}>
              <Zap size={22} />
            </div>
            <h2 className="h2" style={{ marginBottom: 16 }}>Thry Co</h2>
            <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: 12 }}>
              Launched in 2019, Thry Co bridges creative vision and industrial execution. Operating
              in the art and craft space alongside rapid prototyping, Thry Co offers FDM, SLA and
              SLS 3D printing services combining geometric freedom with fast turnaround.
            </p>
            <p style={{ color: 'var(--slate)', lineHeight: 1.7, marginBottom: 24 }}>
              Whether you're a jeweller needing casting patterns, a sculptor creating installations,
              or an engineer prototyping a complex part — Thry Co delivers with precision and flair.
            </p>
            <Link to="/tryco" className="btn btn-outline-beige">
              Explore Thry Co <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-paper" style={{ borderTop: '1px solid var(--divider)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="overline overline-rp">Our Journey</span>
            <span className="accent-bar accent-bar-rp accent-bar-center" style={{ display: 'block' }} />
            <h2 className="h2" style={{ marginTop: 16 }}>30 Years in the Making</h2>
          </div>
          <div className="about-timeline">
            {timeline.map((item, i) => (
              <div key={i} className="about-timeline__item">
                <div className="about-timeline__year">{item.year}</div>
                <div className="about-timeline__dot" />
                <div className="about-timeline__content">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="overline overline-thry">What Drives Us</span>
            <span className="accent-bar accent-bar-thry accent-bar-center" style={{ display: 'block' }} />
            <h2 className="h2" style={{ marginTop: 16 }}>Our Core Values</h2>
          </div>
          <div className="grid-4">
            {values.map((v, i) => (
              <div key={i} className="card text-center">
                <div className="icon-circle icon-circle-rp" style={{ margin: '0 auto 16px' }}>
                  {v.icon}
                </div>
                <h3 className="h3" style={{ fontSize: 17, marginBottom: 8 }}>{v.title}</h3>
                <p style={{ color: 'var(--slate)', fontSize: 14, lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-paper" style={{ borderTop: '1px solid var(--divider)' }}>
        <div className="container text-center">
          <h2 className="h2">Ready to work with AARPEE Group?</h2>
          <p style={{ color: 'var(--slate)', marginTop: 12, marginBottom: 24, fontSize: 16 }}>
            CNC machining or 3D printing — start your project today.
          </p>
          <Link to="/rfq" className="btn btn-primary">
            Request a Quote <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
