import { Component, lazy, Suspense, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { manufacturingStages as stages, stageAtProgress, LAST_STAGE } from '../components/manufacturingStages';
import { scrollPageTo } from '../components/scrollController';
import './AutomotiveExperience.css';
import './AutomotiveBrand.css';

const CarScene = lazy(() => import('../components/CarScene'));
const titles = [['Precision.', 'In motion.'], ['Precision.', 'Inside out.'], ['Solid metal.', 'Refined form.'], ['Quiet strength.', 'Every connection.'], ['Held in place.', 'Made to repeat.'], ['Ideas take', 'shape.'], ['Every detail.', 'Brought to light.'], ['Complex forms.', 'New possibilities.'], ['Your next idea.', 'Made real.']];
const names = ['RP GROUP / PRECISION MANUFACTURING', 'VMC MACHINING', 'BILLET MACHINING', 'RUBBER COMPONENTS', 'JIGS & FIXTURES', 'FDM PRINTING', 'SLA PRINTING', 'SLS PRINTING', 'LET’S MAKE IT REAL'];

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="experience-unavailable"><img src="/manufacturing-hero.png" alt="Machined and printed component concept" /><p>3D preview unavailable. All services remain accessible below.</p></div> : this.props.children; }
}

function Chapter({ index, progress, reduced }) {
  const item = stages[index];
  const opacity = useTransform(progress, p => reduced ? 1 : Math.max(0, 1 - Math.max(0, Math.abs(p * LAST_STAGE - index) - 0.35) / 0.5));
  const Heading = index === 0 ? 'h1' : 'h2';
  return <section className={`experience-chapter ${index === 0 ? 'experience-chapter--hero' : ''}`} id={index === 1 ? 'manufacturing' : index === LAST_STAGE ? 'capabilities' : `chapter-${item.id}`} aria-labelledby={`title-${item.id}`}>
    <motion.div className="experience-copy" style={{ opacity }}>
      {index === 0 ? (
        <>
          <div className="hero-reference-eyebrow">
            <span className="hero-bar"></span>
            <span>ENGINEERING WHAT MOVES<br/>INDUSTRIES FORWARD</span>
          </div>
          <Heading id={`title-${item.id}`} className="hero-reference-heading">
            <span>Precision.</span>
            <span className="is-accent">In motion.</span>
          </Heading>
          <p className="hero-description-clean">From precision components to complete assemblies, we manufacture for a moving world.</p>
          <a className="experience-link hero-reference-link" href="#manufacturing">
            EXPLORE CAPABILITIES <ChevronRight size={16} />
          </a>
        </>
      ) : (
        <>
          <p className="experience-eyebrow"><span>{String(index).padStart(2, '0')}</span> {names[index]}</p>
          <Heading id={`title-${item.id}`}>{titles[index].map((line, i) => <span key={line} className={i === titles[index].length - 1 ? 'is-accent' : ''}>{line}</span>)}</Heading>
          <p className="experience-description">{item.description}</p>
          <Link className="experience-link" to={item.link}>{item.linkLabel} <ArrowUpRight size={18} /></Link>
        </>
      )}
      
      {index > 0 && index < LAST_STAGE && <div className="experience-details"><span>{item.part}</span><p>{item.detail}</p></div>}
      {index === LAST_STAGE && <div className="experience-destinations"><Link to="/rp-industries">RP Industries <ChevronRight size={14} /></Link><Link to="/tryco">Thry Co <ChevronRight size={14} /></Link><Link to="/about">Meet the group <ChevronRight size={14} /></Link></div>}
    </motion.div>
  </section>;
}

export default function AutomotiveExperience() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);
  const { scrollYProgress: progress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  useMotionValueEvent(progress, 'change', p => setStage(stageAtProgress(p)));
  const warm = useTransform(progress, [0, 0.45, 0.63, 0.87, 1], [0, 0, 1, 1, 0.25]);
  function go(index) {
    const element = root.current;
    scrollPageTo(window.scrollY + element.getBoundingClientRect().top + (element.offsetHeight - window.innerHeight) * index / LAST_STAGE);
  }
  return <div className={`automotive-experience ${stage >= 5 && stage <= 7 ? 'is-thry' : 'is-rp'} ${stage === 0 ? 'is-hero' : ''}`} ref={root}>
    <div className="experience-world">
      <div className="experience-atmosphere" /><motion.div className="experience-warmth" style={{ opacity: warm }} />
      <div className="experience-canvas"><SceneBoundary><Suspense fallback={null}><CarScene progress={progress} stage={stage} reducedMotion={reduced} onReady={setReady} cinematic /></Suspense>{!ready && <div className="experience-loading" role="status"><span />Opening the engineering studio</div>}</SceneBoundary></div>
      <div className="experience-vignette" />
      <div className="experience-studio-note"><span>SEVEN PROCESSES. ONE SHARED PRECISION.</span></div>
      <div className="experience-object-note" aria-live="polite"><span>{stage === 0 || stage === LAST_STAGE ? 'ASSEMBLY / 001' : `COMPONENT / 00${stage}`}</span><strong>{stages[stage].part}</strong><small>{stage === 0 || stage === LAST_STAGE ? 'Explore the possibilities within.' : stages[stage].material}</small></div>
      <nav className="experience-nav" aria-label="Explore manufacturing chapters">{stages.map((s, i) => <button key={s.id} onClick={() => go(i)} aria-current={stage === i ? 'step' : undefined}><span>{String(i).padStart(2, '0')}</span><b>{s.short}</b></button>)}</nav>
      <div className="experience-baseline"><span>{ready ? 'INTERACTIVE 3D' : 'PREPARING 3D'} <i /> SCROLL TO EXPLORE</span><a href="#capabilities">Skip to project ↗</a><span>REPRESENTATIVE COMPONENT STUDIES</span></div>
      <motion.div className="experience-progress" style={{ scaleX: progress }} />
    </div>
    <div className="experience-chapters">{stages.map((s, i) => <Chapter key={s.id} index={i} progress={progress} reduced={reduced} />)}</div>
    <a className="experience-credit" href="https://sketchfab.com/models/57bf6cc56931426e87494f554df1dab6" target="_blank" rel="noreferrer">Car by vicent091036 · CC BY · modified</a>
  </div>;
}
