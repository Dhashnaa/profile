'use client';

import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Certifications } from '@/components/sections/Certifications';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { ParticleBackground } from '@/components/ParticleBackground';
import { FloatingCards } from '@/components/3d/FloatingCards';
import { SectionTransition } from '@/components/3d/SectionTransition';

export default function Home() {
  return (
    <main className="relative bg-black text-white overflow-hidden">
      <ParticleBackground />
      <FloatingCards />
      <Header />
      
      <div className="relative z-10">
        <Hero />
        
        <SectionTransition delay={0.1}>
          <About />
        </SectionTransition>
        
        <SectionTransition delay={0.2}>
          <Experience />
        </SectionTransition>
        
        <SectionTransition delay={0.3}>
          <Certifications />
        </SectionTransition>
        
        <SectionTransition delay={0.4}>
          <Skills />
        </SectionTransition>
        
        <SectionTransition delay={0.5}>
          <Projects />
        </SectionTransition>
        
        <SectionTransition delay={0.6}>
          <Contact />
        </SectionTransition>
        
        <Footer />
      </div>
    </main>
  );
}