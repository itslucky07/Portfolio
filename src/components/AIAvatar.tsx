import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, MessageSquare, Terminal, Send, Volume2, VolumeX } from 'lucide-react';

interface AIAvatarProps {
  mode: 'hero' | 'floating';
}

interface DialogOption {
  label: string;
  response: string;
}

const DIALOG_OPTIONS: DialogOption[] = [
  {
    label: "Analyze: Agent Profile",
    response: "Lucky Sharma is a cutting-edge Software Developer and AI/ML Engineer. He specializes in designing scalable full-stack web applications, training deep learning neural networks, and optimizing high-performance backend microservices. Currently based in India, he is primed to integrate into high-impact development teams."
  },
  {
    label: "Scan: Technical Stack",
    response: "Technical stack diagnostics show advanced proficiency in Python (FastAPI, Flask, PyTorch), JavaScript/TypeScript (React.js, Node.js). Database infrastructures include SQLite and PostgreSQL. He utilizes Docker for containerization and handles asynchronous pipelines, REST APIs."
  },
  {
    label: "Retrieve: Career History",
    response: "Career history retrieval complete.\n- Software Development Intern at IDCLE Tech LLP: Developing production-grade full-stack components using React.js and backend APIs with FastAPI.\n- Technical Team Head at APSIT: Led developers to build a REST API and ticketing web application serving 1,000+ active student and faculty members."
  },
  {
    label: "Decrypt: Core Projects",
    response: "Active project decryptions include:\n1. Elite Glassmorphic Portfolio: Built with React, Vite, and a FastAPI + SQLite backend with custom automated SMTP alert headers.\n2. Real-Time WebSockets Engine: Low-latency chat routing server.\n3. Machine Learning Predictors: Asynchronous LSTM forecasting models.\nScroll down or click the 'Projects' node to inspect repositories."
  },
  {
    label: "Audit: Credentials",
    response: "Credentials audit complete.\n1. Top 3 Honoree at HackScript 6.0 Hackathon for designing advanced AI software prototypes.\n2. NVIDIA Deep Learning Institute Certification in convolutional networks, computer vision, and GPU acceleration.\n3. AI & ML Specialized Bootcamp Certification."
  },
  {
    label: "Establish: Comm Link",
    response: "Communication vector initialized. You can dispatch encrypted messages using the secure Contact Form at the bottom of the viewport. Email relays are routed instantly via SMTP directly to luckysharma7578@gmail.com. LinkedIn and GitHub links are active for networking."
  }
];

