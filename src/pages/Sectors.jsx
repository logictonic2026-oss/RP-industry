import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const sectors = [
  { emoji: '🚗', name: 'Automotive OEM',      arm: 'RP Industries', color: 'rp',   sub: 'Tier 1 & Tier 2 Suppliers', desc: 'Engine blocks, brackets, rubber seals, gaskets — 30 years of automotive manufacturing trust.', services: ['VMC Machining', 'Billet Machining', 'Rubber Seals', 'Jigs & Fixtures'] },
  { emoji: '✈️', name: 'Aerospace',            arm: 'RP Industries', color: 'rp',   sub: 'High-Tolerance Components', desc: 'Aluminium and titanium billet components machined to exacting aerospace specifications.', services: ['Billet Machining', 'VMC Precision Parts'] },
  { emoji: '🏭', name: 'Heavy Engineering',    arm: 'RP Industries', color: 'rp',   sub: 'Custom Machined Parts',     desc: 'Heavy machinery components, custom profiles and jigs for large-scale manufacturing.', services: ['Billet Machining', 'Jigs & Fixtures'] },
  { emoji: '🎨', name: 'Art & Craft',          arm: 'Thry Co',       color: 'thry', sub: 'Sculptures & Installations', desc: 'FDM for massive architectural installations to intricate SLA decorative pieces.', services: ['FDM Large-Scale', 'SLA Fine Detail'] },
  { emoji: '💎', name: 'Jewellery',            arm: 'Thry Co',       color: 'thry', sub: 'Casting Patterns & Moulds', desc: 'SLA ultra-high resolution for perfect jewellery casting patterns. Zero visible layer lines.', services: ['SLA Resin Printing', 'Casting Patterns'] },
  { emoji: '🔬', name: 'Medical Modeling',     arm: 'Thry Co',       color: 'thry', sub: 'Anatomical Models',         desc: 'High-accuracy SLA and SLS for dental models, surgical planning and study pieces.', services: ['SLA High Resolution', 'SLS Nylon Parts'] },
];

export default function Sectors() {
  return (
    <div className="page-wrapper" style={{ paddingTop: 80 }}>
      <div style={{ padding: '64px 0 48px', background: 'var(--paper)', borderBottom: '1px solid var(--divider)' }}>
        <div className="container">
          <span className="overline overline-rp">Who We Serve</span>
          <span className="accent-bar accent-bar-rp" style={{ display: 'block' }} />
          <h1 className="h1" style={{ marginTop: 16 }}>Sectors Served</h1>
          <p style={{ color: 'var(--slate)', marginTop: 12, fontSize: 17, maxWidth: 560, lineHeight: 1.65 }}>
            From automotive production floors to jewellery studios — our dual manufacturing
            stack serves industries that demand precision and creativity.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <span className="badge badge-rp">RP Industries — Subtractive</span>
            <span className="badge badge-thry">Thry Co — Additive</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 24 }}>
            {sectors.map((s, i) => (
              <div key={i} className={`card card-${s.color}`} style={{ padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                  <span style={{ fontSize: 36, flexShrink: 0 }}>{s.emoji}</span>
                  <div>
                    <h3 className="h3" style={{ fontSize: 18, marginBottom: 4 }}>{s.name}</h3>
                    <p style={{ fontSize: 12, color: s.color === 'rp' ? 'var(--rp-blue)' : 'var(--thry-beige)', fontWeight: 600 }}>
                      {s.arm} · {s.sub}
                    </p>
                  </div>
                </div>
                <p style={{ color: 'var(--slate)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                <div className="tag-list">
                  {s.services.map(sv => (
                    <span key={sv} className="tag" style={{
                      borderColor: s.color === 'rp' ? 'rgba(20,44,79,0.2)' : 'rgba(180,154,116,0.3)',
                      color: s.color === 'rp' ? 'var(--rp-blue)' : 'var(--thry-beige)',
                    }}>{sv}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm bg-paper" style={{ borderTop: '1px solid var(--divider)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2" style={{ marginBottom: 12 }}>Don't see your sector?</h2>
          <p style={{ color: 'var(--slate)', marginBottom: 24 }}>We work with virtually any industry. Get in touch and let's discuss.</p>
          <Link to="/rfq" className="btn btn-primary">Start a Project <ArrowRight size={15} /></Link>
        </div>
      </section>
    </div>
  );
}
