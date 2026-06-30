import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found — Anuj Construction';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-steel-50 px-4">
      <div className="text-center">
        <p className="font-display font-bold text-8xl text-brand-600 mb-4">404</p>
        <h1 className="font-display font-bold text-2xl text-steel-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-steel-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}