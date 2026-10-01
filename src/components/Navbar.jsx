import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'RP Industries',
    path: '/rp-industries',
    color: 'rp',
    children: [
      { label: 'Overview', path: '/rp-industries' },
      { label: 'VMC Machining', path: '/rp-industries/vmc' },
      { label: 'Billet Machining', path: '/rp-industries/billet' },
      { label: 'Rubber Components', path: '/rp-industries/rubber' },
      { label: 'Jigs & Fixtures', path: '/rp-industries/jigs' },
    ],
  },
  {
    label: 'Thry Co',
    path: '/tryco',
    color: 'thry',
    children: [
      { label: 'Overview', path: '/tryco' },
      { label: 'FDM Printing', path: '/tryco/fdm' },
      { label: 'SLA Printing', path: '/tryco/sla' },
      { label: 'SLS Printing', path: '/tryco/sls' },
      { label: 'Portfolio', path: '/tryco/portfolio' },
    ],
  },
  { label: 'About', path: '/about' },
  { label: 'Sectors', path: '/sectors' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">

        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
          <img
            src="/rp-group-logo.png"
            alt="RP Group — RP Industries | Thry Co"
            className="navbar__logo-img"
          />
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          {navItems.map((item) => (
            <li
              key={item.path}
              className="navbar__item"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''} ${item.color === 'thry' ? 'navbar__link--thry' : ''}`
                }
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    size={13}
                    className={`navbar__chevron ${openDropdown === item.label ? 'navbar__chevron--open' : ''}`}
                  />
                )}
              </NavLink>

              {item.children && openDropdown === item.label && (
                <div className={`navbar__dropdown ${item.color === 'thry' ? 'navbar__dropdown--thry' : ''}`}>
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className="navbar__dropdown-link"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="navbar__cta">
          <Link to="/rfq" className="btn btn-primary navbar__cta-btn">
            Request Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar__mobile">
          <div className="container">
            {navItems.map((item) => (
              <div key={item.path} className="navbar__mobile-item">
                {item.children ? (
                  <>
                    <button
                      className={`navbar__mobile-link navbar__mobile-toggle ${item.color === 'thry' ? 'navbar__mobile-link--thry' : ''}`}
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none', transition: '0.2s' }}
                      />
                    </button>
                    {mobileExpanded === item.label && (
                      <div className="navbar__mobile-children">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className="navbar__mobile-child"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className="navbar__mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
            <div style={{ marginTop: 'var(--sp-6)', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--divider)' }}>
              <Link
                to="/rfq"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setMobileOpen(false)}
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
