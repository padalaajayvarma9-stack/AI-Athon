import React from 'react';
import { Button } from '../ui/Button';
import { 
  Home, 
  Smile, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut,
  Heart,
  User
} from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onSignOut: () => void;
  userName?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
  onSignOut,
  userName
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'mood', label: 'Mood Check-in', icon: Smile },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="bg-white border-r border-gray-200 w-64 flex flex-col h-screen">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">MindWell</h1>
            <p className="text-xs text-gray-600">Mental Health Platform</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      {userName && (
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-600">Welcome back!</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              currentView === id
                ? 'bg-blue-50 text-blue-700 font-medium border-2 border-blue-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={onSignOut}
          className="w-full"
          icon={LogOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};