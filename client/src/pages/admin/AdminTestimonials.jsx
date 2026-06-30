import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { testimonialsAPI } from '../../api/index.js';
import { useToast } from '../../context/ToastContext.jsx';
import { getErrorMessage } from '../../utils/helpers.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const emptyForm = {
  name: '', role: 'Homeowner', rating: 5,
  review: '', project: '', isPublished: true,
};

export default function AdminTestimonials() {
  const toast = useToast();
  const [testimonials, setTestimonials] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = 'Manage Testimonials — Anuj Construction Admin';
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const res = await testimonialsAPI.getAdminAll();
      setTestimonials(res.data.data);
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

  const openEdit = (t) => {
    setForm({
      name: t.name, role: t.role, rating: t.rating,
      review: t.review, project: t.project || '', isPublished: t.isPublished,
    });
    setEditingId(t._id);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'rating' ? Number(value) : value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await testimonialsAPI.update(editingId, form);
        toast.success('Testimonial updated successfully.');
      } else {
        await testimonialsAPI.create(form);
        toast.success('Testimonial created successfully.');
      }
      setModalOpen(false);
      loadTestimonials();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await testimonialsAPI.delete(id);
      toast.success('Testimonial deleted.');
      loadTestimonials();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-steel-900">Testimonials</h1>
          <p className="text-steel-500 mt-1">Manage client reviews and testimonials.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : testimonials.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-steel-500">No testimonials yet. Click "Add Testimonial" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t._id} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-brand-500 text-brand-500' : 'text-steel-200'}`} />
                  ))}
                </div>
                {!t.isPublished && <span className="badge-steel text-xs">Hidden</span>}
              </div>
              <p className="text-sm text-steel-600 italic line-clamp-3 mb-4">"{t.review}"</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-700 text-xs">
                  {t.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-steel-900">{t.name}</p>
                  <p className="text-xs text-steel-400">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(t)} className="flex-1 btn-secondary text-xs py-2">
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => handleDelete(t._id)} className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs py-2 font-semibold flex items-center justify-center gap-1.5 transition-colors">
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
                {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-steel-400 hover:text-steel-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                  <label className="label">Role</label>
                  <input name="role" value={form.role} onChange={handleChange} className="input-field" />
                </div>
              </div>

              <div>
                <label className="label">Rating *</label>
                <select name="rating" value={form.rating} onChange={handleChange} className="input-field">
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Review *</label>
                <textarea name="review" value={form.review} onChange={handleChange} required rows={4} className="input-field resize-none" />
              </div>

              <div>
                <label className="label">Project (optional)</label>
                <input name="project" value={form.project} onChange={handleChange} className="input-field" />
              </div>

              <label className="flex items-center gap-2 text-sm text-steel-700">
                <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} className="rounded border-steel-300" />
                Published (visible on website)
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? 'Saving...' : editingId ? 'Update Testimonial' : 'Create Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}