import { useState, useRef } from 'react';
import { Settings, Zap, HelpCircle, CheckCircle, ArrowRight, FileUp, X } from 'lucide-react';
import './RFQ.css';

const processOptions = [
  { id: 'cnc',  icon: <Settings size={28} />, label: 'CNC Machining',    sub: 'VMC · Billet · Rubber · Jigs', color: 'rp',  arm: 'RP Industries' },
  { id: '3dp',  icon: <Zap size={28} />,      label: '3D Printing',      sub: 'FDM · SLA · SLS',              color: 'thry',arm: 'Thry Co' },
  { id: 'help', icon: <HelpCircle size={28} />,label: 'Help Me Choose',   sub: "We'll guide you",              color: 'neutral', arm: 'Joint Assessment' },
];

const materials = ['Metal (Aluminium)', 'Metal (Steel)', 'Metal (Titanium)', 'Plastic (ABS)', 'Plastic (PLA)', 'Plastic (PETG)', 'Rubber / Silicone', 'Resin', 'Nylon Powder', 'Other'];
const endUses   = ['Automotive Under-hood', 'Automotive Exterior', 'Indoor Art Display', 'Outdoor Art Installation', 'Rapid Prototype', 'End-Use Functional Part', 'Medical / Dental Model', 'Other'];
const STEPS     = ['Process', 'Files', 'Requirements', 'Review'];

