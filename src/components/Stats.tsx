import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "11 & 12", label: "Classes Taught" },
  { value: "Regular", label: "Mock Tests" },
  { value: "Concept-First", label: "Teaching Style" }
];

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
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
    <section ref={sectionRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-stroke/50">
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-stroke/50">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center text-center pt-12 md:pt-0 first:pt-0"
          >
            <div className="text-5xl md:text-7xl font-display text-white tracking-tight mb-4">{stat.value}</div>
            <div className="text-sm font-medium tracking-[0.2em] uppercase text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
