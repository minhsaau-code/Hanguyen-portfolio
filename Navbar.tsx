import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
      id="main-nav"
    >
      <div 
        className={cn(
          "inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-all duration-300",
          scrolled ? "shadow-md shadow-black/10 scale-95" : "shadow-none scale-100"
        )}
      >
        {/* Logo */}
        <div className="group relative p-1">
          <div className="w-9 h-9 rounded-full accent-gradient flex items-center justify-center transition-transform hover:scale-110">
            <div className="w-[32px] h-[32px] rounded-full bg-bg flex items-center justify-center font-display italic text-[13px] text-text-primary">
              S
            </div>
          </div>
        </div>

        <div className="w-px h-5 bg-stroke mx-1 hidden md:block" />

        {/* Nav Links */}
        <div className="flex items-center">
          {[
            { name: "About me", id: "about" },
            { name: "Works", id: "work" },
            { name: "Contact", id: "contact" }
          ].map((link, i) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              className={cn(
                "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all text-muted hover:text-text-primary hover:bg-stroke/50"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="w-px h-5 bg-stroke mx-1" />

        {/* Say Hi Button */}
        <a 
          href="https://www.behance.net/minhsaau" 
          target="_blank" 
          rel="noreferrer"
          className="relative group px-4 py-2 text-xs sm:text-sm"
        >
          <div className="absolute inset-x-1 inset-y-0.5 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity blur-sm scale-110" />
          <div className="absolute inset-0 rounded-full bg-surface border border-white/10 transition-transform group-hover:scale-105" />
          <span className="relative z-10 text-text-primary flex items-center gap-1">
            Say hi <span className="mb-0.5">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
};
