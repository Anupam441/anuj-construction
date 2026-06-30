import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Award, Users, Clock, ThumbsUp } from 'lucide-react';
import { SITE, STATS } from '../utils/constants.js';
import SectionHeader from '../components/common/SectionHeader.jsx';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us — Anuj Construction';
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-steel-900 py-20">
        <div className="container-custom text-center">
          <span className="badge bg-brand-600/20 text-brand-400 border border-brand-600/30 mb-4">
            Our Story
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            About Anuj Construction
          </h1>
          <p className="text-steel-300 text-lg max-w-2xl mx-auto">
            Building trust, quality, and lasting relationships since {SITE.founded}.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                badge="Who We Are"
                title="A Legacy of Quality Construction"
                subtitle=""
                center={false}
              />
              <div className="space-y-4 text-steel-600 leading-relaxed">
                <p>
                  Founded in {SITE.founded}, Anuj Construction has grown from a small local
                  contractor into one of the region's most trusted construction companies.
                  With over {SITE.experience} years of experience, we have completed hundreds
                  of projects ranging from custom homes to large commercial developments.
                </p>
                <p>
                  Our founder started with a simple belief — that every client deserves
                  honest communication, quality materials, and workmanship that stands the
                  test of time. That belief still drives everything we do today.
                </p>
                <p>
                  We are fully licensed and insured, and our team of skilled tradespeople
                  brings decades of combined experience to every project we undertake.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Work With Us <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/projects" className="btn-secondary">
                  View Projects
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80"
                alt="Anuj Construction team at work"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-600 rounded-2xl p-6 text-white shadow-xl">
                <p className="font-display font-bold text-4xl">{SITE.experience}</p>
                <p className="text-brand-100 text-sm font-medium">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-steel-50 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="card p-6 text-center">
                <p className="font-display font-bold text-3xl text-brand-600 mb-1">
                  {stat.value}
                </p>
                <p className="text-steel-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Our Values"
            title="What We Stand For"
            subtitle="These core values guide every decision we make and every project we build."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Award className="w-6 h-6" />,
                title: 'Quality',
                desc: 'We never compromise on materials or workmanship. Excellence is our standard.',
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Integrity',
                desc: 'Honest pricing, transparent communication, and keeping every promise.',
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: 'Reliability',
                desc: 'We show up on time, every time, and deliver projects on schedule.',
              },
              {
                icon: <ThumbsUp className="w-6 h-6" />,
                title: 'Satisfaction',
                desc: "Your happiness is our success. We don't stop until you love the result.",
              },
            ].map((value) => (
              <div key={value.title} className="card p-6 text-center">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-display font-bold text-steel-900 mb-2">{value.title}</h3>
                <p className="text-sm text-steel-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-steel-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80"
                alt="Construction quality"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
            <div>
              <SectionHeader
                badge="Why Choose Us"
                title="Built on Trust & Experience"
                subtitle=""
                center={false}
              />
              <ul className="space-y-4 mt-6">
                {[
                  'Licensed, bonded and fully insured',
                  'Free detailed project estimates',
                  '5-year workmanship warranty',
                  'Experienced and skilled team',
                  'On-time project delivery',
                  'Transparent pricing — no hidden costs',
                  'Premium quality materials only',
                  '24/7 customer support',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-500 shrink-0" />
                    <span className="text-steel-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-16">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            Ready to Build Together?
          </h2>
          <p className="text-brand-100 mb-8 max-w-xl mx-auto">
            Let's discuss your project and show you why hundreds of clients trust Anuj Construction.
          </p>
          <Link to="/contact" className="btn-outline text-base px-8 py-3.5">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}