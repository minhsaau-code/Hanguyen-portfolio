import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const words = ["3D", "Motion", "Design"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const duration = 2700;
    const interval = duration / 100;
    
    const countTimer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(countTimer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => {
      clearInterval(countTimer);
      clearInterval(wordTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-12"
      id="loading-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portfolio
      </motion.div>

      <div className="flex justify-center flex-1 items-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary"
          >
            {words[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="space-y-8">
        <div className="flex justify-end">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
            {String(count).padStart(3, "0")}
          </span>
        </div>
        <div className="h-[3px] w-full bg-stroke/50 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 accent-gradient shadow-[0_0_8px_rgba(137,170,204,0.35)]"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
