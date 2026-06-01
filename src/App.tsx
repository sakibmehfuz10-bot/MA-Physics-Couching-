import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
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
import { StudentPortal } from './components/StudentPortal';
import { PortalAccess } from './components/PortalAccess';
import { CookieBanner } from './components/CookieBanner';

function LandingPage() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('hasLoaded');
  });

  const handleComplete = () => {
    sessionStorage.setItem('hasLoaded', 'true');
    setLoading(false);
  };

  return (
    <div className="relative z-0">
      <AnimatedBackground />
      {loading ? (
        <LoadingScreen onComplete={handleComplete} />
      ) : (
        <>
          <main>
            <Hero />
            <div className="relative z-20 bg-[#0A0A0A]/70 backdrop-blur-md rounded-t-[3rem] -mt-10 pt-10 shadow-2xl">
              <AboutTeacher />
              <PortalAccess />
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

export default function App() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white font-sans selection:bg-white/20">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portal" element={<StudentPortal />} />
      </Routes>
      <CookieBanner />
    </div>
  );
}
