import { Briefcase, LayoutDashboard, FileText, Folder, BarChart2, Users, Settings, HelpCircle, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Briefcase, label: 'Job Listings', path: '/jobs' },
    { icon: FileText, label: 'Applications', path: '/applications' },
    { icon: Folder, label: 'Categories', path: '/categories' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  ];

  const settingItems = [
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  return (
    <div className="h-screen w-64 bg-secondary text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg">JobBoard</h1>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-8 overflow-y-auto">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Main Menu</p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-slate-700 text-white"
                      : "text-gray-400 hover:text-white hover:bg-slate-800"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Settings</p>
          <div className="space-y-1">
            {settingItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-slate-700 text-white"
                      : "text-gray-400 hover:text-white hover:bg-slate-800"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-800 w-full transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
