import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const notes = [
  {
    title: "Weekly Mock Test Schedule",
    date: "Updated every week",
    readTime: "2 min"
  },
  {
    title: "How to Master Numericals",
    date: "Study tip",
    readTime: "3 min"
  },
  {
    title: "Important Formula Revision",
    date: "Class 11 & 12",
    readTime: "4 min"
  },
  {
    title: "Common Mistakes to Avoid",
    date: "Exam prep",
    readTime: "3 min"
  }
];

export function RecentNotes() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.8, rotation: -10 },
          {
            opacity: 0.4,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );
      }

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-stroke/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            <h2 className="font-display text-5xl md:text-7xl mb-6 text-white tracking-tight">Recent Notes</h2>
            <p className="text-muted text-lg font-light leading-relaxed mb-8 max-w-md">
              Important classroom updates, revision reminders, and exam-focused study notes.
            </p>
            <div ref={imageRef} className="hidden lg:block w-32 h-48 rounded-2xl overflow-hidden opacity-0 grayscale relative">
               <img 
                 src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop" 
                 alt="Notebook"
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-black/40" />
            </div>
          </div>
        </div>

        {/* Right Column: List */}
        <div ref={listRef} className="lg:col-span-7 flex flex-col">
          {notes.map((note, idx) => (
            <a
              href="#"
              key={idx}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 border-b border-stroke/50 transition-colors hover:border-white/20"
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-muted group-hover:text-white/60 transition-colors">{note.date}</span>
                <h3 className="text-xl md:text-3xl font-display text-white tracking-tight group-hover:text-white/90 transition-colors">{note.title}</h3>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted">
                <span>{note.readTime} read</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface transition-all group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
