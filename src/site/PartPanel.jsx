import { Component, lazy, Suspense, useCallback, useState } from 'react';
import { Rotate3D } from 'lucide-react';
const ModelView = lazy(() => import('./ModelView'));
class ModelBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p className="model-unavailable">Interactive preview unavailable.<br />Explore the component details below.</p> : this.props.children; }
}
export default function PartPanel({ service }) {
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  return <div className={`part-panel ${service.arm === 'thry' ? 'part-panel--sand' : ''}`}><div className="part-panel__top"><span>COMPONENT STUDY / {service.id.toUpperCase()}</span><Rotate3D size={19} /></div><div className="part-panel__canvas"><ModelBoundary><Suspense fallback={<span className="part-panel__loading">Preparing component…</span>}><ModelView id={service.id} onReady={onReady} /></Suspense>{!ready && <span className="part-panel__loading">Preparing component…</span>}</ModelBoundary></div><div className="part-panel__bottom"><strong>{service.part}</strong><span>Drag to inspect · Illustrative model</span></div></div>;
}
