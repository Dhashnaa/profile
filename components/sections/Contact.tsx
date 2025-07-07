'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle, Download, FileText } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import * as THREE from 'three';

export const Contact = () => {
  const { toast } = useToast();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationRef = useRef<number>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create 3D scene for contact section
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

    // Create communication-inspired 3D elements
    const networkNodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];

    // Create network nodes
    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const material = new THREE.MeshBasicMaterial({ 
        color: i % 3 === 0 ? 0x00ffff : i % 3 === 1 ? 0xff007f : 0x00ff7f, 
        transparent: true, 
        opacity: 0.7 
      });
      const node = new THREE.Mesh(geometry, material);
      
      const angle = (i / 12) * Math.PI * 2;
      const radius = 5 + Math.random() * 3;
      
      node.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 8,
        Math.sin(angle) * radius - 5
      );
      
      scene.add(node);
      networkNodes.push(node);
    }

    // Create connections between nodes
    for (let i = 0; i < networkNodes.length; i++) {
      for (let j = i + 1; j < networkNodes.length; j++) {
        if (Math.random() > 0.7) { // Only connect some nodes
          const points = [
            networkNodes[i].position,
            networkNodes[j].position
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ 
            color: 0x00ffff, 
            transparent: true, 
            opacity: 0.2 
          });
          const line = new THREE.Line(geometry, material);
          scene.add(line);
          connections.push(line);
        }
      }
    }

    // Create floating message icons
    const messageIcons: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const geometry = new THREE.PlaneGeometry(0.5, 0.3);
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ffff, 
        transparent: true, 
        opacity: 0.4,
        side: THREE.DoubleSide
      });
      const icon = new THREE.Mesh(geometry, material);
      
      icon.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 8 - 3
      );
      
      scene.add(icon);
      messageIcons.push(icon);
    }

    camera.position.z = 12;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Animate network nodes
      networkNodes.forEach((node, index) => {
        node.rotation.x += 0.01;
        node.rotation.y += 0.015;
        
        // Pulsing effect
        const scale = 1 + Math.sin(Date.now() * 0.003 + index) * 0.3;
        node.scale.setScalar(scale);
        
        // Orbital motion
        const time = Date.now() * 0.0005;
        const angle = (index / networkNodes.length) * Math.PI * 2 + time;
        const radius = 5 + Math.sin(time + index) * 1;
        
        node.position.x = Math.cos(angle) * radius;
        node.position.z = Math.sin(angle) * radius - 5;
      });

      // Animate message icons
      messageIcons.forEach((icon, index) => {
        icon.rotation.z += 0.02;
        icon.position.y += Math.sin(Date.now() * 0.002 + index) * 0.01;
        icon.position.x += Math.cos(Date.now() * 0.001 + index) * 0.005;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success notification
      toast({
        variant: "success",
        title: "Message Sent Successfully! ✨",
        description: "Thank you for reaching out! I'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // Simulate notification to receiver (in real app, this would be handled by backend)
      console.log('📧 New message received:', {
        from: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Send Message",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResumeDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Dhashnamoorthy_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show download notification
    toast({
      variant: "success",
      title: "Resume Downloaded! 📄",
      description: "Thank you for your interest. The resume has been downloaded successfully.",
    });
  };

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      {/* 3D Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        style={{ zIndex: 1 }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-32 h-32 border-2 border-cyan-500/20 rounded-full"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-pink-500/20"
          animate={{ 
            rotate: [0, -360],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 15, 
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
          Let's Connect
        </motion.h2>

        <motion.p
          className="text-gray-400 text-center mb-16 text-lg"
          initial={{ opacity: 0, y: 20, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          Ready to collaborate on your next project? Let's build something amazing together.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              {[
                { icon: Mail, label: "Email", value: "dhashnamoorthyv@gmail.com", color: "cyan" },
                { icon: Phone, label: "Phone", value: "+91 (934) 287-7540", color: "pink" },
                { icon: MapPin, label: "Location", value: "Cuddalore, Tamil Nadu", color: "cyan" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -30, rotateY: -20 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    x: 10,
                    boxShadow: item.color === 'cyan' 
                      ? "0 10px 30px rgba(0, 255, 255, 0.2)" 
                      : "0 10px 30px rgba(255, 0, 127, 0.2)"
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div 
                    className={`p-3 bg-gradient-to-r ${
                      item.color === 'cyan' 
                        ? 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30' 
                        : 'from-pink-500/20 to-purple-500/20 border-pink-500/30'
                    } rounded-lg border`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className={`w-5 h-5 ${
                      item.color === 'cyan' ? 'text-cyan-400' : 'text-pink-400'
                    }`} />
                  </motion.div>
                  <div>
                    <p className="text-gray-300">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
                  </div>
                </motion.div>
              ))}

              {/* Resume Download Section */}
              <motion.div
                className="pt-6 border-t border-gray-700"
                initial={{ opacity: 0, y: 20, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">Quick Access</h4>
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(0, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleResumeDownload}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform flex items-center justify-center gap-3"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Download Resume</span>
                    <Download className="w-4 h-4" />
                  </Button>
                </motion.div>
                <p className="text-gray-400 text-sm mt-2 text-center">
                  Get detailed information about my experience and skills
                </p>
              </motion.div>
            </div>

            <motion.div 
              className="pt-8"
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative w-48 h-48 mx-auto">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 rounded-full"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <div className="absolute inset-4 rounded-full overflow-hidden">
                  <img
                    src="/contact.jpg"
                    alt="Dhashnamoorthy  - Contact"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-full"></div>
                  <motion.div 
                    className="absolute bottom-2 left-2 right-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-cyan-500/30 text-center">
                      <p className="text-cyan-300 text-xs font-semibold">Let's Connect!</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                rotateY: -2,
                boxShadow: "0 20px 40px rgba(0, 255, 255, 0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 border-cyan-500/30 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20, rotateX: -10 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-300 mb-2">
                        {field.label}
                      </label>
                      <motion.div
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)" }}
                      >
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
                          placeholder={field.placeholder}
                          required
                          disabled={isSubmitting}
                        />
                      </motion.div>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20, rotateX: -10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <motion.div
                      whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)" }}
                    >
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400 resize-none"
                        placeholder="Tell me about your project..."
                        required
                        disabled={isSubmitting}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20, rotateX: -10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    viewport={{ once: true }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: isSubmitting ? 1 : 1.05,
                        rotateY: isSubmitting ? 0 : 5,
                        boxShadow: isSubmitting ? "none" : "0 10px 30px rgba(0, 255, 255, 0.4)"
                      }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 text-lg font-semibold transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <p className="text-gray-400 text-lg">
            Open to internships, collaborations, and coffee chats ☕
          </p>
        </motion.div>
      </div>
    </section>
  );
};