import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:w-96 bg-[#111] border border-white/20 p-5 rounded-2xl z-50 backdrop-blur-xl shadow-2xl flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-semibold text-sm">Accept Cookies & Storage</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              We use secure storage mechanisms (like IndexedDB and local storage) to keep you signed into the portal even when you navigate away or refresh. 
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleAccept}
              className="w-full py-2.5 bg-white text-black font-medium text-sm rounded-xl hover:bg-gray-200 transition-colors"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
