'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Card3D } from '@/components/3d/Card3D';
import { ParallaxSection } from '@/components/3d/ParallaxSection';

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 relative">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-cyan-500/20 rotate-45"
          animate={{ 
            rotate: [45, 405],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 border border-pink-500/20"
          animate={{ 
            rotate: [0, -360],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ParallaxSection offset={30}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
        </ParallaxSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card3D glowColor="cyan">
              <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 border-cyan-500/30 backdrop-blur-sm">
                <div className="aspect-square relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 rounded-lg"></div>
                  <div className="absolute inset-4 bg-gray-800 rounded-lg flex items-center justify-center">
                    <motion.div 
                      className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full flex items-center justify-center text-4xl font-bold text-black"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      AI
                    </motion.div>
                  </div>
                </div>
              </Card>
            </Card3D>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Hey there! I'm <span className="text-cyan-400">Alex Chen</span>
            </h3>
            
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              A passionate AI enthusiast & web developer on a journey from zero to impact. 
              I believe in learning by building and strive to understand the deeper mechanics 
              of technology — from front-end craft to AI logic.
            </motion.p>
            
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              My approach combines cutting-edge AI technologies with elegant web design, 
              creating solutions that are both intelligent and user-friendly. Every project 
              is an opportunity to push boundaries and explore new possibilities.
            </motion.p>
            
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              Let's connect and build something meaningful together. I'm always excited to 
              collaborate on projects that make a real difference.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              {['Problem Solver', 'AI Enthusiast', 'Web Developer', 'Tech Explorer'].map((tag, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};