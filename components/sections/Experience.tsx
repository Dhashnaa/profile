'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Code, Award, Users, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Experience = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Create 3D scene for experience section
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create timeline-inspired 3D elements
    const timelineGeometry = new THREE.CylinderGeometry(0.02, 0.02, 20, 8);
    const timelineMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff, 
      transparent: true, 
      opacity: 0.6 
    });
    const timelineMesh = new THREE.Mesh(timelineGeometry, timelineMaterial);
    timelineMesh.position.set(0, 0, -5);
    scene.add(timelineMesh);

    // Create floating milestone markers
    const milestones: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const geometry = new THREE.SphereGeometry(0.3, 16, 16);
      const material = new THREE.MeshBasicMaterial({ 
        color: i % 2 === 0 ? 0x00ffff : 0xff007f, 
        transparent: true, 
        opacity: 0.8 
      });
      const milestone = new THREE.Mesh(geometry, material);
      
      milestone.position.set(
        (Math.random() - 0.5) * 8,
        6 - i * 3,
        -5 + (Math.random() - 0.5) * 2
      );
      
      scene.add(milestone);
      milestones.push(milestone);
    }

    // Create connecting lines
    const connections: THREE.Line[] = [];
    for (let i = 0; i < milestones.length - 1; i++) {
      const points = [
        milestones[i].position,
        milestones[i + 1].position
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0x00ffff, 
        transparent: true, 
        opacity: 0.3 
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      connections.push(line);
    }

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Animate timeline
      timelineMesh.rotation.z += 0.005;

      // Animate milestones
      milestones.forEach((milestone, index) => {
        milestone.rotation.x += 0.01;
        milestone.rotation.y += 0.015;
        
        // Pulsing effect
        const scale = 1 + Math.sin(Date.now() * 0.003 + index) * 0.2;
        milestone.scale.setScalar(scale);
        
        // Floating motion
        milestone.position.x += Math.sin(Date.now() * 0.002 + index) * 0.002;
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const experiences = [
    {
      title: "Vibe Coding",
      company: "Science Galeery, Bengaluru",
      duration: "March - 2025",
      location: "Bengaluru",
      description: "Working on natural language processing projects and machine learning model optimization.",
      icon: <Code className="w-5 h-5" />,
      technologies: ["Python", "TensorFlow", "OpenAI API", "React"]
    },
    {
      title: "Hackathon",
      company: "CK College Of Enginnering & Technology",
      duration: "April 2025",
      location: "Cuddalore",
      description: "Built responsive web applications for detecting credit card fraud transaction and got 2nd prize",
      icon: <Users className="w-5 h-5" />,
      technologies: ["GitHub", "Python", "Flask", "TensorFlow"]
    },
    {
      title: "Open Source Contributor",
      company: "Various Projects",
      duration: "August 2024",
      location: "Global",
      description: "Contributing to open-source AI and web development projects on GitHub.",
      icon: <Award className="w-5 h-5" />,
      technologies: ["Git", "Python", "JavaScript", "Documentation"]
    },
    {
      title: "Hackathon Participant",
      company: "Arunai Engineering College of Technology",
      duration: "Mar 2023",
      location: "Thiruvanamalai",
      description: "Developed an web application to detect the fake news by using ML algorithms",
      icon: <Zap className="w-5 h-5" />,
      technologies: ["GPT-4", "React", "FastAPI", "Legal Tech","Stackblitz"]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden">
      {/* 3D Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        style={{ zIndex: 1 }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-l from-pink-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30, rotateX: -20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          What I've Explored So Far
        </motion.h2>

        <motion.p
          className="text-gray-400 text-center mb-16 text-lg"
          initial={{ opacity: 0, y: 20, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          My journey through tech, one meaningful experience at a time
        </motion.p>

        <div className="relative">
          {/* Enhanced Timeline line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-pink-500 transform md:-translate-x-0.5"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:items-center`}
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  rotateY: index % 2 === 0 ? -30 : 30,
                  scale: 0.8
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  rotateY: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Enhanced Timeline dot */}
                <motion.div 
                  className="absolute left-4 md:left-1/2 w-6 h-6 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full transform -translate-x-3 md:-translate-x-3 border-4 border-black z-10"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.5,
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.8)"
                  }}
                />

                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: index % 2 === 0 ? 5 : -5,
                      z: 50,
                      boxShadow: "0 20px 40px rgba(0, 255, 255, 0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Card className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 group">
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div 
                          className="p-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-lg border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300"
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.1
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {exp.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <p className="text-cyan-400 font-semibold">{exp.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-300 font-medium"
                            whileHover={{ 
                              scale: 1.1,
                              boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)"
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.2 + techIndex * 0.1 + 0.8 }}
                            viewport={{ once: true }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Spacer for the other side on larger screens */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};