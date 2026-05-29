import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Download, Target, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function StudyMaterials() {
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-white tracking-tight">Resources & Mock Tests</h2>
          <p className="text-muted text-lg font-light leading-relaxed">
            Free resources, comprehensive formula sheets, and regular mock tests to help you track your progress.
          </p>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formula Sheet Card */}
        <div
          className="group relative overflow-hidden rounded-[2rem] border border-stroke bg-surface/50 p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
        >
          <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
               style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.06), transparent 40%)' }} />

          <div className="relative z-10">
            <div className="h-14 w-14 rounded-full border border-stroke bg-black/50 flex items-center justify-center mb-8">
              <FileText className="w-6 h-6 text-white/70" />
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-3 tracking-tight">Complete Formula Sheet</h3>
            <p className="text-muted font-light leading-relaxed max-w-sm mb-8">
              All essential physics formulas from Mechanics, Waves, Optics, Thermodynamics, and Modern Physics for quick revision.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted">PDF • 11 Pages</span>
            <a 
              href="/formula-sheet.pdf" 
              download
              onClick={(e) => {
                // Since we don't have the actual PDF file in the public folder yet, alert the user.
                // In a real scenario, dropping the PDF in the public folder makes this work natively.
                alert("Please place your PDF file named 'formula-sheet.pdf' in the 'public' folder of the project.");
              }}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </div>
        </div>
        
        {/* Performance Evaluation Card */}
        <div
          className="group relative overflow-hidden rounded-[2rem] border border-stroke bg-surface/50 p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
        >
          <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
               style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.06), transparent 40%)' }} />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 flex-shrink-0 rounded-full border border-stroke bg-black/50 flex items-center justify-center">
                <Target className="w-6 h-6 text-white/70" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight leading-none">Regular Performance Evaluation</h3>
            </div>
            
            <p className="text-muted font-light leading-relaxed max-w-sm mb-6">
              Structured mock tests with detailed solutions and performance feedback. We conduct weekly chapter-wise tests and monthly full-syllabus simulations.
            </p>
            
            <ul className="space-y-3 text-sm text-muted/80 font-light mt-auto">
               <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0" /><span>Chapter-wise assessments</span></li>
               <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0" /><span>Full syllabus mock exams</span></li>
               <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0" /><span>Detailed performance analysis</span></li>
               <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0" /><span>Time management training</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
