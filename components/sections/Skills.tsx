'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Code, Brain, Settings, Database, Globe, Smartphone } from 'lucide-react';

export const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Globe className="w-6 h-6" />,
      skills: [
        { name: "React/Next.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "TailwindCSS", level: 95 },
        { name: "Three.js", level: 75 }
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "AI & Machine Learning",
      icon: <Brain className="w-6 h-6" />,
      skills: [
        { name: "Python", level: 88 },
        { name: "TensorFlow", level: 80 },
        { name: "OpenAI API", level: 92 },
        { name: "Scikit-learn", level: 85 }
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Backend & Tools",
      icon: <Settings className="w-6 h-6" />,
      skills: [
        { name: "Node.js", level: 82 },
        { name: "FastAPI", level: 78 },
        { name: "Docker", level: 70 },
        { name: "Git/GitHub", level: 95 }
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Mobile & Database",
      icon: <Smartphone className="w-6 h-6" />,
      skills: [
        { name: "React Native", level: 75 },
        { name: "Firebase", level: 88 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 82 }
      ],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 group h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-r ${category.color} bg-opacity-20 rounded-lg border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-cyan-400 text-sm font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional skills cloud */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">Also Experienced With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Azure', 'Vercel',' Bolt', 'VS Code', 'Jupyter', 'Pandas', 
              'NumPy', 'Flask', 'Stackblitz', 'GraphQL', 'Streamlit', 'Cypress'
            ].map((tech, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-full text-gray-300 text-sm font-medium hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};