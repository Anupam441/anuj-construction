import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Phone } from 'lucide-react';
import { projectsAPI, servicesAPI, testimonialsAPI } from '../api/index.js';
import { SITE, STATS } from '../utils/constants.js';
import { getStars } from '../utils/helpers.js';
import SectionHeader from '../components/common/SectionHeader.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';

export default function HomePage() {
  const [services,     setServices]     = useState([]);
  const [projects,     setProjects]     = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    document.title = 'Anuj Construction — Building Dreams, Delivering Excellence';
    const load = async () => {
      try {
        const [svc, prj, tst] = await Promise.all([
          servicesAPI.getAll(),
          projectsAPI.getAll({ featured: true, limit: 6 }),
          testimonialsAPI.getAll(),
        ]);
        setServices(svc.data.data.slice(0, 6));
        setProjects(prj.data.data.slice(0, 6));
        setTestimonials(tst.data.data.slice(0, 3));
      } catch { }
      finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center bg-steel-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900/95 via-steel-900/80 to-steel-900/40" />

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-600/20 text-brand-400 border border-brand-600/30 mb-6">
              🏗️ Trusted Since {SITE.founded}
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Building Dreams,<br />
              <span className="text-brand-500">Delivering Excellence</span>
            </h1>
            <p className="text-lg text-steel-300 mb-8 max-w-xl leading-relaxed">
              Anuj Construction brings {SITE.experience} years of craftsmanship to every project —
              from ground-up builds to expert renovations. Quality you can trust, results you'll love.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/contact" className="btn-primary text-base px-7 py-3.5">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/projects" className="btn-outline text-base px-7 py-3.5">
                View Our Work
              </Link>
            </div>

            <div className="flex flex-wrap gap-5">
              {['Licensed & Insured', 'Free Estimates', '5-Year Warranty', '24/7 Support'].map((b) => (
                <div key={b} className="flex items-center gap-2 text-steel-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand-600 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-3xl md:text-4xl text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-brand-100 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding bg-steel-50">
        <div className="container-custom">
          <SectionHeader
            badge="What We Do"
            title="Complete Construction Solutions"
            subtitle="From the foundation up — we handle every aspect of your construction and renovation needs."
          />
          {loading ? (
            <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => (
                <ServiceCard key={svc._id} service={svc} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/services" className="btn-secondary">
              All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                badge="Why Choose Us"
                title="The Anuj Construction Difference"
                subtitle="We don't just build structures — we build relationships and results that stand the test of time."
                center={false}
              />
              <ul className="mt-8 space-y-5">
                {[
                  { title: 'Experienced Team',    desc: `${SITE.experience} years of hands-on construction experience.` },
                  { title: 'Quality Materials',   desc: 'We source only premium materials from trusted suppliers.' },
                  { title: 'On-Time Delivery',    desc: 'We respect your time. Projects finish when promised.' },
                  { title: 'Transparent Pricing', desc: 'Detailed quotes. No hidden fees, no surprise costs.' },
                  { title: 'Full Warranty',       desc: '5-year workmanship warranty on all construction work.' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-steel-900">{item.title}</h3>
                      <p className="text-sm text-steel-500 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80"
                alt="Anuj Construction team"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-5">
                <p className="font-display font-bold text-3xl text-brand-600">{SITE.experience}</p>
                <p className="text-sm text-steel-600 font-medium">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section-padding bg-steel-50">
        <div className="container-custom">
          <SectionHeader
            badge="Our Portfolio"
            title="Recent Projects"
            subtitle="A look at some of the work we're most proud of."
          />
          {loading ? (
            <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/projects" className="btn-primary">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeader
              badge="Client Reviews"
              title="What Our Clients Say"
              subtitle="Real feedback from real clients."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <TestimonialCard key={t._id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-steel-900 py-16">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-steel-300 mb-8 max-w-xl mx-auto">
            Contact Anuj Construction today for a free consultation and detailed quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary text-base px-8 py-3.5">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`tel:${SITE.phone}`} className="btn-outline text-base px-8 py-3.5">
              <Phone className="w-4 h-4" /> Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ service }) {
  const icons = {
    building: '🏗️', hammer: '🔨', zap: '⚡',
    droplets: '💧', paintbrush: '🎨', trees: '🌳', wrench: '🔧',
  };
  return (
    <div className="card p-6 hover:-translate-y-1 transition-transform duration-300">
      <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-2xl mb-4">
        {icons[service.icon] || '🔧'}
      </div>
      <h3 className="font-display font-semibold text-lg text-steel-900 mb-2">{service.title}</h3>
      <p className="text-sm text-steel-500 leading-relaxed mb-4">{service.shortDescription}</p>
      <ul className="space-y-1">
        {service.features?.slice(0, 3).map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-steel-500">
            <CheckCircle className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ project }) {
  const primary = project.images?.find((i) => i.isPrimary) || project.images?.[0];
  return (
    <div className="card group overflow-hidden">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={primary?.url || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80'}
          alt={primary?.alt || project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="badge-brand text-xs">{project.category}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-steel-900 mb-1">{project.title}</h3>
        <p className="text-sm text-steel-500 line-clamp-2">{project.description}</p>
        {project.location && (
          <p className="text-xs text-steel-400 mt-2">📍 {project.location}</p>
        )}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const stars = getStars(testimonial.rating);
  return (
    <div className="card p-6">
      <div className="flex gap-1 mb-3">
        {stars.map((s, i) => (
          <Star key={i} className={`w-4 h-4 ${s === 'full' ? 'fill-brand-500 text-brand-500' : 'text-steel-200'}`} />
        ))}
      </div>
      <p className="text-steel-600 text-sm leading-relaxed mb-5 italic">"{testimonial.review}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-700 text-sm shrink-0">
          {testimonial.name[0].toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-steel-900 text-sm">{testimonial.name}</p>
          <p className="text-xs text-steel-400">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}