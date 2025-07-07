'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Create 3D scene for hero background
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

    // Create floating geometric shapes
    const geometries = [
      new THREE.RingGeometry(1, 1.5, 8),
      new THREE.TorusGeometry(1, 0.3, 8, 16),
      new THREE.OctahedronGeometry(1),
      new THREE.TetrahedronGeometry(1.2),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ 
        color: 0x00ffff, 
        transparent: true, 
        opacity: 0.3,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0xff007f, 
        transparent: true, 
        opacity: 0.2,
        wireframe: true 
      }),
    ];

    const meshes: THREE.Mesh[] = [];

    // Create floating objects around the hero
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);

      const angle = (i / 8) * Math.PI * 2;
      const radius = 8 + Math.random() * 4;
      
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 6,
        Math.sin(angle) * radius
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(mesh);
      meshes.push(mesh);
    }

    camera.position.z = 15;

    // Animation loop
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Animate each mesh
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.001;
        mesh.rotation.y += 0.008 + index * 0.001;
        mesh.rotation.z += 0.003 + index * 0.0005;

        // Orbital motion
        const time = Date.now() * 0.0005;
        const angle = (index / meshes.length) * Math.PI * 2 + time;
        const radius = 8 + Math.sin(time + index) * 2;
        
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        mesh.position.y += Math.sin(time * 2 + index) * 0.01;
      });

      // Mouse interaction
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      {/* 3D Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Profile Image Behind Particles */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="relative w-96 h-96 md:w-[500px] md:h-[500px]">
          {/* Outer glow ring */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main circle with gradient border */}
          <motion.div 
            className="absolute inset-8 rounded-full bg-gradient-to-r from-cyan-500/30 to-pink-500/30 p-1"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              {/* Profile placeholder */}
              <motion.div 
                className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center text-4xl md:text-6xl font-bold text-black"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 360,
                  boxShadow: "0 0 50px rgba(0, 255, 255, 0.5)"
                }}
                transition={{ duration: 0.5 }}
              >
                DP
              </motion.div>
            </div>
          </motion.div>
          
          {/* Animated rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-pink-500/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-12 rounded-full border border-cyan-500/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Social Links */}
      <div className="absolute top-24 right-8 flex gap-4 z-20">
        <motion.a
          href="https://github.com/Dhashnaa"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-black/20 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:bg-cyan-500/10"
          whileHover={{ 
            scale: 1.1,
            rotateY: 180,
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="w-6 h-6 text-cyan-400" />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/dhashnamoorthy-v-769a7027b/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-black/20 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:bg-cyan-500/10"
          whileHover={{ 
            scale: 1.1,
            rotateY: 180,
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin className="w-6 h-6 text-cyan-400" />
        </motion.a>
        <motion.a
          href="mailto:dhashnamoorthyv@gmail.com"
          className="p-3 rounded-full bg-black/20 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:bg-cyan-500/10"
          whileHover={{ 
            scale: 1.1,
            rotateY: 180,
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-6 h-6 text-cyan-400" />
        </motion.a>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-white to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          Building Intelligent Interfaces
        </motion.h1>
        
        <motion.div
          className="text-2xl md:text-3xl font-light mb-4 text-gray-300"
          initial={{ opacity: 0, y: 30, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          One Line at a Time
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          Aspiring AI & Web Developer exploring the tech universe, one real-time project at a time. 
          Let's build something extraordinary together.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 10px 30px rgba(0, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform shadow-lg"
            >
              View Projects
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ 
              scale: 1.05,
              rotateY: -5,
              boxShadow: "0 10px 30px rgba(255, 0, 127, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-2 border-pink-500 text-pink-400 hover:bg-pink-500/10 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform"
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              rotateX: [0, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => scrollToSection('about')}
            whileHover={{ 
              scale: 1.2,
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)"
            }}
          >
            <ArrowDown className="w-6 h-6 text-cyan-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};