import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HLSVideo } from './HLSVideo';

export function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic GSAP infinite horizontal marquee
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });
    }
  }, []);

  return (
    <footer className="relative h-screen min-h-[600px] w-full overflow-hidden flex flex-col justify-between pt-24 border-t border-stroke/50">
      
      <div className="absolute inset-0 z-0">
        <HLSVideo 
          src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
          className="h-full w-full opacity-70 transform scale-y-[-1] object-cover" // vertically flipped
        />
        {/* Heavier overlay for footer readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent opacity-90" />
      </div>

      {/* Top half: CTA & Title */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 flex-grow max-w-4xl mx-auto">
        <span className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-widest text-muted uppercase">
          Contact
        </span>
        
        <h2 className="font-display mb-6 text-5xl md:text-7xl text-white leading-tight">
          Ready to Start Your Physics Journey?
        </h2>
        
        <p className="text-lg md:text-xl text-muted/80 font-light mb-10 max-w-2xl">
          Enrol now for the upcoming batches. Call or WhatsApp to enquire about fees, schedule, and mock tests.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="https://wa.me/917797615088?text=Hi%20Sir%2C%20I%20am%20interested%20in%20joining%20M.A%20Physics%20classes.%20Can%20you%20provide%20more%20details%3F" 
            target="_blank" rel="noopener noreferrer"
            className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
          >
            WhatsApp Now
          </a>
          <a 
            href="tel:+917797615088" 
            className="rounded-full border border-white/20 bg-black/40 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Call Teacher
          </a>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 w-full overflow-hidden whitespace-nowrap py-10 border-y border-white/10 bg-black/40 backdrop-blur-md">
        <div ref={marqueeRef} className="inline-block text-4xl md:text-6xl font-display uppercase tracking-wider text-white/50">
          LEARN PHYSICS • BUILD CONCEPTS • SCORE HIGH • LEARN PHYSICS • BUILD CONCEPTS • SCORE HIGH • LEARN PHYSICS • BUILD CONCEPTS • SCORE HIGH •
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-6 text-xs text-muted/70 tracking-widest uppercase bg-black/80 backdrop-blur-sm gap-4">
        <span>Available for students</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">YouTube</a>
          <a href="https://wa.me/917797615088?text=Hi%20Sir%2C%20I%20am%20interested%20in%20joining%20M.A%20Physics%20classes.%20Can%20you%20provide%20more%20details%3F" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
          <a href="tel:+917797615088" className="hover:text-white transition-colors">Call</a>
        </div>
        <span>M.A Physics © 2026</span>
      </div>

    </footer>
  );
}
