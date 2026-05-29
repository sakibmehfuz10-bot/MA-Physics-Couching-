import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { alt: "Projectile motion diagram", src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop" },
  { alt: "Electric field lines", src: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2000&auto=format&fit=crop" },
  { alt: "Lens and mirror", src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" },
  { alt: "Wave interference", src: "https://images.unsplash.com/photo-1524169358666-79f22534bc6e?q=80&w=2000&auto=format&fit=crop" },
];

export function VisualLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create horizontal scroll effect for the pinned section
      if (galleryRef.current && containerRef.current) {
        // Calculate the total scrollable width
        const walk = galleryRef.current.scrollWidth - window.innerWidth;

        gsap.to(galleryRef.current, {
          x: -walk,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${walk}`,
            invalidateOnRefresh: true
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen py-24 bg-surface w-full overflow-hidden flex flex-col justify-center border-y border-stroke/50">
      
      <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto w-full">
        <div>
          <h2 className="font-display text-5xl md:text-7xl mb-4 text-white tracking-tight">Physics Visual Lab</h2>
          <p className="text-muted text-lg font-light max-w-lg">
            Interactive learning concepts, diagrams, and experiment-inspired visuals that make Physics easier to understand.
          </p>
        </div>
      </div>

      <div ref={galleryRef} className="flex gap-8 px-6 md:px-12 w-max items-center h-[50vh]">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative h-[40vh] md:h-[50vh] w-[70vw] md:w-[40vw] overflow-hidden rounded-2xl bg-black flex-shrink-0"
          >
            <img 
              src={img.src} 
              alt={img.alt}
              className="h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 text-xl md:text-2xl font-display tracking-wide text-white">
              {img.alt}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
