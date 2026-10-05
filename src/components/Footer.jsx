import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Globe, Share2 } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__inner">

          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo-link">
              <img src="/aarpee-group-logo.png" alt="AARPEE Group" className="footer__logo" />
            </Link>
            <p className="footer__tagline">
              Precision Machining + Rapid Prototyping.<br />
              30 years of engineering trust, unified under one roof.
            </p>
            <div className="footer__contact-list">
              <a href="mailto:info@rpgroup.in" className="footer__contact-item">
                <Mail size={14} /> info@rpgroup.in
              </a>
              <a href="tel:+919999999999" className="footer__contact-item">
                <Phone size={14} /> +91 99999 99999
              </a>
              <span className="footer__contact-item">
                <MapPin size={14} /> Pune, Maharashtra, India
              </span>
            </div>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Website"><Globe size={15} /></a>
              <a href="#" className="footer__social" aria-label="Share"><Share2 size={15} /></a>
            </div>
          </div>

          {/* AARPEE Industries */}
          <div className="footer__col">
            <div className="footer__col-heading footer__col-heading--rp">AARPEE Industries</div>
            <ul className="footer__links">
              <li><Link to="/aarpee-industries">Overview</Link></li>
              <li><Link to="/aarpee-industries/vmc">VMC Machining</Link></li>
              <li><Link to="/aarpee-industries/billet">Billet Machining</Link></li>
              <li><Link to="/aarpee-industries/rubber">Rubber Components</Link></li>
              <li><Link to="/aarpee-industries/jigs">Jigs & Fixtures</Link></li>
            </ul>
          </div>

          {/* Thry Co */}
          <div className="footer__col">
            <div className="footer__col-heading footer__col-heading--thry">Thry Co</div>
            <ul className="footer__links">
              <li><Link to="/tryco">Overview</Link></li>
              <li><Link to="/tryco/fdm">FDM Printing</Link></li>
              <li><Link to="/tryco/sla">SLA Printing</Link></li>
              <li><Link to="/tryco/sls">SLS Printing</Link></li>
              <li><Link to="/tryco/portfolio">Portfolio</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer__col">
            <div className="footer__col-heading">Company</div>
            <ul className="footer__links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/sectors">Sectors Served</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
            <Link to="/rfq" className="btn btn-primary footer__rfq-btn">
              Request a Quote <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} AARPEE Group. All rights reserved. AARPEE Industries &amp; Thry Co.</p>
          <p>Precision Machining + Rapid Prototyping — Pune, India.</p>
        </div>
      </div>
    </footer>
  );
}
