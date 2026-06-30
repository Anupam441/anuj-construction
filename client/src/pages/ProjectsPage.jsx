import { useEffect, useState } from 'react';
import { projectsAPI } from '../api/index.js';
import { PROJECT_CATEGORIES } from '../utils/constants.js';
import SectionHeader from '../components/common/SectionHeader.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';

export default function ProjectsPage() {
  const [projects,  setProjects]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [category,  setCategory]  = useState('All');

  useEffect(() => {
    document.title = 'Projects — Anuj Construction';
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = category !== 'All' ? { category } : {};
        const res = await projectsAPI.getAll(params);
        setProjects(res.data.data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  return (
    <>
      {/* Hero */}
      <section className="bg-steel-900 py-20">
        <div className="container-custom text-center">
          <span className="badge bg-brand-600/20 text-brand-400 border border-brand-600/30 mb-4">
            Our Portfolio
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Our Projects
          </h1>
          <p className="text-steel-300 text-lg max-w-2xl mx-auto">
            Browse our completed projects — from homes to commercial buildings,
            every project tells a story of quality and dedication.
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="section-padding bg-steel-50">
        <div className="container-custom">

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-white text-steel-600 border border-steel-200 hover:border-brand-300 hover:text-brand-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🏗️</p>
              <p className="text-steel-500 text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
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
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-brand-600 text-white text-xs">Featured</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-steel-900 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-steel-500 line-clamp-2 mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-steel-400">
          {project.location && <span>📍 {project.location}</span>}
          {project.duration && <span>⏱️ {project.duration}</span>}
          {project.client   && <span>👤 {project.client}</span>}
        </div>
      </div>
    </div>
  );
}