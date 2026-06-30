import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { servicesAPI } from '../../api/index.js';
import { useToast } from '../../context/ToastContext.jsx';
import { getErrorMessage } from '../../utils/helpers.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const emptyForm = {
  title: '', shortDescription: '', description: '',
  icon: 'wrench', featuresText: '', isActive: true,
};

const ICONS = ['building', 'hammer', 'zap', 'droplets', 'paintbrush', 'trees', 'wrench'];

export default function AdminServices() {
  const toast = useToast();
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = 'Manage Services — Anuj Construction Admin';
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await servicesAPI.getAdminAll();
      setServices(res.data.data);
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

  const openEdit = (service) => {
    setForm({
      title: service.title,
      shortDescription: service.shortDescription,
      description: service.description,
      icon: service.icon,
      featuresText: (service.features || []).join('\n'),
      isActive: service.isActive,
    });
    setEditingId(service._id);
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
        shortDescription: form.shortDescription,
        description: form.description,
        icon: form.icon,
        isActive: form.isActive,
        features: form.featuresText.split('\n').map((f) => f.trim()).filter(Boolean),
      };

      if (editingId) {
        await servicesAPI.update(editingId, payload);
        toast.success('Service updated successfully.');
      } else {
        await servicesAPI.create(payload);
        toast.success('Service created successfully.');
      }
      setModalOpen(false);
      loadServices();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await servicesAPI.delete(id);
      toast.success('Service deleted.');
      loadServices();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const iconEmojis = {
    building: '🏗️', hammer: '🔨', zap: '⚡',
    droplets: '💧', paintbrush: '🎨', trees: '🌳', wrench: '🔧',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-steel-900">Services</h1>
          <p className="text-steel-500 mt-1">Manage the services you offer.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : services.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-steel-500">No services yet. Click "Add Service" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div key={service._id} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-2xl">
                  {iconEmojis[service.icon] || '🔧'}
                </div>
                {!service.isActive && (
                  <span className="badge-steel text-xs">Inactive</span>
                )}
              </div>
              <h3 className="font-semibold text-steel-900 mb-1">{service.title}</h3>
              <p className="text-xs text-steel-500 line-clamp-2 mb-4">{service.shortDescription}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(service)} className="flex-1 btn-secondary text-xs py-2">
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => handleDelete(service._id)} className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs py-2 font-semibold flex items-center justify-center gap-1.5 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
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
                {editingId ? 'Edit Service' : 'Add New Service'}
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
                <label className="label">Short Description *</label>
                <input name="shortDescription" value={form.shortDescription} onChange={handleChange} required className="input-field" />
              </div>

              <div>
                <label className="label">Full Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="input-field resize-none" />
              </div>

              <div>
                <label className="label">Icon</label>
                <select name="icon" value={form.icon} onChange={handleChange} className="input-field">
                  {ICONS.map((icon) => (
                    <option key={icon} value={icon}>{iconEmojis[icon]} {icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Features (one per line)</label>
                <textarea name="featuresText" value={form.featuresText} onChange={handleChange} rows={4} className="input-field resize-none" placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
              </div>

              <label className="flex items-center gap-2 text-sm text-steel-700">
                <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="rounded border-steel-300" />
                Active (visible on website)
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? 'Saving...' : editingId ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}