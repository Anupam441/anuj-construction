import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  HardHat, LayoutDashboard, FolderOpen, Wrench,
  Star, Mail, LogOut, Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { ADMIN_NAV } from '../../utils/constants.js';

const iconMap = { LayoutDashboard, FolderOpen, Wrench, Star, Mail };

export default function AdminLayout() {
  const { user, logout }  = useAuth();
  const toast             = useToast();
  const navigate          = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully.');
    navigate('/admin/login');
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-brand-600 text-white shadow-sm'
        : 'text-steel-300 hover:bg-steel-800 hover:text-white'
    }`;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-steel-800">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
          <HardHat className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-white text-sm font-bold font-display">Anuj Construction</p>
          <p className="text-steel-400 text-xs">Admin Panel</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {ADMIN_NAV.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={navClass}
              onClick={() => setSidebarOpen(false)}
            >
              {Icon && <Icon className="w-4 h-4 shrink-0" />}
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="px-4 py-4 border-t border-steel-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{user?.name || 'Admin'}</p>
            <p className="text-steel-400 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm text-steel-400 hover:bg-steel-800 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-steel-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-steel-900 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 bg-steel-900 h-full z-10">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-steel-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-steel-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-steel-600 hover:bg-steel-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-display font-bold text-steel-900 text-sm">
            Anuj Construction Admin
          </span>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}