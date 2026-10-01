import { Link } from 'react-router-dom';
import { ArrowRight, Box, FlaskConical, Zap, CheckCircle } from 'lucide-react';
import './ServiceOverview.css';

const services = [
  {
    icon: <Box size={26} />, title: 'FDM Printing',
    tagline: 'Fused Deposition Modeling — The Workhorse',
    desc: 'Cost-effective for large art installations, architectural models, and functional structural prototypes. Robust materials including ABS, PLA and PETG for reliable results at scale.',
    caps: ['Large-Scale Art', 'Architectural Models', 'Functional Prototypes', 'ABS / PLA / PETG'],
    sectors: ['Sculptors', 'Product Designers', 'Packaging Engineers'],
    link: '/tryco/fdm',
  },
  {
    icon: <FlaskConical size={26} />, title: 'SLA Printing',
    tagline: 'Stereolithography — Ultra-Fine Detail',
    desc: 'Perfect for intricate jewellery casting patterns, detailed miniatures and art pieces requiring zero visible layer lines. Ultra-fine resolution and smooth surface finish.',
    caps: ['Jewellery Casting', 'Detailed Miniatures', 'Smooth Finish', 'High-Res Resin'],
    sectors: ['Jewellers', 'Artists', 'Miniaturists', 'Dental / Medical'],
    link: '/tryco/sla',
  },
  {
    icon: <Zap size={26} />, title: 'SLS Printing',
    tagline: 'Selective Laser Sintering — Industrial Bridge',
    desc: 'Complex, interlocking geometries without support structures using nylon powder. Print moving gears in one piece. End-use functional craft and industrial parts.',
    caps: ['No Support Structures', 'Interlocking Geometries', 'Nylon Powder', 'Functional Parts'],
    sectors: ['Industrial Designers', 'Functional Art Creators', 'Robotics'],
    link: '/tryco/sls',
  },
];

export default function Tryco() {
  return (
    <div className="page-wrapper sov-page">
      <div className="sov-header sov-header--thry">
        <div className="container">
          <span className="badge badge-thry">Thry Co — Additive Manufacturing</span>
          <h1 className="h1 sov-header__h1">Art, Craft &amp; Rapid Innovation</h1>
          <p className="sov-header__sub">
            Geometric freedom, rapid turnaround, high visual fidelity.
            From jewellery casting to industrial prototypes — we bridge creative vision with execution.
          </p>
          <Link to="/rfq" className="btn btn-beige" style={{ marginTop: 32 }}>
            Request a 3D Print Quote <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Why Thry Co */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="overline overline-thry">Why Thry Co</span>
            <span className="accent-bar accent-bar-thry accent-bar-center" style={{ display: 'block' }} />
            <h2 className="h2" style={{ marginTop: 16 }}>Creative Meets Industrial</h2>
          </div>
          <div className="grid-3">
            {[
              { t: 'Geometric Freedom', d: 'Print shapes impossible with traditional manufacturing — complex curves, internal lattices, and moving parts.' },
              { t: 'Rapid Turnaround', d: 'Go from digital file to physical part in hours. Ideal for rapid prototyping and creative iteration.' },
              { t: 'Multi-Technology', d: 'FDM for volume, SLA for detail, SLS for strength — we pick the right tool for your job.' },
            ].map((c, i) => (
              <div key={i} className="card card-thry text-center">
                <CheckCircle size={32} style={{ color: 'var(--thry-beige)', margin: '0 auto 16px' }} />
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
            <span className="overline overline-thry">Our Technologies</span>
            <span className="accent-bar accent-bar-thry accent-bar-center" style={{ display: 'block' }} />
            <h2 className="h2" style={{ marginTop: 16 }}>3D Printing Capabilities</h2>
          </div>
          <div className="sov-services">
            {services.map((svc, i) => (
              <div key={i} className="card card-thry sov-card">
                <div className="sov-card__head">
                  <div className="icon-circle icon-circle-thry">{svc.icon}</div>
                  <div>
                    <h3 className="h3" style={{ fontSize: 20, marginBottom: 4 }}>{svc.title}</h3>
                    <p style={{ color: 'var(--thry-beige)', fontSize: 13, fontWeight: 500 }}>{svc.tagline}</p>
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
                    <div className="tag-list">{svc.sectors.map(s => <span key={s} className="tag" style={{ borderColor: 'rgba(180,154,116,0.3)', color: 'var(--thry-beige)' }}>{s}</span>)}</div>
                  </div>
                </div>
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                  <Link to={svc.link} className="btn btn-outline-beige" style={{ fontSize: 13, padding: '8px 16px' }}>
                    Learn More <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: 'var(--thry-beige)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2" style={{ color: 'var(--white)', marginBottom: 12 }}>Have a design to bring to life?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 24 }}>Upload your STL or OBJ file and get a quote from our Thry Co team.</p>
          <Link to="/rfq" className="btn" style={{ background: 'var(--white)', color: 'var(--thry-beige)' }}>
            Start Your 3D Print Quote <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
