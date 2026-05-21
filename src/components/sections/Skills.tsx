import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Code2, BrainCircuit, Terminal, Monitor, Database, Award, Search, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  description: string;
  metrics: {
    load: number;
    status: string;
    level: string;
  };
  skills: string[];
  color: string;
  iconColor: string;
  dotColor: string;
  badgeHover: string;
  shadowColor: string;
}

export const Skills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'SYSTEM: Initializing skills telemetry... OK',
    'SYSTEM: Status: ONLINE. All core modules responsive.'
  ]);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: Code2,
      description: 'Core languages for scripting, backend services, high-performance systems, and dynamic user interfaces.',
      metrics: { load: 94, status: 'OPTIMAL', level: 'Core Foundations' },
      skills: ['Python', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
      color: 'from-cyan-500 to-blue-500',
      iconColor: 'text-cyan-400',
      dotColor: 'bg-cyan-400',
      badgeHover: 'hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-cyan-950/20',
      shadowColor: 'rgba(6,182,212,0.15)'
    },
    {
      title: 'AI/ML & Generative AI',
      icon: BrainCircuit,
      description: 'Neural networks, supervised/unsupervised classifiers, natural language processing, and Large Language Model agent integration.',
      metrics: { load: 88, status: 'STABLE', level: 'Specialist' },
      skills: [
        'Scikit-learn',
        'TensorFlow',
        'CNNs',
        'OCR (Tesseract)',
        'Random Forest',
        'XGBoost',
        'SVM',
        'LLM APIs (OpenAI, Gemini)',
        'Prompt Engineering'
      ],
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-400',
      dotColor: 'bg-purple-400',
      badgeHover: 'hover:border-purple-400/40 hover:text-purple-300 hover:bg-purple-950/20',
      shadowColor: 'rgba(168,85,247,0.15)'
    },
    {
      title: 'Backend Engineering',
      icon: Terminal,
      description: 'High-performance, asynchronous web servers, microservice orchestration, caching mechanisms, and event-driven data streaming.',
      metrics: { load: 91, status: 'OPTIMAL', level: 'Advanced' },
      skills: [
        'Django',
        'FastAPI',
        'Flask',
        'Node.js',
        'Redis',
        'Apache Kafka',
        'REST APIs',
        'Microservices'
      ],
      color: 'from-emerald-400 to-teal-500',
      iconColor: 'text-emerald-400',
      dotColor: 'bg-emerald-400',
      badgeHover: 'hover:border-emerald-400/40 hover:text-emerald-300 hover:bg-emerald-950/20',
      shadowColor: 'rgba(52,211,153,0.15)'
    },
    {
      title: 'Frontend Development',
      icon: Monitor,
      description: 'Creating visually stunning, fluid component architectures with responsive frameworks, design systems, and rich micro-interactions.',
      metrics: { load: 85, status: 'STABLE', level: 'Proficient' },
      skills: ['React.js', 'Angular', 'Tailwind CSS', 'Bootstrap', 'Framer Motion'],
      color: 'from-blue-400 to-indigo-500',
      iconColor: 'text-blue-400',
      dotColor: 'bg-blue-400',
      badgeHover: 'hover:border-blue-400/40 hover:text-blue-300 hover:bg-blue-950/20',
      shadowColor: 'rgba(96,165,250,0.15)'
    },
    {
      title: 'Database & Tools',
      icon: Database,
      description: 'Data architecture, persistent storage design, containerization, Git version control pipelines, and automated continuous delivery.',
      metrics: { load: 89, status: 'STABLE', level: 'Advanced' },
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'GitHub Actions', 'Linux'],
      color: 'from-amber-400 to-orange-500',
      iconColor: 'text-amber-400',
      dotColor: 'bg-amber-400',
      badgeHover: 'hover:border-amber-400/40 hover:text-amber-300 hover:bg-amber-950/20',
      shadowColor: 'rgba(251,191,36,0.15)'
    }
  ];

  const handleSkillClick = (skillName: string) => {
    if (activeSkill === skillName) {
      setActiveSkill(null);
      const logMessage = 'SYSTEM: Deselected module. Telemetry reset to standby.';
      setSystemLogs(prev => [logMessage, ...prev].slice(0, 10));
      return;
    }

    setActiveSkill(skillName);
    
    // Project correlation mapping
    const correlations: { [key: string]: string } = {
      'Python': 'DDoS Detector, Document Forgery, Job Portal',
      'FastAPI': 'DDoS Detector',
      'Django': 'Document Forgery, Job Portal',
      'Kafka': 'DDoS Detector',
      'Redis': 'DDoS Detector, Virtual Collab',
      'TensorFlow': 'Document Forgery',
      'OCR': 'Document Forgery',
      'Angular': 'IntelliCraft ERP, Virtual Collab',
      'Node.js': 'IntelliCraft ERP',
      'MongoDB': 'IntelliCraft ERP',
      'PostgreSQL': 'Job Portal',
      'Docker': 'Virtual Collab',
      'XGBoost': 'DDoS Detector',
      'Random Forest': 'DDoS Detector'
    };

    const linkedProjects = correlations[skillName] || correlations[skillName.split(' ')[0]] || 'Demonstrated in active code repos';
    const cleanSkill = skillName.replace(/[().]/g, '');

    const logMessage = `SYSTEM: Querying database for module [${cleanSkill.toUpperCase()}]... Found. Applied in projects: [${linkedProjects}]`;
    
    setSystemLogs(prev => [logMessage, ...prev].slice(0, 10)); // Keep last 10 entries
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const logMessage = `SYSTEM: Search query updated -> searching nodes for [${searchQuery.toUpperCase()}]`;
      setSystemLogs(prev => [logMessage, ...prev].slice(0, 10));
    }
  }, [searchQuery]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Filter skills logic
  const filteredCategories = skillCategories
    .map(category => {
      const matchingSkills = category.skills.filter(skill =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const categoryMatches = category.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      return {
        ...category,
        skills: categoryMatches ? category.skills : matchingSkills
      };
    })
    .filter(category => {
      const passesCategory = selectedCategory === 'All' || category.title === selectedCategory;
      const hasSkills = category.skills.length > 0;
      return passesCategory && hasSkills;
    });

  const allCategoriesList = skillCategories.map(c => c.title);

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden bg-slate-950/40 bg-grid-pattern">
      {/* Top/Bottom Dividers */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-cyan-600/5 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-purple-600/5 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

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
            <Award className="w-3.5 h-3.5" />
            Skills Dashboard
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Technical <span className="text-gradient-cyan-purple">Competency</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base mt-4"
          >
            A curated view of tools, frameworks, and programming languages I use to bring products to life.
          </motion.p>
        </div>

        {/* Telemetry Control Bar (Search & Filter) */}
        <div className="max-w-4xl mx-auto mb-10 p-4 rounded-2xl bg-slate-900/30 border border-slate-900 backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Query skill database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800/80 rounded-xl text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/80 focus:shadow-[0_0_12px_rgba(6,182,212,0.15)] transition-all duration-300"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
            {allCategoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(prev => prev === cat ? 'All' : cat)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.05)]'
                    : 'text-slate-500 hover:text-slate-300 border border-slate-900 bg-slate-950/30 hover:bg-slate-900/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  variants={cardVariants}
                  layout
                  whileHover={{ y: -6 }}
                  className="relative rounded-2xl p-6 flex flex-col h-full bg-slate-900/40 border border-slate-800/80 hover:border-transparent transition-colors duration-300 overflow-hidden group shadow-lg backdrop-blur-md"
                >
                  {/* Category Gradient Border on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none p-[1px] rounded-2xl -z-10`} />
                  
                  {/* Card background mask inside gradient border */}
                  <div className="absolute inset-[1px] bg-slate-950/95 rounded-[15px] -z-10" />

                  {/* Category Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-900/85 pb-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative flex-shrink-0">
                        {/* Glowing background blob behind icon */}
                        <div className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${category.color} opacity-35 blur-sm group-hover:opacity-65 transition-opacity duration-300`} />
                        <div className="relative w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300">
                          <Icon className={`w-5 h-5 stroke-[2] ${category.iconColor}`} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors duration-300">
                          {category.title}
                        </h3>
                        <span className="text-[9px] font-mono text-slate-500 tracking-wider uppercase block">{category.metrics.level}</span>
                      </div>
                    </div>
                    {/* Node Telemetry Tag */}
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Load</span>
                      <span className="text-xs font-mono font-bold text-white tracking-tight">{category.metrics.load}%</span>
                    </div>
                  </div>

                  {/* Module Diagnostics / Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {category.description}
                  </p>

                  {/* Interactive Status Meter */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mb-1.5">
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                        NODE STRENGTH
                      </span>
                      <span className="text-cyan-400 font-bold">{category.metrics.status}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${category.metrics.load}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </div>

                  {/* Skills Badges Container */}
                  <div className="flex flex-wrap gap-2.5 mt-auto">
                    {category.skills.map((skill) => {
                      const isHighlighted = activeSkill === skill;
                      return (
                        <button
                          key={skill}
                          onClick={() => handleSkillClick(skill)}
                          className={`relative group px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 shadow-sm cursor-pointer ${
                            isHighlighted
                              ? `bg-slate-900 border-white/20 text-white shadow-[0_0_12px_${category.shadowColor}]`
                              : `bg-slate-950/60 border-slate-900/60 text-slate-400 ${category.badgeHover}`
                          }`}
                        >
                          <span className="relative flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${category.dotColor} group-hover:scale-125 transition-transform duration-300 ${isHighlighted ? 'scale-125' : ''}`} />
                            {skill}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Console Log Terminal */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-950 border border-slate-900 p-4 font-mono shadow-2xl relative">
          <div className="absolute top-3 right-4 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 border-b border-slate-900 pb-2 mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Skills Log Telemetry</span>
          </div>
          
          <div className="space-y-1.5 max-h-24 overflow-y-auto pr-2 scrollbar-none text-[11px]">
            {systemLogs.map((log, idx) => (
              <div key={idx} className={`${idx === 0 ? 'text-cyan-400' : 'text-slate-500'} flex items-start gap-1`}>
                <span className="text-slate-600 select-none">&gt;</span>
                <span className="break-all">{log}</span>
              </div>
            ))}
            {systemLogs.length === 0 && (
              <div className="text-slate-600 italic">No telemetry data. Click a badge to query.</div>
            )}
          </div>
          
          <div className="mt-3 pt-2.5 border-t border-slate-900/60 flex items-center justify-between text-[9px] text-slate-600">
            <span>READY FOR INPUT</span>
            <span className="flex items-center gap-1 select-none">
              <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" /> Click any skill badge above to map project applications
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
