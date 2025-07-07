'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Play } from 'lucide-react';

export const Projects = () => {
  const projects = [
    {
      title: "AI Legal Reasoning Chatbot",
      description: "Advanced chatbot using GPT-4 for legal document analysis and reasoning. Features real-time case law lookup and intelligent legal advice generation.",
      image: "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["GPT-4", "React", "FastAPI", "PostgreSQL"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true
    },
    {
      title: "Real-time Weather Intelligence",
      description: "Comprehensive weather dashboard with ML-powered forecasting, climate pattern analysis, and personalized weather insights.",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "D3.js", "Python", "Weather API"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true
    },
    {
      title: "AI Image Generator Studio",
      description: "Creative platform for AI-powered image generation with custom prompts, style transfer, and batch processing capabilities.",
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["DALL-E API", "Next.js", "TailwindCSS", "Stripe"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: false
    },
    {
      title: "Smart Portfolio CMS",
      description: "Dynamic content management system for portfolios with AI-powered content suggestions and automated SEO optimization.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Firebase", "React", "OpenAI", "Analytics"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: false
    },
    {
      title: "Crypto Analytics Dashboard",
      description: "Real-time cryptocurrency tracking with advanced analytics, portfolio management, and ML-based price prediction models.",
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Chart.js", "WebSocket", "CoinGecko API"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: false
    },
    {
      title: "AI Blog Generator",
      description: "Intelligent blog creation platform that generates SEO-optimized content, suggests topics, and automates publishing workflows.",
      image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["GPT-3.5", "Next.js", "MongoDB", "Vercel"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <motion.p
          className="text-gray-400 text-center mb-16 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Real-world applications showcasing AI innovation and modern web development
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={project.featured ? 'lg:col-span-2' : ''}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 group h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white transition-all duration-300"
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <Play className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-pink-500 text-pink-400 hover:bg-pink-500/10 transition-all duration-300"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            variant="outline"
            className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3 text-lg font-semibold transition-all duration-300"
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};