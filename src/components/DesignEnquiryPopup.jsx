import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, MessageSquare, ArrowUpRight, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { companyEmail } from '../site/content';
import './DesignEnquiryPopup.css';

export default function DesignEnquiryPopup() {
  const { pathname } = useLocation();
  const [fields, setFields] = useState({ name: '', email: '', phone: '', message: '' });
  return <EnquiryPrompt key={pathname} fields={fields} setFields={setFields} />;
}

function EnquiryPrompt({ fields, setFields }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [notice, setNotice] = useState('');
  const nameInput = useRef(null);
  const launcher = useRef(null);
  const drawer = useRef(null);

  const closeEnquiry = useCallback(() => {
    setIsExpanded(false);
    requestAnimationFrame(() => launcher.current?.focus({ preventScroll: true }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), 3000);
    let lastScroll = window.scrollY;
    const hideOnScroll = () => {
      if (Math.abs(window.scrollY - lastScroll) < 8) return;
      lastScroll = window.scrollY;
      clearTimeout(timer);
      if (drawer.current?.contains(document.activeElement)) closeEnquiry();
      else setIsExpanded(false);
    };
    window.addEventListener('scroll', hideOnScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', hideOnScroll);
    };
  }, [closeEnquiry]);

  useEffect(() => {
    if (!isExpanded) return;
    if (isOpen) nameInput.current?.focus({ preventScroll: true });
    const escape = event => {
      if (event.key === 'Escape') closeEnquiry();
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [isOpen, isExpanded, closeEnquiry]);

  function openEnquiry() {
    setNotice('');
    setIsOpen(true);
    setIsExpanded(true);
  }

  function update(event) {
    setFields(previous => ({ ...previous, [event.target.name]: event.target.value }));
    setNotice('');
  }

  function compose(event) {
    event.preventDefault();
    const text = `Hello AARPEE Group,\n\nI would like to discuss a project:\n\n${fields.message}\n\nName: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone || 'Not provided'}\nEnquiry page: ${window.location.href}`;
    window.location.href = `mailto:${companyEmail}?subject=${encodeURIComponent('Project enquiry - AARPEE Group')}&body=${encodeURIComponent(text)}`;
    setNotice('Your email draft is ready. Complete sending in your email app.');
  }

  return (
    <aside className={`design-enquiry-wrapper${isExpanded ? ' is-expanded' : ''}`} aria-label="Project enquiry">
      <button ref={launcher} type="button" className="enquiry-launcher" aria-label={isExpanded ? 'Hide enquiry slider' : 'Open enquiry slider'} aria-controls="quick-enquiry" aria-expanded={isExpanded} aria-haspopup="dialog" onClick={isExpanded ? closeEnquiry : openEnquiry}>
        <MessageSquare size={18} /><span>Enquiry</span>{isExpanded ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
      </button>
      <section ref={drawer} className={`enquiry-drawer${isOpen ? ' enquiry-popup' : ''}`} id="quick-enquiry" inert={!isExpanded} role={isOpen ? 'dialog' : undefined} aria-labelledby={isOpen ? 'enquiry-title' : 'enquiry-prompt-title'} aria-describedby={isOpen ? 'enquiry-description' : undefined} data-lenis-prevent>
      {isOpen ? (
        <>
          <div className="enquiry-popup-header">
            <div>
              <span className="enquiry-kicker">LET'S MAKE IT HAPPEN</span>
              <h2 id="enquiry-title">Tell us about your project.</h2>
            </div>
            <button type="button" className="enquiry-close-btn" aria-label="Close enquiry form" onClick={closeEnquiry}><X size={19} /></button>
          </div>
          <form className="enquiry-popup-form" onSubmit={compose}>
            <p id="enquiry-description">A part, a prototype or an idea. Share your requirements with our team.</p>
            <label htmlFor="enquiry-name">Your name *<input ref={nameInput} id="enquiry-name" name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={update} placeholder="Full name" /></label>
            <label htmlFor="enquiry-email">Email address *<input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={200} value={fields.email} onChange={update} placeholder="you@company.com" /></label>
            <label htmlFor="enquiry-phone">Phone (optional)<input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} value={fields.phone} onChange={update} placeholder="Your contact number" /></label>
            <label htmlFor="enquiry-message">What do you need? *<textarea id="enquiry-message" name="message" required maxLength={2000} rows={3} value={fields.message} onChange={update} placeholder="Part or process, quantity and timeline..." /></label>
            <button type="submit" className="site-button enquiry-submit">Prepare enquiry email <Mail size={17} /></button>
            <p className="enquiry-email-note">Opens your email app for you to send. You can attach drawings there.</p>
            {notice && <p className="enquiry-notice" role="status">{notice} If your email app did not open, contact <a href={`mailto:${companyEmail}`}>{companyEmail}</a>.</p>}
            <Link className="enquiry-detail-link" to="/rfq" onClick={() => setIsExpanded(false)}>Have detailed requirements? Build a project brief <ArrowUpRight size={14} /></Link>
          </form>
        </>
      ) : (
        <div className="enquiry-notification">
          <button type="button" className="enquiry-dismiss" aria-label="Hide enquiry slider" onClick={closeEnquiry}><X size={18} /></button>
          <span className="enquiry-notification-icon" aria-hidden="true"><MessageSquare size={21} /></span>
          <span className="enquiry-kicker">HAVE A PROJECT IN MIND?</span>
          <div className="enquiry-notification-copy"><h2 id="enquiry-prompt-title">Your next part<br />starts here.</h2><p>Machining, prototyping or production. Share your idea with our team.</p></div>
          <button type="button" className="enquiry-bar-action" onClick={openEnquiry}>Enquire now <ArrowUpRight size={17} /></button>
          <span className="enquiry-prompt-note">A drawing, a model or just an idea.</span>
        </div>
      )}
      </section>
    </aside>
  );
}
