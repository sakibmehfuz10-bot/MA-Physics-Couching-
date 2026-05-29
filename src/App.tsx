import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutTeacher } from './components/AboutTeacher';
import { TuitionClasses } from './components/TuitionClasses';
import { FeaturedTopics } from './components/FeaturedTopics';
import { RecentNotes } from './components/RecentNotes';
import { StudyMaterials } from './components/StudyMaterials';
import { VisualLab } from './components/VisualLab';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white font-sans selection:bg-white/20 relative z-0">
      <AnimatedBackground />
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <div className="relative z-20 bg-[#0A0A0A]/70 backdrop-blur-md rounded-t-[3rem] -mt-10 pt-10 shadow-2xl">
              <AboutTeacher />
              <TuitionClasses />
              <FeaturedTopics />
              <StudyMaterials />
              <RecentNotes />
            </div>
            <VisualLab />
            <Stats />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
