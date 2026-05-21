import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Cpu } from 'lucide-react';

interface AchievementCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  desc: string;
  glow: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ icon, title, subtitle, desc, glow }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden flex flex-col h-full group"
    >
      {/* Background Color Blob */}
      <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity duration-300 ${glow}`} />
      
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400 font-bold block mb-1">
            Credential / Award
          </span>
          <h3 className="font-display font-extrabold text-lg text-white leading-snug">
            {title}
          </h3>
          <span className="font-mono text-xs text-slate-400">
            {subtitle}
          </span>
        </div>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mt-2 flex-grow">
        {desc}
      </p>
    </motion.div>
  );
};

export const Achievements: React.FC = () => {
  const list = [
    {
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      title: 'Top 3 in HackScript 6.0 Hackathon',
      subtitle: 'Hackathon Award',
      desc: 'Competed with teams region-wide to engineer and present an AI-driven solutions prototype. Won top honors for technical complexity and system execution design.',
      glow: 'bg-yellow-500'
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-500" />,
      title: 'NVIDIA Deep Learning Certification',
      subtitle: 'NVIDIA DLI Certificate',
      desc: 'Certified in fundamentals of deep learning. Experienced in training networks, computer vision classification pipelines, and sequence models using GPU acceleration.',
      glow: 'bg-purple-500'
    },
    {
      icon: <Award className="w-6 h-6 text-cyan-500" />,
      title: 'AI & ML Bootcamp Certification',
      subtitle: 'Specialized Program',
      desc: 'Intensive immersion focusing on predictive model construction, clustering analysis, neural architecture builds, hyperparameter optimization, and machine learning deployments.',
      glow: 'bg-cyan-500'
    }
  ];

  return (
    <section id="achievements" className="relative py-24 sm:py-32 overflow-hidden bg-slate-950/20">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-4"
          >
            <Trophy className="w-3.5 h-3.5" />
            Achievements
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Honors & <span className="text-gradient-cyan-purple">Credentials</span>
          </motion.h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <AchievementCard
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                desc={item.desc}
                glow={item.glow}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
