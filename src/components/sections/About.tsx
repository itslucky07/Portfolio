import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Brain, Server, Layers, Cpu, Eye, Code } from 'lucide-react';

interface InterestCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  glowColor: string;
}

const InterestCard: React.FC<InterestCardProps> = ({ icon, title, desc, glowColor }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative glass-panel rounded-2xl p-6 overflow-hidden group cursor-default"
    >
      {/* Background Hover Accent Color */}
      <div className={`absolute -right-12 -bottom-12 w-32 h-32 rounded-full blur-[40px] opacity-10 group-hover:opacity-25 transition-opacity duration-500 ${glowColor}`} />
      
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:border-cyan-500/30 transition-all duration-300 mb-5 shadow-lg">
            {icon}
          </div>
          <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-400 transition-colors duration-300 mb-2">
            {title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const About: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const interests = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Artificial Intelligence & ML',
      desc: 'Developing neural networks, training supervised models, and tuning hyperparameters using tools like TensorFlow and Scikit-learn.',
      glowColor: 'bg-cyan-500'
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: 'Backend Engineering',
      desc: 'Designing robust API layers, database models, caching strategies, and server applications with Django, FastAPI, and Node.js.',
      glowColor: 'bg-purple-500'
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Distributed Systems',
      desc: 'Architecting asynchronous message processing pipelines and real-time streaming backends using Apache Kafka, Redis, and Docker.',
      glowColor: 'bg-blue-500'
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'Generative AI & LLMs',
      desc: 'Integrating OpenAI/Gemini LLM APIs, prompt engineering, and building semantic search vector agents with retrieval capability.',
      glowColor: 'bg-pink-500'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Computer Vision',
      desc: 'Building document digitization, image classifications, and OCR pipelines using Convolutional Neural Networks (CNNs) and Tesseract.',
      glowColor: 'bg-amber-500'
    }
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden bg-slate-950/20">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-4"
          >
            <Code className="w-3.5 h-3.5" />
            About Me
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Engineering <span className="text-gradient-cyan-purple">Intelligent Solutions</span>
          </motion.h2>
        </div>

        {/* Narrative & Visual Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          {/* Narrative description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="font-display font-bold text-2xl text-white">
              Who is Lucky Sharma?
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              I am a <strong className="text-cyan-400">Software Developer Intern</strong> passionate about architecting scalable systems, building data-driven AI/ML models, and crafting modern full-stack web applications. I love bridging the gap between hardware execution, algorithms, and beautiful frontend layouts.
            </p>
            <p className="text-slate-300 text-base leading-relaxed">
              With production experience spanning <strong className="text-purple-400">Django, React, FastAPI, Kafka, and Redis</strong>, I focus on constructing high-throughput pipelines that can process data asynchronously, handle low-latency request patterns, and harness machine learning classifiers (like XGBoost, CNNs, and SVMs) for production security and analytics.
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
              {['Django', 'React', 'FastAPI', 'Kafka', 'Redis', 'Machine Learning'].map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 shadow-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Graphical/Glow UI element to display stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative glass-panel rounded-2xl p-8 flex flex-col gap-6 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <span className="font-mono text-xs tracking-wider text-slate-400">AI / BACKEND STATUS</span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_#06b6d4]" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Python & Backend Architecture</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[90%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>AI Model Building & OCR (CNNs)</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Event-driven Streaming (Kafka, Redis)</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-rose-500 w-[80%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Full Stack Development (React, Angular)</span>
                    <span>82%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-rose-500 to-cyan-400 w-[82%]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interests Cards Section */}
        <div>
          <h3 className="font-display font-bold text-2xl text-white text-center mb-10">
            Core Fields of Interest
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {interests.map((interest, index) => (
              <motion.div key={index} variants={itemVariants}>
                <InterestCard
                  icon={interest.icon}
                  title={interest.title}
                  desc={interest.desc}
                  glowColor={interest.glowColor}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
