import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Cpu, Database, Network, Globe } from 'lucide-react';
import { Github } from '../BrandIcons';

interface Project {
  id: string;
  title: string;
  categories: string[];
  tech: string[];
  features: string[];
  github: string;
  demo: string;
  bannerGradient: string;
  bannerIcon: React.ReactNode;
}

// SVG Helper for Custom Icon inside Project Card Banners (placed at top to prevent hoisting issues)
const Code2Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-amber-400"
  >
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
);

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'AI/ML', 'Backend & Distributed', 'Full Stack'];

  const projects: Project[] = [
    {
      id: 'ddos-detector',
      title: 'DDoS Detection & Mitigation Service',
      categories: ['AI/ML', 'Backend & Distributed'],
      tech: ['Python', 'Apache Kafka', 'Redis', 'XGBoost', 'Random Forest', 'Microservices'],
      features: [
        'Real-time network traffic analysis using Kafka brokers',
        'ML classifiers (XGBoost/RF) achieving 99% accuracy',
        'Redis-based rate limiting & automatic firewall rules',
        'High-performance reverse proxy mitigation gateway'
      ],
      github: 'https://github.com/itslucky07',
      demo: '#',
      bannerGradient: 'from-cyan-900/60 to-blue-900/60 border-cyan-500/20',
      bannerIcon: <Network className="w-10 h-10 text-cyan-400" />
    },
    {
      id: 'document-forgery',
      title: 'Document Forgery & Fintech Security',
      categories: ['AI/ML', 'Full Stack'],
      tech: ['Python', 'Django', 'CNN (TensorFlow)', 'Tesseract OCR'],
      features: [
        'Deep learning CNN model to detect altered pixel arrays',
        'OCR scans for reading name, numbers, & template validation',
        'Comprehensive fintech fraud monitoring administrative panel',
        'REST API for third-party client verification integrations'
      ],
      github: 'https://github.com/itslucky07/Document-forgery-detection',
      demo: '#',
      bannerGradient: 'from-purple-900/60 to-pink-900/60 border-purple-500/20',
      bannerIcon: <Cpu className="w-10 h-10 text-purple-400" />
    },
    {
      id: 'intellicraft-erp',
      title: 'IntelliCraft ERP',
      categories: ['Full Stack'],
      tech: ['MongoDB', 'Fastify', 'Angular', 'Node.js'],
      features: [
        'End-to-end Student Information & Management System',
        'Asynchronous attendance logs & auto-invoicing models',
        'Role-based granular administrative & student dashboards',
        'Robust document exports & database backup services'
      ],
      github: 'https://github.com/itslucky07',
      demo: '#',
      bannerGradient: 'from-emerald-900/60 to-teal-900/60 border-emerald-500/20',
      bannerIcon: <Database className="w-10 h-10 text-emerald-400" />
    },
    {
      id: 'virtual-collab',
      title: 'Virtual Collaboration Platform',
      categories: ['Backend & Distributed', 'Full Stack'],
      tech: ['Java', 'Spring Boot', 'Angular', 'Redis', 'Docker'],
      features: [
        'Real-time event-driven canvas & chat streaming',
        'Redis-based caching layer for multi-room synchronization',
        'High-frequency order-matching engine simulator',
        'Containerized multi-tier Docker compose deployment'
      ],
      github: 'https://github.com/itslucky07',
      demo: '#',
      bannerGradient: 'from-blue-900/60 to-indigo-900/60 border-blue-500/20',
      bannerIcon: <Globe className="w-10 h-10 text-blue-400" />
    },
    {
      id: 'job-portal',
      title: 'Job Portal System',
      categories: ['Full Stack'],
      tech: ['Django', 'JavaScript', 'HTML5', 'CSS3', 'PostgreSQL'],
      features: [
        'Dedicated recruiter postings & candidate application flows',
        'Secure multi-tier login authentication & profiles',
        'Dynamic resume searches & status tracking alerts',
        'Job category management and search indexing'
      ],
      github: 'https://github.com/itslucky07/job-portal',
      demo: '#',
      bannerGradient: 'from-amber-905/60 to-rose-900/60 border-amber-500/20',
      bannerIcon: <Code2Icon />
    }
  ];

  const filteredProjects = projects.filter((project) =>
    filter === 'All' ? true : project.categories.includes(filter)
  );

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden bg-slate-950/40 bg-grid-pattern">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-4"
          >
            <Filter className="w-3.5 h-3.5" />
            Projects Showcase
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Engineering <span className="text-gradient-cyan-purple">Portfolio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base mt-4"
          >
            Explore products, machine learning workflows, and distributed services I built from the ground up.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${filter === cat
                ? 'text-white border-transparent shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'text-slate-400 hover:text-white border border-slate-800 bg-slate-900/40 hover:bg-slate-900'
                }`}
            >
              {filter === cat && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/80 to-purple-600/80 rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col h-full relative"
              >
                {/* Premium Inline Vector Banner (No External Resource Dependence) */}
                <div className={`relative h-48 bg-gradient-to-br ${project.bannerGradient} border-b flex items-center justify-center overflow-hidden`}>
                  {/* Cyber Grid Overlay */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  {/* Neon Radial Gradient */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)]" />

                  {/* Centered Glowing Icon */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="relative z-10 p-4 rounded-full bg-slate-950/80 border border-white/5 shadow-2xl flex items-center justify-center"
                  >
                    {project.bannerIcon}
                  </motion.div>

                  {/* Decorative Tech Accent */}
                  <span className="absolute bottom-2.5 right-3.5 font-mono text-[9px] text-slate-500 uppercase tracking-widest bg-slate-950/60 px-2 py-0.5 rounded border border-white/5">
                    {project.categories[0]}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-white mb-3">
                      {project.title}
                    </h3>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded bg-slate-950 text-[10px] font-mono text-cyan-400 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-400 leading-normal">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-900/60">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-white flex items-center justify-center gap-1.5 hover:border-cyan-400 hover:bg-slate-950 transition-all duration-300"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code Repository
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

