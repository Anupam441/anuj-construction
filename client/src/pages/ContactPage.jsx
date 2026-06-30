import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { contactAPI } from '../api/index.js';
import { SITE } from '../utils/constants.js';
import { useToast } from '../context/ToastContext.jsx';
import { getErrorMessage } from '../utils/helpers.js';

export default function ContactPage() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [errors,     setErrors]     = useState({});

  useEffect(() => {
    document.title = 'Contact Us — Anuj Construction';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim())    newErrors.name    = 'Name is required';
    if (!formData.email.trim())   newErrors.email   = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await contactAPI.submit(formData);
      setSubmitted(true);
      toast.success("Thank you! We'll get back to you within 24 hours.");
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-steel-900 py-20">
        <div className="container-custom text-center">
          <span className="badge bg-brand-600/20 text-brand-400 border border-brand-600/30 mb-4">
            Get In Touch
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Contact Us
          </h1>
          <p className="text-steel-300 text-lg max-w-2xl mx-auto">
            Ready to start your project? Reach out for a free consultation and quote.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-steel-900 mb-2">
                  Let's Talk
                </h2>
                <p className="text-steel-500">
                  Fill out the form or reach us directly using the information below.
                </p>
              </div>

              {[
                { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone}` },
                { icon: <Mail  className="w-5 h-5" />, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
                { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: SITE.address },
                { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: SITE.hours },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-11 h-11 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-steel-400 uppercase tracking-wide mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-steel-800 font-medium hover:text-brand-600 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-steel-800 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="card p-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-steel-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-steel-500 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="label">Full Name *</label>
                      <input
                        id="name" name="name" type="text"
                        value={formData.name} onChange={handleChange}
                        className="input-field" placeholder="John Doe"
                        aria-invalid={Boolean(errors.name)}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="label">Email Address *</label>
                      <input
                        id="email" name="email" type="email"
                        value={formData.email} onChange={handleChange}
                        className="input-field" placeholder="john@example.com"
                        aria-invalid={Boolean(errors.email)}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="label">Phone Number</label>
                      <input
                        id="phone" name="phone" type="tel"
                        value={formData.phone} onChange={handleChange}
                        className="input-field" placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="label">Service Needed</label>
                      <select
                        id="service" name="service"
                        value={formData.service} onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">Select a service</option>
                        <option value="General Construction">General Construction</option>
                        <option value="Home Renovation">Home Renovation</option>
                        <option value="Electrical Services">Electrical Services</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Painting & Finishing">Painting & Finishing</option>
                        <option value="Landscaping">Landscaping</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="label">Project Details *</label>
                    <textarea
                      id="message" name="message" rows={5}
                      value={formData.message} onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="Tell us about your project..."
                      aria-invalid={Boolean(errors.message)}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={submitting} className="btn-primary w-full">
                    {submitting ? 'Sending...' : (
                      <>Send Message <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}