export const AIAvatar: React.FC<AIAvatarProps> = ({ mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string>(
    "Holographic system override initialized. Welcome to the core repository. I am A.V.A, a high-performance cybernetic companion monitoring Lucky Sharma's neural network and professional systems. Security protocols active, database pipelines online. Select a query vector to analyze."
  );
  const [typedMessage, setTypedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<number | null>(null);

  // Text-to-Speech function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isMuted) return;

      // Clean up text format for clean audio reading
      const cleanText = text
        .replace(/[0-9]\./g, '') // remove numbers like 1. 2.
        .replace(/[\n\r]/g, ' ') // remove newlines
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = window.speechSynthesis.getVoices();

      // Look for a male English voice
      const maleVoice = voices.find(v => {
        const nameLower = v.name.toLowerCase();
        return v.lang.startsWith('en') && (
          nameLower.includes('male') ||
          nameLower.includes('david') ||
          nameLower.includes('microsoft') ||
          nameLower.includes('google us english') ||
          nameLower.includes('natural')
        );
      });

      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      utterance.pitch = 0.85; // Lower pitch for a more masculine voice tone
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Trigger speech narration when message or mute state changes
  useEffect(() => {
    // Speak the current message
    speak(activeMessage);
  }, [activeMessage, isMuted]);

  // Handle voices changing event in some browsers
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const handleVoicesChanged = () => {
        // Trigger voice selection again if active
        speak(activeMessage);
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        window.speechSynthesis.cancel();
      };
    }
  }, [activeMessage, isMuted]);

  // Typewriter effect for messages
  useEffect(() => {
    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current);
    }

    setTypedMessage('');
    setIsTyping(true);
    let i = 0;

    const type = () => {
      if (i < activeMessage.length) {
        setTypedMessage((prev) => prev + activeMessage.charAt(i));
        i++;
        typingTimerRef.current = window.setTimeout(type, 18);
      } else {
        setIsTyping(false);
      }
    };

    type();

    return () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
      }
    };
  }, [activeMessage]);

  const handleSelectOption = (option: DialogOption) => {
    setActiveMessage(option.response);
  };

  const resetDialog = () => {
    setActiveMessage("System reset complete. I am ready for further inquiries. What else would you like to know?");
  };

  // 1. Hero Mode Render
  if (mode === 'hero') {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-6">
        {/* Holographic Avatar Core */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          {/* Cybernetic rotating orbits */}
          <div className="absolute inset-0 rounded-full cyber-orbit" />
          <div className="absolute inset-4 rounded-full cyber-orbit-reverse" />

          {/* Pulsing glow rings */}
          <div className="absolute inset-0 pulse-ring" style={{ animationDelay: '0s' }} />
          <div className="absolute inset-0 pulse-ring" style={{ animationDelay: '1.5s' }} />

          {/* Glowing hexagon status details */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded border border-cyan-500/30 bg-slate-950/80 backdrop-blur-sm z-10 text-[9px] font-mono text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SYS_ONLINE</span>
          </div>

          <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded border border-purple-500/30 bg-slate-950/80 backdrop-blur-sm z-10 text-[9px] font-mono text-purple-400">
            <Bot className="w-2.5 h-2.5" />
            <span>AVA_MALE_v1.2</span>
          </div>

          {/* Interactive Image Container */}
          <div className="relative w-48 h-48 rounded-full border-2 border-cyan-400/40 p-1 bg-slate-950/40 backdrop-blur-md">
            <div className="w-full h-full rounded-full hologram-container">
              <div className="hologram-scanline" />
              <img
                src="/ai_avatar.png"
                alt="A.V.A AI Assistant"
                className="w-full h-full object-cover scale-105 saturate-125"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300";
                }}
              />
            </div>
          </div>
        </div>

        {/* Speech / Output dialogue bubble */}
        <div className="relative w-full glass-panel rounded-2xl p-5 border border-cyan-500/20 shadow-[0_4px_30px_rgba(6,182,212,0.15)] mb-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-mono text-xs text-cyan-300 font-semibold tracking-wider">A.V.A // DIALOGUE_PORT:</span>
            </div>

            {/* Mute/Unmute Audio Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 rounded bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              title={isMuted ? "Unmute Voice" : "Mute Voice"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
          </div>

          <div className="min-h-[96px] text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
            {typedMessage}
            {isTyping && <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse ml-0.5" />}
          </div>
        </div>

        {/* Dialogue Interaction Buttons */}
        <div className="grid grid-cols-2 gap-3.5 w-full">
          {DIALOG_OPTIONS.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt)}
              disabled={isTyping}
              className="px-3 py-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 text-left text-xs font-medium text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 backdrop-blur-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-between"
            >
              <span>{opt.label}</span>
              <MessageSquare className="w-3.5 h-3.5 text-cyan-500 opacity-60" />
            </button>
          ))}
          {activeMessage !== DIALOG_OPTIONS[0].response && activeMessage.includes("Lucky") && (
            <button
              onClick={resetDialog}
              className="col-span-2 py-2 rounded-lg border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-purple-400 text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer"
            >
              [ RESET DIALOG ]
            </button>
          )}
        </div>
      </div>
    );
  }

  // 2. Floating Companion Mode Render
  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-slate-950 border border-cyan-500/40 flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.55)] group"
        >
          {/* Pulsing ring around button */}
          <span className="absolute -inset-1 rounded-full border border-cyan-400/20 animate-pulse pointer-events-none" />

          <img
            src="/ai_avatar.png"
            alt="AI Companion"
            className="w-12 h-12 rounded-full object-cover scale-105 saturate-125 group-hover:rotate-6 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100";
            }}
          />

          {/* Indicator dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-950 rounded-full" />
        </motion.button>
      </div>

      {/* Floating Dialogue Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 z-40 w-[350px] max-w-[calc(100vw-32px)] glass-panel border border-cyan-500/25 rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(3,7,18,0.7)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-xs font-semibold text-slate-200 tracking-wider">A.V.A COMPANION</span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Mute/Unmute Audio Button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                  title={isMuted ? "Unmute Voice" : "Mute Voice"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-900/10 min-h-[140px] flex flex-col justify-end">
              <div className="glass-panel border-cyan-500/10 rounded-xl p-3 bg-slate-950/60 text-xs text-slate-300 leading-relaxed min-h-[72px] mb-3">
                <div className="font-mono text-[9px] text-cyan-400/70 mb-1">A.V.A:</div>
                <div className="whitespace-pre-line font-sans">
                  {typedMessage}
                  {isTyping && <span className="inline-block w-1 h-3 bg-cyan-400 animate-pulse ml-0.5" />}
                </div>
              </div>
            </div>

            {/* Prompts list */}
            <div className="p-4 bg-slate-950/70 border-t border-slate-850 flex flex-col gap-2 max-h-[200px] overflow-y-auto">
              <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase mb-1">Quick Queries:</div>
              {DIALOG_OPTIONS.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isTyping}
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/35 hover:text-cyan-400 text-[11px] font-medium text-slate-300 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  <Send className="w-3 h-3 text-cyan-400 opacity-50" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
