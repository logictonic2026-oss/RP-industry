import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const contacts = [
  { icon: <Mail size={15} />, label: 'Email', val: 'info@rpgroup.in', href: 'mailto:info@rpgroup.in' },
  { icon: <Phone size={15} />, label: 'Phone', val: '+91 99999 99999', href: 'tel:+919999999999' },
  { icon: <Clock size={15} />, label: 'Hours', val: 'Mon–Sat, 9 AM – 6 PM IST' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  return (
    <div className="page-wrapper" style={{ paddingTop: 80 }}>
      <div style={{ padding: '64px 0 48px', background: 'var(--paper)', borderBottom: '1px solid var(--divider)' }}>
        <div className="container">
          <span className="overline overline-rp">Get in Touch</span>
          <span className="accent-bar accent-bar-rp" style={{ display: 'block' }} />
          <h1 className="h1" style={{ marginTop: 16 }}>Contact RP Group</h1>
          <p style={{ color: 'var(--slate)', marginTop: 12, fontSize: 17, maxWidth: 500, lineHeight: 1.65 }}>
            General inquiries, facility visits, or want to learn more? Our team will respond within 24 hours.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 40, alignItems: 'start' }}>
          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card card-rp">
              <h2 className="h3" style={{ marginBottom: 20 }}>Our Locations</h2>
              {[
                { badge: 'rp', name: 'RP Industries HQ', lines: ['Plot 42, MIDC Industrial Area', 'Pune, Maharashtra 411 019', 'India'] },
                { badge: 'thry', name: 'Thry Co Studio', lines: ['Level 2, Innovation Hub', 'Hinjewadi, Pune 411 057', 'India'] },
              ].map((loc, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: i === 0 ? 20 : 0, paddingBottom: i === 0 ? 20 : 0, borderBottom: i === 0 ? '1px solid var(--divider)' : 'none' }}>
                  <div className={`icon-circle icon-circle-${loc.badge}`} style={{ flexShrink: 0 }}>
                    <MapPin size={15} />
                  </div>
                  <div>
                    <span className={`badge badge-${loc.badge}`} style={{ marginBottom: 6, display: 'inline-flex' }}>{loc.name}</span>
                    {loc.lines.map((l, j) => <p key={j} style={{ fontSize: 13, color: 'var(--slate)', lineHeight: 1.7 }}>{l}</p>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 20, fontSize: 18 }}>Direct Contact</h3>
              {contacts.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div className="icon-circle icon-circle-rp" style={{ width: 36, height: 36 }}>{c.icon}</div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.label}</p>
                    {c.href
                      ? <a href={c.href} style={{ fontSize: 14, color: 'var(--rp-blue)', fontWeight: 500 }}>{c.val}</a>
                      : <p style={{ fontSize: 14, color: 'var(--ink)' }}>{c.val}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="card">
            {sent ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <CheckCircle size={48} color="#22c55e" style={{ margin: '0 auto 16px' }} />
                <h2 className="h3">Message Sent!</h2>
                <p style={{ color: 'var(--slate)', marginTop: 8 }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h2 className="h3" style={{ marginBottom: 24 }}>Send a Message</h2>
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="grid-2" style={{ gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input required className="form-input" placeholder="John Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input required type="email" className="form-input" placeholder="john@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input className="form-input" placeholder="How can we help?" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea required className="form-textarea" style={{ minHeight: 160 }} placeholder="Tell us about your project…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                    Send Message <Send size={15} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
