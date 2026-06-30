import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Wrench, Star, Mail, ArrowRight } from 'lucide-react';
import { projectsAPI, servicesAPI, testimonialsAPI, contactAPI } from '../../api/index.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard — Anuj Construction Admin';
    const load = async () => {
      try {
        const [projects, services, testimonials, contacts] = await Promise.all([
          projectsAPI.getAdminAll(),
          servicesAPI.getAdminAll(),
          testimonialsAPI.getAdminAll(),
          contactAPI.getAll({ limit: 1 }),
        ]);
        setStats({
          projects:     projects.data.count,
          services:     services.data.count,
          testimonials: testimonials.data.count,
          contacts:     contacts.data.total,
          unreadContacts: contacts.data.unreadCount,
        });
      } catch {
        setStats({ projects: 0, services: 0, testimonials: 0, contacts: 0, unreadContacts: 0 });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const cards = [
    { label: 'Total Projects',     value: stats.projects,     icon: <FolderOpen className="w-6 h-6" />, color: 'bg-blue-500',   link: '/admin/projects' },
    { label: 'Active Services',    value: stats.services,     icon: <Wrench className="w-6 h-6" />,     color: 'bg-green-500',  link: '/admin/services' },
    { label: 'Testimonials',       value: stats.testimonials, icon: <Star className="w-6 h-6" />,       color: 'bg-yellow-500', link: '/admin/testimonials' },
    { label: 'Contact Inquiries',  value: stats.contacts,     icon: <Mail className="w-6 h-6" />,       color: 'bg-purple-500', link: '/admin/contacts', badge: stats.unreadContacts },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-steel-900">Dashboard</h1>
        <p className="text-steel-500 mt-1">Welcome back to Anuj Construction Admin Panel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="card p-6 hover:-translate-y-1 transition-transform duration-300 relative"
          >
            {card.badge > 0 && (
              <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {card.badge}
              </span>
            )}
            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-white mb-4`}>
              {card.icon}
            </div>
            <p className="text-3xl font-display font-bold text-steel-900 mb-1">{card.value}</p>
            <p className="text-sm text-steel-500">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-display font-bold text-lg text-steel-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/admin/projects" className="flex items-center justify-between p-4 rounded-xl border border-steel-200 hover:border-brand-300 hover:bg-brand-50 transition-all duration-200 group">
            <span className="font-medium text-steel-700 group-hover:text-brand-700">Manage Projects</span>
            <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-brand-600" />
          </Link>
          <Link to="/admin/services" className="flex items-center justify-between p-4 rounded-xl border border-steel-200 hover:border-brand-300 hover:bg-brand-50 transition-all duration-200 group">
            <span className="font-medium text-steel-700 group-hover:text-brand-700">Manage Services</span>
            <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-brand-600" />
          </Link>
          <Link to="/admin/testimonials" className="flex items-center justify-between p-4 rounded-xl border border-steel-200 hover:border-brand-300 hover:bg-brand-50 transition-all duration-200 group">
            <span className="font-medium text-steel-700 group-hover:text-brand-700">Manage Testimonials</span>
            <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-brand-600" />
          </Link>
          <Link to="/admin/contacts" className="flex items-center justify-between p-4 rounded-xl border border-steel-200 hover:border-brand-300 hover:bg-brand-50 transition-all duration-200 group">
            <span className="font-medium text-steel-700 group-hover:text-brand-700">View Inquiries</span>
            <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-brand-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}