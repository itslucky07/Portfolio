import { useState, useEffect } from 'react';
import { CanvasBackground } from './components/CanvasBackground';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Achievements } from './components/sections/Achievements';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';
import { AIAvatar } from './components/AIAvatar';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (isLoading) return;

    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -55% 0px', // Triggers when the section occupies the center of the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
          {/* Interactive Canvas Grid */}
          <CanvasBackground />

          {/* Sticky Header Nav */}
          <Navbar activeSection={activeSection} />

          {/* Main Portfolio Sections */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            <Contact />
          </main>

          {/* Floating AI Assistant Companion (Active when scrolled past home) */}
          {activeSection !== 'home' && <AIAvatar mode="floating" />}

          {/* Footer & Scroll to Top */}
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
