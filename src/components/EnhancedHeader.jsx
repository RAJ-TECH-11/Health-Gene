import React, { useState } from 'react';
import { Moon, Sun, Activity, Info, Cpu } from 'lucide-react';

const EnhancedHeader = ({ 
  title = "PharmaGuard", 
  subtitle = "Pharmacogenomic Risk Prediction System",
  darkMode, 
  setDarkMode,
  isHealthy,
  lastCheck 
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <header className="relative border-b border-white/5 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 py-5 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-dark rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-r from-accent to-accent-dark p-2.5 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display gradient-text">
                {title}
              </h1>
              <p className="text-xs text-gray-400 font-medium tracking-wide">
                {subtitle.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Status and Controls */}
          <div className="flex items-center space-x-3">
            {/* Health Status */}
            <div className="glass px-3 py-2 flex items-center space-x-2 group hover:bg-white/20">
              <div className={`w-2 h-2 rounded-full transition-all ${
                isHealthy 
                  ? 'bg-success animate-pulse shadow-lg shadow-success/50' 
                  : 'bg-danger animate-pulse shadow-lg shadow-danger/50'
              }`} />
              <span className="text-xs font-medium text-gray-300">
                {isHealthy ? 'System Online' : 'Offline'}
              </span>
            </div>

            {/* Info Button */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="glass p-2 hover:bg-white/20 transition-all duration-300 group"
              title="System information"
            >
              <Info className={`w-4 h-4 text-accent-light transition-transform duration-300 ${showInfo ? 'rotate-180' : ''}`} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="glass p-2 hover:bg-white/20 transition-all duration-300"
              title="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-accent-light animate-spin" style={{ animationDuration: '3s' }} />
              ) : (
                <Moon className="w-4 h-4 text-accent-light" />
              )}
            </button>
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="mt-4 glass p-4 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <Cpu className="w-4 h-4 text-accent-light flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">System Status</p>
                  <p className="text-sm text-gray-300 font-medium">
                    {isHealthy ? '✓ All Systems Operational' : '✗ Maintenance Mode'}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Cpu className="w-4 h-4 text-accent-light flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Last Check</p>
                  <p className="text-sm text-gray-300">
                    {lastCheck ? new Date(lastCheck).toLocaleTimeString() : 'Never'}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Cpu className="w-4 h-4 text-accent-light flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Version</p>
                  <p className="text-sm text-gray-300 font-medium">v2.0.0 Premium</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default EnhancedHeader;
