import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out", 
          delay: 3 // Appear after loading screen
        }
      );
    }
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-6 left-0 right-0 z-40 mx-auto max-w-max"
    >
    </nav>
  );
}
