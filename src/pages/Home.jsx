import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Award, Clock, ChevronRight,
  Settings, Layers, Box, Wrench, FlaskConical, Zap, Factory, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import CarScroller from '../components/CarScroller';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const stats = [
  { number: '30+', label: 'Years of Excellence' },
  { number: '500+', label: 'Automotive Clients' },
  { number: '10K+', label: '3D Prints Delivered' },
  { number: '99.8%', label: 'Quality Pass Rate' },
];

const rpServices = [
  {
    icon: <Settings size={22} />,
    title: 'VMC Machining',
    desc: '3-5 axis vertical machining with tight tolerances for engine blocks, brackets and automotive enclosures.',
    link: '/rp-industries/vmc',
    tags: ['Engine Blocks', 'Brackets', 'Enclosures'],
  },
  {
    icon: <Wrench size={22} />,
    title: 'Billet Machining',
    desc: 'Superior structural strength from solid metal billets — aluminium, steel and titanium for high-stress applications.',
    link: '/rp-industries/billet',
    tags: ['Aluminium', 'Steel', 'Titanium'],
  },
  {
    icon: <Layers size={22} />,
    title: 'Rubber Components',
    desc: 'Custom seals, gaskets and vibration dampeners engineered for heat, oil and pressure environments.',
    link: '/rp-industries/rubber',
    tags: ['Silicone', 'EPDM', 'Nitrile'],
  },
  {
    icon: <Factory size={22} />,
    title: 'Jigs & Fixtures',
    desc: 'Custom tooling that ensures repeatability, reduces errors and speeds up QC on assembly lines.',
    link: '/rp-industries/jigs',
    tags: ['Mass Production', 'Assembly', 'QA Tooling'],
  },
];

const thryServices = [
  {
    icon: <Box size={22} />,
    title: 'FDM Printing',
    desc: 'Cost-effective for large art installations, architectural models and functional structural prototypes.',
    link: '/tryco/fdm',
    tags: ['ABS', 'PLA', 'PETG'],
  },
  {
    icon: <FlaskConical size={22} />,
    title: 'SLA Printing',
    desc: 'Ultra-fine detail and zero visible layer lines — perfect for jewellery casting, miniatures and art pieces.',
    link: '/tryco/sla',
    tags: ['Resin', 'Jewellery', 'Miniatures'],
  },
  {
    icon: <Zap size={22} />,
    title: 'SLS Printing',
    desc: 'Complex, interlocking geometries without support structures using durable nylon powder.',
    link: '/tryco/sls',
    tags: ['Nylon', 'Functional Parts', 'No Supports'],
  },
];

const sectors = [
  { icon: '🚗', name: 'Automotive OEM', sub: 'Tier 1 & Tier 2 Suppliers' },
  { icon: '✈️', name: 'Aerospace', sub: 'High-tolerance components' },
  { icon: '🎨', name: 'Art & Craft', sub: 'Sculptures, installations' },
  { icon: '💎', name: 'Jewellery', sub: 'Casting patterns & moulds' },
  { icon: '🏭', name: 'Heavy Engineering', sub: 'Custom machined parts' },
  { icon: '🔬', name: 'Medical Modeling', sub: 'Dental & anatomical models' },
];

