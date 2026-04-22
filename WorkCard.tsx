import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface WorkCardProps {
  title: string;
  img: string;
  span: string;
  href?: string;
}

export const WorkCard = ({ title, img, span, href }: WorkCardProps) => {
  const content = (
    <>
      {/* Background Image */}
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      
      {/* Halftone Overlay */}
      <div className="halftone absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" />
      
      {/* Hover Information */}
      <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-lg flex items-center justify-center p-6 text-center">
        <div className="gradient-border-wrapper">
          <div className="relative bg-bg px-6 py-2 rounded-full overflow-hidden">
             <span className="text-sm font-medium whitespace-nowrap">
              View — <span className="font-display italic">{title}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const wrapperClass = cn(
    "group relative overflow-hidden rounded-3xl bg-surface border border-stroke aspect-[4/3] md:aspect-auto md:h-[600px]",
    span
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(wrapperClass, "block cursor-pointer")}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className={wrapperClass}
    >
      {content}
    </motion.div>
  );
};
