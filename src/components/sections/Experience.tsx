import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2, Milestone } from 'lucide-react';

interface TimelineItemProps {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ role, company, period, bullets, isLeft }) => {
  return (
    <div className={`relative flex flex-col md:flex-row items-center md:justify-between w-full mb-12 md:mb-16 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      {/* Spacer for alternating layout */}
      <div className="hidden md:block w-[45%]" />

      {/* Central Connector Circle */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] flex items-center justify-center z-10">
        <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
      </div>

      {/* Experience Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 40 : -40, y: 15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-[45%] pl-12 md:pl-0"
      >
        <div className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden group">
          {/* Neon Border Glow */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Date Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-400 mb-4 uppercase">
            <Calendar className="w-3 h-3" />
            {period}
          </div>

          <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-400 transition-colors duration-300">
            {role}
          </h3>

          <div className="flex items-center gap-1.5 text-slate-400 font-medium text-sm mt-1 mb-4">
            <Building2 className="w-4 h-4 text-purple-400" />
            {company}
          </div>

          <ul className="space-y-2">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const experiences = [
    {
      role: 'Software Development Intern',
      company: 'IDCLE Tech LLP',
      period: 'Jan 2026 – Present',
      bullets: [
        'Developing and optimizing full-stack applications with production-grade modular systems.',
        'Building high-performance frontend user interfaces using React.js and backend APIs with Django & FastAPI.',
        'Implementing scalable components, database structures, and handling security checks.'
      ],
      isLeft: false
    },
    {
      role: 'Technical Team Head',
      company: 'APSIT',
      period: 'Nov 2025 – Mar 2026',
      bullets: [
        'Managed a comprehensive cultural platform used by 1000+ students and faculty members.',
        'Led full-stack developers in Django, React, and REST API development for ticketing and platform modules.',
        'Maintained server setups and ensured high-uptime production deployments under traffic bursts.'
      ],
      isLeft: true
    }
  ];

  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden bg-slate-950/20">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-4"
          >
            <Milestone className="w-3.5 h-3.5" />
            Timeline
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Work <span className="text-gradient-cyan-purple">Experience</span>
          </motion.h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Tracking Line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 -translate-x-1/2 w-[2px] bg-slate-800 timeline-line-glow" />

          {/* List of items */}
          <div className="flex flex-col">
            {experiences.map((exp, idx) => (
              <TimelineItem
                key={idx}
                role={exp.role}
                company={exp.company}
                period={exp.period}
                bullets={exp.bullets}
                isLeft={exp.isLeft}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
