import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    title: "Mechanics",
    description: "Motion, forces, work, energy, momentum, gravitation, and real problem-solving.",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=2000&auto=format&fit=crop" // Abstract physics/math
  },
  {
    title: "Electrostatics",
    description: "Charge, field, potential, capacitors, and the logic behind every formula.",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2000&auto=format&fit=crop" // Electronics/Electricity
  },
  {
    title: "Optics",
    description: "Reflection, refraction, lenses, mirrors, and image formation made simple.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" // Light/Prism
  },
  {
    title: "Modern Physics",
    description: "Atoms, nuclei, semiconductors, and the core ideas needed for exams.",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2000&auto=format&fit=crop" // Abstract atom/space
  }
];

export function FeaturedTopics() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
            duration: 1,
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
    <section id="classes" ref={sectionRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-stroke/50">
      <div className="mb-16 md:flex md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-white tracking-tight">Featured Topics</h2>
          <p className="text-muted text-lg font-light leading-relaxed">
            A focused selection of the main Physics areas taught with clarity and practice.
          </p>
        </div>
        <button className="mt-8 group flex items-center gap-2 rounded-full border border-stroke px-6 py-3 text-sm font-medium text-white transition-all hover:bg-surface hover:border-white/20">
          View Syllabus <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[2rem] border border-stroke bg-surface/50 aspect-square md:aspect-[4/3] flex flex-col justify-end"
          >
            {/* Image Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={topic.image} 
                alt={topic.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            </div>

            {/* Hover Gradient Border effect */}
            <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
                 style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.06), transparent 40%)' }} />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
              <h3 className="font-display text-3xl md:text-4xl text-white mb-3 tracking-tight">{topic.title}</h3>
              <p className="text-muted font-light leading-relaxed max-w-sm">
                {topic.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
