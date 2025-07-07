'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Award, Calendar, Building, X, Download } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const Certifications = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  const certifications = [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "March 2024",
      credentialId: "AWS-CCP-2024-001",
      description: "Foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support.",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      pdfUrl: "/certificates/Machine Learning.pdf",
      verifyUrl: "https://aws.amazon.com/verification",
      skills: ["Cloud Computing", "AWS Services", "Security", "Architecture"],
      type: "Cloud",
      featured: true
    },
    {
      title: "Google AI/ML Professional Certificate",
      issuer: "Google Cloud",
      date: "December 2023",
      credentialId: "GCP-ML-2023-456",
      description: "Comprehensive training in machine learning, deep learning, and AI implementation using Google Cloud Platform.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      pdfUrl: "/certificates/Performance Evaluation in Machine Learning.pdf",
      verifyUrl: "https://cloud.google.com/certification",
      skills: ["Machine Learning", "TensorFlow", "AI", "Data Science"],
      type: "AI/ML",
      featured: true
    },
    {
      title: "Meta Frontend Developer Certificate",
      issuer: "Meta (Facebook)",
      date: "October 2023",
      credentialId: "META-FE-2023-789",
      description: "Professional-level training in React, JavaScript, HTML/CSS, and modern frontend development practices.",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
      pdfUrl: "/certificates/meta-frontend.pdf",
      verifyUrl: "https://developers.facebook.com/certification",
      skills: ["React", "JavaScript", "HTML/CSS", "UI/UX"],
      type: "Frontend",
      featured: false
    },
    {
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      date: "September 2023",
      credentialId: "AZ-900-2023-012",
      description: "Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800",
      pdfUrl: "/certificates/azure-fundamentals.pdf",
      verifyUrl: "https://docs.microsoft.com/en-us/learn/certifications",
      skills: ["Azure", "Cloud Services", "DevOps", "Security"],
      type: "Cloud",
      featured: false
    },
    {
      title: "TensorFlow Developer Certificate",
      issuer: "TensorFlow",
      date: "August 2023",
      credentialId: "TF-DEV-2023-345",
      description: "Demonstrates proficiency in using TensorFlow to solve deep learning and machine learning problems.",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
      pdfUrl: "/certificates/tensorflow-developer.pdf",
      verifyUrl: "https://www.tensorflow.org/certificate",
      skills: ["TensorFlow", "Deep Learning", "Neural Networks", "Python"],
      type: "AI/ML",
      featured: false
    },
    {
      title: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "July 2023",
      credentialId: "CKA-2023-678",
      description: "Demonstrates skills in Kubernetes administration, including installation, configuration, and management.",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      pdfUrl: "/certificates/kubernetes-admin.pdf",
      verifyUrl: "https://www.cncf.io/certification",
      skills: ["Kubernetes", "Container Orchestration", "DevOps", "Linux"],
      type: "DevOps",
      featured: false
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'AI/ML':
        return 'from-purple-500 to-pink-500';
      case 'Cloud':
        return 'from-blue-500 to-cyan-500';
      case 'Frontend':
        return 'from-green-500 to-emerald-500';
      case 'DevOps':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const handleViewCertificate = (cert: any) => {
    setSelectedCertificate(cert);
  };

  const handleDownloadCertificate = (cert: any) => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = cert.pdfUrl;
    link.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="certifications" className="py-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-purple-500/20 rounded-lg rotate-45"
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
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-cyan-500/20 rounded-full"
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

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30, rotateX: -20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          Certifications & Achievements
        </motion.h2>

        <motion.p
          className="text-gray-400 text-center mb-16 text-lg"
          initial={{ opacity: 0, y: 20, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          Professional certifications validating expertise across multiple domains
        </motion.p>

        {/* Featured Certifications */}
        <div className="mb-12">
          <motion.h3
            className="text-2xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Featured Certifications
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {certifications.filter(cert => cert.featured).map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: index % 2 === 0 ? 5 : -5,
                    boxShadow: "0 20px 40px rgba(147, 51, 234, 0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Card className="overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 group h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge className={`bg-gradient-to-r ${getTypeColor(cert.type)} text-white border-0`}>
                          {cert.type}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                          {cert.title}
                        </h3>
                        <div className="flex items-center gap-2 text-purple-300 text-sm">
                          <Building className="w-4 h-4" />
                          {cert.issuer}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        {cert.date}
                        <span className="mx-2">•</span>
                        <span className="text-purple-400">ID: {cert.credentialId}</span>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {cert.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {cert.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300 font-medium"
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: "0 0 10px rgba(147, 51, 234, 0.5)"
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.2 + skillIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleViewCertificate(cert)}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transition-all duration-300"
                        >
                          <Award className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                        <Button
                          onClick={() => handleDownloadCertificate(cert)}
                          variant="outline"
                          className="border-purple-500 text-purple-400 hover:bg-purple-500/10 transition-all duration-300"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
                        >
                          <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Certifications Grid */}
        <div>
          <motion.h3
            className="text-2xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            All Certifications
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 15px 30px rgba(147, 51, 234, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Card className="p-4 bg-gradient-to-br from-gray-900/30 to-black/30 border-gray-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 group cursor-pointer h-full"
                    onClick={() => handleViewCertificate(cert)}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 bg-gradient-to-r ${getTypeColor(cert.type)} bg-opacity-20 rounded-lg border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300`}>
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                          {cert.title}
                        </h4>
                        <p className="text-purple-400 text-xs">{cert.issuer}</p>
                      </div>
                      <Badge className={`bg-gradient-to-r ${getTypeColor(cert.type)} text-white border-0 text-xs`}>
                        {cert.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                      <Calendar className="w-3 h-3" />
                      {cert.date}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-xs text-purple-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/10 border border-gray-500/20 rounded text-xs text-gray-400">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-500/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-700 text-white text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewCertificate(cert);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadCertificate(cert);
                        }}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificate Viewer Dialog */}
        <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
          <DialogContent className="max-w-4xl w-full h-[90vh] bg-black/95 border-purple-500/30 text-white">
            <DialogHeader className="border-b border-gray-800 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl font-bold text-purple-300">
                    {selectedCertificate?.title}
                  </DialogTitle>
                  <div className="flex items-center gap-4 mt-2 text-gray-400">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {selectedCertificate?.issuer}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedCertificate?.date}
                    </div>
                    <Badge className={`bg-gradient-to-r ${getTypeColor(selectedCertificate?.type)} text-white border-0`}>
                      {selectedCertificate?.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownloadCertificate(selectedCertificate)}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <a href={selectedCertificate?.verifyUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Verify
                    </a>
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6 h-full">
                {/* Certificate Image */}
                <div className="relative bg-gray-900/50 rounded-lg overflow-hidden">
                  <img
                    src={selectedCertificate?.image}
                    alt={selectedCertificate?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
                      <p className="text-purple-300 text-sm font-semibold">Certificate Preview</p>
                      <p className="text-white text-xs">ID: {selectedCertificate?.credentialId}</p>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="space-y-6 overflow-y-auto">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedCertificate?.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Skills Covered</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate?.skills.map((skill: string, index: number) => (
                        <motion.span
                          key={index}
                          className="px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-300 font-medium"
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)"
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Credential Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Credential ID:</span>
                        <span className="text-purple-300 font-mono">{selectedCertificate?.credentialId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Issue Date:</span>
                        <span className="text-white">{selectedCertificate?.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Issuing Organization:</span>
                        <span className="text-white">{selectedCertificate?.issuer}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleDownloadCertificate(selectedCertificate)}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        <a href={selectedCertificate?.verifyUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Verify Online
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};