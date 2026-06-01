import React, { useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogIn, LogOut, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PortalAccess() {
  const { user, signInWithGoogle, logout, loading } = useAuth();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/portal');
    } catch (error: any) {
      if (error?.code !== 'auth/popup-closed-by-user' && error?.code !== 'auth/cancelled-popup-request') {
        console.error("Failed to sign in", error);
      }
    }
  };

  const handlePortal = () => {
    if (user) {
      navigate('/portal');
    } else {
      handleSignIn();
    }
  };

  if (loading) return null;

  return (
    <section id="portal" ref={sectionRef} className="py-24 relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center">
      <div ref={contentRef} className="w-full bg-white/5 border border-white/10 rounded-3xl p-10 md:p-16 backdrop-blur-xl flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
        
        {/* Background elements for styling */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-white/20 transition-all duration-700" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-white/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-white/10 transition-all duration-700" />
        
        <h2 className="text-3xl md:text-5xl font-display mb-6">Student Portal Access</h2>
        <p className="text-muted text-lg max-w-2xl mx-auto font-light mb-12">
          Securely access your profile, exam schedules, and exclusive study materials for Class 11 and 12 Physics.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center relative z-10">
          {!user ? (
            <>
              <button 
                onClick={handleSignIn}
                className="w-full sm:w-64 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-3 text-lg hover:-translate-y-1 duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
              >
                <LogIn className="w-5 h-5" />
                Sign In 
              </button>
              <button 
                onClick={handlePortal}
                className="w-full sm:w-64 py-4 rounded-xl border border-white/20 bg-black/40 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-lg backdrop-blur-md hover:-translate-y-1 duration-300"
              >
                <User className="w-5 h-5" />
                Portal 
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handlePortal}
                className="w-full sm:w-64 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-3 text-lg shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 duration-300"
              >
                <User className="w-5 h-5" />
                Enter Portal
              </button>
              <button 
                onClick={logout}
                className="w-full sm:w-64 py-4 rounded-xl border border-white/20 bg-black/40 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-lg backdrop-blur-md hover:-translate-y-1 duration-300"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
