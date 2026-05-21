import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

export const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const targetElement = document.querySelector('#home');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-12 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Attribution/Copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-slate-300">
            &copy; {new Date().getFullYear()} Lucky Sharma. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Built with React, Tailwind CSS v4 & Framer Motion
          </p>
        </div>

        {/* Minimal Social Icon List */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/itslucky07"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 hover:text-cyan-400 bg-slate-900/40 border border-slate-800/40 hover:border-cyan-500/20 rounded-lg transition-all duration-300"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/lucky-sharma-/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 hover:text-purple-400 bg-slate-900/40 border border-slate-800/40 hover:border-purple-500/20 rounded-lg transition-all duration-300"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:luckysharma7578@gmail.com"
            className="p-2 text-slate-500 hover:text-rose-400 bg-slate-900/40 border border-slate-800/40 hover:border-rose-500/20 rounded-lg transition-all duration-300"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white hover:border-cyan-500 hover:bg-slate-950 transition-all duration-300 shadow-lg cursor-pointer active:scale-95 group hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
