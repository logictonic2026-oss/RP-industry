import { Link } from 'react-router-dom';
import { ArrowRight, Settings, Wrench, Layers, Factory, CheckCircle } from 'lucide-react';
import './ServiceOverview.css';

const services = [
  {
    icon: <Settings size={26} />, title: 'VMC Machining',
    tagline: 'Precision Vertical Machining for Automotive Excellence',
    desc: '3-axis to 5-axis VMC capability with tight tolerances on engine blocks, brackets, and automotive enclosures. Serving Tier 1 & Tier 2 automotive suppliers for 30 years.',
    caps: ['3-5 Axis CNC VMC', 'Engine Blocks', 'Complex Brackets', 'Automotive Enclosures'],
    sectors: ['Tier 1 & Tier 2 Automotive', 'Heavy Engineering', 'Aerospace'],
    link: '/rp-industries/vmc',
  },
  {
    icon: <Wrench size={26} />, title: 'Billet Machining',
    tagline: 'Superior Strength from Solid Metal Billets',
    desc: 'Custom components milled from solid metal billets (aluminium, steel, titanium) for superior structural strength over cast parts — ideal for high-stress automotive use.',
    caps: ['Aluminium Billet', 'Steel Billet', 'Titanium Billet', 'High-stress parts'],
    sectors: ['Performance Automotive', 'Custom Auto Parts', 'Heavy Machinery'],
    link: '/rp-industries/billet',
  },
  {
    icon: <Layers size={26} />, title: 'Rubber Components',
    tagline: 'Custom Seals & Moldings for Harsh Environments',
    desc: 'Custom O-rings, gaskets, vibration dampeners and seals in Silicone, EPDM and Nitrile — engineered for automotive heat, oil and pressure environments.',
    caps: ['Custom O-rings', 'Gaskets & Seals', 'Vibration Dampeners', 'Silicone / EPDM / Nitrile'],
    sectors: ['Automotive OEM', 'Industrial Hydraulics', 'Fluid Dynamics'],
    link: '/rp-industries/rubber',
  },
  {
    icon: <Factory size={26} />, title: 'Jigs & Fixtures',
    tagline: 'Enabling Mass Production Through Precision Tooling',
    desc: 'Custom jigs ensure repeatability, reduce assembly errors and speed up QC for large-scale manufacturing. The backbone of efficient automotive assembly lines.',
    caps: ['Custom Jig Design', 'Assembly Fixtures', 'QC Inspection Jigs', 'Line Efficiency'],
    sectors: ['Assembly Line Managers', 'Production Engineers', 'Factory Operations'],
    link: '/rp-industries/jigs',
  },
];

export default function RPIndustries() {
  return (
    <div className="page-wrapper sov-page">
      <div className="sov-header sov-header--rp">
        <div className="container">
          <span className="badge badge-rp">RP Industries — Conventional Machining</span>
          <h1 className="h1 sov-header__h1">30 Years of Automotive Manufacturing Legacy</h1>
          <p className="sov-header__sub">
            Rigorous, standard-driven, focused on tight tolerances and production volume.
            Trusted by Tier 1 &amp; Tier 2 automotive suppliers for three decades.
          </p>
          <Link to="/rfq" className="btn btn-primary" style={{ marginTop: 32 }}>
            Request a Machining Quote <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Why RP */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="overline overline-rp">Why RP Industries</span>
            <span className="accent-bar accent-bar-rp accent-bar-center" style={{ display: 'block' }} />
            <h2 className="h2" style={{ marginTop: 16 }}>Built on Trust &amp; Precision</h2>
          </div>
          <div className="grid-3">
            {[
              { t: 'Tier 1 & 2 Approved', d: '30+ years serving the most demanding automotive clients in the supply chain.' },
              { t: 'Tight Tolerances', d: 'Machining processes hold tolerances meeting and exceeding automotive industry standards.' },
              { t: 'Volume Capability', d: 'From single prototypes to high-volume production runs of 100,000+ parts.' },
            ].map((c, i) => (
              <div key={i} className="card card-rp text-center">
                <CheckCircle size={32} style={{ color: 'var(--rp-blue)', margin: '0 auto 16px' }} />
                <h3 className="h3" style={{ fontSize: 17, marginBottom: 8 }}>{c.t}</h3>
                <p style={{ color: 'var(--slate)', fontSize: 14, lineHeight: 1.65 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-paper" style={{ borderTop: '1px solid var(--divider)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="overline overline-rp">Our Services</span>
            <span className="accent-bar accent-bar-rp accent-bar-center" style={{ display: 'block' }} />
            <h2 className="h2" style={{ marginTop: 16 }}>Machining Capabilities</h2>
          </div>
          <div className="sov-services">
            {services.map((svc, i) => (
              <div key={i} className="card card-rp sov-card">
                <div className="sov-card__head">
                  <div className="icon-circle icon-circle-rp">{svc.icon}</div>
                  <div>
                    <h3 className="h3" style={{ fontSize: 20, marginBottom: 4 }}>{svc.title}</h3>
                    <p style={{ color: 'var(--rp-blue)', fontSize: 13, fontWeight: 500 }}>{svc.tagline}</p>
                  </div>
                </div>
                <p style={{ color: 'var(--slate)', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{svc.desc}</p>
                <div className="sov-card__meta">
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Capabilities</p>
                    <div className="tag-list">{svc.caps.map(c => <span key={c} className="tag">{c}</span>)}</div>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Sectors</p>
                    <div className="tag-list">{svc.sectors.map(s => <span key={s} className="tag" style={{ borderColor: 'rgba(20,44,79,0.2)', color: 'var(--rp-blue)' }}>{s}</span>)}</div>
                  </div>
                </div>
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                  <Link to={svc.link} className="btn btn-outline" style={{ fontSize: 13, padding: '8px 16px' }}>
                    Learn More <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: 'var(--rp-blue)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2" style={{ color: 'var(--white)', marginBottom: 12 }}>Ready to start your machining project?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>Upload your CAD files and get a quote from our RP Industries team.</p>
          <Link to="/rfq" className="btn" style={{ background: 'var(--white)', color: 'var(--rp-blue)' }}>
            Request Machining Quote <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
