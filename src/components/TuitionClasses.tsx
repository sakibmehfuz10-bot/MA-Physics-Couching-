import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Atom, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function TuitionClasses() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });
    const bg = e.currentTarget.querySelector('.hover-gradient');
    if (bg) {
      gsap.to(bg, { opacity: 1, scale: 1.1, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    const bg = e.currentTarget.querySelector('.hover-gradient');
    if (bg) {
      gsap.to(bg, { opacity: 0, scale: 1, duration: 0.4, ease: "power2.out" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tuition-classes" ref={sectionRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-stroke/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-white tracking-tight">Tuition Classes</h2>
          <p className="text-muted text-lg font-light leading-relaxed">
            Focused Learning for Class 11 & 12
          </p>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Class 11 Card */}
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group relative overflow-hidden rounded-[2rem] border border-stroke bg-surface/50 p-8 md:p-10 flex flex-col justify-between min-h-[320px] origin-center"
        >
          <div className="hover-gradient absolute inset-0 z-0 opacity-0" 
               style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.1), transparent 40%)' }} />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 flex-shrink-0 rounded-full border border-stroke bg-black/50 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white/70" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight leading-none">Class 11 Physics</h3>
            </div>
            
            <p className="text-muted font-light leading-relaxed mb-8">
              Building strong foundations in Mechanics, Thermodynamics, and Waves.
            </p>
            
            <ul className="space-y-4 text-sm text-muted/80 font-light mt-auto">
               <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-white/50 flex-shrink-0 mt-0.5" /><span className="text-base text-white/90">Basic to Advanced Concepts</span></li>
               <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-white/50 flex-shrink-0 mt-0.5" /><span className="text-base text-white/90">Numerical Problem Solving</span></li>
               <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-white/50 flex-shrink-0 mt-0.5" /><span className="text-base text-white/90">Foundation for JEE/NEET</span></li>
            </ul>
          </div>
        </div>
        
        {/* Class 12 Card */}
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group relative overflow-hidden rounded-[2rem] border border-stroke bg-surface/50 p-8 md:p-10 flex flex-col justify-between min-h-[320px] origin-center"
        >
          <div className="hover-gradient absolute inset-0 z-0 opacity-0" 
               style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.1), transparent 40%)' }} />

          <div className="relative z-10 flex flex-col h-full">
             <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 flex-shrink-0 rounded-full border border-stroke bg-black/50 flex items-center justify-center">
                <Atom className="w-6 h-6 text-white/70" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight leading-none">Class 12 Physics</h3>
            </div>
            
            <p className="text-muted font-light leading-relaxed mb-8">
              In-depth study of Electromagnetism, Optics, and Modern Physics.
            </p>
            
            <ul className="space-y-4 text-sm text-muted/80 font-light mt-auto">
               <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-white/50 flex-shrink-0 mt-0.5" /><span className="text-base text-white/90">Board Exam Focused</span></li>
               <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-white/50 flex-shrink-0 mt-0.5" /><span className="text-base text-white/90">Derivation Mastery</span></li>
               <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-white/50 flex-shrink-0 mt-0.5" /><span className="text-base text-white/90">Regular Revision Cycles</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
