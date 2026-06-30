import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { projectsAPI } from '../../api/index.js';
import { useToast } from '../../context/ToastContext.jsx';
import { getErrorMessage } from '../../utils/helpers.js';
import { PROJECT_CATEGORIES } from '../../utils/constants.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const emptyForm = {
  title: '', description: '', category: 'Residential',
  client: '', location: '', duration: '',
  imageUrl: '', featured: false, isPublished: true,
};

export default function AdminProjects() {
  const toast = useToast();
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = 'Manage Projects — Anuj Construction Admin';
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await projectsAPI.getAdminAll();
      setProjects(res.data.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      category: project.category,
      client: project.client || '',
      location: project.location || '',
      duration: project.duration || '',
      imageUrl: project.images?.[0]?.url || '',
      featured: project.featured,
      isPublished: project.isPublished,
    });
    setEditingId(project._id);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        category: form.category,
        client: form.client,
        location: form.location,
        duration: form.duration,
        featured: form.featured,
        isPublished: form.isPublished,
        images: form.imageUrl ? [{ url: form.imageUrl, alt: form.title, isPrimary: true }] : [],
      };

      if (editingId) {
        await projectsAPI.update(editingId, payload);
        toast.success('Project updated successfully.');
      } else {
        await projectsAPI.create(payload);
        toast.success('Project created successfully.');
      }
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsAPI.delete(id);
      toast.success('Project deleted.');
      loadProjects();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-steel-900">Projects</h1>
          <p className="text-steel-500 mt-1">Manage your portfolio projects.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : projects.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-steel-500">No projects yet. Click "Add Project" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div key={project._id} className="card overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img
                  src={project.images?.[0]?.url || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.featured && (
                  <span className="absolute top-2 right-2 bg-brand-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Featured
                  </span>
                )}
                {!project.isPublished && (
                  <span className="absolute top-2 left-2 bg-steel-700 text-white text-xs px-2 py-1 rounded-full">
                    Draft
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-brand-600 font-semibold mb-1">{project.category}</p>
                <h3 className="font-semibold text-steel-900 mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-xs text-steel-500 line-clamp-2 mb-3">{project.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(project)} className="flex-1 btn-secondary text-xs py-2">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs py-2 font-semibold flex items-center justify-center gap-1.5 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-steel-100 sticky top-0 bg-white">
              <h2 className="font-display font-bold text-lg text-steel-900">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-steel-400 hover:text-steel-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="label">Title *</label>
                <input name="title" value={form.title} onChange={handleChange} required className="input-field" />
              </div>

              <div>
                <label className="label">Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="input-field resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Category *</label>
                  <select name="category" value={form.category} onChange={handleChange} className="input-field">
                    {PROJECT_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Client</label>
                  <input name="client" value={form.client} onChange={handleChange} className="input-field" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Location</label>
                  <input name="location" value={form.location} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="label">Duration</label>
                  <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 6 weeks" className="input-field" />
                </div>
              </div>

              <div>
                <label className="label">Image URL</label>
                <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." className="input-field" />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-steel-700">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="rounded border-steel-300" />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-steel-700">
                  <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} className="rounded border-steel-300" />
                  Published
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? 'Saving...' : editingId ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}