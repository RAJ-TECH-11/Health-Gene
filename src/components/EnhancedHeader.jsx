import React, { useState } from 'react';
import { Moon, Sun, Activity, Info } from 'lucide-react';

const EnhancedHeader = ({ 
  title = "PharmaGuard", 
  subtitle = "Pharmacogenomic Risk Prediction System",
  darkMode, 
  setDarkMode,
  isHealthy,
  lastCheck 
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-sm text-blue-100">{subtitle}</p>
              </div>
            </div>
          </div>

          {/* Status and Controls */}
          <div className="flex items-center space-x-4">
            {/* Health Status */}
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-sm">
                {isHealthy ? 'System Online' : 'System Offline'}
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              title="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Info Button */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              title="System information"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="mt-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">System Status:</span>
                <p className="text-blue-100">
                  {isHealthy ? 'All systems operational' : 'System maintenance'}
                </p>
              </div>
              <div>
                <span className="font-medium">Last Check:</span>
                <p className="text-blue-100">
                  {lastCheck ? new Date(lastCheck).toLocaleString() : 'Never'}
                </p>
              </div>
              <div>
                <span className="font-medium">Version:</span>
                <p className="text-blue-100">v1.0.0</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default EnhancedHeader;
