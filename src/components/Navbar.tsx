import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-slate-950/75 border-b border-white/5 backdrop-blur-md shadow-lg shadow-black/20'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="relative group flex items-center gap-1.5"
        >
          <span className="font-display font-black text-2xl tracking-tighter text-white group-hover:text-cyan-400 transition-colors duration-300">
            LUCKY<span className="text-cyan-400 group-hover:text-purple-400">.</span>S
          </span>
          <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 bg-cyan-950/60 text-cyan-400 rounded-md border border-cyan-800/40">
            AI/ML
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg hover:text-white ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Social Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://github.com/itslucky07"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50 rounded-lg border border-transparent hover:border-slate-800 transition-all duration-300"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/lucky-sharma-/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-purple-400 hover:bg-slate-900/50 rounded-lg border border-transparent hover:border-slate-800 transition-all duration-300"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:luckysharma7578@gmail.com"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900/50 rounded-lg border border-transparent hover:border-slate-800 transition-all duration-300"
            title="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-400 hover:text-white bg-slate-900/60 rounded-lg border border-slate-800"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full border-b border-slate-900 bg-slate-950/95 backdrop-blur-lg"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`px-4 py-3 rounded-lg text-base font-semibold tracking-wide border-l-2 transition-all ${
                      isActive
                        ? 'bg-slate-900 border-cyan-400 text-white shadow-inner shadow-cyan-900/10'
                        : 'border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-slate-900 flex items-center gap-4 px-4">
                <a
                  href="https://github.com/itslucky07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-cyan-400"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/lucky-sharma-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-purple-400"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a
                  href="mailto:luckysharma7578@gmail.com"
                  className="flex items-center gap-2 text-slate-400 hover:text-rose-400"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
