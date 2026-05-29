import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, GraduationCap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function AboutTeacher() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with parallax
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 150, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // Content stagger reveal
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: Image/Visual */}
        <div
          ref={imageRef}
          className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-stroke bg-surface/50 group"
        >
          <img 
            src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2000&auto=format&fit=crop" 
            alt="Physics Classroom"
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
          
          <div className="absolute bottom-6 left-6 right-6">
             <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md text-sm text-white/90">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <MapPin className="w-4 h-4 text-white/70" />
                  Address
                </div>
                <div className="text-white/70 font-light leading-relaxed">
                  Bhabta 118 no Railgate, Beldanga, Murshidabad<br/>
                  PIN code 742134
                </div>
                <div className="pt-2 mt-2 border-t border-white/10 text-white/50 text-xs">
                  In-person classes for Class 11 & 12.
                </div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div
          ref={contentRef}
          className="flex flex-col justify-center"
        >
          <span className="mb-4 text-xs font-semibold tracking-widest text-muted uppercase">
            About the Teacher
          </span>
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-white tracking-tight">
            Mamun Akhtar
          </h2>
          <p className="text-xl text-muted font-light mb-10 leading-relaxed md:max-w-lg">
            Mamun Akhtar is an experienced physics tutor with a strong academic background. He focuses on clear concept delivery, worked examples, and regular mock tests to prepare students for boards and competitive exams.
          </p>

          <div className="space-y-8">
            {/* Qualification 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full border border-stroke bg-surface">
                <GraduationCap className="w-5 h-5 text-white/70" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2 tracking-wide">Academic Background</h4>
                <div className="space-y-1">
                  <p className="text-muted leading-relaxed font-light">B.Sc (Hons. in Physics)</p>
                  <p className="text-muted leading-relaxed font-light">M.Sc (Special in Particle Physics)</p>
                </div>
              </div>
            </div>

            {/* Qualification 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full border border-stroke bg-surface">
                <Award className="w-5 h-5 text-white/70" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2 tracking-wide">Professional Qualifications</h4>
                <div className="space-y-1">
                  <p className="text-muted leading-relaxed font-light">B.Ed</p>
                  <p className="text-muted leading-relaxed font-light">Bihar STET Qualified</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-stroke/50">
            <blockquote className="border-l-2 border-white/20 pl-6 italic text-muted text-lg font-display tracking-wide mb-8">
              "Physics is not just about memorizing formulas; it's about understanding the logic of the universe."
            </blockquote>

            <a 
              href="https://youtube.com/@mamunakhtar8866?si=piKPCRmtywyMkVIq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-4 transition-colors text-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#FF0000] flex-shrink-0">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <div className="flex flex-col">
                 <span className="text-sm font-semibold tracking-wide text-white">Watch Free Video Lectures</span>
                 <span className="text-xs text-white/50 mt-0.5">Subscribe to my YouTube channel for explanations and tutorials</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