export default function Home() {
  return (
    <div className="page-wrapper">

      {/* ── HERO ── */}
      <section className="hero">
        <motion.div 
          className="container hero__content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="hero__badge-row hero__badge-row--reference" variants={fadeUp}>
            <span className="hero__overline-bar"></span>
            <span className="hero__overline-text">ENGINEERING WHAT MOVES<br/>INDUSTRIES FORWARD</span>
          </motion.div>

          <motion.h1 className="hero__headline hero__headline--large" variants={fadeUp}>
            <span className="text-white">Precision.</span><br />
            <span className="hero__headline-beige">In motion.</span>
          </motion.h1>

          <motion.p className="hero__sub hero__sub--light" variants={fadeUp}>
            From precision components to complete assemblies,<br/>we manufacture for a moving world.
          </motion.p>

          <motion.div className="hero__cta-row" variants={fadeUp}>
            <Link to="/capabilities" className="btn btn-beige hero__cta-primary hero__cta-large">
              EXPLORE CAPABILITIES <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Split capability strip */}
        <div className="hero__split">
          <div className="hero__split-rp">
            <span className="hero__split-label">RP Industries</span>
            <span className="hero__split-sub">VMC · Billet · Rubber · Jigs</span>
          </div>
          <div className="hero__split-divider">
            <div className="hero__split-icon">⚙</div>
          </div>
          <div className="hero__split-thry">
            <span className="hero__split-label" style={{ color: 'var(--thry-beige)' }}>Thry Co</span>
            <span className="hero__split-sub">FDM · SLA · SLS · Prototypes</span>
          </div>
        </div>
      </section>

      {/* ── 3D SCROLLYTELLING ── */}
      <CarScroller />

      {/* ── STATS ── */}
      <section className="stats-bar">
        <div className="container">
          <motion.div 
            className="stats-bar__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {stats.map((s, i) => (
              <motion.div key={i} className="stat-item" variants={fadeUp}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RP INDUSTRIES ── */}
      <section className="section rp-section">
        <div className="container">
          <motion.div 
            className="rp-section__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div>
              <span className="overline overline-rp">RP Industries — Conventional Machining</span>
              <span className="accent-bar accent-bar-rp" style={{ display: 'block' }} />
              <h2 className="h2">The Automotive Legacy<br />Built Over 30 Years</h2>
              <p style={{ marginTop: 16, color: 'var(--slate)', maxWidth: 500, lineHeight: '1.65' }}>
                Rigorous, standard-driven, focused on tight tolerances and production volume.
                Trusted by Tier 1 & Tier 2 automotive suppliers for three decades.
              </p>
            </div>
            <Link to="/rp-industries" className="btn btn-outline rp-section__more-btn">
              All Services <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div 
            className="grid-2 rp-section__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {rpServices.map((svc, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link to={svc.link} className="card card-rp svc-card">
                  <div className="svc-card__head">
                    <div className="icon-circle icon-circle-rp">{svc.icon}</div>
                    <div>
                      <h3 className="h3 svc-card__title">{svc.title}</h3>
                    </div>
                  </div>
                  <p className="svc-card__desc">{svc.desc}</p>
                  <div className="tag-list">
                    {svc.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="svc-card__arrow"><ChevronRight size={16} /></div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── THRY CO ── */}
      <section className="section bg-paper thry-section">
        <div className="container">
          <motion.div 
            className="thry-section__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Link to="/tryco" className="btn btn-outline-beige thry-section__more-btn">
              All Technologies <ArrowRight size={15} />
            </Link>
            <div style={{ textAlign: 'right' }}>
              <span className="overline overline-thry">Thry Co — Additive Manufacturing</span>
              <span className="accent-bar accent-bar-thry" style={{ display: 'block', marginLeft: 'auto' }} />
              <h2 className="h2">Art, Craft &amp;<br />Rapid Innovation</h2>
              <p style={{ marginTop: 16, color: 'var(--slate)', maxWidth: 500, marginLeft: 'auto', lineHeight: '1.65' }}>
                Geometric freedom, rapid turnaround, and high visual fidelity.
                From jewellery casting to industrial prototypes — we bridge creative vision with execution.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="grid-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {thryServices.map((svc, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link to={svc.link} className="card card-thry svc-card">
                  <div className="icon-circle icon-circle-thry svc-card__icon-solo">{svc.icon}</div>
                  <h3 className="h3 svc-card__title">{svc.title}</h3>
                  <p className="svc-card__desc">{svc.desc}</p>
                  <div className="tag-list">
                    {svc.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="svc-card__arrow svc-card__arrow--thry"><ChevronRight size={16} /></div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section className="section sectors-section">
        <div className="container">
          <motion.div 
            className="text-center" 
            style={{ marginBottom: 'var(--sp-12)' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="overline overline-rp">Industries We Serve</span>
            <span className="accent-bar accent-bar-rp accent-bar-center" style={{ display: 'block' }} />
            <h2 className="h2" style={{ marginTop: 'var(--sp-4)' }}>Sectors Served</h2>
            <p style={{ marginTop: 12, color: 'var(--slate)', maxWidth: 520, margin: '12px auto 0' }}>
              From automotive production floors to jewellery studios — our dual stack serves diverse industries.
            </p>
          </motion.div>
          <motion.div 
            className="grid-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {sectors.map((s, i) => (
              <motion.div key={i} className="sector-card" variants={fadeUp}>
                <span className="sector-card__icon">{s.icon}</span>
                <div>
                  <div className="sector-card__name">{s.name}</div>
                  <div className="sector-card__sub">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RFQ CTA ── */}
      <section className="rfq-cta-section">
        <div className="container">
          <div className="rfq-cta-box">
            <div className="rfq-cta-box__left">
              <span className="overline" style={{ color: 'rgba(255,255,255,0.6)' }}>Smart Intake Portal</span>
              <h2 className="h2 rfq-cta-box__headline">Ready to Start Your Project?</h2>
              <p className="rfq-cta-box__sub">
                Upload your CAD files, specify your requirements — our smart routing sends
                CNC requests to RP Industries and 3D print requests to Thry Co automatically.
              </p>
            </div>
            <div className="rfq-cta-box__right">
              <div className="rfq-steps-mini">
                {['Select Process', 'Upload Files', 'Requirements', 'Get Quoted'].map((s, i) => (
                  <div key={i} className="rfq-step-mini">
                    <div className="rfq-step-mini__num">{i + 1}</div>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <Link to="/rfq" className="btn rfq-cta-box__btn">
                Launch RFQ Portal <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
