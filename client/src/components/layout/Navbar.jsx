import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, HardHat, Phone } from 'lucide-react';
import { NAV_LINKS, SITE } from '../../utils/constants.js';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
              <HardHat className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="block font-display font-bold text-steel-900 text-base">Anuj</span>
              <span className="block text-xs font-semibold text-brand-600 tracking-widest uppercase -mt-0.5">Construction</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.path} to={link.path} end={link.path === '/'} className="text-sm font-medium text-steel-700 hover:text-brand-600 transition-colors duration-200">
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={'tel:' + SITE.phone} className="flex items-center gap-2 text-sm font-medium text-steel-600 hover:text-brand-600">
              <Phone className="w-4 h-4" />
              {SITE.phone}
            </a>
            <Link to="/contact" className="btn-primary text-sm px-4 py-2">
              Free Quote
            </Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-steel-700 hover:bg-steel-100">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-steel-100 py-4">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.path} to={link.path} end={link.path === '/'} onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-steel-700 hover:bg-steel-50">
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-3 px-4 flex flex-col gap-2">
                <a href={'tel:' + SITE.phone} className="flex items-center gap-2 text-sm font-medium text-steel-600">
                  <Phone className="w-4 h-4" />
                  {SITE.phone}
                </a>
                <Link to="/contact" onClick={() => setMenuOpen(false)} className="btn-primary text-sm">
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}