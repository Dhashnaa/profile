'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const SectionTransition = ({ children, className = '', delay = 0 }: SectionTransitionProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ 
        opacity: 0, 
        y: 100,
        rotateX: -15,
        scale: 0.9
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        scale: 1
      }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {children}
    </motion.div>
  );
};