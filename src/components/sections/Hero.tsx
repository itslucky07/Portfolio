import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Send, Sparkles } from 'lucide-react';
import { AIAvatar } from '../AIAvatar';

const words = ['Software Developer', 'AI/ML Engineer', 'Full Stack Developer'];

// Custom typing hook logic inside a inline helper component
const TypingText: React.FC = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];

    if (!isDeleting && currentText === word) {
      // Pause at full word
      const timer = window.setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (isDeleting && currentText === '') {
      // Asynchronously trigger next word to avoid synchronous setState inside render/effect phase
      const timer = window.setTimeout(() => {
        setIsDeleting(false);
        setWordIdx((prev) => (prev + 1) % words.length);
      }, 50);
      return () => clearTimeout(timer);
    }

    const typeSpeed = isDeleting ? 40 : 80;
    const timer = window.setTimeout(() => {
      setCurrentText((prev) => {
        if (!isDeleting) {
          return word.substring(0, prev.length + 1);
        } else {
          return word.substring(0, prev.length - 1);
        }
      });
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIdx]);

  return <span className="typing-cursor">{currentText}</span>;
};

export const Hero: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 lg:pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern"
    >
      {/* Glow Ambient Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[130px] animate-blob pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-purple-500/10 rounded-full blur-[100px] sm:blur-[130px] animate-blob-reverse pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        
        {/* Holographic AI Companion Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex items-center justify-center order-2 lg:order-1"
        >
          <AIAvatar mode="hero" />
        </motion.div>

        {/* Text Details Column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
          {/* Modern Accent Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-slate-300 uppercase">
              Available for Internships & Full-time Roles
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-4 leading-none"
          >
            Hi, I am <span className="text-gradient-cyan-purple">Lucky Sharma</span>
          </motion.h1>

          {/* Subtitle / Role Loop */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display font-bold text-xl sm:text-3xl text-slate-300 min-h-[40px] mb-6"
          >
            I build intelligent systems as a <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 border-b border-cyan-500/20 pb-1">
              <TypingText />
            </span>
          </motion.h2>

          {/* Narrative bio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed mb-8"
          >
            Specializing in scalable distributed architectures, machine learning models, and
            high-performance backend systems. Passionate about marrying modern AI capabilities 
            with robust full-stack engineering.
          </motion.p>

          {/* Buttons CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo('#projects')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold bg-white text-slate-950 flex items-center justify-center gap-2 hover:bg-cyan-400 hover:text-slate-950 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] active:scale-95 cursor-pointer"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('#contact');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold bg-slate-900 border border-slate-800 text-white flex items-center justify-center gap-2 hover:border-purple-500 hover:bg-slate-950 transition-all duration-300 glow-btn-purple active:scale-95 cursor-pointer"
            >
              Contact Me
              <Send className="w-4 h-4" />
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Resume download triggered (Placeholder).");
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold bg-slate-900/50 border border-slate-800/60 text-slate-300 flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              Resume
            </a>
          </motion.div>
        </div>

      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-1.5 opacity-65 hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          onClick={() => handleScrollTo('#about')}
          className="w-6 h-10 rounded-full border border-slate-700 flex justify-center p-1.5 cursor-pointer"
        >
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};
