import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HardHat, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { getErrorMessage } from '../../utils/helpers.js';

export default function AdminLoginPage() {
  const { login, isAuthenticated } = useAuth();
  const toast   = useToast();
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    document.title = 'Admin Login — Anuj Construction';
    if (isAuthenticated) navigate('/admin');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-steel-900 px-4">
      <div className="w-full max-w-md">

        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
            <HardHat className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight text-left">
            <span className="block font-display font-bold text-white text-lg">Anuj</span>
            <span className="block text-xs font-semibold text-brand-400 tracking-widest uppercase -mt-0.5">
              Construction
            </span>
          </div>
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="font-display font-bold text-2xl text-steel-900 mb-1 text-center">
            Admin Login
          </h1>
          <p className="text-steel-500 text-sm text-center mb-6">
            Sign in to manage your website
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400" />
                <input
                  id="email" type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="admin@anujconstruction.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400" />
                <input
                  id="password" type={showPass ? 'text' : 'password'} required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400 hover:text-steel-600"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-steel-400 text-sm mt-6">
          <Link to="/" className="hover:text-white transition-colors">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}