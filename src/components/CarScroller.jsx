import { Component, lazy, Suspense, useRef, useState } from 'react';
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { manufacturingStages as stages, LAST_STAGE, stageAtProgress } from './manufacturingStages';
import { scrollPageTo } from './scrollController';
import './CarScroller.css';

const CarScene = lazy(() => import('./CarScene'));
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <div className="car-story__loading" role="status"><p>The 3D model could not load.</p><p>Explore each process using the controls below.</p><button onClick={() => window.location.reload()}>Reload preview</button></div> : this.props.children;
  }
}

export default function CarScroller() {
  const container = useRef(null);
  const reducedMotion = useReducedMotion();
  const near = useInView(container, { margin: '600px', once: true });
  const [stage, setStage] = useState(0);
  const [manualStage, setManualStage] = useState(0);
  const [modelReady, setModelReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', value => setStage(stageAtProgress(value)));
  const active = reducedMotion ? manualStage : stage;
  const current = stages[active];
  function selectStage(index) {
    if (reducedMotion) { setManualStage(index); return; }
    const element = container.current;
    const distance = element.offsetHeight - window.innerHeight;
    const top = window.scrollY + element.getBoundingClientRect().top;
    scrollPageTo(top + distance * index / LAST_STAGE);
  }
  return (
    <section id="manufacturing" ref={container} className={`car-story ${reducedMotion ? 'car-story--reduced' : ''}`} style={{ '--process-color': current.color }} aria-label="Interactive automotive manufacturing exploration">
      <div className="car-story__sticky">
        <div className="car-story__ambient" aria-hidden="true" />
        <div className="car-story__canvas" role="img" aria-label={`${current.part}. ${active === 0 || active === LAST_STAGE ? 'Assembled car' : 'Exploded car with the featured component pulled forward'}.`}>
          {near && <SceneBoundary><Suspense fallback={null}>
            <CarScene progress={scrollYProgress} stage={active} reducedMotion={reducedMotion} onReady={setModelReady} />
          </Suspense>{!modelReady && <div className="car-story__loading" role="status">Preparing the automotive studio…</div>}</SceneBoundary>}
        </div>
        <header className="car-story__top"><span><i /> INSIDE THE ENGINEERING</span><span>RP GROUP <b>/</b> AUTOMOTIVE EXPLORER</span></header>
        <div className="car-story__heading" key={current.id}>
          <p className="car-story__eyebrow">{current.eyebrow}</p>
          <h2>{current.title}</h2>
        </div>
        <div className="car-story__counter" aria-hidden="true"><strong>{String(active + 1).padStart(2, '0')}</strong><span>/ 09</span></div>
        <div className="car-story__caption" key={`caption-${current.id}`} aria-live="polite" aria-atomic="true">
          <p className="car-story__component"><span />{current.part}</p>
          <p className="car-story__description">{current.description}</p>
          <Link className="car-story__link" to={current.link}>{current.linkLabel}<ArrowUpRight size={15} /></Link>
        </div>
        <aside className="car-story__spec"><span>{active > 0 && active < LAST_STAGE ? 'FEATURED COMPONENT' : 'MANUFACTURING CAPABILITIES'}</span><strong>{current.detail}</strong><p>{current.material}</p></aside>
        <div className="car-story__bottom">
          <div className="car-story__instruction"><span><i className={modelReady ? 'is-ready' : ''} />{modelReady ? 'LIVE 3D' : 'LOADING 3D'}<span className="car-story__instruction-divider">/</span>{reducedMotion ? 'Select a process to explore' : 'Scroll to disassemble & explore'}<ArrowDown size={12} /></span><div className="car-story__arrows"><button aria-label="Previous process" disabled={active === 0} onClick={() => selectStage(active - 1)}><ChevronLeft size={18} /></button><button aria-label={active === LAST_STAGE ? 'Replay exploration' : 'Next process'} onClick={() => selectStage(active === LAST_STAGE ? 0 : active + 1)}>{active === LAST_STAGE ? <RotateCcw size={16} /> : <ChevronRight size={18} />}</button></div></div>
          <nav className="car-story__stages" aria-label="Manufacturing processes">{stages.map((item, index) => <button key={item.id} aria-current={active === index ? 'step' : undefined} onClick={() => selectStage(index)}><span>{String(index).padStart(2, '0')}</span>{item.short}<i /></button>)}</nav>
          <div className="car-story__footnote"><span>Representative components and process applications.</span><a className="car-story__skip" href="#capabilities">Skip to capabilities ↓</a><a href="https://sketchfab.com/models/57bf6cc56931426e87494f554df1dab6" target="_blank" rel="noreferrer">Car: vicent091036 · CC BY · modified</a></div>
        </div>
        {!reducedMotion && <motion.div className="car-story__progress" style={{ scaleX: scrollYProgress }} />}
      </div>
    </section>
  );
}
