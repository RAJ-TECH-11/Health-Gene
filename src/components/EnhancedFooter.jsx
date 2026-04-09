import React from 'react';
import { Activity, Github, Twitter, Mail, Phone } from 'lucide-react';

const EnhancedFooter = ({ darkMode }) => {
  return (
    <footer className="border-t border-white/5 backdrop-blur-xl bg-secondary/30 text-gray-100 mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="group">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-accent rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-accent p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold font-display gradient-text">PharmaGuard</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced pharmacogenomic risk prediction powered by AI and clinical guidelines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-100">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {['About', 'Documentation', 'API Reference', 'Support'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-accent-light transition-colors duration-200 flex items-center space-x-2 group/link">
                    <span className="w-1 h-1 rounded-full bg-accent-light opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-100">Resources</h4>
            <ul className="space-y-3 text-sm">
              {['CPIC Guidelines', 'Research Papers', 'Clinical Studies', 'Drug Database'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-accent-light transition-colors duration-200 flex items-center space-x-2 group/link">
                    <span className="w-1 h-1 rounded-full bg-accent-light opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-100">Connect</h4>
            <div className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-400 hover:text-accent-light transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                  <span>info@pharmaguard.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 hover:text-accent-light transition-colors duration-200">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="p-2 glass hover:bg-white/20 hover:border-accent-light/50 rounded-lg transition-all duration-200"
                  title="GitHub"
                >
                  <Github className="w-4 h-4 text-gray-400 hover:text-accent-light" />
                </a>
                <a
                  href="#"
                  className="p-2 glass hover:bg-white/20 hover:border-accent-light/50 rounded-lg transition-all duration-200"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4 text-gray-400 hover:text-accent-light" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              © 2024 PharmaGuard. All rights reserved.
            </div>
            <div className="flex space-x-6 text-center">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a key={link} href="#" className="hover:text-accent-light transition-colors duration-200">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
