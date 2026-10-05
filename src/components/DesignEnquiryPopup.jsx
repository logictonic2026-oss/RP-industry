import { useState, useEffect } from 'react';
import { X, MessageSquare, ArrowUpRight } from 'lucide-react';
import { companyEmail } from '../site/content';
import './DesignEnquiryPopup.css';

export default function DesignEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [showTooltip, setShowTooltip] = useState(false);

  // Show a tooltip after a few seconds to draw attention to the button
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  function compose(event) {
    event.preventDefault();
    const text = `Hello AARPEE Group,\n\nI have a design enquiry:\n\n${fields.message}\n\n${fields.name}\n${fields.email}`;
    window.location.href = `mailto:${companyEmail}?subject=${encodeURIComponent('Quick Design Enquiry')}&body=${encodeURIComponent(text)}`;
    setIsOpen(false);
  }

  return (
    <div className="design-enquiry-wrapper">
      {!isOpen && (
        <div className="enquiry-toggle-container">
          {showTooltip && <div className="enquiry-tooltip">Need a design quote?</div>}
          <button 
            className="enquiry-toggle-btn"
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
            aria-label="Open Design Enquiry"
          >
            <MessageSquare size={24} />
          </button>
        </div>
      )}

      {isOpen && (
        <div className="enquiry-popup">
          <div className="enquiry-popup-header">
            <h3>Quick Design Enquiry</h3>
            <button className="enquiry-close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <form className="enquiry-popup-form" onSubmit={compose}>
            <p>Don't have time? Send us a quick message about your design needs.</p>
            <input 
              type="text" 
              placeholder="Your name *" 
              required 
              value={fields.name} 
              onChange={e => setFields({ ...fields, name: e.target.value })} 
            />
            <input 
              type="email" 
              placeholder="Email address *" 
              required 
              value={fields.email} 
              onChange={e => setFields({ ...fields, email: e.target.value })} 
            />
            <textarea 
              placeholder="Briefly describe your requirements..." 
              required 
              rows={4} 
              value={fields.message} 
              onChange={e => setFields({ ...fields, message: e.target.value })} 
            />
            <button type="submit" className="site-button">
              Send via Email <ArrowUpRight size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
