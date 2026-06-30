import { useEffect, useState } from 'react';
import { Mail, Phone, Trash2, Eye, X } from 'lucide-react';
import { contactAPI } from '../../api/index.js';
import { useToast } from '../../context/ToastContext.jsx';
import { getErrorMessage, formatDate } from '../../utils/helpers.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function AdminContacts() {
  const toast = useToast();
  const [contacts, setContacts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.title = 'Contact Inquiries — Anuj Construction Admin';
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const res = await contactAPI.getAll();
      setContacts(res.data.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (contact) => {
    setSelected(contact);
    if (!contact.isRead) {
      try {
        await contactAPI.markRead(contact._id);
        setContacts((prev) =>
          prev.map((c) => c._id === contact._id ? { ...c, isRead: true } : c)
        );
      } catch { }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await contactAPI.delete(id);
      toast.success('Inquiry deleted.');
      setSelected(null);
      loadContacts();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-steel-900">Contact Inquiries</h1>
        <p className="text-steel-500 mt-1">Messages submitted through your website contact form.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : contacts.length === 0 ? (
        <div className="card p-12 text-center">
          <Mail className="w-10 h-10 text-steel-300 mx-auto mb-3" />
          <p className="text-steel-500">No inquiries yet.</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="divide-y divide-steel-100">
            {contacts.map((c) => (
              <div
                key={c._id}
                className={`p-5 flex items-center justify-between gap-4 hover:bg-steel-50 transition-colors cursor-pointer ${!c.isRead ? 'bg-brand-50/50' : ''}`}
                onClick={() => handleView(c)}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-700 shrink-0">
                    {c.name[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-steel-900 truncate">{c.name}</p>
                      {!c.isRead && <span className="w-2 h-2 bg-brand-600 rounded-full shrink-0" />}
                    </div>
                    <p className="text-sm text-steel-500 truncate">{c.service || 'General Inquiry'}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-steel-400">{formatDate(c.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-steel-100 sticky top-0 bg-white">
              <h2 className="font-display font-bold text-lg text-steel-900">Inquiry Details</h2>
              <button onClick={() => setSelected(null)} className="text-steel-400 hover:text-steel-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-700 text-lg">
                  {selected.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-steel-900">{selected.name}</p>
                  <p className="text-sm text-steel-500">{formatDate(selected.createdAt)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-steel-400" />
                  <a href={`mailto:${selected.email}`} className="text-sm text-brand-600 hover:underline">
                    {selected.email}
                  </a>
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-steel-400" />
                    <a href={`tel:${selected.phone}`} className="text-sm text-brand-600 hover:underline">
                      {selected.phone}
                    </a>
                  </div>
                )}
                {selected.service && (
                  <div>
                    <span className="badge-brand text-xs">{selected.service}</span>
                  </div>
                )}
              </div>

              <div className="bg-steel-50 rounded-xl p-4">
                <p className="text-sm text-steel-700 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <a href={`mailto:${selected.email}`} className="btn-primary flex-1">
                  <Mail className="w-4 h-4" /> Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selected._id)}
                  className="bg-red-50 text-red-600 hover:bg-red-100 rounded-lg px-4 font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}