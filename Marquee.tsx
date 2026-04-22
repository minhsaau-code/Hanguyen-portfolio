import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '../lib/utils';

export const Marquee = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(innerRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex overflow-hidden whitespace-nowrap border-y border-stroke py-8 md:py-12"
      id="marquee-container"
    >
      <div 
        ref={innerRef}
        className="flex text-7xl md:text-[10rem] lg:text-[12rem] font-display uppercase italic leading-none"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="pr-12 text-text-primary/90">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
