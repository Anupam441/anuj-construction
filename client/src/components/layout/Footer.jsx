import { Link } from 'react-router-dom';
import { HardHat, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Clock } from 'lucide-react';
import { SITE, NAV_LINKS } from '../../utils/constants.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-steel-900 text-steel-300">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
                <HardHat className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="block font-display font-bold text-white text-base">Anuj</span>
                <span className="block text-xs font-semibold text-brand-400 tracking-widest uppercase -mt-0.5">
                  Construction
                </span>
              </div>
            </Link>
            <p className="text-sm text-steel-400 leading-relaxed mb-5">
              Building excellence since {SITE.founded}. Your trusted partner for quality construction and renovation services.
            </p>
            <div className="flex gap-3">
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-steel-800 rounded-lg flex items-center justify-center text-steel-400 hover:bg-brand-600 hover:text-white transition-all duration-200">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-steel-800 rounded-lg flex items-center justify-center text-steel-400 hover:bg-brand-600 hover:text-white transition-all duration-200">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-steel-800 rounded-lg flex items-center justify-center text-steel-400 hover:bg-brand-600 hover:text-white transition-all duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-steel-400 hover:text-brand-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                'General Construction',
                'Home Renovation',
                'Electrical Services',
                'Plumbing',
                'Painting & Finishing',
                'Landscaping',
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm text-steel-400 hover:text-brand-400 transition-colors duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <Phone className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <a href={`tel:${SITE.phone}`}
                  className="text-sm text-steel-400 hover:text-brand-400 transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <a href={`mailto:${SITE.email}`}
                  className="text-sm text-steel-400 hover:text-brand-400 transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <span className="text-sm text-steel-400">{SITE.address}</span>
              </li>
              <li className="flex gap-3 items-start">
                <Clock className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <span className="text-sm text-steel-400">{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-steel-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-steel-500">
            © {year} Anuj Construction. All rights reserved.
          </p>
          <p className="text-xs text-steel-500">{SITE.license}</p>
        </div>
      </div>
    </footer>
  );
}