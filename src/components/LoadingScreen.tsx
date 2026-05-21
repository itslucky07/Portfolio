import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1200; // 1.2s loading animation
    const intervalTime = 15;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const nextProgress = Math.min(Math.round((stepCount / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 300); // Small pause at 100%
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712]"
      >
        <div className="relative flex flex-col items-center">
          {/* Animated Glowing Outer Ring */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-400 border-l-2 border-l-transparent border-b-2 border-b-transparent shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute inset-2 rounded-full border-t-2 border-l-2 border-purple-500 border-r-2 border-r-transparent border-b-2 border-b-transparent shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            />
            {/* Core Tech Node */}
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center"
            >
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            </motion.div>
          </div>

          {/* Text & Counter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-center"
          >
            <h2 className="font-display font-bold text-2xl tracking-widest text-white uppercase">
              Lucky Sharma
            </h2>
            <p className="text-slate-400 text-xs tracking-wider uppercase mt-1">
              AI/ML & Full Stack Portfolio
            </p>
          </motion.div>

          <div className="mt-6 flex items-center gap-2">
            <div className="w-32 h-[3px] bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-cyan-400 text-sm font-semibold min-w-[36px] text-right">
              {progress}%
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
