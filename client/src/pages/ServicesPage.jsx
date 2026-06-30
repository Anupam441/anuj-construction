import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { servicesAPI } from '../api/index.js';
import { useFetch } from '../hooks/useFetch.js';
import SectionHeader from '../components/common/SectionHeader.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';

export default function ServicesPage() {
  const { data, loading, error } = useFetch(() => servicesAPI.getAll());

  useEffect(() => {
    document.title = 'Services — Anuj Construction';
  }, []);

  const services = data?.data || [];

  const icons = {
    building:   '🏗️',
    hammer:     '🔨',
    zap:        '⚡',
    droplets:   '💧',
    paintbrush: '🎨',
    trees:      '🌳',
    wrench:     '🔧',
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-steel-900 py-20">
        <div className="container-custom text-center">
          <span className="badge bg-brand-600/20 text-brand-400 border border-brand-600/30 mb-4">
            What We Offer
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Our Services
          </h1>
          <p className="text-steel-300 text-lg max-w-2xl mx-auto">
            From ground-up construction to detailed finishing work — Anuj Construction
            delivers quality across every trade.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-steel-50">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-steel-500">Failed to load services. Please try again.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service._id} className="card p-8 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-3xl mb-5">
                    {icons[service.icon] || '🔧'}
                  </div>
                  <h2 className="font-display font-bold text-xl text-steel-900 mb-3">
                    {service.title}
                  </h2>
                  <p className="text-steel-500 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  {service.features?.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-steel-600">
                          <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-16">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-brand-100 mb-8 max-w-xl mx-auto">
            Contact us today and we'll create a tailored plan for your project.
          </p>
          <Link to="/contact" className="btn-outline text-base px-8 py-3.5">
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}