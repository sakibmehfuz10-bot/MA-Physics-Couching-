import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HLSVideo } from './HLSVideo';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations after loading screen
      gsap.fromTo(
        ".hero-element",
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1.5, 
          stagger: 0.2, 
          ease: "power3.out",
          delay: 3.2 // After loader
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <HLSVideo 
          src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
          className="h-full w-full opacity-90"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-[#0A0A0A] opacity-90" />
        <div className="absolute inset-0 halftone-overlay opacity-30" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <span className="hero-element mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-muted">
          PHYSICS TUITION
        </span>
        
        <h1 className="hero-element font-display mb-2 text-6xl font-normal leading-tight md:text-8xl lg:text-9xl">
          M.A Physics
        </h1>
        
        <p className="hero-element mb-8 text-xl font-light text-muted md:text-2xl">
          A strong Physics foundation starts here.
        </p>
        
        <p className="hero-element mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
          Carefully taught Physics with strong concept clarity and regular mock tests for Class 11 and 12 students.
        </p>

        <div className="hero-element flex flex-col gap-4 sm:flex-row">
          <a href="#classes" className="flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95">
            See Classes
          </a>
          <div className="flex w-full gap-4 sm:w-auto">
            <a href="https://wa.me/917797615088?text=Hi%20Sir%2C%20I%20am%20interested%20in%20joining%20M.A%20Physics%20classes.%20Can%20you%20provide%20more%20details%3F" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center rounded-full border border-white/20 bg-black/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
              WhatsApp
            </a>
            <a href="tel:+917797615088" className="flex-1 flex items-center justify-center rounded-full border border-white/20 bg-black/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
              Call
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 opacity-0 hero-element flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest text-muted uppercase">Scroll</span>
        <div className="h-12 w-px overflow-hidden bg-white/10">
          <div className="h-full w-full bg-white [animation:var(--animate-scroll-down)]" />
        </div>
      </div>
    </section>
  );
}
