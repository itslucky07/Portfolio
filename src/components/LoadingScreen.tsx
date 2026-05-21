import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING CORE SYSTEM...');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const startupSequence = [
    { threshold: 10, log: 'SYS: Initializing bootloader kernel v4.8.2...' },
    { threshold: 25, log: 'SYS: Connecting SQLite server nodes... OK' },
    { threshold: 40, log: 'SYS: Compiling Technical Competency telemetry...' },
    { threshold: 55, log: 'SYS: Spawning A.V.A Neural Dialog Engine...' },
    { threshold: 70, log: 'SYS: Loading Project portfolio data blocks...' },
    { threshold: 85, log: 'SYS: Establishing secure websocket connection...' },
    { threshold: 95, log: 'SYS: Firewall bypass active. Initializing UI...' }
  ];

  useEffect(() => {
    const duration = 2000; // 2.0s loading animation for rich terminal log simulation
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const nextProgress = Math.min(Math.round((stepCount / steps) * 100), 100);
      setProgress(nextProgress);

      // Dynamic Status messages
      if (nextProgress < 25) {
        setStatusText('INITIALIZING SECURE PROTOCOLS...');
      } else if (nextProgress < 50) {
        setStatusText('CONNECTING SYSTEM TELEMETRY NODES...');
      } else if (nextProgress < 75) {
        setStatusText('SPAWNING A.V.A ARTIFICIAL INTELLIGENCE...');
      } else if (nextProgress < 95) {
        setStatusText('OPTIMIZING CYBER SECURITY CONSOLES...');
      } else {
        setStatusText('SYSTEM ONLINE. DEPLOYING INTERFACE.');
      }

      // Add log entries sequentially based on progress threshold
      startupSequence.forEach(item => {
        if (nextProgress >= item.threshold) {
          setConsoleLogs(prev => {
            if (!prev.includes(item.log)) {
              return [...prev, item.log];
            }
            return prev;
          });
        }
      });

      if (nextProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 550); // Pause briefly to enjoy the completed load screen
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.05,
          filter: 'blur(10px)',
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#010206] overflow-hidden select-none"
      >
        {/* Holographic Background Grid (Dangerous & Cool) */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* Moving Cyber Scanline */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-[scanline_3s_linear_infinite] pointer-events-none" />

        {/* Ambient Pulsing Radial Aura in background */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06)_0%,rgba(168,85,247,0.04)_50%,transparent_100%)] blur-[80px] pointer-events-none"
        />

        {/* Diagonal Warning Stripes Border (Bold & Dangerous accent) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[repeating-linear-gradient(45deg,#06b6d4,#06b6d4_10px,#010206_10px,#010206_20px)] opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[repeating-linear-gradient(45deg,#a855f7,#a855f7_10px,#010206_10px,#010206_20px)] opacity-50" />

        <div className="relative max-w-lg w-full px-6 flex flex-col items-center z-10">

          {/* Advanced Neon Telemetry Radar Circle */}
          <div className="relative w-36 h-36 flex items-center justify-center mb-8">
            {/* Outer Slow Dash Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20"
            />
            {/* Middle Fast Laser Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-2 rounded-full border-t-2 border-r border-cyan-400 border-l-transparent border-b-transparent shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            />
            {/* Inner Purple Counter-ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              className="absolute inset-4 rounded-full border-t border-l-2 border-purple-500 border-r-transparent border-b-transparent shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            />

            {/* Central Node Core with Radar Sweep */}
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-14 h-14 rounded-full bg-slate-950 border border-slate-900 flex items-center justify-center shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]"
            >
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            </motion.div>

            {/* Sweep radar line */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,rgba(6,182,212,0.15),transparent_60%)] rounded-full animate-[spin_3s_linear_infinite]" />
          </div>

          {/* Heading with Neon Cyber Shadow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-[0.25em] text-white uppercase drop-shadow-[0_0_12px_rgba(6,182,212,0.45)]">
              Lucky Sharma
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <p className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase">
                AI/ML &amp; Full Stack Core
              </p>
            </div>
          </motion.div>

          {/* Status Message */}
          <div className="w-full mt-8 bg-slate-950/90 border border-slate-900 rounded-xl p-4 shadow-xl backdrop-blur-md relative overflow-hidden">
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-400" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-400" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-400" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-400" />

            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500 border-b border-slate-900 pb-2 mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span className="animate-pulse">{statusText}</span>
            </div>

            {/* Dynamic Console Logs */}
            <div className="h-20 overflow-y-auto pr-1 text-[9px] font-mono space-y-1.5 text-slate-500 scrollbar-none">
              {consoleLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-1">
                  <span className="text-purple-500">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
              {consoleLogs.length === 0 && (
                <div className="text-slate-700 italic">Accessing database sectors...</div>
              )}
            </div>
          </div>

          {/* Glowing Slider Progress Bar */}
          <div className="w-full mt-6 flex items-center justify-between gap-4">
            <div className="flex-grow h-1.5 bg-slate-950 rounded-full border border-slate-900 overflow-hidden p-[1px]">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-cyan-400 text-sm font-black min-w-[42px] text-right drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
              {progress}%
            </span>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
