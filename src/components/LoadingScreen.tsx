import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [counter, setCounter] = useState(0);

  const words = ["Ignite", "Discover", "Master"];

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Set initial word
    if (wordRef.current) {
      gsap.set(wordRef.current, { y: "0%", opacity: 1 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      }
    });

    // Simulate loading progress
    const loadingObj = { value: 0 };
    tl.to(loadingObj, {
      value: 100,
      duration: 3.2,
      ease: "power3.inOut",
      onUpdate: () => {
        setCounter(Math.floor(loadingObj.value));
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { width: `${loadingObj.value}%` });
        }
      }
    });

    // Word rotation animation sequence
    words.forEach((word, index) => {
      // Don't fade out the very first word immediately, wait a bit
      if (index === 0) {
        tl.to(wordRef.current, {
          y: "-120%",
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        }, 0.8)
      } else {
        tl.add(() => {
          if (wordRef.current) {
            wordRef.current.innerText = word;
            gsap.set(wordRef.current, { y: "120%", opacity: 0 }); // reset to bottom
          }
        })
        .to(wordRef.current, {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
        })
        .to(wordRef.current, {
          y: "-120%",
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        }, "+=0.4");
      }
    });

    // Final word "Physics"
    tl.add(() => {
      if (wordRef.current) {
        wordRef.current.innerText = "Physics";
        gsap.set(wordRef.current, { y: "120%", opacity: 0 });
      }
    })
    .to(wordRef.current, {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power4.out",
    });

    // Exit animations
    // Fade out everything except the background first
    tl.to(wrapperRef.current, {
      opacity: 0,
      y: -30,
      scale: 0.95,
      duration: 0.6,
      ease: "power3.inOut",
    }, "+=0.1");

    // Pull up the main container with a nice curved bottom effect
    tl.to(containerRef.current, {
      yPercent: -100,
      borderBottomLeftRadius: '50% 20%',
      borderBottomRightRadius: '50% 20%',
      duration: 1.2,
      ease: "power4.inOut",
    }, "-=0.2");

    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050505] text-white will-change-transform transform-gpu overflow-hidden"
    >
      <div 
        ref={wrapperRef}
        className="flex h-full flex-col justify-between px-6 py-8 md:px-12 md:py-10"
      >
        <div className="flex justify-between items-start text-xs font-semibold uppercase tracking-widest text-muted/70">
          <span>{`// M.A Physics`}</span>
          <span>Initiating Session</span>
        </div>

        <div className="flex items-end justify-between pb-8 pt-20">
          <div className="overflow-hidden h-[1.3em] pb-2 relative flex-1 text-5xl md:text-8xl font-display tracking-tight text-white/90 italic">
            <div ref={wordRef} className="absolute bottom-0 translate-y-0 opacity-100">
              {words[0]}
            </div>
          </div>
          <div className="flex items-end gap-1 mb-[-8px]">
            <div className="text-6xl md:text-9xl font-display font-semibold tracking-tighter text-white w-24 md:w-48 text-right leading-none">
              {counter}
            </div>
            <span className="text-2xl md:text-4xl text-white/40 pb-2 md:pb-4">%</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full z-10">
        <div ref={progressBarRef} className="h-full bg-white w-0 shadow-[0_0_10px_2px_rgba(255,255,255,0.4)]" />
      </div>
      
      {/* Background radial gradient to give it depth */}
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none" />
    </div>
  );
}
