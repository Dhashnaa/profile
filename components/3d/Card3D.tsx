'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'pink' | 'purple' | 'blue';
}

export const Card3D = ({ children, className = '', glowColor = 'cyan' }: Card3DProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const glowColors = {
    cyan: 'shadow-cyan-500/25',
    pink: 'shadow-pink-500/25',
    purple: 'shadow-purple-500/25',
    blue: 'shadow-blue-500/25'
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        rotateY: 5,
        rotateX: 5,
        scale: 1.02,
        z: 50
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-lg blur-xl ${glowColors[glowColor]} opacity-0`}
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main card */}
      <motion.div
        className="relative z-10"
        animate={{
          rotateY: isHovered ? 2 : 0,
          rotateX: isHovered ? 2 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
      </motion.div>

      {/* Reflection effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-lg opacity-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};