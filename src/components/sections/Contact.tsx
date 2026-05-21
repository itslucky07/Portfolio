import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { Github, Linkedin } from '../BrandIcons';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert('Please fill out the required fields.');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('sent');
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const socialLinks = [
    {
      name: 'Email',
      value: 'luckysharma7578@gmail.com',
      href: 'mailto:luckysharma7578@gmail.com',
      icon: <Mail className="w-5 h-5 text-rose-400" />,
      bg: 'hover:border-rose-500/30 group-hover:text-rose-400'
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/lucky-sharma-/',
      href: 'https://www.linkedin.com/in/lucky-sharma-/',
      icon: <Linkedin className="w-5 h-5 text-blue-400" />,
      bg: 'hover:border-blue-500/30 group-hover:text-blue-400'
    },
    {
      name: 'GitHub',
      value: 'github.com/itslucky07',
      href: 'https://github.com/itslucky07',
      icon: <Github className="w-5 h-5 text-cyan-400" />,
      bg: 'hover:border-cyan-500/30 group-hover:text-cyan-400'
    }
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden bg-slate-950/40 bg-grid-pattern">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      
      {/* Glow ambient circle */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            <MessageSquare className="w-3.5 h-3.5" />
            Get In Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Let's <span className="text-gradient-cyan-purple">Connect</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Column 1: Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="font-display font-bold text-2xl text-white mb-4">
              Contact Information
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              Feel free to reach out if you are looking to hire, discuss collaboration projects, or just want to chat about AI model building and distributed systems!
            </p>

            <div className="space-y-4">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-900 transition-all duration-300 ${link.bg}`}
                >
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      {link.name}
                    </span>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                      {link.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              {/* Card top gradient indicator */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500" />

              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center"
                >
                  <CheckCircle className="w-16 h-16 text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] animate-bounce" />
                  <h4 className="font-display font-extrabold text-2xl text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed">
                    Thank you for reaching out. I've received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 hover:text-white hover:border-cyan-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-2"
                    >
                      <span>⚠️</span>
                      <span>Failed to transmit message. Please check if the backend is online and try again.</span>
                    </motion.div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleInputChange}
                        disabled={status === 'sending'}
                        placeholder="Enter your name"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleInputChange}
                        disabled={status === 'sending'}
                        placeholder="Enter your email"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      disabled={status === 'sending'}
                      placeholder="Project details / Hello"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleInputChange}
                      disabled={status === 'sending'}
                      placeholder="Write your message here..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-4 rounded-xl font-semibold bg-white text-slate-950 hover:bg-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(255,255,255,0.1)]"
                  >
                    {status === 'sending' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