export default function RFQ() {
  const [step,    setStep]    = useState(0);
  const [process, setProcess] = useState(null);
  const [files,   setFiles]   = useState([]);
  const [dragging,setDragging]= useState(false);
  const [form,    setForm]    = useState({ name:'', email:'', company:'', phone:'', quantity:'', material:'', endUse:'', notes:'' });
  const [done,    setDone]    = useState(false);
  const fileRef = useRef();

  const addFiles = (list) => setFiles(p => [...p, ...Array.from(list)]);

  if (done) return (
    <div className="page-wrapper rfq-page rfq-success">
      <CheckCircle size={56} color="#22c55e" />
      <h1 className="h2" style={{ marginTop: 20, marginBottom: 12 }}>Quote Request Submitted!</h1>
      <p style={{ color: 'var(--slate)', maxWidth: 440, textAlign: 'center', lineHeight: 1.65 }}>
        Routed to <strong>{processOptions.find(p => p.id === process)?.arm}</strong>.
        We'll respond within 24 hours.
      </p>
      <div className="rfq-ref">RFQ-{Math.random().toString(36).substring(2,8).toUpperCase()}</div>
    </div>
  );

  return (
    <div className="page-wrapper rfq-page">
      {/* Header */}
      <div className="rfq-header">
        <div className="container">
          <span className="overline overline-rp">Smart Intake Portal</span>
          <span className="accent-bar accent-bar-rp" style={{ display: 'block' }} />
          <h1 className="h1" style={{ marginTop: 16 }}>Request a Quote</h1>
          <p style={{ color: 'var(--slate)', marginTop: 12, fontSize: 17, maxWidth: 520, lineHeight: 1.65 }}>
            Smart routing sends CNC requests to RP Industries and 3D print requests to Thry Co automatically.
          </p>
        </div>
      </div>

      <div className="container rfq-body">
        {/* Step indicators */}
        <div className="rfq-steps">
          {STEPS.map((s, i) => (
            <div key={i} className={`rfq-step-ind ${i === step ? 'rfq-step-ind--active' : ''} ${i < step ? 'rfq-step-ind--done' : ''}`}>
              <div className="rfq-step-ind__dot">
                {i < step ? <CheckCircle size={13} /> : <span>{i + 1}</span>}
              </div>
              <span className="rfq-step-ind__label">{s}</span>
              {i < STEPS.length - 1 && <div className="rfq-step-ind__line" />}
            </div>
          ))}
        </div>

        <div className="rfq-panel">
          {/* STEP 0 — Process */}
          {step === 0 && (
            <div>
              <h2 className="h2" style={{ marginBottom: 8 }}>What process do you need?</h2>
              <p style={{ color: 'var(--slate)', marginBottom: 32 }}>Not sure? Select "Help Me Choose."</p>
              <div className="rfq-process-grid">
                {processOptions.map(opt => (
                  <button
                    key={opt.id}
                    id={`process-${opt.id}`}
                    className={`rfq-proc-card ${process === opt.id ? `rfq-proc-card--${opt.color}` : ''}`}
                    onClick={() => setProcess(opt.id)}
                  >
                    <div className={`rfq-proc-card__icon rfq-proc-icon--${opt.color}`}>{opt.icon}</div>
                    <div className="rfq-proc-card__label">{opt.label}</div>
                    <div className="rfq-proc-card__sub">{opt.sub}</div>
                    {process === opt.id && <CheckCircle size={16} className="rfq-proc-card__check" />}
                  </button>
                ))}
              </div>
              <div className="rfq-nav">
                <div />
                <button className="btn btn-primary" disabled={!process} onClick={() => setStep(1)}>
                  Next: Upload Files <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 1 — Files */}
          {step === 1 && (
            <div>
              <h2 className="h2" style={{ marginBottom: 8 }}>Upload Your Files</h2>
              <p style={{ color: 'var(--slate)', marginBottom: 32 }}>Accepted: STEP, IGES, STL, OBJ, PDF, DWG</p>
              <div
                className={`rfq-drop ${dragging ? 'rfq-drop--over' : ''}`}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} type="file" multiple accept=".step,.stp,.iges,.igs,.stl,.obj,.pdf,.dwg" onChange={e => addFiles(e.target.files)} style={{ display: 'none' }} />
                <FileUp size={36} style={{ color: 'var(--rp-blue)', marginBottom: 12 }} />
                <p style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Drop files here or click to browse</p>
                <p style={{ fontSize: 13, color: 'var(--slate)' }}>STEP · IGES · STL · OBJ · PDF · DWG</p>
              </div>
              {files.length > 0 && (
                <div className="rfq-file-list">
                  {files.map((f, i) => (
                    <div key={i} className="rfq-file-item">
                      <span style={{ flex: 1, fontSize: 14, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                      <span style={{ fontSize: 12, color: 'var(--slate)', flexShrink: 0 }}>{(f.size / 1024).toFixed(1)} KB</span>
                      <button onClick={() => setFiles(p => p.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate)', display: 'flex', padding: 4 }}><X size={14} /></button>
                    </div>
                  ))}
                </div>
              )}
              <div className="rfq-nav">
                <button className="btn btn-outline" onClick={() => setStep(0)}>Back</button>
                <button className="btn btn-primary" onClick={() => setStep(2)}>Next: Requirements <ArrowRight size={15} /></button>
              </div>
            </div>
          )}

          {/* STEP 2 — Requirements */}
          {step === 2 && (
            <div>
              <h2 className="h2" style={{ marginBottom: 8 }}>Project Requirements</h2>
              <p style={{ color: 'var(--slate)', marginBottom: 32 }}>Help us understand your project scope for accurate quoting.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="grid-2" style={{ gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input className="form-input" placeholder="John Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" className="form-input" placeholder="john@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input className="form-input" placeholder="Acme Ltd" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input className="form-input" placeholder="e.g. 500 (1 to 100,000+)" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Material</label>
                    <select className="form-select" value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))}>
                      <option value="">Select material…</option>
                      {materials.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">End-Use Environment</label>
                    <select className="form-select" value={form.endUse} onChange={e => setForm(f => ({ ...f, endUse: e.target.value }))}>
                      <option value="">Select environment…</option>
                      {endUses.map(e => <option key={e}>{e}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Additional Notes</label>
                  <textarea className="form-textarea" placeholder="Tolerances, surface finish, timeline, special requirements…" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                </div>
              </div>
              <div className="rfq-nav">
                <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary" disabled={!form.name || !form.email} onClick={() => setStep(3)}>Review & Submit <ArrowRight size={15} /></button>
              </div>
            </div>
          )}

          {/* STEP 3 — Review */}
          {step === 3 && (
            <div>
              <h2 className="h2" style={{ marginBottom: 8 }}>Review Your Request</h2>
              <p style={{ color: 'var(--slate)', marginBottom: 32 }}>
                Routing to: <strong style={{ color: process === '3dp' ? 'var(--thry-beige)' : 'var(--rp-blue)' }}>{processOptions.find(p => p.id === process)?.arm}</strong>
              </p>
              <div className="rfq-review">
                {[
                  ['Process', processOptions.find(p => p.id === process)?.label],
                  ['Files', files.length > 0 ? files.map(f => f.name).join(', ') : 'None uploaded'],
                  ['Contact', [form.name, form.email, form.company].filter(Boolean).join(' · ')],
                  form.quantity && ['Quantity', form.quantity],
                  form.material && ['Material', form.material],
                  form.endUse && ['End-Use', form.endUse],
                  form.notes && ['Notes', form.notes],
                ].filter(Boolean).map(([label, value], i) => (
                  <div key={i} className="rfq-review__row">
                    <span className="rfq-review__label">{label}</span>
                    <span className="rfq-review__value">{value}</span>
                  </div>
                ))}
              </div>
              <div className="rfq-nav">
                <button className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                <button className="btn btn-primary" onClick={() => setDone(true)}>Submit RFQ <ArrowRight size={15} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
